import { Box, Chip, Divider, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack, Typography } from "@mui/material"
import { RadioGroupComponent } from "./RadioGroupComponent"
import useCurrentUser from "@/hooks/auth/useCurrentUser"
import { Dispatch } from "react"
import { study_plan } from "@/app/api/study-plan/route"

export const ACTIONS = {
    is_approved: "is_approved",
    speciality_id: "speciality_id",
    level_id: "level_id",
    department_id: "department_id",
    faculty_id: "faculty_id",
    subject_id: "subject_id",
    form_id: "form_id",
    duration_id: "duration_id",
    qualification_id: "qualification_id"
  } as const;
  export interface FilterState {
    is_approved: "all" | "only" | "not";
    speciality_id: number[];
    level_id: number[];
    department_id: number[];
    faculty_id: number[];
    subject_id: number[];
    form_id: number[];
    duration_id: number[];
    qualification_id: number[];
  }
  export interface SetFilterAction {
    type: keyof typeof ACTIONS;
    payload: Partial<FilterState>;
  }
  interface FilterMenuProps {
    study_plans: study_plan[]
    filterState: FilterState
    dispatchFilter: Dispatch<SetFilterAction>
  }
  
  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  }
  
  export function FilterMenu(props: FilterMenuProps) {
    const [user] = useCurrentUser()
  
    return (
      <Stack sx={{ pl: 2, pb: 2 }}>
        <Typography variant="h5" sx={{ pt: 1 }}>
          Select criteria
        </Typography>
        <Divider orientation="horizontal" flexItem />
    
        <RadioGroupComponent
          title="Is Approved"
          actionType={ACTIONS.is_approved}
          filterState={props.filterState.is_approved}
          dispatchFilter={props.dispatchFilter}
        />
      </Stack>
    )
  }