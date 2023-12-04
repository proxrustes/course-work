"use client";
import { plan_change } from "@/app/api/study-plan/[id]/changes/route";
import { study_plan } from "@/app/api/study-plan/route";
import { EditField } from "@/components/pages/study-plans/EditField";
import { PlanChanges } from "@/components/pages/study-plans/PlanChanges";
import { ERROR_TYPES } from "@/definitions/enums/errors";
import useCurrentUser from "@/hooks/auth/useCurrentUser";
import { Container, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Plan({ params }: { params: { id: string } }) {
  const [user] = useCurrentUser();
  const router = useRouter();
  const [plan, setPlan] = useState<study_plan>();
  const [changes, setChanges] = useState<plan_change[]>([]);

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
      });
  }
  useEffect(() => {
    if (user?.access_level && user?.access_level < 3) {
      router.push(`/error/${ERROR_TYPES.ACCESS_DENIED}`);
    }
  }, [user, plan]);
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
    fetchChanges();
  }, [params.id]);

  return (
    <>
      {plan && user?.access_level && user?.access_level > 2 ? (
        <Container maxWidth="xl">
          <EditField study_plan={plan} />
          <Typography variant="h5" sx={{ mt: 4 }}>
            Запропоновані зміни:
          </Typography>
          <PlanChanges
            fetchChanges={fetchChanges}
            changes={changes}
            planId={plan.plan_id}
            user={user}
          />
        </Container>
      ) : null}
    </>
  );
}
