# Gestión de gastos — Dashboard

Dashboard académico construido desde cero con HTML, CSS y JavaScript puro. No usa frameworks, CDN ni requiere internet.

## Abrir el dashboard

1. Extrae el ZIP completo a una carpeta.
2. En Windows, haz doble clic en `Gestion_de_Gastos.exe`. El lanzador abre `index.html` en el navegador predeterminado.
3. Mantén el EXE junto con los demás archivos del proyecto. El EXE no contiene por sí solo los recursos del dashboard.

También puedes abrir `index.html` manualmente en Chrome, Edge o Firefox.

## Abrir y ver el código en Visual Studio Code

1. Extrae el ZIP.
2. Abre Visual Studio Code y elige **Archivo > Abrir carpeta...**.
3. Selecciona la carpeta `Gestion_de_Gastos_Dashboard`.
4. Revisa `index.html` (estructura), `styles.css` (diseño), `app.js` (cálculos, gráficos e interacciones), `data.js` (datos que usa el dashboard) y `launcher.c` (código del lanzador `.exe`).

## Archivos

- `index.html`: página principal.
- `styles.css`: diseño adaptable a pantallas pequeñas y grandes.
- `app.js`: lógica de KPI, filtro, gráficos SVG y tabla.
- `data.js`: 20 registros del dashboard.
- `movimientos.csv`: copia tabular de la base de datos.
- `launcher.c`: fuente del lanzador Windows.
- `Gestion_de_Gastos.exe`: lanzador compilado para Windows x64.

Los registros son ficticios y tienen propósito académico. Ingresos: $1.700.000 COP; gastos: $1.010.000 COP; saldo: $690.000 COP. El filtro afecta los gráficos y la tabla; las tarjetas KPI siempre resumen el total del periodo.
