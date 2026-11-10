import os
import re
import sqlite3

# Try importing mysql.connector if available
try:
    import mysql.connector
    HAS_MYSQL = True
except ImportError:
    HAS_MYSQL = False

SEED_DISHES = [
    # ---- INDIAN VEG ----
    ("Paneer Butter Masala","పన్నీర్ బటర్ మసాలా","पनीर बटर मसाला","Indian",1,240,"Paneer, Butter, Tomato, Cream, Cashew, Kasuri methi, Spices","paneer",1),
    ("Dal Tadka","దాల్ తడ్కా","दाल तड़का","Indian",1,160,"Toor dal, Garlic, Cumin, Ghee, Tomato, Red chilli","dal",1),
    ("Veg Biryani","వెజ్ బిర్యానీ","वेज बिरयानी","Indian",1,190,"Basmati rice, Mixed vegetables, Mint, Saffron, Biryani masala, Ghee","vegbiryani",1),
    ("Palak Paneer","పాలక్ పన్నీర్","पालक पनीर","Indian",1,230,"Spinach, Paneer, Garlic, Onion, Cream, Spices","palakpaneer",0),
    ("Chole Bhature","ఛోలే భతూరే","छोले भटूरे","Indian",1,150,"Chickpeas, Maida, Yogurt, Onion, Tea leaves, Chole masala","chole",1),
    ("Aloo Gobi","ఆలూ గోబీ","आलू गोभी","Indian",1,150,"Potato, Cauliflower, Turmeric, Cumin, Ginger, Coriander","aloogobi",0),
    ("Veg Pulao","వెజ్ పులావ్","वेज पुलाव","Indian",1,170,"Basmati rice, Peas, Carrot, Beans, Whole spices, Ghee","pulao",0),
    ("Gutti Vankaya Curry","గుత్తి వంకాయ కూర","गुट्टी वांगी करी","Indian",1,180,"Brinjal, Peanuts, Sesame, Coconut, Tamarind, Spices","brinjal",1),
    ("Samosa","సమోసా","समोसा","Indian",1,60,"Potato, Peas, Maida, Cumin, Coriander, Garam masala","samosa",1),
    ("Paneer Tikka","పన్నీర్ టిక్కా","पनीर टिक्का","Indian",1,220,"Paneer, Yogurt, Capsicum, Onion, Tikka masala, Lemon","paneertikka",1),
    ("Veg Thali","వెజ్ థాలీ","वेज थाली","Indian",1,260,"Rice, Roti, Dal, Two curries, Curd, Papad, Sweet","thali",1),
    ("Gulab Jamun","గులాబ్ జామున్","गुलाब जामुन","Indian",1,90,"Khoya, Milk powder, Sugar syrup, Cardamom, Rose water","gulabjamun",1),
    # ---- INDIAN NON-VEG ----
    ("Chicken Biryani","చికెన్ బిర్యానీ","चिकन बिरयानी","Indian",0,280,"Chicken, Basmati rice, Yogurt, Fried onion, Mint, Saffron, Biryani masala","chickenbiryani",1),
    ("Mutton Biryani","మటన్ బిర్యానీ","मटन बिरयानी","Indian",0,380,"Mutton, Basmati rice, Yogurt, Fried onion, Mint, Whole spices","muttonbiryani",1),
    ("Butter Chicken","బటర్ చికెన్","बटर चिकन","Indian",0,320,"Chicken, Butter, Tomato, Cream, Cashew, Kasuri methi","butterchicken",1),
    ("Chicken Tikka","చికెన్ టిక్కా","चिकन टिक्का","Indian",0,290,"Chicken, Yogurt, Ginger garlic paste, Kashmiri chilli, Lemon","chickentikka",1),
    ("Andhra Chicken Curry","ఆంధ్రా చికెన్ కర్రీ","आंध्रा चिकन करी","Indian",0,300,"Chicken, Red chilli, Onion, Coconut, Curry leaves, Poppy seeds","chickencurry",1),
    ("Mutton Rogan Josh","మటన్ రోగన్ జోష్","मटन रोगन जोश","Indian",0,400,"Mutton, Kashmiri chilli, Yogurt, Fennel, Ginger, Cardamom","mutton",0),
    ("Fish Fry","ఫిష్ ఫ్రై","फिश फ्राई","Indian",0,310,"Fish, Chilli powder, Turmeric, Lemon, Rice flour, Curry leaves","fishfry",1),
    ("Prawns Masala","రొయ్యల మసాలా","प्रॉन्स मसाला","Indian",0,350,"Prawns, Onion, Tomato, Garlic, Coriander, Garam masala","prawns",1),
    ("Egg Curry","ఎగ్ కర్రీ","अंडा करी","Indian",0,170,"Boiled eggs, Onion, Tomato, Ginger garlic, Turmeric, Coriander","eggcurry",0),
    ("Tandoori Chicken","తందూరీ చికెన్","तंदूरी चिकन","Indian",0,340,"Chicken, Yogurt, Tandoori masala, Lemon, Ginger garlic, Butter","tandoori",1),
    ("Chicken 65","చికెన్ 65","चिकन 65","Indian",0,260,"Chicken, Curry leaves, Green chilli, Corn flour, Yogurt, Red chilli","chicken65",1),
    ("Chepala Pulusu","చేపల పులుసు","मछली पुलुसु","Indian",0,330,"Fish, Tamarind, Onion, Tomato, Red chilli, Fenugreek","fishcurry",0),
    # ---- CHINESE VEG ----
    ("Veg Hakka Noodles","వెజ్ హక్కా నూడుల్స్","वेज हक्का नूडल्स","Chinese",1,150,"Noodles, Cabbage, Carrot, Capsicum, Soy sauce, Spring onion","noodles",1),
    ("Veg Fried Rice","వెజ్ ఫ్రైడ్ రైస్","वेज फ्राइड राइस","Chinese",1,140,"Rice, Carrot, Beans, Cabbage, Soy sauce, Black pepper","friedrice",0),
    ("Gobi Manchurian","గోబీ మంచూరియా","गोबी मंचूरियन","Chinese",1,170,"Cauliflower, Corn flour, Soy sauce, Garlic, Chilli sauce, Spring onion","manchurian",1),
    ("Paneer Chilli","పన్నీర్ చిల్లీ","पनीर चिली","Chinese",1,210,"Paneer, Capsicum, Onion, Soy sauce, Green chilli, Garlic","paneerchilli",1),
    ("Veg Manchow Soup","వెజ్ మంచౌ సూప్","वेज मंचाउ सूप","Chinese",1,110,"Mixed vegetables, Soy sauce, Garlic, Ginger, Fried noodles","manchowsoup",0),
    ("Veg Spring Rolls","వెజ్ స్ప్రింగ్ రోల్స్","वेज स्प्रिंग रोल","Chinese",1,130,"Spring roll sheet, Cabbage, Carrot, Noodles, Soy sauce","springroll",0),
    ("Veg Momos","వెజ్ మోమోస్","वेज मोमोज़","Chinese",1,120,"Maida, Cabbage, Carrot, Ginger, Garlic, Spicy chutney","momos",1),
    ("Chilli Mushroom","చిల్లీ మష్రూమ్","चिली मशरूम","Chinese",1,190,"Mushroom, Capsicum, Onion, Soy sauce, Corn flour, Chilli sauce","mushroom",0),
    ("Schezwan Fried Rice","షెజ్వాన్ ఫ్రైడ్ రైస్","शेज़वान फ्राइड राइस","Chinese",1,160,"Rice, Schezwan sauce, Cabbage, Carrot, Garlic, Spring onion","schezwanrice",1),
    ("Sweet Corn Soup","స్వీట్ కార్న్ సూప్","स्वीट कॉर्न सूप","Chinese",1,100,"Sweet corn, Corn flour, Carrot, Black pepper, Spring onion","cornsoup",0),
    # ---- CHINESE NON-VEG ----
    ("Chicken Hakka Noodles","చికెన్ హక్కా నూడుల్స్","चिकन हक्का नूडल्स","Chinese",0,180,"Noodles, Chicken, Cabbage, Capsicum, Soy sauce, Spring onion","chickennoodles",1),
    ("Chicken Fried Rice","చికెన్ ఫ్రైడ్ రైస్","चिकन फ्राइड राइस","Chinese",0,190,"Rice, Chicken, Egg, Beans, Soy sauce, Black pepper","chickenfriedrice",1),
    ("Chilli Chicken","చిల్లీ చికెన్","चिली चिकन","Chinese",0,250,"Chicken, Capsicum, Onion, Soy sauce, Green chilli, Corn flour","chillichicken",1),
    ("Chicken Manchurian","చికెన్ మంచూరియా","चिकन मंचूरियन","Chinese",0,240,"Chicken, Soy sauce, Garlic, Ginger, Corn flour, Spring onion","chickenmanchurian",1),
    ("Chicken Schezwan Noodles","చికెన్ షెజ్వాన్ నూడుల్స్","चिकन शेज़वान नूडल्स","Chinese",0,200,"Noodles, Chicken, Schezwan sauce, Cabbage, Garlic","schezwannoodles",0),
    ("Chicken Momos","చికెన్ మోమోస్","चिकन मोमोज़","Chinese",0,150,"Maida, Minced chicken, Ginger, Garlic, Spring onion, Chutney","chickenmomos",1),
    ("Chicken Sweet Corn Soup","చికెన్ స్వీట్ కార్న్ సూప్","चिकन स्वीट कॉर्न सूप","Chinese",0,130,"Chicken, Sweet corn, Egg, Corn flour, Black pepper","chickensoup",0),
    ("Chicken Lollipop","చికెన్ లాలీపాప్","चिकन लॉलीपॉप","Chinese",0,270,"Chicken wings, Soy sauce, Corn flour, Garlic, Chilli sauce","lollipop",1),
    ("Garlic Prawns","గార్లిక్ ప్రాన్స్","गार्लिक प्रॉन्स","Chinese",0,340,"Prawns, Garlic, Butter, Soy sauce, Chilli flakes, Spring onion","garlicprawns",1),
    ("Egg Fried Rice","ఎగ్ ఫ్రైడ్ రైస్","एग फ्राइड राइस","Chinese",0,150,"Rice, Egg, Spring onion, Soy sauce, Black pepper, Garlic","eggfriedrice",0),
    ("Dragon Chicken","డ్రాగన్ చికెన్","ड्रैगन चिकन","Chinese",0,280,"Chicken, Cashew, Capsicum, Dry red chilli, Soy sauce, Garlic","dragonchicken",1),
    ("Fish in Hot Garlic Sauce","ఫిష్ హాట్ గార్లిక్ సాస్","फिश हॉट गार्लिक सॉस","Chinese",0,320,"Fish, Garlic, Soy sauce, Chilli sauce, Vinegar, Spring onion","fishgarlic",0),
    ("Chicken Spring Rolls","చికెన్ స్ప్రింగ్ రోల్స్","चिकन स्प्रिंग रोल","Chinese",0,170,"Spring roll sheet, Chicken, Cabbage, Carrot, Soy sauce","chickenroll",0),
    # ---- TIFFINS ----
    ("Masala Dosa","మసాలా దోశ","मसाला डोसा","Tiffins",1,110,"Rice batter, Urad dal, Potato, Onion, Mustard seeds, Curry leaves","masaladosa",1),
    ("Idli Sambar","ఇడ్లీ సాంబార్","इडली सांबर","Tiffins",1,80,"Rice, Urad dal, Toor dal, Drumstick, Tamarind, Sambar powder","idli",1),
    ("Medu Vada","మెదు వడ","मेदु वड़ा","Tiffins",1,70,"Urad dal, Black pepper, Curry leaves, Coconut chutney, Sambar","meduvada",1),
    ("Upma","ఉప్మా","उपमा","Tiffins",1,60,"Semolina, Onion, Mustard seeds, Curry leaves, Green chilli, Ghee","upma",0),
    ("Poha","పోహా","पोहा","Tiffins",1,55,"Flattened rice, Onion, Potato, Mustard seeds, Turmeric, Lemon","poha",0),
    ("Ven Pongal","వేన్ పొంగల్","वेन पोंगल","Tiffins",1,90,"Rice, Moong dal, Black pepper, Cumin, Ghee, Cashew, Curry leaves","pongal",1),
    ("Rava Dosa","రవ్వ దోశ","रवा डोसा","Tiffins",1,100,"Semolina, Rice flour, Onion, Green chilli, Ginger, Curry leaves","ravadosa",1),
    ("Pesarattu","పెసరట్టు","पेसरट्टू","Tiffins",1,100,"Green gram, Ginger, Green chilli, Onion, Upma, Cumin","pesarattu",0),
    ("Uttapam","ఉత్తప్పం","उत्तपम","Tiffins",1,110,"Rice batter, Onion, Tomato, Green chilli, Coriander, Carrot","uttapam",0),
    ("Puri Bhaji","పూరీ భాజీ","पूरी भाजी","Tiffins",1,120,"Maida puri, Potato bhaji, Onion, Green chilli, Turmeric, Mustard","puribhaji",1),
    # ---- STARTERS ----
    ("Hara Bhara Kabab","హారా భరా కబాబ్","हरा भरा कबाब","Starters",1,150,"Spinach, Peas, Paneer, Corn flour, Chaat masala, Mint chutney","harabharakabab",1),
    ("Veg Cheese Balls","వెజ్ చీజ్ బాల్స్","वेज चीज बॉल्स","Starters",1,160,"Potato, Cheese, Corn flour, Pepper, Chilli flakes, Dip","vegcheeseballs",1),
    ("Chicken Seekh Kebab","చికెన్ సీఖ్ కేబాబ్","चिकन सीख कबाब","Starters",0,220,"Minced chicken, Onion, Green chilli, Ginger garlic, Spices, Mint","seekhkebab",1),
    ("Fish Fingers","ఫిష్ ఫింగర్స్","फिश फिंगर्स","Starters",0,230,"Fish fillets, Bread crumbs, Egg, Pepper, Lemon, Tartar sauce","fishfingers",1),
]

SEED_COUPONS = [
    ("WELCOME10", "percent", 10, 150, 1),
    ("FLAT50", "flat", 50, 300, 1),
    ("PRAKRUTHI15", "percent", 15, 500, 1)
]

SEED_REVIEWS = [
    ("Suresh Reddy", "Biryani & Butter Chicken", 5, "The food was extraordinary! Pure authentic flavours, tender meat and wonderful ambiance with the brass bells.", "Approved"),
    ("Ananya Sharma", "Paneer Butter Masala", 5, "Best Paneer Butter Masala in Vizag. Warm, rich gravy and crispy naans. Highly recommended!", "Approved"),
    ("Karthik Varma", "Dragon Chicken & Noodles", 5, "Spicy, delicious, and top-tier service. The QR ordering was fast and smooth.", "Approved"),
    ("Dr. Padmavathi", "Veg Thali & Dosa", 5, "Homely, traditional flavors with pristine hygiene. Beautiful interior design.", "Approved")
]

class DatabaseManager:
    def __init__(self):
        self.db_type = os.getenv("DB_TYPE", "").lower()
        self.sqlite_path = os.getenv("SQLITE_PATH", os.path.join(os.path.dirname(__file__), "prakruthi.db"))
        self._init_db_type()
        self.init_schema()

    def _init_db_type(self):
        if self.db_type == "mysql":
            if not HAS_MYSQL:
                print("[Database] mysql-connector-python not found. Falling back to SQLite.")
                self.db_type = "sqlite"
            return

        if self.db_type == "sqlite":
            return

        if HAS_MYSQL:
            try:
                conn = mysql.connector.connect(
                    host=os.getenv("DB_HOST", "localhost"),
                    user=os.getenv("DB_USER", "root"),
                    password=os.getenv("DB_PASS", ""),
                    connection_timeout=2
                )
                conn.close()
                self.db_type = "mysql"
                print("[Database] Connected to MySQL successfully.")
                return
            except Exception:
                pass

        self.db_type = "sqlite"
        print(f"[Database] Using zero-config local SQLite database at: {self.sqlite_path}")

    def get_raw_connection(self):
        if self.db_type == "mysql":
            return mysql.connector.connect(
                host=os.getenv("DB_HOST", "localhost"),
                database=os.getenv("DB_NAME", "prakruthi"),
                user=os.getenv("DB_USER", "root"),
                password=os.getenv("DB_PASS", "")
            )
        else:
            conn = sqlite3.connect(self.sqlite_path, timeout=10)
            conn.row_factory = sqlite3.Row
            return conn

    def init_schema(self):
        if self.db_type == "mysql":
            try:
                root_conn = mysql.connector.connect(
                    host=os.getenv("DB_HOST", "localhost"),
                    user=os.getenv("DB_USER", "root"),
                    password=os.getenv("DB_PASS", "")
                )
                r_cur = root_conn.cursor()
                r_cur.execute(f"CREATE DATABASE IF NOT EXISTS {os.getenv('DB_NAME', 'prakruthi')} CHARACTER SET utf8mb4")
                root_conn.close()

                conn = self.get_raw_connection()
                cur = conn.cursor()
                cur.execute("""CREATE TABLE IF NOT EXISTS dishes (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name_en VARCHAR(100), name_te VARCHAR(100), name_hi VARCHAR(100),
                    cuisine VARCHAR(30), veg TINYINT, price INT, ingredients TEXT,
                    img VARCHAR(50), available TINYINT DEFAULT 1, bestseller TINYINT DEFAULT 0,
                    INDEX(cuisine, veg)
                )""")
                cur.execute("""CREATE TABLE IF NOT EXISTS orders (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100), phone VARCHAR(20), address TEXT,
                    order_type VARCHAR(20) DEFAULT 'dinein',
                    payment VARCHAR(40), total INT,
                    discount INT DEFAULT 0, coupon_code VARCHAR(30) DEFAULT '',
                    status VARCHAR(20) DEFAULT 'New',
                    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP, INDEX(created)
                )""")
                cur.execute("""CREATE TABLE IF NOT EXISTS order_items (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    order_id INT, dish_id INT, qty INT, price INT,
                    INDEX(order_id), FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE,
                    FOREIGN KEY(dish_id) REFERENCES dishes(id)
                )""")
                cur.execute("""CREATE TABLE IF NOT EXISTS reservations (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100), phone VARCHAR(20), guests INT,
                    res_date VARCHAR(20), res_time VARCHAR(20), notes TEXT,
                    status VARCHAR(20) DEFAULT 'Confirmed',
                    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )""")
                cur.execute("""CREATE TABLE IF NOT EXISTS coupons (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    code VARCHAR(30) UNIQUE, discount_type VARCHAR(10),
                    discount_val INT, min_order INT, active TINYINT DEFAULT 1
                )""")
                cur.execute("""CREATE TABLE IF NOT EXISTS reviews (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100), dish_name VARCHAR(100), rating INT,
                    comment TEXT, status VARCHAR(20) DEFAULT 'Approved',
                    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )""")
                cur.execute("""CREATE TABLE IF NOT EXISTS specials (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    type VARCHAR(20) DEFAULT 'today',
                    dish_id INT, day_of_week INT DEFAULT NULL,
                    label VARCHAR(100) DEFAULT '',
                    active TINYINT DEFAULT 1,
                    FOREIGN KEY(dish_id) REFERENCES dishes(id)
                )""")
                conn.commit()

                try:
                    cur.execute("ALTER TABLE orders ADD COLUMN discount INT DEFAULT 0")
                    cur.execute("ALTER TABLE orders ADD COLUMN coupon_code VARCHAR(30) DEFAULT ''")
                    conn.commit()
                except Exception:
                    pass

                cur.execute("SELECT COUNT(*) FROM dishes")
                if cur.fetchone()[0] == 0:
                    cur.executemany("""INSERT INTO dishes
                        (name_en, name_te, name_hi, cuisine, veg, price, ingredients, img, bestseller, available)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, 1)""", SEED_DISHES)
                    conn.commit()

                cur.execute("SELECT COUNT(*) FROM coupons")
                if cur.fetchone()[0] == 0:
                    cur.executemany("INSERT INTO coupons (code, discount_type, discount_val, min_order, active) VALUES (%s, %s, %s, %s, %s)", SEED_COUPONS)
                    conn.commit()

                cur.execute("SELECT COUNT(*) FROM reviews")
                if cur.fetchone()[0] == 0:
                    cur.executemany("INSERT INTO reviews (name, dish_name, rating, comment, status) VALUES (%s, %s, %s, %s, %s)", SEED_REVIEWS)
                    conn.commit()

                cur.close()
                conn.close()
            except Exception as e:
                print(f"[Database Error during MySQL init]: {e}. Falling back to SQLite.")
                self.db_type = "sqlite"
                self.init_schema()
        else:
            conn = self.get_raw_connection()
            cur = conn.cursor()
            cur.execute("""CREATE TABLE IF NOT EXISTS dishes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name_en TEXT, name_te TEXT, name_hi TEXT,
                cuisine TEXT, veg INTEGER, price INTEGER, ingredients TEXT,
                img TEXT, available INTEGER DEFAULT 1, bestseller INTEGER DEFAULT 0
            )""")
            cur.execute("""CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT, phone TEXT, address TEXT,
                order_type TEXT DEFAULT 'dinein',
                payment TEXT, total INTEGER,
                discount INTEGER DEFAULT 0, coupon_code TEXT DEFAULT '',
                status TEXT DEFAULT 'New',
                created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )""")
            cur.execute("""CREATE TABLE IF NOT EXISTS order_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                order_id INTEGER, dish_id INTEGER, qty INTEGER, price INTEGER,
                FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE,
                FOREIGN KEY(dish_id) REFERENCES dishes(id)
            )""")
            cur.execute("""CREATE TABLE IF NOT EXISTS reservations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT, phone TEXT, guests INTEGER,
                res_date TEXT, res_time TEXT, notes TEXT,
                status TEXT DEFAULT 'Confirmed',
                created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )""")
            cur.execute("""CREATE TABLE IF NOT EXISTS coupons (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                code TEXT UNIQUE, discount_type TEXT,
                discount_val INTEGER, min_order INTEGER, active INTEGER DEFAULT 1
            )""")
            cur.execute("""CREATE TABLE IF NOT EXISTS reviews (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT, dish_name TEXT, rating INTEGER,
                comment TEXT, status TEXT DEFAULT 'Approved',
                created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )""")
            cur.execute("""CREATE TABLE IF NOT EXISTS specials (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                type TEXT DEFAULT 'today',
                dish_id INTEGER,
                day_of_week INTEGER DEFAULT NULL,
                label TEXT DEFAULT '',
                active INTEGER DEFAULT 1,
                FOREIGN KEY(dish_id) REFERENCES dishes(id)
            )""")
            conn.commit()

            # Migrations
            for col_sql in [
                "ALTER TABLE orders ADD COLUMN discount INTEGER DEFAULT 0",
                "ALTER TABLE orders ADD COLUMN coupon_code TEXT DEFAULT ''"
            ]:
                try:
                    cur.execute(col_sql)
                except Exception:
                    pass
            conn.commit()

            cur.execute("SELECT COUNT(*) FROM dishes")
            if cur.fetchone()[0] == 0:
                cur.executemany("""INSERT INTO dishes
                    (name_en, name_te, name_hi, cuisine, veg, price, ingredients, img, bestseller, available)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)""", SEED_DISHES)
                conn.commit()

            cur.execute("SELECT COUNT(*) FROM coupons")
            if cur.fetchone()[0] == 0:
                cur.executemany("INSERT INTO coupons (code, discount_type, discount_val, min_order, active) VALUES (?, ?, ?, ?, ?)", SEED_COUPONS)
                conn.commit()

            cur.execute("SELECT COUNT(*) FROM reviews")
            if cur.fetchone()[0] == 0:
                cur.executemany("INSERT INTO reviews (name, dish_name, rating, comment, status) VALUES (?, ?, ?, ?, ?)", SEED_REVIEWS)
                conn.commit()

            cur.close()
            conn.close()

    def query(self, sql, params=(), one=False):
        conn = self.get_raw_connection()
        try:
            if self.db_type == "mysql":
                cur = conn.cursor(dictionary=True)
                cur.execute(sql, params)
                res = cur.fetchone() if one else cur.fetchall()
                cur.close()
                return res
            else:
                sqlite_sql = sql.replace("%s", "?")
                cur = conn.cursor()
                cur.execute(sqlite_sql, params)
                if one:
                    row = cur.fetchone()
                    return dict(row) if row else None
                else:
                    rows = cur.fetchall()
                    return [dict(r) for r in rows]
        finally:
            conn.close()

    def execute(self, sql, params=()):
        conn = self.get_raw_connection()
        try:
            if self.db_type == "mysql":
                cur = conn.cursor()
                cur.execute(sql, params)
                conn.commit()
                last_id = cur.lastrowid
                cur.close()
                return last_id
            else:
                sqlite_sql = sql.replace("%s", "?")
                cur = conn.cursor()
                cur.execute(sqlite_sql, params)
                conn.commit()
                last_id = cur.lastrowid
                cur.close()
                return last_id
        finally:
            conn.close()

    def executemany(self, sql, list_of_params):
        conn = self.get_raw_connection()
        try:
            if self.db_type == "mysql":
                cur = conn.cursor()
                cur.executemany(sql, list_of_params)
                conn.commit()
                cur.close()
            else:
                sqlite_sql = sql.replace("%s", "?")
                cur = conn.cursor()
                cur.executemany(sqlite_sql, list_of_params)
                conn.commit()
                cur.close()
        finally:
            conn.close()

# Singleton DB instance
db = DatabaseManager()
