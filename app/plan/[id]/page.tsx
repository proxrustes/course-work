"use client";
import { study_plan } from "@/app/api/study-plan/route";
import useCurrentUser from "@/hooks/auth/useCurrentUser";
import {
  Button,
  Chip,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { plan_change } from "@/app/api/study-plan/[id]/changes/route";
import { PlanChanges } from "@/components/pages/study-plans/PlanChanges";

export default function Plan({ params }: { params: { id: string } }) {
  const [user] = useCurrentUser();
  const router = useRouter();
  const [plan, setPlan] = useState<study_plan>();
  const [changes, setChanges] = useState<plan_change[]>([]);
  const [suggestion, setSuggestion] = useState("");
  const [showSuggestionBox, setShowSuggestionBox] = useState(false);
  function submitSuggestion() {
    const payload = {
      user_id: user?.user_id,
      change_description: suggestion,
    };
    if (user?.user_id) {
      fetch(`/api/study-plan/${params.id}/changes`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        method: "POST",
      });
      fetchChanges();
      setSuggestion("");
      setShowSuggestionBox(false);
    }
  }

  function fetchChanges() {
    fetch(`/api/study-plan/${params.id}/changes`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        const message = json.message;
        setChanges(message);
      })
  }
  function fetchPlan() {
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
  }

  useEffect(() => {
    fetchChanges();
    fetchPlan();
  }, []);

  function handleApprove(n: number) {
    fetch(`/api/study-plan/${params.id}/approve`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({ is_approved: n }),
    }).then(fetchPlan);
  }

  return (
    <Container maxWidth="xl">
      {plan && (
        <>
          {" "}
          <Stack direction="row" gap={2} sx={{ mt: 4 }}>
            <Stack
              sx={{
                border: "2px solid #324376",
                p: 2,
                borderRadius: 2,
                width: 250,
              }}
            >
              <Typography variant="button">Subject:</Typography>
              <Typography sx={{ fontWeight: 800 }}>
                {plan.subject.subject_name}
              </Typography>

              <Typography variant="button" sx={{ mt: 2 }}>
                Duration:
              </Typography>
              <Typography sx={{ fontWeight: 800 }}>
                {plan.duration.duration_length} yrs
              </Typography>
              <Typography variant="button" sx={{ mt: 2 }}>
                Department
              </Typography>
              <Typography sx={{ fontWeight: 800 }}>
                {plan.department.department_name}
              </Typography>
              <Typography variant="button" sx={{ mt: 2 }}>
                Level
              </Typography>
              <Typography sx={{ fontWeight: 800 }}>
                {plan.level.level_name}
              </Typography>
              <Typography variant="button" sx={{ mt: 2 }}>
                Qualification
              </Typography>
              <Typography sx={{ fontWeight: 800 }}>
                {" "}
                {plan.qualification.qualification_name}
              </Typography>
              <Typography variant="button" sx={{ mt: 2 }}>
                Department
              </Typography>
              <Typography sx={{ fontWeight: 800 }}>
                {plan.speciality.speciality_name}
              </Typography>

              {plan && user?.access_level && user.access_level > 1 ? (
                <Divider>
                  <Chip sx={{ my: 2 }} label="actions"></Chip>
                </Divider>
              ) : (
                <></>
              )}

              <Stack gap={2}>
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
                {plan && user?.access_level && user.access_level == 2 ? (
                  <Button
                    fullWidth
                    variant="outlined"
                    color="inherit"
                    onClick={() => setShowSuggestionBox(!showSuggestionBox)}
                  >
                    Suggest Changes
                  </Button>
                ) : (
                  <></>
                )}
                {plan && user?.access_level && user.access_level == 4 ? (
                  <Button
                    fullWidth
                    disabled={plan.is_approved === 1}
                    variant="outlined"
                    color="inherit"
                    onClick={() => handleApprove(1)}
                  >
                    Approve Plan
                  </Button>
                ) : (
                  <></>
                )}
                {plan && user?.access_level && user.access_level > 2 ? (
                  <Button fullWidth variant="outlined" color="inherit">
                    Delete Plan
                  </Button>
                ) : (
                  <></>
                )}
              </Stack>
            </Stack>
            <Stack width="100%" gap={2}>
              <Typography variant="h4" sx={{ fontWeight: 800 }}>
                {plan.is_approved === 1 ? (
                  <CheckCircleOutlineIcon />
                ) : (
                  <ErrorOutlineIcon />
                )}{" "}
                {plan.title}
              </Typography>
              <TextField
                fullWidth
                multiline
                variant="outlined"
                disabled
                value={plan.text}
              />
            </Stack>
          </Stack>
          {showSuggestionBox && (
            <Stack gap={2} sx={{ my: 2 }}>
              <TextField
                fullWidth
                multiline
                variant="outlined"
                placeholder="Type your suggestion here..."
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
              />
              <Button
                variant="outlined"
                color="inherit"
                onClick={submitSuggestion}
              >
                Submit
              </Button>
            </Stack>
          )}
          <Typography variant="h5" sx={{ mt: 4 }}>
            Suggested changes:
          </Typography>
          <PlanChanges
            fetchChanges={fetchChanges}
            changes={changes}
            planId={plan.plan_id}
            user={user}
          />
        </>
      )}
    </Container>
  );
}
