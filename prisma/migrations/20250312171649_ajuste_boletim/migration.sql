/*
  Warnings:

  - You are about to drop the column `idade` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `turma` on the `Aluno` table. All the data in the column will be lost.
  - You are about to drop the column `aluno_id` on the `Boletim` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[alunoId]` on the table `Boletim` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `alunoId` to the `Boletim` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Boletim" DROP CONSTRAINT "Boletim_aluno_id_fkey";

-- DropIndex
DROP INDEX "Boletim_aluno_id_key";

-- AlterTable
ALTER TABLE "Aluno" DROP COLUMN "idade",
DROP COLUMN "turma";

-- AlterTable
ALTER TABLE "Boletim" DROP COLUMN "aluno_id",
ADD COLUMN     "alunoId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Boletim_alunoId_key" ON "Boletim"("alunoId");

-- AddForeignKey
ALTER TABLE "Boletim" ADD CONSTRAINT "Boletim_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
