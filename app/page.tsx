"use client"

import { prisma } from '@/prisma/prismaClient'
import { Avatar, Button, Card, Container, Stack, Typography } from '@mui/material'
import { user } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import FaceIcon from '@mui/icons-material/Face';
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
      router.push("/study-plans")
    } else alert("user not found")
  }
  function UserButton(props: {name:string}){
    return(
      <Card variant="outlined" sx={{py:2, width: 200}}>
        <Stack alignItems="center" gap={2}>

<Avatar><FaceIcon/></Avatar>
        <Button variant="contained" onClick={()=> login(props.name).catch((e) => alert(e))}>{props.name}</Button>
        </Stack>
      </Card>
    )
  }
  return (
    <Container>
       <Typography variant='h1'>Study Plans</Typography>
       <Stack direction="row" justifyContent="center" gap={1} flexWrap="wrap">
         {users ? users.map((user)=>
    <UserButton name={user.name}/>
    ) : null}
       </Stack>
   
    </Container>
   
  )
}
