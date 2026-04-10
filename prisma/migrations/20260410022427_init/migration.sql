-- CreateTable
CREATE TABLE "Grid" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "author" TEXT NOT NULL DEFAULT 'Anonymous',
    "category" TEXT NOT NULL DEFAULT 'General',
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Grid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "gridId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "embedUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL DEFAULT '',
    "site" TEXT NOT NULL DEFAULT 'generic',
    "position" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "gridId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "gridId" TEXT NOT NULL,
    "author" TEXT NOT NULL DEFAULT 'Anonymous',
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vote_gridId_sessionId_key" ON "Vote"("gridId", "sessionId");

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_gridId_fkey" FOREIGN KEY ("gridId") REFERENCES "Grid"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_gridId_fkey" FOREIGN KEY ("gridId") REFERENCES "Grid"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_gridId_fkey" FOREIGN KEY ("gridId") REFERENCES "Grid"("id") ON DELETE CASCADE ON UPDATE CASCADE;
