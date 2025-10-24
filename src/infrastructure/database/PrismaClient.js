// src/infrastructure/database/PrismaClient.js
const { PrismaClient } = require('@prisma/client');

// Creamos una única instancia global
const prisma = new PrismaClient();

module.exports = prisma;