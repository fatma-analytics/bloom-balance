from PIL import Image, ImageDraw, ImageFilter

SIZE = 1024
CENTER = (SIZE // 2, SIZE // 2)


def lerp(a, b, t):
    return int(a + (b - a) * t)


def blend(c1, c2, t):
    return tuple(lerp(a, b, t) for a, b in zip(c1, c2))


background = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 255))
pixels = background.load()

for y in range(SIZE):
    for x in range(SIZE):
        tx = x / (SIZE - 1)
        ty = y / (SIZE - 1)
        top = blend((232, 88, 151), (247, 204, 224), tx)
        bottom = blend((113, 54, 147), (244, 101, 166), tx)
        base = blend(top, bottom, ty)
        glow_strength = max(0.0, 1.0 - (((x - 240) ** 2 + (y - 180) ** 2) ** 0.5) / 700)
        glow = (255, 235, 243)
        final = tuple(min(255, int(base[i] + glow_strength * (glow[i] - base[i]) * 0.45)) for i in range(3))
        pixels[x, y] = (*final, 255)

background = background.filter(ImageFilter.GaussianBlur(radius=0.6))
canvas = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
draw = ImageDraw.Draw(canvas)

# soft orbital glow
for bbox, color in [
    ((80, 80, 944, 944), (255, 255, 255, 18)),
    ((120, 140, 900, 920), (255, 255, 255, 10)),
    ((180, 220, 860, 860), (255, 220, 240, 18)),
]:
    draw.ellipse(bbox, outline=color, width=10)

petals = [
    ([(512, 170), (430, 420), (512, 710), (594, 420)], (255, 241, 247, 255), (247, 198, 227, 255)),
    ([(335, 260), (280, 430), (390, 690), (495, 455)], (255, 195, 226, 245), (218, 99, 173, 255)),
    ([(690, 260), (535, 455), (640, 690), (745, 430)], (255, 195, 226, 245), (191, 103, 220, 255)),
    ([(215, 430), (220, 615), (395, 785), (435, 560)], (200, 94, 200, 235), (102, 42, 149, 255)),
    ([(809, 430), (589, 560), (629, 785), (804, 615)], (193, 117, 236, 225), (98, 37, 148, 255)),
]

for points, outer, inner in petals:
    draw.polygon(points, fill=outer)
    inner_points = []
    for px, py in points:
        inner_points.append((int((px + CENTER[0]) / 2), int((py + CENTER[1]) / 2)))
    draw.polygon(inner_points, fill=inner)

# base bloom shadows
for bbox, fill in [
    ((220, 585, 804, 915), (82, 26, 104, 110)),
    ((250, 610, 774, 930), (255, 185, 225, 60)),
]:
    draw.ellipse(bbox, fill=fill)

# central checkmark ribbon
check = [(300, 530), (436, 670), (744, 382), (814, 452), (437, 813), (224, 592)]
draw.polygon(check, fill=(255, 243, 238, 255))
draw.line([(300, 530), (436, 670), (744, 382)], fill=(255, 205, 186, 160), width=26)
draw.line([(224, 592), (437, 813), (814, 452)], fill=(103, 29, 101, 95), width=18)

# highlights
for bbox, fill in [
    ((380, 130, 650, 350), (255, 255, 255, 55)),
    ((120, 90, 400, 250), (255, 245, 250, 35)),
    ((620, 90, 920, 280), (255, 240, 252, 25)),
]:
    draw.ellipse(bbox, fill=fill)

sparkle = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
sparkle_draw = ImageDraw.Draw(sparkle)
for cx, cy, radius in [(695, 240, 16), (742, 204, 10), (660, 210, 8)]:
    sparkle_draw.line((cx - radius, cy, cx + radius, cy), fill=(255, 255, 255, 230), width=4)
    sparkle_draw.line((cx, cy - radius, cx, cy + radius), fill=(255, 255, 255, 230), width=4)
    sparkle_draw.ellipse((cx - 4, cy - 4, cx + 4, cy + 4), fill=(255, 255, 255, 240))

sparkle = sparkle.filter(ImageFilter.GaussianBlur(0.5))
canvas = Image.alpha_composite(canvas, sparkle)

icon = Image.alpha_composite(background, canvas).convert("RGBA")
icon.save("/home/ubuntu/bloom-balance/assets/images/icon.png")
icon.save("/home/ubuntu/bloom-balance/assets/images/splash-icon.png")
icon.save("/home/ubuntu/bloom-balance/assets/images/favicon.png")
icon.save("/home/ubuntu/bloom-balance/assets/images/android-icon-foreground.png")
