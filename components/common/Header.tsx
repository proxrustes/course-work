"use client"

import { Box, Button, Stack } from "@mui/material";
import Cookies from "js-cookie"
import { useRouter } from "next/navigation";

export function Header(){
    const router = useRouter()
    function handleLogout(){
    
      Cookies.remove("currentUser")
      router.push("/")
    }
    return(
        <Stack direction="row">
       <Button color="secondary" variant="text" onClick={handleLogout}>
              Logout
            </Button>
            <Button href="/study-plans">Plans Overview</Button>
      </Stack>
    )
}