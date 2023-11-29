"use client"
import { study_plan } from "@/app/api/study-plan/route"
import useCurrentUser from "@/hooks/auth/useCurrentUser"
import { Box, Button, Container, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Plan({ params }: { params: { id: string } }) {
    const [user] = useCurrentUser()
    const router = useRouter()
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
        <Box>
          <Typography>subject: {plan.subject.subject_name}</Typography>
          <Typography>Duration: {plan.duration.duration_length} yrs</Typography>
          <Typography>Department: {plan.department.department_name}</Typography>
          <Typography>Level: {plan.level.level_name}</Typography>
          <Typography>
            Qualification: {plan.qualification.qualification_name}
          </Typography>
          <Typography>Department: {plan.speciality.speciality_name}</Typography>
          <Typography variant="h4">{plan.title}</Typography>
          <Typography>{plan.text}</Typography>
        </Box>
      )
      
      }
      {plan && user?.access_level && user.access_level > 1 ?
    <Button onClick={()=> router.push(`/plan/${plan.plan_id}/edit`)}>Edit Plan</Button>  : <></>
    }
    </Container>
  );
}
