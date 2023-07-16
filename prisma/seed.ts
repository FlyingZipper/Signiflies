const { PrismaClient } = require('@prisma/client')
// const { GameFactory } = require('./Factory/GameFactory')

const games = [
  {
        "date": '2023-06-08T21:00:00',
        "location": "Olympic Park A",
        "opponent": {"name": "Oberson Football Club", "link": ""}
  },
  {
        "date": '2023-06-15T20:00:00',
        "location": "Olympic Park A",
        "opponent": {"name": "NEUF Architectes Inc.", "link": ""}
  },
  {
        "date": '2023-06-22T19:00:00',
        "location": "Olympic Park A",
        "opponent": {"name": "CMN 2", "link": ""}
  },
  {
        "date": '2023-06-29T21:00:00',
        "location": "Olympic Park A",
        "opponent": {"name": "FC Merkur", "link": ""}
  },
  {
        "date": '2023-07-06T19:00:00',
        "location": "Olympic Park A",
        "opponent": {"name": "DECATHLON LOG CANADA", "link": ""}
  },
  {
        "date": '2023-07-13T21:00:00',
        "location": "Olympic Park A",
        "opponent": {"name": "Oberson Football Club", "link": ""}
  },
  {
        "date": '2023-07-20T19:00:00',
        "location": "Olympic Park A",
        "opponent": {"name": "NEUF Architectes Inc.", "link": ""}
  },
  {
        "date": '2023-07-27T20:00:00',
        "location": "Olympic Park A",
        "opponent": {"name": "CMN", "link": ""}
  },
  {
        "date": '2023-08-03T19:00:00',
        "location": "Olympic Park A",
        "opponent": {"name": "FC Merkur", "link": ""}
  },
  {
        "date": '2023-09-07T21:00:00',
        "location": "Olympic Park A",
        "opponent": {"name": "DECATHLON LOG CANADA", "link": ""}
  },
  {
        "date": '2023-09-14T22:00:00',
        "location": "Olympic Park A",
        "opponent": {"name": "Oberson Football Club", "link": ""}
  },
  {
        "date": '2023-09-21T20:00:00',
        "location": "Olympic Park A",
        "opponent": {"name": "NEUF Architectes Inc.", "link": ""}
  },
  {
        "date": '2023-09-28T21:00:00',
        "location": "Olympic Park A",
        "opponent": {"name": "CMN", "link": ""}
  }
]

interface IOpponent {
  name: string
  link: string
}

interface IGame {
    date: string,
    location: string,
    opponent: IOpponent
}

const prismaClient = new PrismaClient()

async function main() {
    const gamesData = games.map((game: IGame) => {
        return {
            gameDate: (new Date(game.date)).toISOString(),
            location: game.location,
            opponent: game.opponent.name
        }
    })

    try {
        return await prismaClient.game.createMany({
            data: gamesData
        })
    } catch (error) {
        console.log('Error while seeding the games:', error)
    }
}

main()
  .then(async () => {
    await prismaClient.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prismaClient.$disconnect()
  })

  module.exports = { }