-- CreateTable
CREATE TABLE "Grid" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "author" TEXT NOT NULL DEFAULT 'Anonymous',
    "category" TEXT NOT NULL DEFAULT 'General',
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gridId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "embedUrl" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL DEFAULT '',
    "site" TEXT NOT NULL DEFAULT 'generic',
    "position" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Video_gridId_fkey" FOREIGN KEY ("gridId") REFERENCES "Grid" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gridId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Vote_gridId_fkey" FOREIGN KEY ("gridId") REFERENCES "Grid" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gridId" TEXT NOT NULL,
    "author" TEXT NOT NULL DEFAULT 'Anonymous',
    "text" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Comment_gridId_fkey" FOREIGN KEY ("gridId") REFERENCES "Grid" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Vote_gridId_sessionId_key" ON "Vote"("gridId", "sessionId");
