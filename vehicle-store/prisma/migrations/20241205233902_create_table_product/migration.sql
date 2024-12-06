-- CreateTable
CREATE TABLE "produto" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "category" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("id")
);
