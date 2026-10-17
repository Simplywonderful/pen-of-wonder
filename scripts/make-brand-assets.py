"""Draws the Open Graph image as SVG in the Pen of Wonder Consults brand, with the type converted
to outlines from the brand's own fonts so the image looks the same everywhere. Run
scripts/make-brand-assets.mjs afterwards to rasterise it. The favicon and touch icons come
straight from the brand folder (Brand/Icons), not from this script.

Usage: python scripts/make-brand-assets.py <Fraunces variable TTF> <Inter variable TTF>
(the Google Fonts files: Fraunces[SOFT,WONK,opsz,wght].ttf and Inter[opsz,wght].ttf)
"""
import sys
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

# Brand colours, from Brand/brand-tokens.css.
PARCHMENT = "#EDEEE7"
INK_GREEN = "#0F433B"
DEEP_INK = "#1B2420"
QUILL_GREY = "#5B6661"
WIN_GOLD = "#A5701F"
RULE = "#D2D5CB"

HERE = Path(__file__).resolve().parent


def load(path, **axes):
    return instantiateVariableFont(TTFont(path), axes)


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


def main(display_path, body_path):
    display = load(display_path, wght=700, opsz=144, SOFT=0, WONK=0)
    body = load(body_path, wght=400, opsz=28)

    left = 96
    line1, _ = text_path(display, "Pen of Wonder", left, 300, 108, -0.02)
    line2, w2 = text_path(display, "Research", left, 414, 108, -0.02)
    sub, _ = text_path(body, "Manuscript editing and publication support", left, 494, 32)
    place, _ = text_path(body, "Wonderful Adebagbo · Ibadan, Nigeria", left, 542, 26)
    og = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="{PARCHMENT}"/>
  <path d="M{left} 150H1104M{left} 572H1104" stroke="{RULE}" stroke-width="2"/>
  <path d="{line1}" fill="{INK_GREEN}"/>
  <path d="{line2}" fill="{INK_GREEN}"/>
  <path d="{drop(left + w2 + 34, 352, 62)}" fill="{WIN_GOLD}"/>
  <path d="{sub}" fill="{DEEP_INK}"/>
  <path d="{place}" fill="{QUILL_GREY}"/>
</svg>
"""
    (HERE / "og.svg").write_text(og, encoding="utf-8")
    print("Wrote scripts/og.svg")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
