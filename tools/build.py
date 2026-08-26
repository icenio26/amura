#!/usr/bin/env python3
"""Ensambla las páginas del sitio a partir de src/ y src/partials/.

Con cuatro páginas, duplicar la cabecera y el pie a mano garantiza que el
teléfono de guardia acabe desactualizado en tres de ellas. Este script las
genera; los archivos de la raíz no se editan a mano.

    python3 tools/build.py

No hace falta ejecutarlo en el despliegue: la salida está versionada, así que
Vercel sirve el resultado sin build.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
PARTIALS = SRC / "partials"

BANNER = (
    "<!-- ARCHIVO GENERADO por tools/build.py. No editar a mano:\n"
    "     los cambios se pierden en el siguiente build. Edita src/{name} -->\n"
)


def render(text: str, depth: int = 0) -> str:
    if depth > 5:
        raise RuntimeError("inclusión de partials demasiado anidada")

    def sub(match: re.Match) -> str:
        name = match.group(1).strip()
        partial = PARTIALS / f"{name}.html"
        if not partial.exists():
            raise SystemExit(f"partial no encontrado: {partial}")
        return render(partial.read_text(encoding="utf-8").rstrip("\n"), depth + 1)

    return re.sub(r"\{\{>\s*([\w-]+)\s*\}\}", sub, text)


def main() -> int:
    pages = sorted(p for p in SRC.glob("*.html"))
    if not pages:
        raise SystemExit("no hay páginas en src/")

    for page in pages:
        out = ROOT / page.name
        html = BANNER.format(name=page.name) + render(page.read_text(encoding="utf-8"))
        out.write_text(html, encoding="utf-8")
        print(f"  {page.name} → {out.relative_to(ROOT)} ({len(html) / 1024:.1f} KB)")

    print(f"{len(pages)} páginas generadas")
    return 0


if __name__ == "__main__":
    sys.exit(main())
