import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if(process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;


// This file, located at d:\road-to-next\src\lib\prisma.ts, sets up and exports a singleton instance of the Prisma Client for database interactions. Here's a breakdown of its functionality:
// Importing PrismaClient: The PrismaClient is imported from the @prisma/client package. This is the main class used to interact with the database.
// Global Object for Prisma: A global object (globalForPrisma) is created to store the Prisma Client instance. This ensures that the Prisma Client is not re-instantiated multiple times, which can cause issues in development environments where hot-reloading is common.
// Singleton Prisma Instance:
// The prisma constant is assigned either the existing prisma instance from the global object or a new instance of PrismaClient.
// This ensures that only one instance of PrismaClient exists throughout the application lifecycle.
// Environment Check:
// If the NODE_ENV environment variable is not set to "production", the prisma instance is stored in the global object (globalForPrisma.prisma).
// This prevents multiple instances of PrismaClient from being created during development, which can lead to performance issues or warnings.
// Exporting Prisma: The prisma instance is exported for use in other parts of the application, allowing database queries to be performed.

// This setup is a common pattern in applications using Prisma to ensure efficient and consistent database connections, especially in environments with hot-reloading like Next.js.