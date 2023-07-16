import prisma from '@/lib/prisma';

async function unregisterPlayer({gameId, userId}: {gameId: string, userId: string}): Promise<any> {
  const gameUser = await prisma.gameUser.delete({
    where: {
        gameId_userId: {
            gameId: gameId,
            userId: userId
        }
    }
  })

  return gameUser
}

export default unregisterPlayer