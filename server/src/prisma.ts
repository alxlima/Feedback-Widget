import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    log:['query'], // cada operação do prima gero um log execução query
});