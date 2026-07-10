/*
  Warnings:

  - You are about to drop the `Poste` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usere` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Poste" DROP CONSTRAINT "Poste_authorId_fkey";

-- DropTable
DROP TABLE "Poste";

-- DropTable
DROP TABLE "Usere";

-- CreateTable
CREATE TABLE "Goal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "waterDuration" INTEGER NOT NULL,
    "milestoneEnabled" BOOLEAN NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entry" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Goal_name_key" ON "Goal"("name");

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_id_fkey" FOREIGN KEY ("id") REFERENCES "Goal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
