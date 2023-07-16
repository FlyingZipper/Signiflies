'use client'

import { useState, useEffect, useTransition } from 'react'
import { Card } from '@/components/GameCard/GameCard'
import { CardLabel } from '@/components/CardLabel/CardLabel'
import styles from './CardGrid.module.scss'
import { ICard } from '@/interfaces/ICard'
import { useSession } from 'next-auth/react'

export function CardGrid() {

  const { data, status } = useSession()

  const [games, setGames] = useState([] as ICard[])
  const [isPending, startTransition] = useTransition()

  const currentDate = new Date()

  useEffect(() => {
    fetch('http://localhost:3000/api/games')
      .then((res) => res.json())
      .then((data) => {

        const gamesData = data.map((card: ICard) => ({
          ...card,
          gameDate: new Date(card.gameDate),
          players: card.players.map((player: any) => ({
            registeredDate: new Date(player.updatedAt),
            id: player.user.id,
            name: player.user.name,
          }))
        }))

        gamesData.sort((a: ICard, b: ICard) => a.gameDate.getTime() - b.gameDate.getTime())

        startTransition(() => {
          setGames(() => [...gamesData])
        })

      })
  }, [])

  return (
    <div className={styles.Container} >
      <h1 className={styles.Heading} >Upcoming Games</h1>
      <CardLabel />
      {games.length > 0 && <div className={styles.Layout} >
          {games.filter((card: ICard) => card.gameDate > currentDate).map((card: ICard, i: number) => <Card currentUser={data?.user} key={i} {...card} />)}
      </div>}
    </div>
  )
}
