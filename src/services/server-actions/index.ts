import prisma from "../lib/prisma"

export const fetchRoles = async () => {
    return await prisma.roles.findMany();
}