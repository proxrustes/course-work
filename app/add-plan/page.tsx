"use client"
import { Button, Container, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useReducer, useState } from 'react';


export default function AddPlan(){
    const [subjects, setSubjects] = useState([]);
    const [durations, setDurations] = useState([]);
    console.log(subjects, durations)
    useEffect(() => {
        fetch("/api/subject", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        })
          .then((res) => res.json())
          .then((json) => {
            setSubjects(json.message)
          })
      }, [])
      useEffect(() => {
        fetch("/api/study-duration", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        })
          .then((res) => res.json())
          .then((json) => {
            setDurations(json.message)
          })
      }, [])
    return(
        <Container>
        <Typography variant="h2">Add Study Plan</Typography>
    </Container>
    )
}