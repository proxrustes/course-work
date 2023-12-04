"use client";

import { Breadcrumbs, Button, Divider, Stack } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
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
        </Breadcrumbs>
      </Stack>
      <Divider />
    </>
  );
}
