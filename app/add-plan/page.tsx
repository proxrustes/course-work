import { Button, Container, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useReducer, useState } from 'react';


export default function AddPlan(){
    const [subjects, setSubjects] = useState([]);
    const [durations, setDurations] = useState([]);
   
   
    return(
        <Container>
        <Typography variant="h2">Add Study Plan</Typography>
    </Container>
    )
}