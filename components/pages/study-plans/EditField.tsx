import { study_plan } from "@/app/api/study-plan/route";
import { Container, Stack, Typography, Divider, FormControl, InputLabel, Select, OutlinedInput, MenuItem, TextField, Button } from "@mui/material";
import { useState, useEffect, useReducer } from "react"

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

function formReducer(state: any, action: any) {
    switch (action.type) {
      case EDIT_ACTIONS.text:
        return { ...state, text: action.payload.text };
      case EDIT_ACTIONS.title:
        return { ...state, title: action.payload.title };
      case EDIT_ACTIONS.is_approved:
        return { ...state, is_approved: action.payload.is_approved };
      case EDIT_ACTIONS.speciality_id:
        return { ...state, speciality_id: action.payload.speciality_id };
      case EDIT_ACTIONS.level_id:
        return { ...state, level_id: action.payload.level_id };
      case EDIT_ACTIONS.department_id:
        return { ...state, department_id: action.payload.department_id };
      case EDIT_ACTIONS.faculty_id:
        return { ...state, faculty_id: action.payload.faculty_id };
      case EDIT_ACTIONS.subject_id:
        return { ...state, subject_id: action.payload.subject_id };
      case EDIT_ACTIONS.form_id:
        return { ...state, form_id: action.payload.form_id };
      case EDIT_ACTIONS.duration_id:
        return { ...state, duration_id: action.payload.duration_id };
      case EDIT_ACTIONS.qualification_id:
        return { ...state, qualification_id: action.payload.qualification_id };
      default:
        return state;
    }
  }
  
const EDIT_ACTIONS = {
    text:"text",
    title:"title",
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
    title: string,
    text: string,
    is_approved: boolean;
    speciality_id: number;
    level_id: number;
    department_id: number;
    faculty_id: number;
    subject_id: number;
    form_id: number;
    duration_id: number;
    qualification_id: number;
  }
  export interface SetFilterAction {
    type: keyof typeof EDIT_ACTIONS;
    payload: Partial<FilterState>;
  }
  interface Props {
    study_plan: study_plan
  }
export function EditField(props: Props){
  const initialState = {
    title: props.study_plan.title,
    text: props.study_plan.text,
    is_approved: props.study_plan.is_approved,
    speciality_id: props.study_plan.speciality.speciality_id,
    level_id: props.study_plan.level.level_id,
    department_id:props.study_plan.department.department_id,
    faculty_id: props.study_plan.faculty.faculty_id,
    subject_id: props.study_plan.subject.subject_id,
    form_id: props.study_plan.form.form_id,
    duration_id: props.study_plan.duration.duration_id,
    qualification_id: props.study_plan.qualification.qualification_id
  };
  const [formState, dispatch] = useReducer(formReducer, initialState)
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
          })
  }, [])
  

  // Render only when formState is available
  if (!formState) {
      return <div>Loading...</div>;
  }
    return (
      <Container maxWidth="xl">
          <Stack direction="row" gap={4} sx={{mt: 4}}>
             <Stack sx={{ pl: 2, pb: 2 }}>
          <Typography variant="h5" sx={{ pt: 1 }}>
            details
          </Typography>
          <Divider orientation="horizontal" flexItem />
        
        {/* Speciality Select */}
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="speciality-label">Speciality</InputLabel>
          <Select
            labelId="speciality-label"
            id="speciality-select"
            value={formState.speciality_id}
            onChange={(e) => dispatch({ type: EDIT_ACTIONS.speciality_id, payload: { speciality_id: e.target.value } })}
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
       {/* Level Select */}
<FormControl fullWidth sx={{ mt: 2 }}>
  <InputLabel id="level-label">Level</InputLabel>
  <Select
    labelId="level-label"
    id="level-select"
    value={formState.level_id}
    onChange={(e) => dispatch({ type: EDIT_ACTIONS.level_id, payload: { level_id: e.target.value } })}
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

{/* Department Select */}
<FormControl fullWidth sx={{ mt: 2 }}>
  <InputLabel id="department-label">Department</InputLabel>
  <Select
    labelId="department-label"
    id="department-select"
    value={formState.department_id}
    onChange={(e) => dispatch({ type: EDIT_ACTIONS.department_id, payload: { department_id: e.target.value } })}
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

{/* Faculty Select */}
<FormControl fullWidth sx={{ mt: 2 }}>
  <InputLabel id="faculty-label">Faculty</InputLabel>
  <Select
    labelId="faculty-label"
    id="faculty-select"
    value={formState.faculty_id}
    onChange={(e) => dispatch({ type: EDIT_ACTIONS.faculty_id, payload: { faculty_id: e.target.value } })}
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

{/* Subject Select */}
<FormControl fullWidth sx={{ mt: 2 }}>
  <InputLabel id="subject-label">Subject</InputLabel>
  <Select
    labelId="subject-label"
    id="subject-select"
    value={formState.subject_id}
    onChange={(e) => dispatch({ type: EDIT_ACTIONS.subject_id, payload: { subject_id: e.target.value } })}
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

{/* Form of Study Select */}
<FormControl fullWidth sx={{ mt: 2 }}>
  <InputLabel id="formOfStudy-label">Form of Study</InputLabel>
  <Select
    labelId="formOfStudy-label"
    id="formOfStudy-select"
    value={formState.form_id}
    onChange={(e) => dispatch({ type: EDIT_ACTIONS.form_id, payload: { form_id: e.target.value } })}
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

{/* Duration Select */}
<FormControl fullWidth sx={{ mt: 2 }}>
  <InputLabel id="duration-label">Duration</InputLabel>
  <Select
    labelId="duration-label"
    id="duration-select"
    value={formState.duration_id}
    onChange={(e) => dispatch({ type: EDIT_ACTIONS.duration_id, payload: { duration_id: e.target.value } })}
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

{/* Qualification Select */}
<FormControl fullWidth sx={{ mt: 2 }}>
  <InputLabel id="qualification-label">Qualification</InputLabel>
  <Select
    labelId="qualification-label"
    id="qualification-select"
    value={formState.qualification_id}
    onChange={(e) => dispatch({ type: EDIT_ACTIONS.qualification_id, payload: { qualification_id: e.target.value } })}
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

        </Stack>
        <Stack gap={4}>
        <TextField 
    variant="standard" 
    label="Title" 
    value={formState.title}
    onChange={(e) => dispatch({ type: EDIT_ACTIONS.title, payload: { title: e.target.value } })}
  />
  
  <TextField 
    variant="outlined" 
    label="Text" 
    value={formState.text}
    onChange={(e) => dispatch({ type: EDIT_ACTIONS.text, payload: { text: e.target.value } })}
  />
        </Stack>
        <Stack gap={4}>
        <Typography>Proposed Changes:</Typography>
        </Stack>
          </Stack>
        <Button fullWidth>Save Changes</Button>
       
      </Container>
    );
  }