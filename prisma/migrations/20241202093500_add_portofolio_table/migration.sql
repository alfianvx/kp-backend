-- CreateTable
CREATE TABLE "Portofolio" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "short_description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logo_url" TEXT NOT NULL,
    "thumbnail_url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Portofolio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Portofolio_slug_key" ON "Portofolio"("slug");
