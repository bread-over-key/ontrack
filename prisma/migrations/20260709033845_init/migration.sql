-- CreateTable
CREATE TABLE "Usere" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Usere_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poste" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Poste_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usere_email_key" ON "Usere"("email");

-- AddForeignKey
ALTER TABLE "Poste" ADD CONSTRAINT "Poste_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Usere"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
