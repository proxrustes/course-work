"use client";

import { Container, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { user } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import FaceIcon from "@mui/icons-material/Face";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AddReactionIcon from '@mui/icons-material/AddReaction';
export default function Home() {
  const [users, setUsers] = useState<user[]>([]);

  useEffect(() => {
    fetch("/api/user", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => setUsers(json.message));
    console.log(users);
  }, []);

  async function handleLogin(password: string) {
    try {
      const res = await fetch("/api/login", {
        body: JSON.stringify({
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const response = await res?.json();
      const status = response.status;
      if (status === 200) return response.message;
      else return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  const router = useRouter();

  type UserIcons = {
    [key: string]: JSX.Element;
  };
  const userIcons: UserIcons = {
    Student: <FaceIcon />,
    Professor: <SchoolIcon />,
    "Department Head": <WorkIcon />,
    Dean: <AccountBalanceIcon />,
    Administrator: <AddReactionIcon/>
  };
  async function login(token: string) {
    const jwt = await handleLogin(token);
    if (jwt) {
      router.push("/study-plans");
    } else alert("user not found");
  }

  function UserButton(props: { name: string; icon: ReactNode }) {
    return (
      <Tooltip title={props.name}>
        <IconButton onClick={() => login(props.name).catch((e) => alert(e))}>
          {props.icon}
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <Container>
      <Typography variant="h1">Навчальні Плани</Typography>
      <Typography variant="button">Log in as:</Typography>
      <Stack direction="row" justifyContent="center" gap={1} flexWrap="wrap">
        {users
          ? users.map((user) => (
              <UserButton
                name={user.name}
                icon={userIcons[user.name] || <FaceIcon />}
              />
            ))
          : null}
      </Stack>
    </Container>
  );
}
