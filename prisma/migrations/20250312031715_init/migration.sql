-- CreateTable
CREATE TABLE "Aluno" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "turma" TEXT NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "materia" TEXT NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Boletim" (
    "id" SERIAL NOT NULL,
    "aluno_id" INTEGER NOT NULL,
    "nota_matematica" DOUBLE PRECISION NOT NULL,
    "nota_portugues" DOUBLE PRECISION NOT NULL,
    "nota_ciencias" DOUBLE PRECISION NOT NULL,
    "nota_historia" DOUBLE PRECISION NOT NULL,
    "nota_geografia" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Boletim_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Boletim_aluno_id_key" ON "Boletim"("aluno_id");

-- AddForeignKey
ALTER TABLE "Boletim" ADD CONSTRAINT "Boletim_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
