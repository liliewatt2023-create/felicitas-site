-- Add new fields to User table
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "firstName" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "lastName" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "phone" TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "committeeCodeUsed" TEXT;

-- Create index on committeeCodeUsed
CREATE INDEX IF NOT EXISTS "User_committeeCodeUsed_idx" ON "User"("committeeCodeUsed");

-- Create CommitteeCode table if it doesn't exist (pour usage futur)
CREATE TABLE IF NOT EXISTS "CommitteeCode" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL UNIQUE,
    "companyName" TEXT NOT NULL,
    "contactEmail" TEXT,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "usedBy" TEXT,
    "createdBy" TEXT NOT NULL DEFAULT 'admin',
    "expiresAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Create indexes for CommitteeCode
CREATE INDEX IF NOT EXISTS "CommitteeCode_code_idx" ON "CommitteeCode"("code");
CREATE INDEX IF NOT EXISTS "CommitteeCode_isUsed_idx" ON "CommitteeCode"("isUsed");
CREATE INDEX IF NOT EXISTS "CommitteeCode_createdBy_idx" ON "CommitteeCode"("createdBy");
