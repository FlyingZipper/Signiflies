import Link from 'next/link'
import React, { useTransition, useState } from 'react'
import styles from './GameCard.module.scss'
import { ICard } from '@/interfaces/ICard'
import { Button } from '../Button/Button'
import { BounceLoader } from "react-spinners";
import validateEligibleRegister from '@/lib/validateEligibleRegister'


export const Card = ({id, gameDate, location, players, opponent, currentUser} : ICard) => {

  const locationUrl = 'https://www.google.com/maps/place/Saputo+Soccer+Complex/@45.5611586,-73.5514661,194m/data=!3m1!1e3!4m6!3m5!1s0x4cc91de3d9b3da95:0xfa43893fa41807eb!8m2!3d45.5611153!4d-73.5515196!16s%2Fg%2F11gyxd_ln2?entry=ttu'

  const [expanded, setExpanded] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [loading, setLoading] = useState(false)
  const [isRegistered, setIsRegistered] = useState(() => players.find((player) => player?.id === currentUser?.id))
  const [registeredPlayers, setRegisteredPlayers] = useState(() => players)
  const isEligibleRegister = validateEligibleRegister({email: currentUser?.email, gameDate})

  const registerPlayer = async () => {
    setLoading(true)
    fetch('/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cancel: false,
        gameId: id,
        userId: currentUser?.id,
        email: currentUser?.email,
        gameDate: gameDate,
      })
    })
    .then((res) => {
      if(res.status === 200) {
        res.json().then((data) => {
          console.log(data)
           // add player to from localPlayers
           console.log('res',data)
           console.log('registeredPlayers', registeredPlayers)
           const player = {
              id: data.user.id,
              name: data.user.name,
              registeredDate: new Date(data.user.updatedAt),
           }
           setRegisteredPlayers((it) => [...it, player])
        })
        startTransition(() => setIsRegistered(true))
      }
    })
    .catch(() => {
      startTransition(() => setIsRegistered(false))
    })
    .finally(() => {
      setLoading(false)
    })
  }

  const unregisterPlayer = async () => {
    setLoading(true)
    fetch('/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cancel: true,
        gameId: id,
        userId: currentUser?.id
      })
    })
    .then((res) => {
      if(res.status === 200) {
        startTransition(() => setIsRegistered(false))
        // remove player to from localPlayers
        setRegisteredPlayers((it) => it.filter((player) => player?.id !== currentUser?.id))
      }
    })
    .catch(() => {
      startTransition(() => setIsRegistered(true))
    })
    .finally(() => {
      setLoading(false)
    })
  }


  return (
    <div className={styles.Card} >
      <div className={styles.Layout} >
        <h3 className={styles.Heading} >{opponent}</h3>
        <p>{gameDate.toDateString()} at {gameDate.getHours()}:00</p>
        <Link href={locationUrl}>{location}</Link>
        <p className={styles.PlayerCount} >{registeredPlayers.length}</p>
        <p className={styles.PlayerCountMobile} >{`Player Count: ${registeredPlayers.length}`}</p>
        {isEligibleRegister ? <div className={styles.ButtonLayout} >
          {loading ? <BounceLoader size={32} color='#000' /> : !isRegistered ? (
            <Button outlineBlack rounded callback={() => registerPlayer()} >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={16} height={16} >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </Button>
          ) : (
            <Button disabled={!isRegistered} faded={!isRegistered} green rounded callback={() => unregisterPlayer()} >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={16} height={16} >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </Button>
          )}
        </div> : (<div>{
          registeredPlayers.length > 10 ? 'The game has reached its maximum number of players.' :
          (currentUser ? 
            'You must wait 24 hours before registering for the game.' : 
              'Login to register.')
            }</div>)}
      </div>
      <div className={styles.Divider} />
      <div className={styles.Expander}  onClick={() => setExpanded(!expanded)} >
        {expanded ? 
        (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={16} height={16}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>) : 
        (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={16} height={16} >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>)
        }
      </div>
      {expanded && <div className={styles.PlayerList}  >
        {registeredPlayers && registeredPlayers.map((player) => <p key={player.id} className={styles.Player} >{player.name}</p>)}
      </div>}
  </div>
)
}
