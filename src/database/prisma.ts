import { PrismaClient } from '../../generated/prisma/client.js';


export const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'], // Mostra o que o banco está fazendo direto no terminal
});