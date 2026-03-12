import os
import sys
import subprocess
from pathlib import Path

# ── Install Pillow if not already installed ──────────────────────────
try:
    from PIL import Image
except ImportError:
    print("Pillow not found. Installing...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    import importlib
    PIL = importlib.import_module("PIL")
    Image = importlib.import_module("PIL.Image").Image
    # Re-assign for consistent usage
    from PIL import Image


# ── Configuration ────────────────────────────────────────────────────
PUBLIC_DIR   = Path(__file__).parent / "public"   # scans public/ folder
PNG_QUALITY  = 85                                  # PNG re-save quality
WEBP_QUALITY = 85                                  # WebP export quality
WEBP_METHOD  = 6                                   # 0=fast, 6=best compression


def format_size(bytes_size):
    """Return human-readable file size."""
    if bytes_size < 1024:
        return f"{bytes_size} B"
    elif bytes_size < 1024 * 1024:
        return f"{bytes_size / 1024:.1f} KB"
    else:
        return f"{bytes_size / (1024 * 1024):.2f} MB"


def compress_png(png_path: Path) -> tuple[int, int]:
    """
    Re-save PNG with optimization.
    Returns (original_size, new_size) in bytes.
    """
    original_size = png_path.stat().st_size

    with Image.open(png_path) as img:
        # Convert to RGBA if needed (preserves transparency)
        if img.mode not in ("RGBA", "RGB", "P"):
            img = img.convert("RGBA")
        img.save(
            png_path,
            format="PNG",
            optimize=True,
            quality=PNG_QUALITY,
        )

    new_size = png_path.stat().st_size
    return original_size, new_size


def convert_to_webp(png_path: Path) -> tuple[int, int]:
    """
    Convert PNG to WebP and save alongside original.
    Returns (png_size, webp_size) in bytes.
    """
    webp_path = png_path.with_suffix(".webp")
    png_size  = png_path.stat().st_size

    with Image.open(png_path) as img:
        # Convert to RGBA for WebP (supports transparency)
        if img.mode not in ("RGBA", "RGB"):
            img = img.convert("RGBA")
        img.save(
            webp_path,
            format="WEBP",
            quality=WEBP_QUALITY,
            method=WEBP_METHOD,
        )

    webp_size = webp_path.stat().st_size
    return png_size, webp_size


def main():
    if not PUBLIC_DIR.exists():
        print(f"\n❌  ERROR: '{PUBLIC_DIR}' folder not found.")
        print("    Make sure you run this script from the project root.")
        sys.exit(1)

    # Find all PNGs recursively
    png_files = sorted(PUBLIC_DIR.rglob("*.png"))

    if not png_files:
        print(f"\n⚠️  No PNG files found inside '{PUBLIC_DIR}'.")
        print("    Add your images to public/images/ and run again.")
        sys.exit(0)

    print("\n" + "=" * 65)
    print("  🖼️   SAVORY BISTRO — IMAGE OPTIMIZER")
    print("=" * 65)
    print(f"  Found {len(png_files)} PNG file(s) in '{PUBLIC_DIR.name}/'")
    print("=" * 65 + "\n")

    total_png_original  = 0
    total_png_new       = 0
    total_webp_size     = 0
    processed           = 0
    errors              = []

    for png_path in png_files:
        relative = png_path.relative_to(Path(__file__).parent)
        print(f"  📄  {relative}")

        try:
            # ── Step 1: Compress PNG ──────────────────────────────
            orig_size, comp_size = compress_png(png_path)
            png_saving    = orig_size - comp_size
            png_saving_pct = (png_saving / orig_size * 100) if orig_size > 0 else 0

            print(f"      PNG  │ {format_size(orig_size):>10}  →  {format_size(comp_size):>10}"
                  f"  │  saved {format_size(png_saving)} ({png_saving_pct:.1f}%)")

            # ── Step 2: Convert to WebP ───────────────────────────
            _, webp_size = convert_to_webp(png_path)
            webp_saving     = orig_size - webp_size
            webp_saving_pct = (webp_saving / orig_size * 100) if orig_size > 0 else 0
            webp_path       = png_path.with_suffix(".webp")
            webp_relative   = webp_path.relative_to(Path(__file__).parent)

            print(f"      WebP │ {format_size(orig_size):>10}  →  {format_size(webp_size):>10}"
                  f"  │  saved {format_size(webp_saving)} ({webp_saving_pct:.1f}%)  ✅  {webp_relative}")

            total_png_original += orig_size
            total_png_new      += comp_size
            total_webp_size    += webp_size
            processed          += 1

        except Exception as e:
            print(f"      ❌  ERROR: {e}")
            errors.append((relative, str(e)))

        print()

    # ── Summary ───────────────────────────────────────────────────────
    print("=" * 65)
    print("  📊  SUMMARY")
    print("=" * 65)
    print(f"  Files processed      : {processed} / {len(png_files)}")
    print(f"  Original total size  : {format_size(total_png_original)}")
    print(f"  Compressed PNG total : {format_size(total_png_new)}"
          f"  (saved {format_size(total_png_original - total_png_new)})")
    print(f"  WebP total size      : {format_size(total_webp_size)}"
          f"  (saved {format_size(total_png_original - total_webp_size)} vs original PNGs)")

    if total_png_original > 0:
        overall_pct = (total_png_original - total_webp_size) / total_png_original * 100
        print(f"  Overall WebP saving  : {overall_pct:.1f}% smaller than original PNGs")

    if errors:
        print(f"\n  ⚠️   {len(errors)} file(s) had errors:")
        for path, msg in errors:
            print(f"       • {path}: {msg}")

    print("=" * 65)
    print()
    print("  ✅  Done! Your WebP files are ready.")
    print("  ℹ️   Update your React components to use .webp instead of .png")
    print("      Example:  <img src='/images/hero.webp' alt='...' />")
    print()


if __name__ == "__main__":
    main()
