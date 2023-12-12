"use client";
import Cookies from "js-cookie"
import { ERROR_TYPES } from "@/definitions/enums/errors";
import useCurrentUser from "@/hooks/auth/useCurrentUser";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { Header } from "@/components/common/Header";

export default function AddPlan() {
  const router = useRouter();
  const [user] = useCurrentUser();
  const [subjects, setSubjects] = useState<
    { subject_id: number; subject_name: string; hours_count: number }[]
  >([]);
  const [durations, setDurations] = useState<
    { duration_id: number; duration_length: number }[]
  >([]);
  const [formOfStudy, setFormOfStudy] = useState<
    { form_id: number; form_name: string }[]
  >([]);
  const [specialities, setSpecialities] = useState<
    { speciality_id: number; speciality_name: string }[]
  >([]);
  const [levels, setLevels] = useState<
    { level_id: number; level_name: string }[]
  >([]);
  const [departments, setDepartments] = useState<
    { department_id: number; department_name: string; head: string }[]
  >([]);
  const [faculties, setFaculties] = useState<
    { faculty_id: number; faculty_name: string; dean: string }[]
  >([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedFormOfStudy, setSelectedFormOfStudy] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");

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
    if (user?.access_level && user?.access_level < 3) {
      router.push(`/error/${ERROR_TYPES.ACCESS_DENIED}`);
    }
  }, [user]);

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

 
  const handleSubmit = async () => {
    try {
      fetch("/api/study-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": Cookies.get("currentUser") ?? ''
        },
        body: JSON.stringify({
          is_approved: 0,
          speciality_id: selectedSpeciality,
          level_id: selectedLevel,
          department_id: selectedDepartment,
          faculty_id: selectedFaculty,
          subject_id: selectedSubject,
          form_id: selectedFormOfStudy,
          duration_id: selectedDuration,
          creation_date: new Date(),
          title: title,
          text: text
        }),
      }).then(() => router.push("/study-plans"));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return user?.access_level && user.access_level > 2 ? (
    <Container maxWidth="xl">
      <Header />
      <Typography variant="h2">Add Study Plan</Typography>
      <Stack direction="row" gap={4} sx={{ mt: 4 }}>
        <Stack gap={1}>
          <FormControl fullWidth size="small" sx={{ width: 300 }}>
            <InputLabel id="subject-label">Select Subject</InputLabel>
            <Select
              labelId="subject-label"
              label="Select Subject"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              {subjects.map((subject) => (
                <MenuItem key={subject.subject_id} value={subject.subject_id}>
                  {subject.subject_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ width: 300 }}>
            <InputLabel id="duration-label">Select Duration</InputLabel>
            <Select
              labelId="duration-label"
              label="Select Duration"
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
            >
              {durations.map((duration) => (
                <MenuItem
                  key={duration.duration_id}
                  value={duration.duration_id}
                >
                  {duration.duration_length}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ width: 300 }}>
            <InputLabel id="formOfStudy-label">Select Form of Study</InputLabel>
            <Select
              labelId="formOfStudy-label"
              label="Select Form of Study"
              value={selectedFormOfStudy}
              onChange={(e) => setSelectedFormOfStudy(e.target.value)}
            >
              {formOfStudy.map((form) => (
                <MenuItem key={form.form_id} value={form.form_id}>
                  {form.form_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ width: 300 }}>
            <InputLabel id="speciality-label">Select Speciality</InputLabel>
            <Select
              labelId="speciality-label"
              label="Select Speciality"
              value={selectedSpeciality}
              onChange={(e) => setSelectedSpeciality(e.target.value)}
            >
              {specialities.map((speciality) => (
                <MenuItem
                  key={speciality.speciality_id}
                  value={speciality.speciality_id}
                >
                  {speciality.speciality_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ width: 300 }}>
            <InputLabel id="level-label">Select Level</InputLabel>
            <Select
              labelId="level-label"
              label="Select Level"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              {levels.map((level) => (
                <MenuItem key={level.level_id} value={level.level_id}>
                  {level.level_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ width: 300 }}>
            <InputLabel id="department-label">Select Department</InputLabel>
            <Select
              labelId="department-label"
              label="Select Department"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              {departments.map((department) => (
                <MenuItem
                  key={department.department_id}
                  value={department.department_id}
                >
                  {department.department_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" sx={{ width: 300 }}>
            <InputLabel id="faculty-label">Select Faculty</InputLabel>
            <Select
              labelId="faculty-label"
              label="Select Faculty"
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
            >
              {faculties.map((faculty) => (
                <MenuItem key={faculty.faculty_id} value={faculty.faculty_id}>
                  {faculty.faculty_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="outlined" color="inherit" fullWidth onClick={handleSubmit}>
        Submit
      </Button>
        </Stack>
        <Stack gap={4} width="100%">
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            size="small"
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
          />{" "}
          <TextField
            label="Text"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={text}
            onChange={(e: any) => setText(e.target.value)}
          />
        </Stack>
      </Stack>
     
    </Container>
  ) : (
    <></>
  );
}
