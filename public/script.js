async function carregarAlunos() {
    // Oculta a seção de professores e outros formulários
    document.getElementById("secao-boletins").classList.add("escondido");
    document
      .getElementById("form-adicionar-professor")
      .classList.add("escondido");
    document.getElementById("professoresh2").classList.add("escondido");
    document.getElementById("lista-professores").innerHTML = "";
    document
      .getElementById("form-adicionar-aluno")
      .classList.add("escondido");
    document.getElementById("form-boletim").classList.add("escondido");

    const response = await fetch("http://localhost:3000/alunos");
    const alunos = await response.json();
    const lista = document.getElementById("lista-alunos");
    lista.innerHTML = "";

    alunos.forEach((aluno) => {
      const li = document.createElement("li");
      li.innerHTML = `
          <span>${aluno.nome} - Idade: ${aluno.idade} - Turma: ${aluno.turma}</span>
          <div>
            <button onclick="deletarAluno(${aluno.id})">Deletar</button>
            <button onclick="inserirNotas(${aluno.id})">Inserir Notas</button>
          </div>
        `;
      lista.appendChild(li);
    });

    document.getElementById("alunosh2").classList.remove("escondido");
  }

  async function inserirNotas(alunoId) {
    const notas = {
      nota_matematica: parseFloat(prompt("Nota de Matemática:")),
      nota_portugues: parseFloat(prompt("Nota de Português:")),
      nota_historia: parseFloat(prompt("Nota de História:")),
      nota_geografia: parseFloat(prompt("Nota de Geografia:")),
      nota_ciencias: parseFloat(prompt("Nota de Ciências:")),
    };

    try {
      const response = await fetch(`http://localhost:3000/boletins/${alunoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notas),
      });

      if (response.ok) {
        alert("Notas salvas com sucesso!");
      } else {
        alert("Erro ao salvar notas.");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
    }
  }

  async function carregarBoletins() {
    try {
      // Oculta outras seções e formulários
      document.getElementById("alunosh2").classList.add("escondido");
      document.getElementById("lista-alunos").innerHTML = "";
      document.getElementById("professoresh2").classList.add("escondido");
      document.getElementById("lista-professores").innerHTML = "";
      document.getElementById("form-adicionar-aluno").classList.add("escondido");
      document.getElementById("form-adicionar-professor").classList.add("escondido");
      document.getElementById("form-boletim").classList.add("escondido");

      // Busca os dados dos boletins
      const response = await fetch("http://localhost:3000/boletins");
      const boletins = await response.json();

      // Limpa a tabela antes de preencher
      const tabelaBody = document.querySelector("#tabela-boletins tbody");
      tabelaBody.innerHTML = "";

      // Preenche a tabela com os dados dos boletins
      boletins.forEach((boletim) => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${boletim.aluno.nome}</td>
      <td>${boletim.nota_matematica}</td>
      <td>${boletim.nota_portugues}</td>
      <td>${boletim.nota_historia}</td>
      <td>${boletim.nota_geografia}</td>
      <td>${boletim.nota_ciencias}</td>
    `;
        tabelaBody.appendChild(row);
      });

      // Exibe a seção de boletins
      document.getElementById("secao-boletins").classList.remove("escondido");
    } catch (error) {
      console.error("Erro ao carregar boletins:", error);
      alert("Erro ao carregar boletins. Tente novamente.");
    }
  }

  // Função para mostrar o formulário de adicionar aluno e ocultar as demais seções
  function mostrarFormularioAdicionarAluno() {
    // Oculta as listas e formulários de outras seções
    document.getElementById("secao-boletins").classList.add("escondido");
    document.getElementById("alunosh2").classList.add("escondido");
    document.getElementById("lista-alunos").innerHTML = "";
    document.getElementById("professoresh2").classList.add("escondido");
    document.getElementById("lista-professores").innerHTML = "";
    document.getElementById("form-boletim").classList.add("escondido");

    // Se existir, oculta o formulário de adicionar professor
    const formProfessor = document.getElementById(
      "form-adicionar-professor"
    );
    if (formProfessor) {
      formProfessor.classList.add("escondido");
      if (typeof formProfessor.reset === "function") {
        formProfessor.reset();
      }
    }

    // Exibe o formulário de adicionar aluno
    document
      .getElementById("form-adicionar-aluno")
      .classList.remove("escondido");
  }

  // Função para adicionar um novo aluno
  async function adicionarAluno(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const turma = document.getElementById("turma").value;

    if (!nome || !idade || !turma) {
      return alert("Preencha todos os campos!");
    }

    try {
      const response = await fetch("http://localhost:3000/alunos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, idade: Number(idade), turma }),
      });

      if (response.ok) {
        alert("Aluno adicionado com sucesso!");
        document
          .getElementById("form-adicionar-aluno")
          .classList.add("escondido");
        document.getElementById("form-adicionar-aluno").reset();
        carregarAlunos();
      } else {
        alert("Erro ao adicionar aluno.");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
    }
  }

  // Função para cancelar a adição de aluno
  function cancelarAdicao() {
    document
      .getElementById("form-adicionar-aluno")
      .classList.add("escondido");
    document.getElementById("form-adicionar-aluno").reset();
  }

  // Função para deletar um aluno
  async function deletarAluno(id) {
    console.log(`Enviando requisição DELETE para: http://localhost:3000/alunos/${id}`);
    if (!confirm("Tem certeza que deseja deletar este aluno?")) return;
    try {
      const response = await fetch(`http://localhost:3000/alunos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Aluno removido com sucesso");
        carregarAlunos(); // Atualiza a lista de alunos
      } else {
        const errorData = await response.json();
        alert(`Erro ao remover aluno: ${errorData.error || "Erro desconhecido"}`);
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor");
    }
  }

  // Função para mostrar o formulário de boletim
  async function mostrarBoletim(alunoId) {
    try {
      const response = await fetch(
        `http://localhost:3000/boletins/${alunoId}`
      );

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const boletim = await response.json();
      const boletimContainer = document.getElementById("boletim");

      if (!boletimContainer) {
        throw new Error("Elemento 'boletim' não encontrado no HTML.");
      }

      boletimContainer.innerHTML = `
    <p>Matemática: ${boletim.nota_matematica}</p>
    <p>Português: ${boletim.nota_portugues}</p>
    <p>História: ${boletim.nota_historia}</p>
    <p>Geografia: ${boletim.nota_geografia}</p>
    <p>Ciências: ${boletim.nota_ciencias}</p>
  `;
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  // Função para salvar as notas do boletim
  async function salvarBoletim(event) {
    event.preventDefault();
    const boletimId = document.getElementById("boletim-id").value;
    const notas = {
      nota_matematica: parseFloat(
        document.getElementById("nota-matematica").value
      ),
      nota_portugues: parseFloat(
        document.getElementById("nota-portugues").value
      ),
      nota_historia: parseFloat(
        document.getElementById("nota-historia").value
      ),
      nota_geografia: parseFloat(
        document.getElementById("nota-geografia").value
      ),
      nota_ciencias: parseFloat(
        document.getElementById("nota-ciencias").value
      ),
    };

    try {
      const response = await fetch(
        `http://localhost:3000/boletins/${boletimId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(notas),
        }
      );
      if (response.ok) {
        alert("Notas salvas com sucesso!");
        document.getElementById("form-boletim").classList.add("escondido");
      } else {
        alert("Erro ao salvar notas.");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
    }
  }

  // Função para cancelar a edição do boletim
  function cancelarEdicaoBoletim() {
    document.getElementById("form-boletim").classList.add("escondido");
  }

  // Função para carregar e exibir a lista de professores
  async function carregarProfessores() {
    // Oculta outras seções e formulários que possam estar visíveis
    document.getElementById("secao-boletins").classList.add("escondido");
    document
      .getElementById("form-adicionar-aluno")
      .classList.add("escondido");
    document.getElementById("alunosh2").classList.add("escondido");
    document.getElementById("lista-alunos").innerHTML = "";
    document.getElementById("form-boletim").classList.add("escondido");

    // Aqui, adicione a ocultação do formulário de adicionar professor
    document
      .getElementById("form-adicionar-professor")
      .classList.add("escondido");

    const response = await fetch("http://localhost:3000/professores");
    const professores = await response.json();
    const lista = document.getElementById("lista-professores");
    lista.innerHTML = "";

    professores.forEach((professor) => {
      const li = document.createElement("li");
      li.innerHTML = `
    <span>${professor.nome} - ${professor.materia}</span>
    <div>
      <button onclick="deletarProfessor(${professor.id})">Deletar</button>
    </div>
  `;
      lista.appendChild(li);
    });

    document.getElementById("professoresh2").classList.remove("escondido");
  }

  // Função para mostrar o formulário de adicionar professor
  function mostrarFormularioAdicionarProfessor() {
    // Oculta outras seções e formulários
    document.getElementById("secao-boletins").classList.add("escondido");
    document.getElementById("alunosh2").classList.add("escondido");
    document.getElementById("lista-alunos").innerHTML = "";
    document.getElementById("professoresh2").classList.add("escondido");
    document.getElementById("lista-professores").innerHTML = "";
    document
      .getElementById("form-adicionar-aluno")
      .classList.add("escondido");
    document.getElementById("form-boletim").classList.add("escondido");

    // Exibe o formulário de adicionar professor
    document
      .getElementById("form-adicionar-professor")
      .classList.remove("escondido");
  }

  // Função para adicionar um novo professor
  async function adicionarProfessor(event) {
    event.preventDefault();

    const nome = document.getElementById("nome-professor").value;
    const materia = document.getElementById("materia").value;

    if (!nome || !materia) {
      return alert("Preencha todos os campos!");
    }

    try {
      const response = await fetch("http://localhost:3000/professores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, materia }),
      });

      if (response.ok) {
        alert("Professor adicionado com sucesso!");
        document
          .getElementById("form-adicionar-professor")
          .classList.add("escondido");
        document.getElementById("form-adicionar-professor").reset();
        carregarProfessores(); // Atualiza a lista de professores
      } else {
        alert("Erro ao adicionar professor.");
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor.");
    }
  }

  // Função para cancelar a adição de professor
  function cancelarAdicaoProfessor() {
    document
      .getElementById("form-adicionar-professor")
      .classList.add("escondido");
    document.getElementById("form-adicionar-professor").reset();
  }

  // Função para deletar um professor
  async function deletarProfessor(id) {
    if (!confirm("Tem certeza que deseja deletar este professor?")) return;
    try {
      const response = await fetch(
        `http://localhost:3000/professores/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("Professor removido com sucesso");
        carregarProfessores();
      } else {
        const errorData = await response.json();
        alert(
          `Erro ao remover professor: ${errorData.error || "Erro desconhecido"
          }`
        );
      }
    } catch (error) {
      alert("Erro ao conectar com o servidor");
    }
  }