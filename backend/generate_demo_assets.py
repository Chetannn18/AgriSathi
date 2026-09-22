from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

out_dir = Path(r"C:\Users\Suhani\.gemini\antigravity-ide\scratch\agrisathi\frontend\public\assets\demo")
out_dir.mkdir(parents=True, exist_ok=True)

crops_data = [
    {
        "name": "leaf_tomato",
        "title": "Tomato - Early Blight",
        "bg": (28, 48, 38),
        "leaf_color": (45, 106, 79),
        "spot_type": "rings"
    },
    {
        "name": "leaf_tomato_healed",
        "title": "Tomato - Day 7 (Healed/Controlled)",
        "bg": (28, 48, 38),
        "leaf_color": (82, 183, 136),
        "spot_type": "healed"
    },
    {
        "name": "leaf_potato",
        "title": "Potato - Late Blight",
        "bg": (30, 42, 46),
        "leaf_color": (52, 90, 75),
        "spot_type": "water_soaked"
    },
    {
        "name": "leaf_rice",
        "title": "Rice - Blast Disease",
        "bg": (35, 45, 30),
        "leaf_color": (60, 110, 60),
        "spot_type": "spindle"
    },
    {
        "name": "leaf_cotton",
        "title": "Cotton - Pink Bollworm",
        "bg": (42, 38, 30),
        "leaf_color": (70, 100, 65),
        "spot_type": "pest_chew"
    },
    {
        "name": "leaf_chilli",
        "title": "Chilli - Leaf Curl Virus",
        "bg": (32, 40, 35),
        "leaf_color": (55, 95, 60),
        "spot_type": "curl"
    },
    {
        "name": "leaf_wheat",
        "title": "Wheat - Yellow Rust",
        "bg": (45, 42, 32),
        "leaf_color": (75, 115, 65),
        "spot_type": "yellow_stripes"
    },
    {
        "name": "leaf_maize",
        "title": "Maize - Fall Armyworm",
        "bg": (38, 42, 36),
        "leaf_color": (60, 105, 55),
        "spot_type": "whorl_chew"
    },
    {
        "name": "leaf_soybean",
        "title": "Soybean - Yellow Mosaic",
        "bg": (36, 44, 38),
        "leaf_color": (65, 115, 65),
        "spot_type": "mosaic"
    }
]

for item in crops_data:
    im = Image.new("RGB", (640, 480), color=item["bg"])
    draw = ImageDraw.Draw(im)

    # Draw leaf base ellipse
    if item["name"] == "leaf_rice":
        # Narrow blade
        draw.polygon([(320, 40), (280, 240), (300, 440), (340, 440), (360, 240)], fill=item["leaf_color"])
        draw.line([(320, 50), (320, 440)], fill=(116, 198, 157), width=3)
    else:
        draw.ellipse([160, 60, 480, 420], fill=item["leaf_color"])
        draw.line([(320, 70), (320, 410)], fill=(116, 198, 157), width=3)
        draw.line([(320, 180), (210, 140)], fill=(82, 183, 136), width=2)
        draw.line([(320, 240), (430, 200)], fill=(82, 183, 136), width=2)
        draw.line([(320, 300), (230, 280)], fill=(82, 183, 136), width=2)

    # Disease spot patterns
    st = item["spot_type"]
    if st == "rings":
        # Target spot rings
        draw.ellipse([240, 190, 340, 290], fill=(221, 161, 94))
        draw.ellipse([250, 200, 330, 280], fill=(88, 47, 14), outline=(43, 23, 4), width=3)
        draw.ellipse([270, 220, 310, 260], fill=(43, 23, 4))
        draw.ellipse([285, 235, 295, 245], fill=(15, 10, 5))
        # Small spot
        draw.ellipse([360, 140, 410, 190], fill=(221, 161, 94))
        draw.ellipse([370, 150, 400, 180], fill=(88, 47, 14))
    elif st == "healed":
        draw.ellipse([260, 210, 320, 270], fill=(140, 110, 70), outline=(82, 183, 136), width=4)
        draw.text((220, 300), "Treated - Lesions Dry", fill=(184, 219, 201))
    elif st == "water_soaked":
        draw.ellipse([220, 120, 360, 260], fill=(30, 25, 20), outline=(200, 215, 210), width=3)
        draw.ellipse([340, 220, 440, 320], fill=(40, 30, 25))
    elif st == "spindle":
        draw.polygon([(320, 160), (300, 200), (320, 240), (340, 200)], fill=(180, 180, 180), outline=(139, 0, 0))
        draw.polygon([(320, 260), (305, 290), (320, 320), (335, 290)], fill=(180, 180, 180), outline=(139, 0, 0))
    elif st == "yellow_stripes":
        for x in (305, 315, 325, 335):
            draw.line([(x, 100), (x, 380)], fill=(255, 215, 0), width=4)
    else:
        draw.ellipse([250, 180, 350, 280], fill=(188, 108, 37), outline=(130, 70, 20), width=3)

    # Diagnostic header badge
    draw.rectangle([20, 20, 340, 60], fill=(20, 54, 40), outline=(82, 183, 136))
    draw.text((32, 32), item["title"], fill=(255, 255, 255))

    # Save JPG
    jpg_path = out_dir / f"{item['name']}.jpg"
    im.save(jpg_path, quality=92)

print("Demo leaf images generated successfully!")
