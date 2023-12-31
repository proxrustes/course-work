"use client";
import {
  Container,
  List,
  Typography,
  ListItemButton,
  ListItemText,
  Button,
  Avatar,
  ListItemAvatar,
  Stack,
} from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { study_plan } from "../api/study-plan/route";
import {
  ACTIONS,
  FilterMenu,
  FilterState,
  SetFilterAction,
} from "@/components/pages/study-plans/FilterMenu";
import { filterPlans } from "@/lib/filtering/filterPlans";
import { useRouter } from "next/navigation";
import useCurrentUser from "@/hooks/auth/useCurrentUser";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Header } from "@/components/common/Header";

const filterReducer = (
  state: FilterState,
  action: SetFilterAction
): FilterState => {
  if (ACTIONS[action.type]) {
    return { ...state, ...action.payload };
  }
  return state;
};

const initialFilterState: FilterState = {
  is_approved: "all",
  speciality_id: [],
  level_id: [],
  department_id: [],
  faculty_id: [],
  subject_id: [],
  form_id: [],
  duration_id: [],
};

export default function StudyPlans() {
  const router = useRouter();
  const [user] = useCurrentUser();
  const [plans, setPlans] = useState<study_plan[]>([]);

  const [filteredPlans, setFilteredPlans] = useState<study_plan[]>([]);
  const [filterState, dispatchFilter] = useReducer(
    filterReducer,
    initialFilterState
  );
  useEffect(() => {
    const filteredPlans = filterPlans(plans, filterState);
    setFilteredPlans(filteredPlans);
  }, [filterState]);

  useEffect(() => {
    fetch("/api/study-plan", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        const message = json.message;
        setPlans(message);
        setFilteredPlans(message);
      });
  }, []);

  return (
    <Container maxWidth="xl">
      <Header />
      <Typography variant="h4" sx={{mt:4}}>Перегляд Навчальних Планів</Typography>
      <Stack direction="row" gap={2}> 
     
        <Stack alignContent="center" width="100%">
          <List>
            {filteredPlans.length > 0 && (
              filteredPlans.map((plan) => (
                <ListItemButton
                  onClick={() => router.push(`/plan/${plan.plan_id}`)}
                >
                  <ListItemAvatar>
                    <Avatar>
                      {plan.is_approved === 1 ? (
                        <CheckCircleOutlineIcon />
                      ) : (
                        <ErrorOutlineIcon />
                      )}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={plan.title}
                    secondary={`${plan.faculty.faculty_name}, ${plan.department.department_name}: ${plan.subject.subject_name}`}
                  />
                </ListItemButton>
              ))
            ) }
          </List>
        </Stack>
        <Stack>
          <FilterMenu
            study_plans={filteredPlans}
            filterState={filterState}
            dispatchFilter={dispatchFilter}
          />
          {user?.access_level && user?.access_level === 3 && (
            <Button color="inherit" variant="outlined" href="/add-plan">Створити план</Button>
          )}
        </Stack>
      </Stack>
    </Container>
  );
}
