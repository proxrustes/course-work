"use client"

import { prisma } from '@/prisma/prismaClient'
import { Button, Container, Typography } from '@mui/material'
import { user } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Home() {
  const [users, setUsers] = useState<user[]>([])

  useEffect(() => {
    fetch('/api/user', {
      headers: {
        "Content-Type": "application/json"
      },
      method: "GET"
    }).then((res) => res.json())
    .then((json) => setUsers(json.message))
    console.log(users)
  }, [])


  async function handleLogin(password: string) {
    try {
      const res = await fetch("/api/login", {
        body: JSON.stringify({
          password: password
        }),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      })
      const response = await res?.json()
      const status = response.status
      console.log(response)
      if (status === 200) return response.message
      else return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  
  const router = useRouter()

  async function login(token: string) {
    const jwt = await handleLogin(token)
    if (jwt) {
      router.push("/profile")
    } else alert("user not found")
  }
  
  return (
    <Container>
       <Typography variant='h1'>Study Plans</Typography>
       <Typography variant='h4'>Login as:</Typography>
    {users ? users.map((user)=>
    <Button onClick={()=> login(user.name).catch((e) => alert(e))}>{user.name}</Button>
    ) : null}
    </Container>
   
  )
}
