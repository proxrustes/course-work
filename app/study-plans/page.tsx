"use client";
import {
  Container,
  List,
  Typography,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { study_plan } from "../api/study-plan/route";
import {
  ACTIONS,
  FilterMenu,
  FilterState,
  SetFilterAction,
} from "@/components/pages/study-plans/FilterMenu";
import { filterPLans } from "@/lib/filtering/filterPlans";

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
  qualification_id: [],
};

export default function StudyPlans() {
  const [plans, setPlans] = useState<study_plan[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<study_plan[]>([]);

  const [filterState, dispatchFilter] = useReducer(
    filterReducer,
    initialFilterState
  );
  useEffect(() => {
    const filteredPlans = filterPLans(plans, filterState);
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
    <Container>
      <Typography variant="h2">Study Plans Overview</Typography>

      <List>
        {filteredPlans &&
          filteredPlans.map((plan) => (
            <ListItemButton>
              <ListItemText
                primary={plan.title}
                secondary={plan.subject.subject_name}
              />
            </ListItemButton>
          ))}
      </List>
      <FilterMenu
        study_plans={filteredPlans}
        filterState={filterState}
        dispatchFilter={dispatchFilter}
      />
    </Container>
  );
}
