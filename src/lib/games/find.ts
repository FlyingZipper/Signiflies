import prisma from '@/lib/prisma';

async function find({id}: {id: string}) {
    return await prisma.game.findUniqueOrThrow({
        where: {
            id
        },
        include: {
            players: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        }
                    }
                }
            }
        }
    })
}   

export default find