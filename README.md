# Gestión de gastos

**Microtaller 7: Gestión de gastos**  
**Estudiante:** Samuel Nieto Pardo

## Descripción

Este proyecto permite registrar y analizar ingresos y egresos personales mediante un dashboard interactivo. Presenta indicadores de ingresos, gastos, saldo disponible y categorías de mayor consumo, además de gráficos y una tabla con los movimientos.

La base de ejemplo contiene 20 registros ficticios de noviembre de 2026. Se usan únicamente con fines académicos.

## Cómo abrir el dashboard en Windows

1. Descarga el ZIP del proyecto y extrae **todos** sus archivos en una carpeta.
2. Abre la carpeta extraída.
3. Haz doble clic en `Gestion_de_Gastos.exe`.
4. El dashboard se abrirá en el navegador predeterminado.

> Mantén `Gestion_de_Gastos.exe` en la misma carpeta que `index.html`, `styles.css`, `app.js` y `data.js`. El ejecutable es un lanzador: necesita esos archivos para abrir el dashboard.

Si el ejecutable no abre, puedes iniciar el dashboard manualmente haciendo doble clic en `index.html`.

## Cómo ver el código

Abre la carpeta del proyecto en Visual Studio Code mediante **Archivo → Abrir carpeta**. También puedes usar `ABRIR_EN_VSCODE.bat` si tienes instalado Visual Studio Code y el comando `code` disponible.

## Archivos principales

| Archivo | Función |
|---|---|
| `index.html` | Estructura de la página y componentes del dashboard. |
| `styles.css` | Colores, diseño y adaptación a distintos tamaños de pantalla. |
| `app.js` | Cálculos de indicadores, gráficos, filtro y tabla interactiva. |
| `data.js` | Registros que utiliza el dashboard. |
| `movimientos.csv` | Base de datos en formato CSV, compatible con Excel. |
| `launcher.c` | Código fuente del lanzador para Windows. |
| `Gestion_de_Gastos.exe` | Ejecutable que abre el dashboard en el navegador. |

## Indicadores del ejemplo

- **Ingresos totales:** $1.700.000 COP
- **Gastos totales:** $1.010.000 COP
- **Saldo disponible:** $690.000 COP
- **Categoría con mayor gasto:** Alimentación, $415.000 COP

El filtro de categoría actualiza los gráficos y la tabla. Las tarjetas KPI muestran los totales generales del periodo.

## Tecnologías

HTML, CSS, JavaScript y C. El dashboard funciona localmente y no requiere conexión a internet.

## Nota sobre los datos

Los registros son ficticios y se incluyeron para demostrar el funcionamiento del proyecto. No representan información financiera real.
