# Portafolio — Juan Alvarez

Sitio personal de una sola página. HTML, CSS y JavaScript puros, sin dependencias ni build.

## Estructura

```
.
├── index.html          # Todo el contenido
├── css/styles.css      # Sistema de diseño + responsive + tema claro/oscuro
├── js/main.js          # Tema, menú móvil, scroll spy, animaciones
└── assets/
    ├── CV-Juan-Alvarez.pdf   # Se descarga desde el botón "Descargar CV"
    └── juan-alvarez.jpg      # Retrato, 800×1000 px (4:5)
```

## Cambiar la foto

Reemplaza `assets/juan-alvarez.jpg` manteniendo el nombre. Recomendado: formato
vertical 4:5 (por ejemplo 800×1000 px) y menos de 200 KB.

Si el archivo llegara a faltar, el sitio muestra automáticamente un recuadro con
las iniciales `JA` en lugar de una imagen rota.

## Ver el sitio

Basta con abrir `index.html` en el navegador (doble clic).

Para un servidor local:

```bash
python3 -m http.server 8000
```

Luego abre <http://localhost:8000>.

## Publicarlo gratis

- **GitHub Pages** — sube la carpeta a un repositorio y activa Pages desde la rama `main`.
- **Netlify / Vercel** — arrastra la carpeta a su panel; queda publicado en segundos.

## Qué incluye

- Tema claro/oscuro con detección del sistema y preferencia guardada.
- Navegación fija con indicador de sección activa y barra de progreso de lectura.
- Menú hamburguesa en móvil.
- Animaciones de entrada escalonadas (se desactivan si el sistema pide menos movimiento).
- Metadatos Open Graph, favicon propio y estilos de impresión.
