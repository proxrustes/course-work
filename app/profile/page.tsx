"use client"

import { AdminProfile } from "@/components/pages/profile/AdminProfile";
import { DeanProfile } from "@/components/pages/profile/DeanProfile";
import { DepartmentHeadProfile } from "@/components/pages/profile/DepartmentHeadProfile";
import { ProfessorProfile } from "@/components/pages/profile/ProfessorProfile";
import { StudentProfile } from "@/components/pages/profile/StudentProfile";
import useCurrentUser from "@/hooks/auth/useCurrentUser";
import { Button, Container, Typography } from "@mui/material";
import Cookies from "js-cookie"
import { useRouter } from "next/navigation";


export default function Profile(){
    
  const router = useRouter()
    const [user] = useCurrentUser()
    function handleLogout(){
    
        Cookies.remove("currentUser")
        
      router.push("/")
    }
    return (
        <Container>
<Typography variant="h3" sx={{mb: 4}}>Welcome {user?.name ?? ''}</Typography>
{user != null ? (
        <>
          {user.access_level === 1 && <StudentProfile/>}
          {user.access_level === 2 && <ProfessorProfile/>}
          {user.access_level === 3 && <DepartmentHeadProfile/>}
          {user.access_level === 4 && <DeanProfile/>}
          {user.access_level === 5 && <AdminProfile/>}
          {user.access_level === 6 && <StudentProfile/>}
         
          <center>
            {" "}
            <Button color="secondary" variant="text" onClick={handleLogout}
            sx={{mt: 5}}>
              Logout
            </Button>
          </center>
        </>
      ) : (
        <></>
      )}
        </Container>
    )
}