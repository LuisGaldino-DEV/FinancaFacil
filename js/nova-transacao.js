(async function(){
  // Carrega categorias e contas para popular selects
  const categorias = await getData("categorias");
  const contas = await getData("contas");

  const selectCategoria = document.getElementById("categoria");
  const selectConta = document.getElementById("conta");

  categorias.forEach(c => {
    const option = document.createElement("option");
    option.value = c.id_categoria;
    option.textContent = c.categoria;
    selectCategoria.appendChild(option);
  });

  contas.forEach(c => {
    const option = document.createElement("option");
    option.value = c.id_conta;
    option.textContent = c.nome_conta;
    selectConta.appendChild(option);
  });

  // Submissão do formulário
  document.getElementById("formNovaTransacao").addEventListener("submit", async function(e){
    e.preventDefault();

    const descricao = document.getElementById("descricao").value;
    const valor = parseFloat(document.getElementById("valor").value);
    const data_transacao = document.getElementById("data_transacao").value;
    const id_categoria_origem = parseInt(selectCategoria.value);
    const id_conta_origem = parseInt(selectConta.value);
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(!descricao || !valor || !data_transacao || !id_categoria_origem || !id_conta_origem){
      alert("Preencha todos os campos!");
      return;
    }

    await postData("add_transacao", {
      descricao,
      val_transacao: valor,
      data_transacao,
      id_categoria_origem,
      id_conta_origem,
      tipo
    });

    alert("Transação adicionada com sucesso!");
    this.reset();
  });
})();