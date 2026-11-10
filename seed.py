import os, mysql.connector
c = mysql.connector.connect(host="localhost", user=os.getenv("DB_USER", "root"), password=os.getenv("DB_PASS", ""))
cur = c.cursor()
cur.execute("CREATE DATABASE IF NOT EXISTS prakruthi CHARACTER SET utf8mb4")
cur.execute("USE prakruthi")
cur.execute("""CREATE TABLE IF NOT EXISTS dishes(id INT AUTO_INCREMENT PRIMARY KEY,
 name_en VARCHAR(100), name_te VARCHAR(100), name_hi VARCHAR(100), cuisine VARCHAR(20),
 veg TINYINT, price INT, ingredients TEXT, img VARCHAR(50), INDEX(cuisine, veg))""")
cur.execute("""CREATE TABLE IF NOT EXISTS orders(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100),
 phone VARCHAR(20), address TEXT, payment VARCHAR(40), total INT, status VARCHAR(20) DEFAULT 'New',
 created TIMESTAMP DEFAULT CURRENT_TIMESTAMP, INDEX(created))""")
cur.execute("""CREATE TABLE IF NOT EXISTS order_items(id INT AUTO_INCREMENT PRIMARY KEY, order_id INT,
 dish_id INT, qty INT, price INT, INDEX(order_id), FOREIGN KEY(order_id) REFERENCES orders(id),
 FOREIGN KEY(dish_id) REFERENCES dishes(id))""")
cur.execute("SELECT COUNT(*) FROM dishes")
if cur.fetchone()[0] == 0:
    # (english, telugu, hindi, cuisine, veg(1/0), price, ingredients, image keyword)
    D = [
    ("Paneer Butter Masala","పన్నీర్ బటర్ మసాలా","पनीर बटर मसाला","Indian",1,240,"Paneer, Butter, Tomato, Cream, Cashew, Kasuri methi, Spices","paneer"),
    ("Dal Tadka","దాల్ తడ్కా","दाल तड़का","Indian",1,160,"Toor dal, Garlic, Cumin, Ghee, Tomato, Red chilli","dal"),
    ("Veg Biryani","వెజ్ బిర్యానీ","वेज बिरयानी","Indian",1,190,"Basmati rice, Mixed vegetables, Mint, Saffron, Biryani masala, Ghee","biryani"),
    ("Palak Paneer","పాలక్ పన్నీర్","पालक पनीर","Indian",1,230,"Spinach, Paneer, Garlic, Onion, Cream, Spices","palakpaneer"),
    ("Masala Dosa","మసాలా దోశ","मसाला डोसा","Indian",1,110,"Rice batter, Urad dal, Potato, Onion, Mustard seeds, Curry leaves","dosa"),
    ("Idli Sambar","ఇడ్లీ సాంబార్","इडली सांबर","Indian",1,80,"Rice, Urad dal, Toor dal, Drumstick, Tamarind, Sambar powder","idli"),
    ("Chole Bhature","ఛోలే భతూరే","छोले भटूरे","Indian",1,150,"Chickpeas, Maida, Yogurt, Onion, Tea leaves, Chole masala","chole"),
    ("Aloo Gobi","ఆలూ గోబీ","आलू गोभी","Indian",1,150,"Potato, Cauliflower, Turmeric, Cumin, Ginger, Coriander","cauliflower"),
    ("Veg Pulao","వెజ్ పులావ్","वेज पुलाव","Indian",1,170,"Basmati rice, Peas, Carrot, Beans, Whole spices, Ghee","pulao"),
    ("Pesarattu","పెసరట్టు","पेसरट्टू","Indian",1,100,"Green gram, Ginger, Green chilli, Onion, Upma, Cumin","pesarattu"),
    ("Gutti Vankaya Curry","గుత్తి వంకాయ కూర","गुट्टी वांगी करी","Indian",1,180,"Brinjal, Peanuts, Sesame, Coconut, Tamarind, Spices","brinjal"),
    ("Samosa","సమోసా","समोसा","Indian",1,60,"Potato, Peas, Maida, Cumin, Coriander, Garam masala","samosa"),
    ("Paneer Tikka","పన్నీర్ టిక్కా","पनीर टिक्का","Indian",1,220,"Paneer, Yogurt, Capsicum, Onion, Tikka masala, Lemon","paneertikka"),
    ("Veg Thali","వెజ్ థాలీ","वेज थाली","Indian",1,260,"Rice, Roti, Dal, Two curries, Curd, Papad, Sweet","thali"),
    ("Gulab Jamun","గులాబ్ జామున్","गुलाब जामुन","Indian",1,90,"Khoya, Milk powder, Sugar syrup, Cardamom, Rose water","gulabjamun"),
    ("Chicken Biryani","చికెన్ బిర్యానీ","चिकन बिरयानी","Indian",0,280,"Chicken, Basmati rice, Yogurt, Fried onion, Mint, Saffron, Biryani masala","chickenbiryani"),
    ("Mutton Biryani","మటన్ బిర్యానీ","मटन बिरयानी","Indian",0,380,"Mutton, Basmati rice, Yogurt, Fried onion, Mint, Whole spices","muttonbiryani"),
    ("Butter Chicken","బటర్ చికెన్","बटर चिकन","Indian",0,320,"Chicken, Butter, Tomato, Cream, Cashew, Kasuri methi","butterchicken"),
    ("Chicken Tikka","చికెన్ టిక్కా","चिकन टिक्का","Indian",0,290,"Chicken, Yogurt, Ginger garlic paste, Kashmiri chilli, Lemon","chickentikka"),
    ("Andhra Chicken Curry","ఆంధ్రా చికెన్ కర్రీ","आंध्रा चिकन करी","Indian",0,300,"Chicken, Red chilli, Onion, Coconut, Curry leaves, Poppy seeds","chickencurry"),
    ("Mutton Rogan Josh","మటన్ రోగన్ జోష్","मटन रोगन जोश","Indian",0,400,"Mutton, Kashmiri chilli, Yogurt, Fennel, Ginger, Cardamom","mutton"),
    ("Fish Fry","ఫిష్ ఫ్రై","फिश फ्राई","Indian",0,310,"Fish, Chilli powder, Turmeric, Lemon, Rice flour, Curry leaves","fishfry"),
    ("Prawns Masala","రొయ్యల మసాలా","प्रॉन्स मसाला","Indian",0,350,"Prawns, Onion, Tomato, Garlic, Coriander, Garam masala","prawns"),
    ("Egg Curry","ఎగ్ కర్రీ","अंडा करी","Indian",0,170,"Boiled eggs, Onion, Tomato, Ginger garlic, Turmeric, Coriander","eggcurry"),
    ("Tandoori Chicken","తందూరీ చికెన్","तंदूरी चिकन","Indian",0,340,"Chicken, Yogurt, Tandoori masala, Lemon, Ginger garlic, Butter","tandoori"),
    ("Chicken 65","చికెన్ 65","चिकन 65","Indian",0,260,"Chicken, Curry leaves, Green chilli, Corn flour, Yogurt, Red chilli","chicken65"),
    ("Chepala Pulusu","చేపల పులుసు","मछली पुलुसु","Indian",0,330,"Fish, Tamarind, Onion, Tomato, Red chilli, Fenugreek","fishcurry"),
    ("Veg Hakka Noodles","వెజ్ హక్కా నూడుల్స్","वेज हक्का नूडल्स","Chinese",1,150,"Noodles, Cabbage, Carrot, Capsicum, Soy sauce, Spring onion","noodles"),
    ("Veg Fried Rice","వెజ్ ఫ్రైడ్ రైస్","वेज फ्राइड राइस","Chinese",1,140,"Rice, Carrot, Beans, Cabbage, Soy sauce, Black pepper","friedrice"),
    ("Gobi Manchurian","గోబీ మంచూరియా","गोबी मंचूरियन","Chinese",1,170,"Cauliflower, Corn flour, Soy sauce, Garlic, Chilli sauce, Spring onion","manchurian"),
    ("Paneer Chilli","పన్నీర్ చిల్లీ","पनीर चिली","Chinese",1,210,"Paneer, Capsicum, Onion, Soy sauce, Green chilli, Garlic","paneerchilli"),
    ("Veg Manchow Soup","వెజ్ మంచౌ సూప్","वेज मंचाउ सूप","Chinese",1,110,"Mixed vegetables, Soy sauce, Garlic, Ginger, Fried noodles","soup"),
    ("Veg Spring Rolls","వెజ్ స్ప్రింగ్ రోల్స్","वेज स्प्रिंग रोल","Chinese",1,130,"Spring roll sheet, Cabbage, Carrot, Noodles, Soy sauce","springroll"),
    ("Veg Momos","వెజ్ మోమోస్","वेज मोमोज़","Chinese",1,120,"Maida, Cabbage, Carrot, Ginger, Garlic, Spicy chutney","momos"),
    ("Chilli Mushroom","చిల్లీ మష్రూమ్","चिली मशरूम","Chinese",1,190,"Mushroom, Capsicum, Onion, Soy sauce, Corn flour, Chilli sauce","mushroom"),
    ("Schezwan Fried Rice","షెజ్వాన్ ఫ్రైడ్ రైస్","शेज़वान फ्राइड राइस","Chinese",1,160,"Rice, Schezwan sauce, Cabbage, Carrot, Garlic, Spring onion","schezwanrice"),
    ("Sweet Corn Soup","స్వీట్ కార్న్ సూప్","स्वीट कॉर्न सूप","Chinese",1,100,"Sweet corn, Corn flour, Carrot, Black pepper, Spring onion","cornsoup"),
    ("Chicken Hakka Noodles","చికెన్ హక్కా నూడుల్స్","चिकन हक्का नूडल्स","Chinese",0,180,"Noodles, Chicken, Cabbage, Capsicum, Soy sauce, Spring onion","chickennoodles"),
    ("Chicken Fried Rice","చికెన్ ఫ్రైడ్ రైస్","चिकन फ्राइड राइस","Chinese",0,190,"Rice, Chicken, Egg, Beans, Soy sauce, Black pepper","chickenfriedrice"),
    ("Chilli Chicken","చిల్లీ చికెన్","चिली चिकन","Chinese",0,250,"Chicken, Capsicum, Onion, Soy sauce, Green chilli, Corn flour","chillichicken"),
    ("Chicken Manchurian","చికెన్ మంచూరియా","चिकन मंचूरियन","Chinese",0,240,"Chicken, Soy sauce, Garlic, Ginger, Corn flour, Spring onion","chickenmanchurian"),
    ("Chicken Schezwan Noodles","చికెన్ షెజ్వాన్ నూడుల్స్","चिकन शेज़वान नूडल्स","Chinese",0,200,"Noodles, Chicken, Schezwan sauce, Cabbage, Garlic","schezwannoodles"),
    ("Chicken Momos","చికెన్ మోమోస్","चिकन मोमोज़","Chinese",0,150,"Maida, Minced chicken, Ginger, Garlic, Spring onion, Chutney","chickenmomos"),
    ("Chicken Sweet Corn Soup","చికెన్ స్వీట్ కార్న్ సూప్","चिकन स्वीट कॉर्न सूप","Chinese",0,130,"Chicken, Sweet corn, Egg, Corn flour, Black pepper","chickensoup"),
    ("Chicken Lollipop","చికెన్ లాలీపాప్","चिकन लॉलीपॉप","Chinese",0,270,"Chicken wings, Soy sauce, Corn flour, Garlic, Chilli sauce","lollipop"),
    ("Garlic Prawns","గార్లిక్ ప్రాన్స్","गार्लिक प्रॉन्स","Chinese",0,340,"Prawns, Garlic, Butter, Soy sauce, Chilli flakes, Spring onion","garlicprawns"),
    ("Egg Fried Rice","ఎగ్ ఫ్రైడ్ రైస్","एग फ्राइड राइस","Chinese",0,150,"Rice, Egg, Spring onion, Soy sauce, Black pepper, Garlic","eggfriedrice"),
    ("Dragon Chicken","డ్రాగన్ చికెన్","ड्रैगन चिकन","Chinese",0,280,"Chicken, Cashew, Capsicum, Dry red chilli, Soy sauce, Garlic","dragonchicken"),
    ("Fish in Hot Garlic Sauce","ఫిష్ హాట్ గార్లిక్ సాస్","फिश हॉट गार्लिक सॉस","Chinese",0,320,"Fish, Garlic, Soy sauce, Chilli sauce, Vinegar, Spring onion","fishgarlic"),
    ("Chicken Spring Rolls","చికెన్ స్ప్రింగ్ రోల్స్","चिकन स्प्रिंग रोल","Chinese",0,170,"Spring roll sheet, Chicken, Cabbage, Carrot, Soy sauce","chickenroll"),
    ]
    cur.executemany("INSERT INTO dishes(name_en,name_te,name_hi,cuisine,veg,price,ingredients,img) VALUES(%s,%s,%s,%s,%s,%s,%s,%s)", D)
    c.commit()
cur.execute("SELECT COUNT(*) FROM dishes")
print("Done. Dishes in DB:", cur.fetchone()[0])
