"use client";

import { Breadcrumbs, Button, Divider, Stack } from "@mui/material";
import { user } from "@prisma/client";
import { decodeJwt } from "jose";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function Header(props: {user?: user}) {
  const router = useRouter();
  const [token_user, setTokenUser] = useState<user>()

  useEffect(() => {
    try{
      const user = decodeJwt( Cookies.get("currentUser") || '') as user;
      setTokenUser(user)
   } catch {}
  }, []);

  
  function handleLogout() {
    Cookies.remove("currentUser");
    router.push("/");
  }
  return (
    <>
      <Stack direction="row">
        <Breadcrumbs aria-label="breadcrumb">
          <Button color="inherit" variant="text" onClick={handleLogout}>
            Вийти
          </Button>
          <Button color="inherit" variant="text" href="/study-plans">
            Перегляд планів
          </Button>
          {token_user?.access_level == 5 ?  <Button color="inherit" variant="text" href="/admin-panel">
            Панель керування
          </Button> : null}
        </Breadcrumbs>
      </Stack>
      <Divider />
    </>
  );
}
