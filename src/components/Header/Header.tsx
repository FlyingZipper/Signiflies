import React, { useEffect, useMemo } from 'react'
import Image from 'next/image'
import styles from './Header.module.scss'
import { Button } from '../Button/Button'
import { signOut, signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
// import { auth } from "@/auth"

export const Header = () => {

  // status IN "loading" | "authenticated" | "unauthenticated"

  const { data, status } = useSession()

  return (
    <div className={styles.Layout} >
        <Link href='/'>
            Signiflies
        </Link>
        <div className={styles.ButtonWrapper} >
            {
              status && status === "authenticated" && data && data.user && data.user.image ? (
                <div className={styles.SignInLayout} >
                  <div className={styles.ProfileLayout} >
                    <Image className={styles.ProfileImage} src={data.user.image} alt="user image" width={40} height={40} />
                    <p>{data?.user?.name}</p>
                  </div>
                  <Button white callback={() => signOut()} >Sign out</Button>
                </div>
              ) : (
                  <div>
                    <Button white callback={() => signIn()} >Sign in</Button>
                  </div>
              )
            }
        </div>
    </div>
  )
}