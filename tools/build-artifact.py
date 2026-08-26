#!/usr/bin/env python3
"""Empaqueta las cuatro páginas del sitio en un único archivo HTML.

El sitio desplegado son cuatro páginas con CSS y JS externos, que es lo
correcto. Para previsualizarlo de un vistazo —abriéndolo con doble clic, o
publicándolo donde solo cabe un archivo— aquí se incrusta todo y se añade un
router mínimo que enseña una vista y esconde las demás.

    python3 tools/build-artifact.py salida.html
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

PAGES = [
    ("index.html", "home"),
    ("viajes-tecnicos.html", "tecnicos"),
    ("viajes-comerciales.html", "comerciales"),
    ("area-cliente.html", "area"),
]

ROUTER = r"""
/* Router del archivo único: el sitio real son cuatro páginas. */
(function () {
  'use strict';
  var views = {};
  document.querySelectorAll('[data-view]').forEach(function (el) {
    views[el.dataset.view] = el;
  });

  function show(name, hash) {
    if (!views[name]) { return false; }
    Object.keys(views).forEach(function (key) { views[key].hidden = key !== name; });
    document.body.dataset.page = views[name].dataset.page;

    var target = hash && document.getElementById(hash.slice(1));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo(0, 0);
    }
    return true;
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a[href]');
    if (!link) { return; }
    var match = (link.getAttribute('href') || '').match(/^([\w-]+\.html)(#.*)?$/);
    if (match && show(match[1], match[2])) { event.preventDefault(); }
  });

  show('index.html', null);
})();
"""


def read(rel):
    return (ROOT / rel).read_text(encoding="utf-8")


def main():
    out = Path(sys.argv[1] if len(sys.argv) > 1 else ROOT / "amura-preview.html")
    home = read("index.html")

    title = re.search(r"<title>(.*?)</title>", home, re.S).group(1)
    fonts = re.search(r'<link rel="stylesheet" href="https://fonts\.googleapis\.com[^>]*>', home).group(0)
    header = re.search(r'(<a class="skip-link".*?</header>)', home, re.S).group(1)
    footer = re.search(r'(<footer class="footer">.*?</nav>)', home, re.S).group(1)

    blocks = []
    for index, (name, page) in enumerate(PAGES):
        body = re.search(r"<main\b[^>]*>(.*?)</main>", read(name), re.S).group(1)
        first = index == 0
        blocks.append(
            '<div data-view="%s" data-page="%s"%s><main%s>%s</main></div>'
            % (name, page, "" if first else " hidden", ' id="main"' if first else "", body)
        )

    parts = [
        "<title>%s</title>" % title,
        '<link rel="preconnect" href="https://fonts.googleapis.com">',
        '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
        fonts,
        "<style>\n%s\n%s\n</style>" % (read("assets/css/styles.css"), read("assets/css/area.css")),
        header,
        "\n".join(blocks),
        footer,
        "<script>\n%s\n</script>" % read("assets/js/main.js"),
        "<script>\n%s\n</script>" % read("assets/js/area.js"),
        "<script>%s</script>" % ROUTER,
    ]

    out.write_text("\n".join(parts) + "\n", encoding="utf-8")
    print("%s · %.1f KB · %d vistas" % (out, out.stat().st_size / 1024, len(PAGES)))
    return 0


if __name__ == "__main__":
    sys.exit(main())
