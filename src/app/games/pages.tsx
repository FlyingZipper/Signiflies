"use server"

import { useRouter } from 'next/router'
import React from 'react'
import { redirect } from 'next/navigation';

export default async function Games({ params }: any) {
    redirect('/');
}