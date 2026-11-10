# 🍽️ Prakruthi Restaurant Web Application

An elegant, full-featured restaurant web application built with Python (Flask), modern vanilla JavaScript, responsive CSS, and a dual-engine database layer (SQLite & MySQL).

---

## ✨ Features

### 🌟 Customer Experience
- **Luxury Dining Aesthetics**: Custom atmospheric background using the restaurant's authentic interior with ambient golden lighting and hanging brass bells.
- **Multilingual Support**: Instant toggle between **English**, **Telugu (తెలుగు)**, and **Hindi (हिंदी)**.
- **Cuisine & Dietary Filters**: Filter effortlessly by Indian vs Chinese, or Pure Veg vs Non-Veg.
- **Instant Search**: Real-time dish and ingredient search with dish count counter.
- **Interactive Dish Modal**: High-res food photography, ingredient badges, and spice profile.
- **Dine-In, Takeaway & Delivery**: Order type switcher with Table Number, pickup notes, or delivery address.
- **UPI QR Code Payment**: Dynamic UPI QR code generator compatible with PhonePe, Google Pay, and Paytm.
- **Live Order Tracking**: 4-stage visual timeline (`Order Received` ➔ `Kitchen Cooking` ➔ `Served/Delivered`) with real-time status polling.
- **Table Reservation System**: Online table booking (guests, date, preferred time slot, special requests) with instant booking confirmation.

### 🛡️ Admin & Kitchen Management Portal (`/admin`)
- **Direct Navigation**: Convenient Staff/Admin link in the header and footer.
- **Secure Authentication**: Protected dashboard with custom credentials.
- **Live Orders Queue**: Filter orders by status (*New*, *Preparing*, *Delivered*, *Cancelled*) with live search.
- **One-Click Kitchen Actions**: Single-click status transitions (Start Cooking, Deliver, Cancel).
- **Sound Alerts**: Audible bell chime and browser title alert on new incoming orders.
- **Printable Kitchen Order Ticket (KOT) & Bill**: Instant print-ready receipt for kitchen staff and customer billing.
- **Menu Management**: Add new dishes, edit prices, upload photos, and toggle In-Stock / Out-of-Stock (Show / Hide).
- **Table Bookings Tab**: Manage and seat table reservations.
- **Live Analytics Overview**: Gross revenue, total orders, pending orders, and total bookings.

---

## 🚀 Quick Start (Local Development)

### 1. Requirements
- Python 3.9+
- Pip

### 2. Installation
Open your terminal in the project directory:
```bash
pip install -r requirements.txt
```

### 3. Run the Application
```bash
python app.py
```
> **Zero Setup**: The application comes configured with **SQLite** by default (`prakruthi.db`). All 50 dishes and database tables are auto-seeded on first run! No MySQL server required for local testing.

Visit:
- **Public Website**: [http://localhost:5000](http://localhost:5000)
- **Admin Portal**: [http://localhost:5000/admin/login](http://localhost:5000/admin/login)
  - Default Username: `admin`
  - Default Password: `admin123`

---

## 🗄️ Database Management

The app features a **dual-engine database layer** (`db.py`):

| Mode | When to use | Configuration |
|---|---|---|
| **SQLite (Default)** | Zero-config local development, lightweight cloud deploys | Automatically used if MySQL is not detected. Data stored in `prakruthi.db`. |
| **MySQL** | Production scale, multi-server hosting, AWS RDS, PlanetScale | Set `DB_TYPE=mysql` and provide host/user/pass in environment variables. |

### How to Switch to MySQL
1. Ensure your MySQL server is running (e.g., via XAMPP, MySQL Workbench, or cloud database).
2. Set the environment variables (in `.env` or system environment):
   ```bash
   DB_TYPE=mysql
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=your_password
   DB_NAME=prakruthi
   ```
3. Run `python seed.py` or start `python app.py`. The app will create the `prakruthi` database and tables automatically.

### Managing & Backing Up Your Database
- **SQLite**:
  - The database is a single file: `prakruthi.db`.
  - To backup: Simply copy `prakruthi.db` to a backup folder.
  - To inspect/edit: Open with free tools like [DB Browser for SQLite](https://sqlitebrowser.org/) or [DBeaver](https://dbeaver.io/).
- **MySQL**:
  - Backup: Run `mysqldump -u root -p prakruthi > backup.sql`.
  - Restore: Run `mysql -u root -p prakruthi < backup.sql`.
  - UI tools: phpMyAdmin (XAMPP) or MySQL Workbench.

---

## ☁️ Deployment Guide

### Option 1: Render.com (Recommended Free / Low-Cost Cloud)
1. Push your repository to **GitHub**.
2. Go to [render.com](https://render.com) and create a free account.
3. Click **New +** ➔ **Web Service**.
4. Connect your GitHub repository.
5. Set:
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
6. Under **Environment Variables**, add:
   - `SECRET_KEY`: (Enter a random strong key)
   - `ADMIN_USER`: `admin`
   - `ADMIN_PASS`: (Choose a strong password)
   - `DB_TYPE`: `sqlite` (or configure MySQL connection strings)
7. Click **Deploy Web Service**!

### Option 2: Railway.app (With MySQL Database Included)
1. Go to [railway.app](https://railway.app) and create a project.
2. Click **New** ➔ **Database** ➔ **Add MySQL**.
3. Click **New** ➔ **GitHub Repo** and select this repository.
4. Railway will automatically link MySQL variables (`MYSQLHOST`, `MYSQLUSER`, `MYSQLPASSWORD`, etc.).
5. Set `DB_TYPE=mysql` in variables and deploy!

### Option 3: PythonAnywhere (Easiest for Beginners)
1. Sign up at [pythonanywhere.com](https://www.pythonanywhere.com).
2. Upload the project files into a folder (e.g. `/home/yourusername/prakruthi`).
3. Under the **Web** tab, click **Add a new web app** ➔ **Flask** ➔ **Python 3.10+**.
4. In the WSGI configuration file, point it to `from app import app as application`.
5. Under the **Databases** tab, initialize a free MySQL database, set credentials in `app.py` or environment, and reload!

### Option 4: Linux VPS (Ubuntu with Nginx & Gunicorn)
1. SSH into your VPS:
   ```bash
   sudo apt update && sudo apt install -y python3-pip python3-venv nginx
   git clone <your-repo> /var/www/prakruthi
   cd /var/www/prakruthi
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```
2. Create a systemd service `/etc/systemd/system/prakruthi.service`:
   ```ini
   [Unit]
   Description=Gunicorn Prakruthi Restaurant
   After=network.target

   [Service]
   User=www-data
   WorkingDirectory=/var/www/prakruthi
   ExecStart=/var/www/prakruthi/venv/bin/gunicorn --workers 3 --bind 127.0.0.1:5000 app:app

   [Install]
   WantedBy=multi-user.target
   ```
3. Start the service:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable --now prakruthi
   ```
4. Configure Nginx reverse proxy to forward port 80/443 to `http://127.0.0.1:5000`.

---

## 🔐 Credentials & Security
- Change `ADMIN_USER` and `ADMIN_PASS` in production via environment variables.
- Keep `SECRET_KEY` private and randomized in production environments.
