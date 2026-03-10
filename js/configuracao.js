(async function(){
  const userEmail = localStorage.getItem("email");
  const pessoas = await getData("pessoas");
  const contas = await getData("contas");
  const categorias = await getData("categorias");

  function atualizarTabela(){
    const tbodyP = document.querySelector("#tabelaPessoas tbody");
    tbodyP.innerHTML = "";
    pessoas.forEach(p=>{
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p.nome_pessoa}</td>
        <td>${p.email}</td>
        <td>${p.id_perfil_origem}</td>
        <td>
          <button onclick="editarPessoa(${p.id_pessoa})">Editar</button>
          <button onclick="ativarPessoa(${p.id_pessoa}, ${p.ativo==1?0:1})">${p.ativo==1?'Desativar':'Ativar'}</button>
        </td>
      `;
      tbodyP.appendChild(tr);
    });

    const tbodyC = document.querySelector("#tabelaContasConfig tbody");
    tbodyC.innerHTML = "";
    contas.forEach(c=>{
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${c.nome_conta}</td><td>${c.tipo_conta}</td><td></td>`;
      tbodyC.appendChild(tr);
    });

    const tbodyCat = document.querySelector("#tabelaCategorias tbody");
    tbodyCat.innerHTML = "";
    categorias.forEach(c=>{
      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${c.categoria}</td><td>${c.descricao_categ}</td><td></td>`;
      tbodyCat.appendChild(tr);
    });
  }

  window.editarPessoa = async function(id){
    const nome = prompt("Novo nome:");
    const perfil = prompt("Novo perfil (ID):");
    const email = prompt("Novo email:");
    if(nome && perfil && email){
      await postData("editar_pessoa",{id_pessoa:id,nome_pessoa:nome,id_perfil_origem:perfil,email});
      const idx = pessoas.findIndex(p=>p.id_pessoa==id);
      pessoas[idx].nome_pessoa=nome;
      pessoas[idx].id_perfil_origem=perfil;
      pessoas[idx].email=email;
      atualizarTabela();
    }
  }

  window.ativarPessoa = async function(id, ativo){
    await postData("ativar_usuario",{id_pessoa:id,ativo});
    const idx = pessoas.findIndex(p=>p.id_pessoa==id);
    pessoas[idx].ativo=ativo;
    atualizarTabela();
  }

  document.getElementById("addPessoa").addEventListener("click", async ()=>{
    const nome = prompt("Nome:");
    const email = prompt("Email:");
    const perfil = prompt("ID Perfil:");
    if(nome && email && perfil){
      const res = await postData("add_pessoa",{nome_pessoa:nome,email, id_perfil_origem:perfil});
      pessoas.push({id_pessoa:res.id_pessoa,nome_pessoa:nome,email, id_perfil_origem:perfil, ativo:1});
      atualizarTabela();
    }
  });

  document.getElementById("addConta").addEventListener("click", async ()=>{
    const nome = prompt("Nome conta:");
    const tipo = prompt("Tipo:");
    if(nome && tipo){
      const res = await postData("add_conta",{nome_conta:nome,tipo_conta:tipo});
      contas.push({id_conta:res.id_conta,nome_conta:nome,tipo_conta:tipo});
      atualizarTabela();
    }
  });

  document.getElementById("addCategoria").addEventListener("click", async ()=>{
    const nome = prompt("Nome categoria:");
    const desc = prompt("Descrição:");
    if(nome && desc){
      const res = await postData("add_categoria",{categoria:nome,descricao_categ:desc});
      categorias.push({id_categoria:res.id_categoria,categoria:nome,descricao_categ:desc});
      atualizarTabela();
    }
  });

  atualizarTabela();
})();