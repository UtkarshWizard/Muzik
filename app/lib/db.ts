import { PrismaClient } from "@prisma/client"

export const prismaClient = new PrismaClient();
// this isnt the best we should call atleast singleton here.