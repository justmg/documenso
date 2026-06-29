"""Process RIAC logo into PVD Sign branding assets."""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(
    r"C:\Users\mghaf\.cursor\projects\c-Users-mghaf-Desktop-Windsurf-documenso\assets"
    r"\c__Users_mghaf_AppData_Roaming_Cursor_User_workspaceStorage_6a3a622d43d9d17362f901d0e401ec2d_images_image-00ca9379-d2f9-459c-ae62-8b3e85fe5fe2.png"
)
OUT = ROOT / "packages" / "assets" / "images" / "pvd"
PUBLIC = ROOT / "apps" / "remix" / "public"


def remove_black_background(img: Image.Image, threshold: int = 30) -> Image.Image:
    img = img.convert("RGBA")
    pixels = img.load()
    width, height = img.size

    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if r <= threshold and g <= threshold and b <= threshold:
                pixels[x, y] = (r, g, b, 0)

    return img


def trim_transparent(img: Image.Image, padding: int = 8) -> Image.Image:
    bbox = img.getbbox()
    if not bbox:
        return img

    left, top, right, bottom = bbox
    left = max(0, left - padding)
    top = max(0, top - padding)
    right = min(img.width, right + padding)
    bottom = min(img.height, bottom + padding)
    return img.crop((left, top, right, bottom))


def save_favicons(icon: Image.Image) -> None:
    sizes = {
        "favicon-16x16.png": 16,
        "favicon-32x32.png": 32,
        "apple-touch-icon.png": 180,
        "android-chrome-192x192.png": 192,
        "android-chrome-512x512.png": 512,
    }

    for name, size in sizes.items():
        resized = icon.resize((size, size), Image.Resampling.LANCZOS)
        resized.save(PUBLIC / name, format="PNG", optimize=True)


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    source = Image.open(SRC)
    horizontal = trim_transparent(remove_black_background(source))
    horizontal.save(OUT / "logo-horizontal.png", format="PNG", optimize=True)

    # Icon mark: left ~32% of the horizontal logo (globe + plane + stars).
    icon_width = int(horizontal.width * 0.32)
    icon = horizontal.crop((0, 0, icon_width, horizontal.height))
    icon = trim_transparent(icon, padding=4)

    square_size = max(icon.width, icon.height)
    square = Image.new("RGBA", (square_size, square_size), (0, 0, 0, 0))
    offset = ((square_size - icon.width) // 2, (square_size - icon.height) // 2)
    square.paste(icon, offset, icon)
    square.save(OUT / "logo-icon.png", format="PNG", optimize=True)

    save_favicons(square)
    print(f"Wrote horizontal logo: {horizontal.size}")
    print(f"Wrote icon logo: {square.size}")


if __name__ == "__main__":
    main()
