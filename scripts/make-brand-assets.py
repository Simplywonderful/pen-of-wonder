"""Draws the favicon and Open Graph image as SVG, with the type converted to outlines from the
site's own fonts so the images look the same everywhere. Run scripts/make-brand-assets.mjs
afterwards to rasterise them.

Usage: python scripts/make-brand-assets.py <SourceSerif4 variable TTF> <SourceSans3 variable TTF>
(the Google Fonts files: SourceSerif4[opsz,wght].ttf and SourceSans3[wght].ttf)
"""
import sys
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

PAPER = "#f9f6f0"
INK = "#2a241d"
MUTED = "#6a6157"
RULE = "#ddd6cb"
RED = "#b8322a"

OUT = Path(__file__).resolve().parent.parent / "public"


def load(path, **axes):
    return instantiateVariableFont(TTFont(path), axes)


def text_path(font, text, x, y, size, tracking=0.0):
    """Returns an SVG path for text with its baseline at (x, y), and the advance width."""
    glyph_set = font.getGlyphSet()
    cmap = font.getBestCmap()
    upm = font["head"].unitsPerEm
    scale = size / upm
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


def main(serif_path, sans_path):
    serif = load(serif_path, wght=600, opsz=60)
    serif_small = load(serif_path, wght=600, opsz=20)
    sans = load(sans_path, wght=400)

    # Open Graph image, 1200 x 630: the site name set like a manuscript title page.
    left = 96
    line1, _ = text_path(serif, "Pen of Wonder", left, 300, 104, -0.02)
    line2, w2 = text_path(serif, "Research", left, 410, 104, -0.02)
    sub, _ = text_path(sans, "Manuscript editing and publication support", left, 492, 34)
    place, _ = text_path(sans, "Wonderful Adebagbo · Ibadan, Nigeria", left, 540, 28)
    caret_x = left + w2 + 14
    og = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="{PAPER}"/>
  <path d="M{left} 150H1104M{left} 570H1104" stroke="{RULE}" stroke-width="2"/>
  <path d="{line1}" fill="{INK}"/>
  <path d="{line2}" fill="{INK}"/>
  <path d="M{caret_x} 418c6-12 12-25 18-38 4 12 11 25 18 37" fill="none" stroke="{RED}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="{sub}" fill="{INK}"/>
  <path d="{place}" fill="{MUTED}"/>
</svg>
"""
    (Path(__file__).resolve().parent / "og.svg").write_text(og, encoding="utf-8")

    # Favicon: an ink P on paper, with a small red caret, readable at 16 px.
    p_path, p_width = text_path(serif_small, "P", 0, 0, 26)
    px = (32 - p_width) / 2 - 1.5
    favicon = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="3" fill="{PAPER}"/>
  <g transform="translate({px:.2f} 25)"><path d="{p_path}" fill="{INK}"/></g>
  <path d="M21.5 28.5l3.5-7 3.5 7" fill="none" stroke="{RED}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
"""
    (OUT / "favicon.svg").write_text(favicon, encoding="utf-8")
    print("Wrote scripts/og.svg and public/favicon.svg")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
