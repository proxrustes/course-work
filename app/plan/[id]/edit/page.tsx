"use client";
import { study_plan } from "@/app/api/study-plan/route"
import { EditField } from "@/components/pages/study-plans/EditField";
import { useEffect, useState } from "react"


export default function Plan({ params }: { params: { id: string } }) {
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
    }, [params.id]);
  
    return (
      <>
        {plan ? <EditField study_plan={plan}/> : null}
      </>
    );
  }
  