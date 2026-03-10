async function carregarPlanejamento(mes){
  const gastos = await getData("gastos_futuro");
  const categorias = await getData("categorias");
  const contas = await getData("contas");

  const tbody = document.querySelector("#tabelaPlanejamento tbody");
  tbody.innerHTML = "";

  gastos.forEach(g=>{
    const dataObj = new Date(g.data);
    if(mes && !g.data.startsWith(mes)) return; // filtrar por mês yyyy-mm

    const cat = categorias.find(c=>c.id_categoria==g.id_categoria_origem);
    const conta = contas.find(c=>c.id_conta==g.id_conta_origem);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${g.data}</td>
      <td>${g.descricao}</td>
      <td>${cat ? cat.categoria : ''}</td>
      <td>${conta ? conta.nome_conta : ''}</td>
      <td>${Number(g.valor_gast_fut).toFixed(2)}</td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById("btnFiltrar").addEventListener("click", ()=>{
  const mes = document.getElementById("mesFiltro").value;
  carregarPlanejamento(mes);
});

carregarPlanejamento();