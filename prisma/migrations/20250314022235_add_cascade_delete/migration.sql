-- DropForeignKey
ALTER TABLE "Boletim" DROP CONSTRAINT "Boletim_alunoId_fkey";

-- AddForeignKey
ALTER TABLE "Boletim" ADD CONSTRAINT "Boletim_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE CASCADE ON UPDATE CASCADE;
