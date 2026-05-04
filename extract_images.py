import urllib.request
import re

url = "https://crystalgroup.in/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    images = re.findall(r'https://[^"\s<>\[\]]+\.(?:jpg|png|webp|jpeg)', html)
    unique_images = list(set(images))
    for img in unique_images:
        if 'certi' not in img and 'logo' not in img:
            print(img)
except Exception as e:
    print("Failed:", e)
