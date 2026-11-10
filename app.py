import os
import re
import hmac
import csv
import io
from functools import wraps
from flask import Flask, jsonify, request, render_template, session, redirect, url_for, Response
from db import db

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY", "prakruthi-secret-key-2026-lux")
app.config.update(SESSION_COOKIE_SAMESITE="Lax", MAX_CONTENT_LENGTH=16 * 1024 * 1024)

ADMIN_USER = os.getenv("ADMIN_USER", "admin")
ADMIN_PASS = os.getenv("ADMIN_PASS", "admin123")
MANAGER_PHONE = os.getenv("MANAGER_PHONE", "919876543210")
RAZORPAY_KEY = os.getenv("RAZORPAY_KEY_ID", "rzp_test_prakruthiDemo2026")

def admin_only(f):
    @wraps(f)
    def w(*a, **k):
        if not session.get("admin"):
            if request.path.startswith("/api/"):
                return jsonify(error="Admin authentication required"), 401
            return redirect(url_for("login"))
        return f(*a, **k)
    return w

# ---------- PUBLIC ROUTES ----------
@app.route("/")
def home():
    table_num = request.args.get("table", "")
    return render_template("index.html", table_num=table_num, razorpay_key=RAZORPAY_KEY, manager_phone=MANAGER_PHONE)

@app.route("/api/dishes")
def get_dishes():
    rows = db.query("SELECT * FROM dishes WHERE available=1 ORDER BY bestseller DESC, cuisine, veg DESC, id")
    return jsonify(rows)

# PUBLIC SPECIALS
@app.route("/api/specials")
def get_specials():
    today_specials = db.query("""
        SELECT s.id, s.type, s.label, s.day_of_week,
               d.id as dish_id, d.name_en, d.name_te, d.name_hi,
               d.cuisine, d.veg, d.price, d.ingredients, d.img
        FROM specials s JOIN dishes d ON d.id=s.dish_id
        WHERE s.active=1 AND s.type='today'
    """)
    weekly_specials = db.query("""
        SELECT s.id, s.type, s.label, s.day_of_week,
               d.id as dish_id, d.name_en, d.name_te, d.name_hi,
               d.cuisine, d.veg, d.price, d.ingredients, d.img
        FROM specials s JOIN dishes d ON d.id=s.dish_id
        WHERE s.active=1 AND s.type='weekly'
        ORDER BY s.day_of_week
    """)
    return jsonify(today=today_specials, weekly=weekly_specials)

# COUPON APPLICATION
@app.route("/api/coupons/apply", methods=["POST"])
def apply_coupon():
    d = request.get_json() or {}
    code = (d.get("code") or "").strip().upper()
    subtotal = int(d.get("subtotal") or 0)

    if not code:
        return jsonify(error="Please enter a coupon code"), 400

    coupon = db.query("SELECT * FROM coupons WHERE UPPER(code)=%s AND active=1", (code,), one=True)
    if not coupon:
        return jsonify(error="Invalid or expired promo code"), 400

    if subtotal < coupon["min_order"]:
        return jsonify(error=f"Order must be at least ₹{coupon['min_order']} to use code {code}"), 400

    if coupon["discount_type"] == "percent":
        discount = int(subtotal * (coupon["discount_val"] / 100))
    else:
        discount = min(subtotal, coupon["discount_val"])

    new_total = max(0, subtotal - discount)
    return jsonify(
        valid=True,
        code=coupon["code"],
        discount=discount,
        new_total=new_total,
        message=f"Coupon {coupon['code']} applied! Saved ₹{discount}"
    )

# PLACE ORDER
@app.route("/api/order", methods=["POST"])
def place_order():
    d = request.get_json() or {}
    items = d.get("items", [])
    name = (d.get("name") or "").strip()
    phone = (d.get("phone") or "").strip()
    coupon_code = (d.get("coupon_code") or "").strip().upper()

    if not items or not name or not phone:
        return jsonify(error="Please provide your name, phone number, and select dishes"), 400

    ids = [int(i["id"]) for i in items]
    placeholders = ",".join(["%s"] * len(ids))
    dish_rows = db.query(f"SELECT id, price FROM dishes WHERE available=1 AND id IN ({placeholders})", ids)
    price_map = {row["id"]: row["price"] for row in dish_rows}

    valid_rows = [(int(i["id"]), max(1, int(i["qty"])), price_map[int(i["id"])]) for i in items if int(i["id"]) in price_map]
    if not valid_rows:
        return jsonify(error="Selected dishes are currently unavailable"), 400

    subtotal = sum(q * p for _, q, p in valid_rows)
    discount = 0
    if coupon_code:
        cpn = db.query("SELECT * FROM coupons WHERE UPPER(code)=%s AND active=1", (coupon_code,), one=True)
        if cpn and subtotal >= cpn["min_order"]:
            if cpn["discount_type"] == "percent":
                discount = int(subtotal * (cpn["discount_val"] / 100))
            else:
                discount = min(subtotal, cpn["discount_val"])
        else:
            coupon_code = ""

    total = max(0, subtotal - discount)
    raw_pay = d.get("payment", "cash")
    if raw_pay == "upi":
        pay = "UPI (Online)"
    elif raw_pay == "razorpay":
        pay = "Card/Netbanking (Online Paid)"
    else:
        pay = "Cash / Pay at Counter"

    order_type = d.get("order_type", "dinein")
    address = (d.get("address") or "").strip()

    oid = db.execute(
        """INSERT INTO orders (name, phone, address, order_type, payment, total, discount, coupon_code, status)
           VALUES (%s, %s, %s, %s, %s, %s, %s, %s, 'New')""",
        (name[:100], phone[:20], address[:300], order_type, pay, total, discount, coupon_code)
    )

    db.executemany(
        "INSERT INTO order_items (order_id, dish_id, qty, price) VALUES (%s, %s, %s, %s)",
        [(oid, did, qty, pr) for did, qty, pr in valid_rows]
    )

    return jsonify(
        order_id=oid,
        total=total,
        subtotal=subtotal,
        discount=discount,
        coupon_code=coupon_code,
        message="Order placed successfully!"
    )

@app.route("/api/track")
def track_order():
    oid = request.args.get("id", type=int)
    raw_phone = request.args.get("phone", "")
    digits = re.sub(r"\D", "", raw_phone)[-10:]
    if not oid or len(digits) < 6:
        return jsonify(error="Invalid order ID or phone number"), 400

    o = db.query("SELECT * FROM orders WHERE id=%s", (oid,), one=True)
    if not o or re.sub(r"\D", "", o["phone"])[-10:] != digits:
        return jsonify(error="Order not found. Please verify the order number and phone."), 404

    items = db.query("""
        SELECT d.name_en, d.name_te, d.name_hi, i.qty, i.price
        FROM order_items i
        JOIN dishes d ON d.id=i.dish_id
        WHERE i.order_id=%s
    """, (oid,))

    return jsonify(
        id=o["id"],
        name=o["name"],
        phone=o["phone"],
        address=o.get("address", ""),
        order_type=o.get("order_type", "dinein"),
        status=o["status"],
        total=o["total"],
        discount=o.get("discount", 0),
        coupon_code=o.get("coupon_code", ""),
        payment=o["payment"],
        created=str(o["created"]),
        items=items
    )

# REVIEWS & STAR RATINGS
@app.route("/api/reviews", methods=["GET", "POST"])
def handle_reviews():
    if request.method == "POST":
        d = request.get_json() or {}
        name = (d.get("name") or "").strip()
        dish_name = (d.get("dish_name") or "General Experience").strip()
        rating = max(1, min(5, int(d.get("rating") or 5)))
        comment = (d.get("comment") or "").strip()

        if not name or not comment:
            return jsonify(error="Please provide your name and review comment"), 400

        rid = db.execute(
            "INSERT INTO reviews (name, dish_name, rating, comment, status) VALUES (%s, %s, %s, %s, 'Approved')",
            (name[:100], dish_name[:100], rating, comment[:500])
        )
        return jsonify(id=rid, message="Thank you for your review! It is now published.")
    else:
        rows = db.query("SELECT * FROM reviews WHERE status='Approved' ORDER BY id DESC LIMIT 20")
        for r in rows:
            r["created"] = str(r["created"])
        return jsonify(rows)

# TABLE RESERVATION
@app.route("/api/reserve", methods=["POST"])
def reserve_table():
    d = request.get_json() or {}
    name = (d.get("name") or "").strip()
    phone = (d.get("phone") or "").strip()
    guests = int(d.get("guests") or 2)
    res_date = (d.get("date") or "").strip()
    res_time = (d.get("time") or "").strip()
    notes = (d.get("notes") or "").strip()

    if not name or not phone or not res_date or not res_time:
        return jsonify(error="Please fill in name, phone, date, and preferred time"), 400

    rid = db.execute("""
        INSERT INTO reservations (name, phone, guests, res_date, res_time, notes, status)
        VALUES (%s, %s, %s, %s, %s, %s, 'Confirmed')
    """, (name, phone, guests, res_date, res_time, notes))

    return jsonify(reservation_id=rid, message="Table reserved successfully! We look forward to serving you.")

# ---------- ADMIN AUTHENTICATION ----------
@app.route("/admin/login", methods=["GET", "POST"])
def login():
    err = ""
    if request.method == "POST":
        u = request.form.get("username", "").strip()
        p = request.form.get("password", "").strip()
        if hmac.compare_digest(u, ADMIN_USER) and hmac.compare_digest(p, ADMIN_PASS):
            session["admin"] = True
            return redirect(url_for("admin_dashboard"))
        err = "Incorrect username or password. Please try again."
    return render_template("admin_login.html", err=err, default_user=ADMIN_USER, default_pass=ADMIN_PASS)

@app.route("/admin/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))

@app.route("/admin")
@admin_only
def admin_dashboard():
    return render_template("admin.html", admin_user=ADMIN_USER, manager_phone=MANAGER_PHONE)

# ---------- ADMIN APIS: ORDERS & STATS ----------
@app.route("/api/admin/stats")
@admin_only
def admin_stats():
    orders = db.query("SELECT total, discount, payment, status FROM orders")
    total_orders = len(orders)
    new_orders = sum(1 for o in orders if o["status"] == "New")
    preparing_orders = sum(1 for o in orders if o["status"] == "Preparing")
    delivered_orders = sum(1 for o in orders if o["status"] == "Delivered")
    cancelled_orders = sum(1 for o in orders if o["status"] == "Cancelled")
    revenue = sum(o["total"] for o in orders if o["status"] != "Cancelled")
    total_discount_given = sum(o.get("discount", 0) for o in orders if o["status"] != "Cancelled")

    total_dishes = db.query("SELECT COUNT(*) as c FROM dishes", one=True)["c"]
    total_res = db.query("SELECT COUNT(*) as c FROM reservations", one=True)["c"]
    total_reviews = db.query("SELECT COUNT(*) as c FROM reviews", one=True)["c"]

    return jsonify(
        total_orders=total_orders,
        new_orders=new_orders,
        preparing_orders=preparing_orders,
        delivered_orders=delivered_orders,
        cancelled_orders=cancelled_orders,
        revenue=revenue,
        total_discounts=total_discount_given,
        total_dishes=total_dishes,
        total_reservations=total_res,
        total_reviews=total_reviews
    )

@app.route("/api/admin/orders")
@admin_only
def admin_orders():
    if db.db_type == "mysql":
        rows = db.query("""
            SELECT o.*,
                   GROUP_CONCAT(CONCAT(d.name_en, ' x', i.qty) SEPARATOR ', ') AS items_summary
            FROM orders o
            LEFT JOIN order_items i ON i.order_id=o.id
            LEFT JOIN dishes d ON d.id=i.dish_id
            GROUP BY o.id
            ORDER BY o.id DESC
            LIMIT 300
        """)
    else:
        rows = db.query("""
            SELECT o.*,
                   group_concat(d.name_en || ' x' || i.qty, ', ') AS items_summary
            FROM orders o
            LEFT JOIN order_items i ON i.order_id=o.id
            LEFT JOIN dishes d ON d.id=i.dish_id
            GROUP BY o.id
            ORDER BY o.id DESC
            LIMIT 300
        """)
    for r in rows:
        r["created"] = str(r["created"])
    return jsonify(rows)

@app.route("/api/admin/orders/<int:oid>")
@admin_only
def admin_order_detail(oid):
    o = db.query("SELECT * FROM orders WHERE id=%s", (oid,), one=True)
    if not o:
        return jsonify(error="Order not found"), 404
    items = db.query("""
        SELECT d.name_en, d.name_te, d.name_hi, i.qty, i.price
        FROM order_items i
        JOIN dishes d ON d.id=i.dish_id
        WHERE i.order_id=%s
    """, (oid,))
    o["created"] = str(o["created"])
    o["items"] = items
    return jsonify(o)

@app.route("/api/admin/status", methods=["POST"])
@admin_only
def admin_status():
    d = request.get_json() or {}
    oid = d.get("id")
    status = d.get("status")
    if status not in ("New", "Preparing", "Delivered", "Cancelled"):
        return jsonify(error="Invalid status value"), 400
    db.execute("UPDATE orders SET status=%s WHERE id=%s", (status, oid))
    return jsonify(ok=True)

# EXPORT ORDERS TO CSV (EXCEL)
@app.route("/api/admin/export/orders.csv")
@admin_only
def export_orders_csv():
    if db.db_type == "mysql":
        rows = db.query("""
            SELECT o.id, o.created, o.name, o.phone, o.order_type, o.address,
                   GROUP_CONCAT(CONCAT(d.name_en, ' x', i.qty) SEPARATOR '; ') AS items,
                   o.total, o.discount, o.coupon_code, o.payment, o.status
            FROM orders o
            LEFT JOIN order_items i ON i.order_id=o.id
            LEFT JOIN dishes d ON d.id=i.dish_id
            GROUP BY o.id
            ORDER BY o.id DESC
        """)
    else:
        rows = db.query("""
            SELECT o.id, o.created, o.name, o.phone, o.order_type, o.address,
                   group_concat(d.name_en || ' x' || i.qty, '; ') AS items,
                   o.total, o.discount, o.coupon_code, o.payment, o.status
            FROM orders o
            LEFT JOIN order_items i ON i.order_id=o.id
            LEFT JOIN dishes d ON d.id=i.dish_id
            GROUP BY o.id
            ORDER BY o.id DESC
        """)

    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow([
        "Order ID", "Date & Time", "Customer Name", "Phone", "Order Type",
        "Table / Address", "Items Ordered", "Total (INR)", "Discount",
        "Coupon Code", "Payment Mode", "Status"
    ])

    for r in rows:
        writer.writerow([
            r["id"], str(r["created"]), r["name"], r["phone"], r["order_type"],
            r.get("address", ""), r.get("items", ""), r["total"], r.get("discount", 0),
            r.get("coupon_code", ""), r["payment"], r["status"]
        ])

    output.seek(0)
    return Response(
        output.getvalue(),
        mimetype="text/csv",
        headers={"Content-Disposition": "attachment;filename=prakruthi_orders_report.csv"}
    )

# ---------- ADMIN APIS: COUPONS ----------
@app.route("/api/admin/coupons", methods=["GET", "POST"])
@admin_only
def admin_coupons():
    if request.method == "POST":
        d = request.get_json() or {}
        code = (d.get("code") or "").strip().upper()
        dtype = "percent" if d.get("discount_type") == "percent" else "flat"
        val = int(d.get("discount_val") or 10)
        min_ord = int(d.get("min_order") or 0)
        if not code or val <= 0:
            return jsonify(error="Invalid coupon parameters"), 400
        cid = db.execute(
            "INSERT INTO coupons (code, discount_type, discount_val, min_order, active) VALUES (%s, %s, %s, %s, 1)",
            (code, dtype, val, min_ord)
        )
        return jsonify(id=cid, message="Coupon created successfully!")
    else:
        rows = db.query("SELECT * FROM coupons ORDER BY id DESC")
        return jsonify(rows)

@app.route("/api/admin/coupons/<int:cid>/toggle", methods=["POST"])
@admin_only
def toggle_coupon(cid):
    d = request.get_json() or {}
    active = 1 if d.get("active") else 0
    db.execute("UPDATE coupons SET active=%s WHERE id=%s", (active, cid))
    return jsonify(ok=True)

@app.route("/api/admin/coupons/<int:cid>", methods=["DELETE"])
@admin_only
def delete_coupon(cid):
    db.execute("DELETE FROM coupons WHERE id=%s", (cid,))
    return jsonify(ok=True)

# ---------- ADMIN APIS: REVIEWS ----------
@app.route("/api/admin/reviews")
@admin_only
def admin_reviews():
    rows = db.query("SELECT * FROM reviews ORDER BY id DESC LIMIT 100")
    for r in rows:
        r["created"] = str(r["created"])
    return jsonify(rows)

@app.route("/api/admin/reviews/<int:rid>/status", methods=["POST"])
@admin_only
def admin_review_status(rid):
    d = request.get_json() or {}
    status = d.get("status", "Approved")
    db.execute("UPDATE reviews SET status=%s WHERE id=%s", (status, rid))
    return jsonify(ok=True)

@app.route("/api/admin/reviews/<int:rid>", methods=["DELETE"])
@admin_only
def admin_review_delete(rid):
    db.execute("DELETE FROM reviews WHERE id=%s", (rid,))
    return jsonify(ok=True)

# ---------- ADMIN APIS: DISHES ----------
def clean_dish_payload(d):
    try:
        name_en = (d.get("name_en") or "").strip()
        price = int(d.get("price") or 0)
        if not name_en or price <= 0:
            return None
        cuisine = d.get("cuisine", "Indian")
        if cuisine not in ("Indian", "Chinese", "Tiffins", "Starters"):
            cuisine = "Indian"
        return {
            "name_en": name_en,
            "name_te": (d.get("name_te") or name_en).strip(),
            "name_hi": (d.get("name_hi") or name_en).strip(),
            "cuisine": cuisine,
            "veg": 1 if int(d.get("veg", 1)) else 0,
            "price": price,
            "ingredients": (d.get("ingredients") or "").strip(),
            "bestseller": 1 if d.get("bestseller") else 0
        }
    except Exception:
        return None

@app.route("/api/admin/dishes")
@admin_only
def admin_dishes():
    rows = db.query("SELECT * FROM dishes ORDER BY cuisine, veg DESC, id")
    return jsonify(rows)

@app.route("/api/admin/dishes", methods=["POST"])
@admin_only
def dish_add():
    v = clean_dish_payload(request.get_json() or {})
    if not v:
        return jsonify(error="Dish requires at least an English name and price greater than 0"), 400
    img = re.sub(r"[^a-z0-9]", "", v["name_en"].lower()) or "dish"
    new_id = db.execute(
        """INSERT INTO dishes (name_en, name_te, name_hi, cuisine, veg, price, ingredients, img, bestseller, available)
           VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, 1)""",
        (v["name_en"], v["name_te"], v["name_hi"], v["cuisine"], v["veg"], v["price"], v["ingredients"], img, v["bestseller"])
    )
    return jsonify(id=new_id, message="Dish added successfully!")

@app.route("/api/admin/dishes/<int:did>", methods=["PUT"])
@admin_only
def dish_edit(did):
    v = clean_dish_payload(request.get_json() or {})
    if not v:
        return jsonify(error="Dish requires at least an English name and price greater than 0"), 400
    db.execute(
        """UPDATE dishes SET name_en=%s, name_te=%s, name_hi=%s, cuisine=%s, veg=%s, price=%s, ingredients=%s, bestseller=%s
           WHERE id=%s""",
        (v["name_en"], v["name_te"], v["name_hi"], v["cuisine"], v["veg"], v["price"], v["ingredients"], v["bestseller"], did)
    )
    return jsonify(id=did, message="Dish updated successfully!")

@app.route("/api/admin/dishes/<int:did>/available", methods=["POST"])
@admin_only
def dish_available(did):
    d = request.get_json() or {}
    avail = 1 if d.get("available") else 0
    db.execute("UPDATE dishes SET available=%s WHERE id=%s", (avail, did))
    return jsonify(ok=True)

@app.route("/api/admin/dishes/<int:did>", methods=["DELETE"])
@admin_only
def dish_delete(did):
    try:
        db.execute("DELETE FROM dishes WHERE id=%s", (did,))
        return jsonify(ok=True)
    except Exception as e:
        return jsonify(error="Cannot delete dish because it has linked past orders. Please use Hide instead."), 400

@app.route("/api/admin/dishes/<int:did>/photo", methods=["POST"])
@admin_only
def dish_photo(did):
    f = request.files.get("photo")
    if not f:
        return jsonify(error="No image file provided"), 400
    row = db.query("SELECT img FROM dishes WHERE id=%s", (did,), one=True)
    if not row:
        return jsonify(error="Dish not found"), 404
    folder = os.path.join(app.static_folder, "dishes")
    os.makedirs(folder, exist_ok=True)
    save_path = os.path.join(folder, f"{row['img']}.jpg")
    f.save(save_path)
    return jsonify(ok=True, message="Photo uploaded successfully!")

# ---------- ADMIN APIS: RESERVATIONS ----------
@app.route("/api/admin/reservations")
@admin_only
def admin_reservations():
    rows = db.query("SELECT * FROM reservations ORDER BY id DESC LIMIT 200")
    for r in rows:
        r["created"] = str(r["created"])
    return jsonify(rows)

@app.route("/api/admin/reservations/<int:rid>/status", methods=["POST"])
@admin_only
def admin_res_status(rid):
    d = request.get_json() or {}
    status = d.get("status")
    if status not in ("Confirmed", "Seated", "Completed", "Cancelled"):
        return jsonify(error="Invalid status value"), 400
    db.execute("UPDATE reservations SET status=%s WHERE id=%s", (status, rid))
    return jsonify(ok=True)

# ---------- ADMIN APIS: SPECIALS ----------
@app.route("/api/admin/specials", methods=["GET", "POST"])
@admin_only
def admin_specials():
    if request.method == "POST":
        d = request.get_json() or {}
        dish_id = int(d.get("dish_id") or 0)
        stype = "weekly" if d.get("type") == "weekly" else "today"
        day = d.get("day_of_week")
        day = int(day) if day is not None and day != "" else None
        label = (d.get("label") or "").strip()[:100]

        if not dish_id:
            return jsonify(error="Please select a dish"), 400

        # For today type: replace existing today's special
        if stype == "today":
            db.execute("UPDATE specials SET active=0 WHERE type='today'")

        sid = db.execute(
            "INSERT INTO specials (type, dish_id, day_of_week, label, active) VALUES (%s, %s, %s, %s, 1)",
            (stype, dish_id, day, label)
        )
        return jsonify(id=sid, message="Special set successfully!")
    else:
        rows = db.query("""
            SELECT s.id, s.type, s.label, s.day_of_week, s.active,
                   d.id as dish_id, d.name_en, d.cuisine, d.price, d.veg
            FROM specials s JOIN dishes d ON d.id=s.dish_id
            WHERE s.active=1
            ORDER BY s.type, s.day_of_week
        """)
        return jsonify(rows)

@app.route("/api/admin/specials/<int:sid>", methods=["DELETE"])
@admin_only
def admin_special_delete(sid):
    db.execute("DELETE FROM specials WHERE id=%s", (sid,))
    return jsonify(ok=True)

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
