import prisma from '@/lib/prisma';

async function getGames(): Promise<any[]> {
  const games = await prisma.game.findMany({
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
        },
    }
    }
  })

  return games
}

export default getGames