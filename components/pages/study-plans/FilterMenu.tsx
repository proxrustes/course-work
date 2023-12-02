import { Box, Chip, Divider, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack, Typography } from "@mui/material"
import { RadioGroupComponent } from "./RadioGroupComponent"
import useCurrentUser from "@/hooks/auth/useCurrentUser"
import { Dispatch, useEffect, useState } from "react"
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
    const [subjects, setSubjects] = useState<{subject_id: number,
      subject_name: string,
      hours_count: number}[]>([])
      const [durations, setDurations] = useState<{ duration_id: number; duration_length: number }[]>([]);
      const [formOfStudy, setFormOfStudy] = useState<{ form_id: number; form_name: string }[]>([]);
      const [specialities, setSpecialities] = useState<{ speciality_id: number; speciality_name: string }[]>([]);
      const [levels, setLevels] = useState<{ level_id: number; level_name: string }[]>([]);
      const [departments, setDepartments] = useState<{ department_id: number; department_name: string; head: string }[]>([]);
      const [faculties, setFaculties] = useState<{ faculty_id: number; faculty_name: string; dean: string }[]>([]);
      const [qualifications, setQualifications] = useState<{ qualification_id: number; qualification_name: string }[]>([]);

    useEffect(() => {
      fetch("/api/subject", {
          headers: {
              "Content-Type": "application/json",
          },
          method: "GET",
      })
          .then((res) => res.json())
          .then((json) => {
              setSubjects(json.message);
          });
  }, []);

  useEffect(() => {
      fetch("/api/study-duration", {
          headers: {
              "Content-Type": "application/json",
          },
          method: "GET",
      })
          .then((res) => res.json())
          .then((json) => {
              setDurations(json.message);
          });
  }, []);

  useEffect(() => {
      fetch("/api/form-of-study", {
          headers: {
              "Content-Type": "application/json",
          },
          method: "GET",
      })
          .then((res) => res.json())
          .then((json) => {
              setFormOfStudy(json.message);
          });
  }, []);

  // Fetch for specialities
  useEffect(() => {
      fetch("/api/speciality", {
          headers: {
              "Content-Type": "application/json",
          },
          method: "GET",
      })
          .then((res) => res.json())
          .then((json) => {
              setSpecialities(json.message);
          });
  }, []);

  // Fetch for levels
  useEffect(() => {
      fetch("/api/education-qualification-level", {
          headers: {
              "Content-Type": "application/json",
          },
          method: "GET",
      })
          .then((res) => res.json())
          .then((json) => {
              setLevels(json.message);
          });
  }, []);

  // Fetch for departments
  useEffect(() => {
      fetch("/api/graduating-department", {
          headers: {
              "Content-Type": "application/json",
          },
          method: "GET",
      })
          .then((res) => res.json())
          .then((json) => {
              setDepartments(json.message);
          });
  }, []);

  // Fetch for faculties
  useEffect(() => {
      fetch("/api/faculty-institute", {
          headers: {
              "Content-Type": "application/json",
          },
          method: "GET",
      })
          .then((res) => res.json())
          .then((json) => {
              setFaculties(json.message);
          });
  }, []);

  // Fetch for qualifications
  useEffect(() => {
      fetch("/api/qualification", {
          headers: {
              "Content-Type": "application/json",
          },
          method: "GET",
      })
          .then((res) => res.json())
          .then((json) => {
              setQualifications(json.message);
          });
  }, []);
    return (
      <Stack sx={{ pl: 2, pb: 2 }}>
        <Typography variant="h5" sx={{ pt: 1 }}>
          Filter by:
        </Typography>
        <Divider orientation="horizontal" flexItem />
        <FormControl size="small" fullWidth sx={{ mt: 2 }}>
        <InputLabel id="speciality-label">Speciality</InputLabel>
        <Select
          labelId="speciality-label"
          id="speciality-select"
          multiple
          value={props.filterState.speciality_id}
          onChange={(e) =>
            props.dispatchFilter({
              type: ACTIONS.speciality_id,
              payload: { speciality_id: e.target.value as number[] },
            })
          }
          input={<OutlinedInput label="Speciality" />}
          MenuProps={MenuProps}
        >
          {specialities.map((speciality) => (
            <MenuItem key={speciality.speciality_id} value={speciality.speciality_id}>
              {speciality.speciality_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl size="small" fullWidth sx={{ mt: 2 }}>
        <InputLabel id="level-label">Level</InputLabel>
        <Select
          labelId="level-label"
          id="level-select"
          multiple
          value={props.filterState.level_id}
          onChange={(e) =>
            props.dispatchFilter({
              type: ACTIONS.level_id,
              payload: { level_id: e.target.value as number[] },
            })
          }
          input={<OutlinedInput label="Level" />}
          MenuProps={MenuProps}
        >
          {levels.map((level) => (
            <MenuItem key={level.level_id} value={level.level_id}>
              {level.level_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        <FormControl size="small" fullWidth sx={{ mt: 2 }}>
        <InputLabel id="department-label">Department</InputLabel>
        <Select
          labelId="department-label"
          id="department-select"
          multiple
          value={props.filterState.department_id}
          onChange={(e) =>
            props.dispatchFilter({
              type: ACTIONS.department_id,
              payload: { department_id: e.target.value as number[] },
            })
          }
          input={<OutlinedInput label="Department" />}
          MenuProps={MenuProps}
        >
          {departments.map((department) => (
            <MenuItem key={department.department_id} value={department.department_id}>
              {department.department_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  {/* Select for Subjects */}
  <FormControl fullWidth size="small" sx={{ mt: 2 }}>
        <InputLabel id="subject-label">Subject</InputLabel>
        <Select
          labelId="subject-label"
          id="subject-select"
          multiple
          value={props.filterState.subject_id}
          onChange={(e) =>
            props.dispatchFilter({
              type: ACTIONS.subject_id,
              payload: { subject_id: e.target.value as number[] },
            })
          }
          input={<OutlinedInput label="Subject" />}
          MenuProps={MenuProps}
        >
          {subjects.map((subject) => (
            <MenuItem key={subject.subject_id} value={subject.subject_id}>
              {subject.subject_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Select for Durations */}
      <FormControl size="small" fullWidth sx={{ mt: 2 }}>
        <InputLabel id="duration-label">Duration</InputLabel>
        <Select
          labelId="duration-label"
          id="duration-select"
          multiple
          value={props.filterState.duration_id}
          onChange={(e) =>
            props.dispatchFilter({
              type: ACTIONS.duration_id,
              payload: { duration_id: e.target.value as number[] },
            })
          }
          input={<OutlinedInput label="Duration" />}
          MenuProps={MenuProps}
        >
          {durations.map((duration) => (
            <MenuItem key={duration.duration_id} value={duration.duration_id}>
              {duration.duration_length}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Select for Forms of Study */}
      <FormControl fullWidth size="small" sx={{ mt: 2 }}>
        <InputLabel id="formOfStudy-label">Form of Study</InputLabel>
        <Select
          labelId="formOfStudy-label"
          id="formOfStudy-select"
          multiple
          value={props.filterState.form_id}
          onChange={(e) =>
            props.dispatchFilter({
              type: ACTIONS.form_id,
              payload: { form_id: e.target.value as number[] },
            })
          }
          input={<OutlinedInput label="Form of Study" />}
          MenuProps={MenuProps}
        >
          {formOfStudy.map((form) => (
            <MenuItem key={form.form_id} value={form.form_id}>
              {form.form_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small" sx={{ mt: 2 }}>
        <InputLabel id="faculty-label">Faculty</InputLabel>
        <Select
          labelId="faculty-label"
          id="faculty-select"
          multiple
          value={props.filterState.faculty_id}
          onChange={(e) =>
            props.dispatchFilter({
              type: ACTIONS.faculty_id,
              payload: { faculty_id: e.target.value as number[] },
            })
          }
          input={<OutlinedInput label="Faculty" />}
          MenuProps={MenuProps}
        >
          {faculties.map((faculty) => (
            <MenuItem key={faculty.faculty_id} value={faculty.faculty_id}>
              {faculty.faculty_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth size="small" sx={{ mt: 2 }}>
        <InputLabel id="qualification-label">Qualification</InputLabel>
        <Select
          labelId="qualification-label"
          id="qualification-select"
          multiple
          value={props.filterState.qualification_id}
          onChange={(e) =>
            props.dispatchFilter({
              type: ACTIONS.qualification_id,
              payload: { qualification_id: e.target.value as number[] },
            })
          }
          input={<OutlinedInput label="Qualification" />}
          MenuProps={MenuProps}
        >
          {qualifications.map((qualification) => (
            <MenuItem key={qualification.qualification_id} value={qualification.qualification_id}>
              {qualification.qualification_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        <RadioGroupComponent
          title="Is Approved"
          actionType={ACTIONS.is_approved}
          filterState={props.filterState.is_approved}
          dispatchFilter={props.dispatchFilter}
        />
      </Stack>
    )
  }