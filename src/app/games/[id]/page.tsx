"use client"

import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'

const Game = ({ params }: any) => {

    const { id } = params;

    const [game, setGame] = useState(null as any)
    const [isPending, startTransition] = useTransition()

    useEffect(() => {
        fetch(`http://localhost:3000/api/games?id=${id}`)
          .then((res) => res.json())
          .then((data) => {

            const parsedData = {
                gameDate: new Date(data.gameDate),
                location: data.location,
                opponent: data.opponent,
                players: data.players.map((player: any) => ({
                    registeredDate: new Date(player.updatedAt),
                    id: player.user.id,
                    name: player.user.name,
                }))
            }

            startTransition(() => {

              setGame(() => parsedData)
            })
    
          })
    }, [])

  return (
    <div >
      {game && <div>
        <h3 >Signiflies vs <span>{game.opponent}</span></h3>
        <div >
          <p>{game.gameDate.toDateString()} at {game.gameDate.getHours()}:00</p>
          <p>{game.location}</p>
          <p><span className={``} >{game.players.length}</span> players out of 10</p>
        </div>
        <div>
          <h3>Player list:</h3>
          <ul>
              {game.players.map((player: any) => <li key={player.id}>{player.name}</li>)}
          </ul>
        </div>
      </div>}
    </div>
  )
}

export default Game
