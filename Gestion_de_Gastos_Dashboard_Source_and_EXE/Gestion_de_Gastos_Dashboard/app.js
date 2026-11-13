// Lógica interactiva del dashboard. No utiliza librerías externas.
const colores = [
  "#5574f5",
  "#26bea9",
  "#ffad5c",
  "#9a75ee",
  "#f27883",
  "#43a8dc",
  "#90bd4a",
];
const moneda = (n) => "$" + Math.round(n).toLocaleString("es-CO") + " COP";
const filtro = document.getElementById("category-filter");
const categorias = [
  ...new Set(
    MOVIMIENTOS.filter((m) => m.tipo === "Gasto").map((m) => m.categoria),
  ),
].sort();
categorias.forEach((c) => filtro.add(new Option(c, c)));
const suma = (lista) => lista.reduce((total, m) => total + m.valor, 0);
function calcular() {
  const ingresos = MOVIMIENTOS.filter((m) => m.tipo === "Ingreso");
  const gastos = MOVIMIENTOS.filter((m) => m.tipo === "Gasto");
  const porCategoria = {};
  gastos.forEach(
    (m) =>
      (porCategoria[m.categoria] = (porCategoria[m.categoria] || 0) + m.valor),
  );
  const orden = Object.entries(porCategoria).sort((a, b) => b[1] - a[1]);
  document.getElementById("kpi-income").textContent = moneda(suma(ingresos));
  document.getElementById("kpi-expense").textContent = moneda(suma(gastos));
  document.getElementById("kpi-balance").textContent = moneda(
    suma(ingresos) - suma(gastos),
  );
  document.getElementById("kpi-category").textContent = orden[0]?.[0] || "—";
  document.getElementById("kpi-category-value").textContent = orden[0]
    ? moneda(orden[0][1])
    : "—";
  document.getElementById("record-count").textContent =
    `${MOVIMIENTOS.length} movimientos en la base de datos`;
  actualizar();
}
function actualizar() {
  const categoria = filtro.value;
  const datos = MOVIMIENTOS.filter(
    (m) => categoria === "Todas" || m.categoria === categoria,
  );
  const gastos = datos.filter((m) => m.tipo === "Gasto");
  const totales = {};
  gastos.forEach(
    (m) => (totales[m.categoria] = (totales[m.categoria] || 0) + m.valor),
  );
  const pares = Object.entries(totales).sort((a, b) => b[1] - a[1]);
  dibujarBarras(pares);
  dibujarDona(pares, suma(gastos));
  dibujarLinea(gastos);
  dibujarTabla(datos);
}
function dibujarBarras(pares) {
  const svg = document.getElementById("bar-chart");
  svg.innerHTML = "";
  if (!pares.length) {
    svg.innerHTML =
      '<text x="325" y="150" text-anchor="middle" fill="#8996a9">No hay gastos en esta categoría</text>';
    return;
  }
  const inicio = 160,
    ancho = 420,
    max = Math.max(...pares.map((p) => p[1]));
  pares.forEach(([nombre, valor], i) => {
    const y = 20 + i * 39,
      w = (ancho * valor) / max;
    svg.insertAdjacentHTML(
      "beforeend",
      `<text x="${inicio - 12}" y="${y + 18}" text-anchor="end" fill="#66748b" font-size="12">${nombre}</text><rect x="${inicio}" y="${y}" width="${w}" height="24" rx="8" fill="${colores[i % colores.length]}"/><text x="${inicio + w + 8}" y="${y + 17}" fill="#53617a" font-size="11">${Math.round(valor / 1000)} mil</text>`,
    );
  });
}
function dibujarDona(pares, total) {
  const svg = document.getElementById("donut-chart");
  svg.innerHTML = "";
  const cx = 175,
    cy = 145,
    r = 83,
    circ = 2 * Math.PI * r;
  let offset = 0;
  pares.forEach(([nombre, valor], i) => {
    const arco = total ? (circ * valor) / total : 0;
    svg.insertAdjacentHTML(
      "beforeend",
      `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${colores[i % colores.length]}" stroke-width="29" stroke-linecap="round" stroke-dasharray="${arco} ${circ - arco}" stroke-dashoffset="${-offset}" transform="rotate(-90 ${cx} ${cy})"><title>${nombre}: ${moneda(valor)}</title></circle>`,
    );
    offset += arco;
  });
  svg.insertAdjacentHTML(
    "beforeend",
    `<text x="${cx}" y="${cy - 2}" text-anchor="middle" font-size="19" font-weight="700" fill="#233552">${Math.round(total / 1000)} mil</text><text x="${cx}" y="${cy + 19}" text-anchor="middle" font-size="11" fill="#8490a4">total de gastos</text>`,
  );
  document.getElementById("donut-legend").innerHTML = pares
    .map(
      ([n, v], i) =>
        `<span><b style="color:${colores[i % colores.length]}">●</b> ${n} · ${total ? Math.round((v * 100) / total) : 0}%</span>`,
    )
    .join("");
}
function dibujarLinea(gastos) {
  const svg = document.getElementById("line-chart");
  svg.innerHTML = "";
  if (!gastos.length) {
    svg.innerHTML =
      '<text x="500" y="150" text-anchor="middle" fill="#8996a9">No hay movimientos para mostrar</text>';
    return;
  }
  const dias = [...new Set(gastos.map((m) => m.fecha))].sort(),
    valores = dias.map((d) => suma(gastos.filter((m) => m.fecha === d)));
  const W = 1000,
    H = 300,
    L = 60,
    R = 25,
    T = 24,
    B = 42,
    max = Math.max(...valores);
  [0, 0.5, 1].forEach((q) => {
    const y = H - B - q * (H - T - B);
    svg.insertAdjacentHTML(
      "beforeend",
      `<line x1="${L}" y1="${y}" x2="${W - R}" y2="${y}" stroke="#e9edf5"/><text x="${L - 9}" y="${y + 4}" text-anchor="end" font-size="10" fill="#8a96a9">${Math.round((max * q) / 1000)}k</text>`,
    );
  });
  const puntos = valores.map((v, i) => [
    L + (dias.length < 2 ? 0 : (i * (W - L - R)) / (dias.length - 1)),
    H - B - (v / max) * (H - T - B),
  ]);
  svg.insertAdjacentHTML(
    "beforeend",
    `<polyline points="${puntos.map((p) => p.join(",")).join(" ")}" fill="none" stroke="#5574f5" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  );
  puntos.forEach((p, i) => {
    svg.insertAdjacentHTML(
      "beforeend",
      `<circle cx="${p[0]}" cy="${p[1]}" r="5" fill="white" stroke="#26bea9" stroke-width="3"><title>${dias[i]} · ${moneda(valores[i])}</title></circle>`,
    );
    if (i % 3 === 0)
      svg.insertAdjacentHTML(
        "beforeend",
        `<text x="${p[0]}" y="${H - 10}" text-anchor="middle" font-size="10" fill="#8793a7">${dias[i].slice(8)}</text>`,
      );
  });
}
function dibujarTabla(datos) {
  document.getElementById("records-body").innerHTML = datos
    .map(
      (m) =>
        `<tr><td>${m.fecha}</td><td><span class="type-tag ${m.tipo === "Gasto" ? "expense" : ""}">${m.tipo}</span></td><td>${m.categoria}</td><td>${m.descripcion}</td><td class="numeric">${moneda(m.valor)}</td></tr>`,
    )
    .join("");
  document.getElementById("record-count").textContent =
    `${datos.length} de ${MOVIMIENTOS.length} movimientos visibles`;
}
document.getElementById("toggle-records").addEventListener("click", (e) => {
  const area = document.getElementById("record-area");
  area.classList.toggle("is-hidden");
  const abierto = !area.classList.contains("is-hidden");
  e.currentTarget.innerHTML = abierto
    ? "Ocultar registros <span>↑</span>"
    : "Mostrar registros <span>↓</span>";
});
filtro.addEventListener("change", actualizar);
calcular();
