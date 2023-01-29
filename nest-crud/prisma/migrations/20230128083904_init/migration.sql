-- CreateTable
CREATE TABLE "Jobs" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "description" TEXT,
    "responsibilities" TEXT[],
    "benefits" TEXT[],
    "contact" TEXT[],

    CONSTRAINT "Jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organizations" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "numberOfEmployees" INTEGER NOT NULL,
    "natureOfBusiness" TEXT NOT NULL,

    CONSTRAINT "Organizations_pkey" PRIMARY KEY ("id")
);
