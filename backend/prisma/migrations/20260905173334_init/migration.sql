-- CreateTable
CREATE TABLE "ReminderPreference" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "emailNotifications" BOOLEAN NOT NULL DEFAULT true,
    "reminder30Days" BOOLEAN NOT NULL DEFAULT true,
    "reminder60Days" BOOLEAN NOT NULL DEFAULT true,
    "reminder90Days" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReminderPreference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReminderPreference_userId_key" ON "ReminderPreference"("userId");

-- AddForeignKey
ALTER TABLE "ReminderPreference" ADD CONSTRAINT "ReminderPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
