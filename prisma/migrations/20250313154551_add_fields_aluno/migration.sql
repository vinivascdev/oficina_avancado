/*
  Warnings:

  - Added the required column `idade` to the `Aluno` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turma` to the `Aluno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Aluno" ADD COLUMN     "idade" INTEGER NOT NULL,
ADD COLUMN     "turma" TEXT NOT NULL;
