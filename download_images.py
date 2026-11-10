# Downloads one photo per dish from Wikimedia Commons (free, no key needed) into static/dishes.
import os, re, ast, json, time, urllib.request, urllib.parse
import urllib.error
def get(req, timeout, tries=5):
    for i in range(tries):
        try:
            return urllib.request.urlopen(req, timeout=timeout)
        except urllib.error.HTTPError as e:
            if e.code == 429 and i < tries - 1:
                print("   ...site says slow down, waiting 30 seconds")
                time.sleep(30)
            else:
                raise
UA = {"User-Agent": "PrakruthiRestaurantSite/1.0 (student project; python-urllib)"}
src = open("seed.py", encoding="utf-8").read()
D = ast.literal_eval(re.search(r"D = (\[.*?\n    \])\n", src, re.S).group(1))
os.makedirs("static/dishes", exist_ok=True)

def find(q):
    params = urllib.parse.urlencode({"action": "query", "format": "json", "generator": "search",
        "gsrnamespace": 6, "gsrlimit": 10, "gsrsearch": q + " filetype:bitmap",
        "prop": "imageinfo", "iiprop": "url|mime", "iiurlwidth": 600})
    req = urllib.request.Request("https://commons.wikimedia.org/w/api.php?" + params, headers=UA)
    data = json.load(get(req, 20))
    pages = sorted(data.get("query", {}).get("pages", {}).values(), key=lambda p: p.get("index", 0))
    for p in pages:
        ii = p["imageinfo"][0]
        if ii["mime"] == "image/jpeg":
            return ii.get("thumburl") or ii["url"], p["title"]
    return None, None

credits = open("static/dishes/credits.txt", "a", encoding="utf-8")
for d in D:
    path = f"static/dishes/{d[7]}.jpg"
    if os.path.exists(path):
        continue
    try:
        url, title = find(d[0]) 
        if not url:
            url, title = find(d[0] + " food")
        if not url:
            print("NOT FOUND", d[0]); continue
        img = get(urllib.request.Request(url, headers=UA), 30).read()
        open(path, "wb").write(img)
        credits.write(f"{d[7]}.jpg | {d[0]} | {title}\n"); credits.flush()
        print("ok    ", d[0])
    except Exception as e:
        print("FAILED", d[0], e)
    time.sleep(4)
print("Finished. Re-run the script to retry any FAILED / NOT FOUND dishes.")
