"use client"
import { Container, ListItem, List, Typography } from "@mui/material";
import { study_plan } from "@prisma/client";
import { useEffect, useState } from "react";

export default function StudyPlans(){
    const [plans, setUsers] = useState<study_plan[]>([])
    console.log(plans)
    useEffect(() => {
      fetch('/api/study-plan', {
        headers: {
          "Content-Type": "application/json"
        },
        method: "GET"
      }).then((res) => res.json())
      .then((json) => setUsers(json.message))
    }, [])
  


    return(
        <Container>
            <Typography variant="h2">Study PLans Overview</Typography>
            <List>
            {plans && plans.map((plan)=>
            <ListItem>{plan.creation_date.toString()}: {plan.text}</ListItem>
            )}
            </List>
           
        </Container>
    )
}