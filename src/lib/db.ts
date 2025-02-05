import { PrismaClient } from '@prisma/client';

declare global {
    // We need to use 'var' here because 'let' and 'const' don't work
    // the same way in global scope declarations
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = db;
}