import prisma from '@/lib/prisma';
import validateEligibleRegister from '@/lib/validateEligibleRegister'
import validatePlayerCount from './validatePlayerCount';

async function registerPlayer({gameId, userId, email, gameDate}: {gameId: string, userId: string, email: string, gameDate: Date}): Promise<any> {

  // check if user is already registered
  const gameUserExist = await prisma.gameUser.findUnique({
    where: {
        gameId_userId: {
          gameId: gameId,
          userId: userId
        }
    },
    include: {
      user: true
    }
  })

  if(gameUserExist) return gameUserExist

  // check if the user is from signifly
  const isEligible = validateEligibleRegister({email, gameDate})
  if(!isEligible)  throw new Error('You can only register for the game 24 hours before the game starts')


  // check if there is still space available
  const isSpaceAvailable = validatePlayerCount({gameId})
  if(!isSpaceAvailable) throw new Error('The game has reached its maximum number of players')

  const gameUser = await prisma.gameUser.create({
    data: {
        gameId: gameId,
        userId: userId
    },
    include: {
      user: true
    }
  })

  return gameUser
}

export default registerPlayer