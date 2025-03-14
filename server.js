const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

async function main() {
  try {
    await prisma.$connect();
    console.log("✅ Conectado ao banco de dados!");
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco de dados:", error);
  }
}
main();

app.get("/alunos", async (req, res) => {
  try {
    const alunos = await prisma.aluno.findMany();
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar alunos" });
  }
});

app.post("/alunos", async (req, res) => {
  try {
    const { nome, idade, turma } = req.body;
    if (!nome || !idade || !turma) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios!" });
    }
    const novoAluno = await prisma.aluno.create({
      data: { nome, idade, turma },
    });
    res.json(novoAluno);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar aluno" });
  }
});

app.put("/alunos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, idade, turma } = req.body;
    const alunoAtualizado = await prisma.aluno.update({
      where: { id: Number(id) },
      data: { nome, idade, turma },
    });
    res.json(alunoAtualizado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar aluno" });
  }
});

app.delete("/alunos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Recebida requisição DELETE para aluno com ID:", id);
    const aluno = await prisma.aluno.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Aluno removido com sucesso", aluno });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar aluno", details: error.message });
  }
});

app.get("/professores", async (req, res) => {
  try {
    const professores = await prisma.professor.findMany();
    res.json(professores);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar professores" });
  }
});

app.post("/professores", async (req, res) => {
  try {
    const { nome, materia } = req.body;
    const novoProfessor = await prisma.professor.create({
      data: { nome, materia },
    });
    res.json(novoProfessor);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar professor" });
  }
});

app.delete("/professores/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const professorRemovido = await prisma.professor.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Professor removido com sucesso", professor: professorRemovido });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar professor", details: error.message });
  }
});

app.get("/boletins", async (req, res) => {
  try {
    const boletins = await prisma.boletim.findMany({
      include: {
        aluno: true,
      },
    });
    res.json(boletins);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar boletins", details: error.message });
  }
});

app.put("/boletins/:alunoId", async (req, res) => {
  try {
    const { alunoId } = req.params;
    const { nota_matematica, nota_portugues, nota_historia, nota_geografia, nota_ciencias } = req.body;

    let boletim = await prisma.boletim.findUnique({
      where: { alunoId: Number(alunoId) },
    });

    if (boletim) {
      boletim = await prisma.boletim.update({
        where: { alunoId: Number(alunoId) },
        data: { nota_matematica, nota_portugues, nota_historia, nota_geografia, nota_ciencias },
      });
    } else {
      boletim = await prisma.boletim.create({
        data: {
          alunoId: Number(alunoId),
          nota_matematica,
          nota_portugues,
          nota_historia,
          nota_geografia,
          nota_ciencias,
        },
      });
    }

    res.json(boletim);
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar notas", details: error.message });
  }
});

app.use(express.static("public"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});