"use client";
import { study_plan } from "@/app/api/study-plan/route";
import useCurrentUser from "@/hooks/auth/useCurrentUser";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

export default function Plan({ params }: { params: { id: string } }) {
  const [user] = useCurrentUser();
  const router = useRouter();
  const [plan, setPlan] = useState<study_plan>();
  useEffect(() => {
    fetch(`/api/study-plan/${params.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        const message = json.message;
        setPlan(message);
      });
  }, []);

  return (
    <Container maxWidth="xl">
      {plan && (
        <Stack direction="row" gap={2} sx={{ mt: 4 }}>
          <Stack
            sx={{
              color: "white",
              backgroundColor: "#324376",
              p: 2,
              borderRadius: 2,
              width: 250
            }}
          >
            <Typography variant="button" sx={{mt:2}}>Subject:</Typography>
            <Typography sx={{fontWeight: 800}}>
          {plan.subject.subject_name}</Typography>
            
          <Typography variant="button" sx={{mt:2}}>Duration:</Typography>
            <Typography sx={{fontWeight: 800}}>{plan.duration.duration_length} yrs
            </Typography>
            <Typography variant="button" sx={{mt:2}}>
              Department
            </Typography>
            <Typography sx={{fontWeight: 800}}>
             {plan.department.department_name}
            </Typography>
            <Typography variant="button" sx={{mt:2}}>
              Level
            </Typography>
            <Typography sx={{fontWeight: 800}}>{plan.level.level_name}</Typography>
            <Typography variant="button" sx={{mt:2}}>
            Qualification
            </Typography>
            <Typography sx={{fontWeight: 800}}> {plan.qualification.qualification_name}
            </Typography>
            <Typography variant="button" sx={{mt:2}}>
            Department
            </Typography>
            <Typography sx={{fontWeight: 800}}>{plan.speciality.speciality_name}
            </Typography>
            <Divider >
              <Chip sx={{color:"white", my:2}} label="actions"></Chip>
            </Divider>
            {plan && user?.access_level && user.access_level > 2 ? (
              <Button
                fullWidth
                variant="outlined"
                color="inherit"
                onClick={() => router.push(`/plan/${plan.plan_id}/edit`)}
              >
                Edit Plan
              </Button>
            ) : (
              <></>
            )}
            {plan && user?.access_level && user.access_level > 1 ? (
              <Button
                fullWidth
                variant="outlined"
                color="inherit"
                onClick={() => router.push(`/plan/${plan.plan_id}/edit`)}
              >
                Suggest Changes
              </Button>
            ) : (
              <></>
            )}
          </Stack>
          <Stack width="100%">
            <Typography variant="h4" sx={{fontWeight: 800}}>
            {plan.is_approved === 1 ? <CheckCircleOutlineIcon/> : <ErrorOutlineIcon/>}
      {plan.title}</Typography>
            <TextField
              fullWidth
              multiline
              variant="outlined"
              disabled
              value={plan.text}
            />
          </Stack>
        </Stack>
      )}
    </Container>
  );
}
