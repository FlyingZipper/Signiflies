import prisma from '@/lib/prisma';

const validatePlayerCount = async ({gameId}: {gameId: string}) => {

    const playerCount = await prisma.gameUser.count({
        where: {
            gameId
        }
    })

    const playerLimit = 10

    return playerCount < playerLimit

}

export default validatePlayerCount