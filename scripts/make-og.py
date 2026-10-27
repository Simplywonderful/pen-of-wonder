"""Draws each world's Open Graph image as SVG, in the style of research's: parchment, the name in
Fraunces with the gold ink drop, a line on what the world does, and a band in the world's accent.
Type is converted to outlines from the brand's own subset WOFF2 files (packages/brand/public/fonts),
so the image looks the same everywhere. Research keeps the image it already has.
Run scripts/make-og.mjs afterwards to rasterise them into each app's public/og.png.

Usage: python scripts/make-og.py   (needs fontTools and brotli)
"""
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
FONTS = ROOT / "packages" / "brand" / "public" / "fonts"

# Brand colours and approved world accents. The canonical values live in packages/brand/tokens.css;
# an image can't read CSS, so these are the same hex values written out for drawing.
PARCHMENT = "#EDEEE7"
INK_GREEN = "#0F433B"
DEEP_INK = "#1B2420"
QUILL_GREY = "#5B6661"
WIN_GOLD = "#A5701F"
RULE = "#D2D5CB"

WORLDS = {
    "main": ("Pen of Wonder", None, "Words that make you win.", "Marketing, writing, research and publishing · Ibadan, Nigeria", INK_GREEN),
    "marketing": ("Pen of Wonder", "Marketing", "Profitable ads, run like experiments.", "Paid ads on Meta, LinkedIn, TikTok and X · Ibadan, Nigeria", "#A82571"),
    "writing": ("Pen of Wonder", "Writing", "CVs, grant applications and business plans.", "Opening soon · Ibadan, Nigeria", "#5D600A"),
    "publishing": ("Pen of Wonder", "Publishing", "Books children want to read.", "The Hidden Treasures readers and book services · opening soon", "#8F4710"),
    "dev": ("Pen of Wonder", "Dev", "Websites and business systems.", "Opening soon · join the waitlist on WhatsApp", "#534F4A"),
}


def text_path(font, text, x, y, size, tracking=0.0):
    """Returns an SVG path for text with its baseline at (x, y), and the advance width."""
    glyph_set = font.getGlyphSet()
    cmap = font.getBestCmap()
    scale = size / font["head"].unitsPerEm
    pen = SVGPathPen(glyph_set)
    cursor = 0.0
    for ch in text:
        name = cmap.get(ord(ch))
        if name is None:
            continue
        glyph = glyph_set[name]
        glyph.draw(TransformPen(pen, (scale, 0, 0, -scale, x + cursor, y)))
        cursor += glyph.width * scale + tracking * size
    return pen.getCommands(), cursor


def drop(cx, top, height):
    """The brand's ink drop, scaled from Brand/Icons/pow-drop-icon.svg."""
    s = height / 237.8
    return (
        f"M{cx} {top}"
        f"C{cx + 45.1 * s:.1f} {top + 82 * s:.1f} {cx + 82 * s:.1f} {top + 114.8 * s:.1f} {cx + 82 * s:.1f} {top + 155.8 * s:.1f}"
        f"A{82 * s:.1f} {82 * s:.1f} 0 1 1 {cx - 82 * s:.1f} {top + 155.8 * s:.1f}"
        f"C{cx - 82 * s:.1f} {top + 114.8 * s:.1f} {cx - 45.1 * s:.1f} {top + 82 * s:.1f} {cx} {top}Z"
    )


def main():
    display = TTFont(FONTS / "fraunces-latin.woff2")
    body = TTFont(FONTS / "inter-latin.woff2")
    out = ROOT / "scripts" / "og"
    out.mkdir(exist_ok=True)
    left = 96
    for world, (line1_text, line2_text, sub_text, place_text, accent) in WORLDS.items():
        line1, w1 = text_path(display, line1_text, left, 300 if line2_text else 360, 108, -0.02)
        parts = [f'<path d="{line1}" fill="{INK_GREEN}"/>']
        last_width, drop_top = w1, 298 if not line2_text else 352
        if line2_text:
            line2, w2 = text_path(display, line2_text, left, 414, 108, -0.02)
            parts.append(f'<path d="{line2}" fill="{INK_GREEN}"/>')
            last_width = w2
        sub, _ = text_path(body, sub_text, left, 494, 32)
        place, _ = text_path(body, place_text, left, 542, 26)
        svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="{PARCHMENT}"/>
  <rect width="1200" height="24" fill="{accent}"/>
  <path d="M{left} 150H1104M{left} 572H1104" stroke="{RULE}" stroke-width="2"/>
  {''.join(parts)}
  <path d="{drop(left + last_width + 34, drop_top, 62)}" fill="{WIN_GOLD}"/>
  <path d="{sub}" fill="{DEEP_INK}"/>
  <path d="{place}" fill="{QUILL_GREY}"/>
</svg>
"""
        (out / f"{world}.svg").write_text(svg, encoding="utf-8")
        print(f"Wrote scripts/og/{world}.svg")


if __name__ == "__main__":
    main()
