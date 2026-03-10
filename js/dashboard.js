async function loadDashboard() {
  const data = await API.get("dashboard");
  document.getElementById("saldo").innerText = `Saldo: R$ ${data.saldo.toFixed(2)}`;
  document.getElementById("receitas").innerText = `Receitas: R$ ${data.receitas.toFixed(2)}`;
  document.getElementById("despesas").innerText = `Despesas: R$ ${data.despesas.toFixed(2)}`;
}

window.addEventListener("load", loadDashboard);