(async function(){
  const saldos = await getData("saldo_contas");
  const tbody = document.querySelector("#tabelaContas tbody");
  tbody.innerHTML = "";
  saldos.forEach(s=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${s.conta}</td><td>${Number(s.saldo).toFixed(2)}</td>`;
    tbody.appendChild(tr);
  });
})();