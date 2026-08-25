#!/usr/bin/env python3
"""Genera una versión autocontenida de la web en un solo archivo.

index.html carga CSS y JS externos, que es lo correcto para el sitio
desplegado. Para previsualizar la página en un único archivo (o publicarla
donde no se puedan servir assets sueltos) este script los incrusta.

    python3 tools/build-artifact.py salida.html
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
out = Path(sys.argv[1] if len(sys.argv) > 1 else ROOT / "amura-standalone.html")

html = (ROOT / "index.html").read_text(encoding="utf-8")
css = (ROOT / "assets/css/styles.css").read_text(encoding="utf-8")
js = (ROOT / "assets/js/main.js").read_text(encoding="utf-8")

title = re.search(r"<title>(.*?)</title>", html, re.S).group(1)
fonts = re.search(r'<link rel="stylesheet" href="https://fonts\.googleapis\.com[^>]*>', html).group(0)
body = re.search(r"<body>(.*)</body>", html, re.S).group(1)

body = body.replace('<script src="assets/js/main.js"></script>', "")

out.write_text(
    f"<title>{title}</title>\n"
    '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
    f"{fonts}\n"
    f"<style>\n{css}\n</style>\n"
    f"{body.strip()}\n"
    f"<script>\n{js}\n</script>\n",
    encoding="utf-8",
)
print(f"{out} · {out.stat().st_size / 1024:.1f} KB")
