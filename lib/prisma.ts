import { PrismaClient } from '../app/generated/prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const globalForPrisma = global as unknown as {
	prisma: PrismaClient;
};

const prisma =
	globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());

// const prisma =
// 	globalForPrisma.prisma ??
// 	new PrismaClient({
// 		log:
// 			process.env.NODE_ENV === 'development'
// 				? ['query', 'error', 'warn'] // Додаємо 'query' сюди
// 				: ['error'],
// 	});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
