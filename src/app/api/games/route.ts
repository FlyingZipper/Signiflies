import { NextResponse, NextRequest } from 'next/server'
import registerPlayer from '@/lib/registerPlayer'
import unregisterPlayer from '@/lib/unregisterPlayer'
import getGames from '@/lib/getGames'
import find from '@/lib/games/find'

// https://nextjs.org/docs/app/building-your-application/routing/router-handlers
 
export async function GET(req: Request) { 

  const id = (new URL(req.url)).searchParams.get('id')
  if(!id) {
    const games = await getGames()

    return NextResponse.json(games) 
  }

  const game = await find({id})
  return NextResponse.json(game) 
  
}

export async function POST(req: Request) {
  
  const body = await req.json()

  let registeredPlayer = null

  if(body.cancel) {
    registeredPlayer = await unregisterPlayer({ ...body })
  }
  else {
    registeredPlayer = await registerPlayer({ ...body })
  }

  return NextResponse.json(registeredPlayer)
}