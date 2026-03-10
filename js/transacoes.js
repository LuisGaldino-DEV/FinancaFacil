async function carregarTransacoes(inicio, fim){
  const params = {};
  if(inicio) params.inicio = inicio;
  if(fim) params.fim = fim;

  const transacoes = await getData("transacoes", params);
  const categorias = await getData("categorias");
  const contas = await getData("contas");

  const tbody = document.querySelector("#tabelaTransacoes tbody");
  tbody.innerHTML = "";
  transacoes.forEach(t=>{
    const cat = categorias.find(c=>c.id_categoria==t.id_categoria_origem);
    const conta = contas.find(c=>c.id_conta==t.id_conta_origem);
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${t.data_transacao}</td>
      <td>${t.descricao}</td>
      <td>${cat ? cat.categoria : ''}</td>
      <td>${conta ? conta.nome_conta : ''}</td>
      <td>${Number(t.val_transacao).toFixed(2)}</td>
    `;
    tbody.appendChild(tr);
  });
}

document.getElementById("filtrar").addEventListener("click", ()=>{
  const inicio = document.getElementById("inicio").value;
  const fim = document.getElementById("fim").value;
  carregarTransacoes(inicio, fim);
});

document.getElementById("novaTransacao").addEventListener("click", async ()=>{
  const descricao = prompt("Descrição:");
  const valor = prompt("Valor:");
  const categorias = await getData("categorias");
  const id_categoria = prompt(`ID Categoria:\n${categorias.map(c=>c.id_categoria+"-"+c.categoria).join("\n")}`);
  const contas = await getData("contas");
  const id_conta = prompt(`ID Conta:\n${contas.map(c=>c.id_conta+"-"+c.nome_conta).join("\n")}`);
  
  if(descricao && valor && id_categoria && id_conta){
    await postData("add_transacao",{
      descricao,
      val_transacao: Number(valor),
      id_categoria_origem: Number(id_categoria),
      id_conta_origem: Number(id_conta),
      data_transacao: new Date().toISOString().split("T")[0]
    });
    carregarTransacoes();
  }
});

carregarTransacoes();