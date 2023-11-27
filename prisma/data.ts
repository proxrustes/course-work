import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear Database
  const deleteOperations = [
    prisma.action_log.deleteMany(),
    prisma.report.deleteMany(),
    prisma.plan_change.deleteMany(),
    prisma.study_plan.deleteMany(),
    prisma.user.deleteMany(),
    prisma.subject.deleteMany(),
    prisma.speciality.deleteMany(),
    prisma.training_direction.deleteMany(),
    prisma.qualification.deleteMany(),
    prisma.study_duration.deleteMany(),
    prisma.form_of_study.deleteMany(),
    prisma.faculty_institute.deleteMany(),
    prisma.graduating_department.deleteMany(),
    prisma.education_qualification_level.deleteMany()
  ];
  await Promise.all(deleteOperations);

  // Users
  const userRoles = ['Student', 'Professor', 'Department Head', 'Dean', 'Admin', 'DB Operator'];
  const createdUsers = [];
  for (const role of userRoles) {
    const createdUser = await prisma.user.create({
      data: {
        name: role,
        password: role,
        access_level: userRoles.indexOf(role) + 1,
      },
    });
    createdUsers.push(createdUser);
  }

  // Education Qualification Levels
  const qualificationLevels = ['Bachelor', 'Master', 'PhD', 'Associate'];
  const createdQualificationLevels = [];
  for (const level of qualificationLevels) {
    const createdLevel = await prisma.education_qualification_level.create({
      data: { level_name: level }
    });
    createdQualificationLevels.push(createdLevel);
  }

  // Graduating Departments
  const departments = [
    { name: "Computer Science", head: "Dr. Smith" },
    { name: "Electrical Engineering", head: "Dr. Maxwell" },
    { name: "Mechanical Engineering", head: "Dr. Tesla" }
  ];
  const createdDepartments = [];
  for (const department of departments) {
    const createdDepartment = await prisma.graduating_department.create({
      data: { department_name: department.name, head: department.head }
    });
    createdDepartments.push(createdDepartment);
  }

  // Faculty Institutes
  const faculties = [
    { name: "Engineering", dean: "Dr. Johnson" },
    { name: "Science", dean: "Dr. Curie" },
    { name: "Arts", dean: "Dr. Da Vinci" }
  ];
  const createdFaculties = [];
  for (const faculty of faculties) {
    const createdFaculty = await prisma.faculty_institute.create({
      data: { faculty_name: faculty.name, dean: faculty.dean }
    });
    createdFaculties.push(createdFaculty);
  }

  // Forms of Study
  const studyForms = ['Full-time', 'Part-time', 'Distance Learning', 'Online'];
  const createdStudyForms = [];
  for (const form of studyForms) {
    const createdForm = await prisma.form_of_study.create({
      data: { form_name: form }
    });
    createdStudyForms.push(createdForm);
  }

  // Study Durations
  const durations = [4, 2, 3]; // Years
  const createdDurations = [];
  for (const duration of durations) {
    const createdDuration = await prisma.study_duration.create({
      data: { duration_length: duration }
    });
    createdDurations.push(createdDuration);
  }

  // Qualifications
  const qualifications = ['Software Engineer', 'Network Administrator', 'Data Analyst'];
  const createdQualifications = [];
  for (const qualification of qualifications) {
    const createdQualification = await prisma.qualification.create({
      data: { qualification_name: qualification }
    });
    createdQualifications.push(createdQualification);
  }

  // Training Directions
  const trainingDirections = [
    { name: "Information Technology" },
    { name: "Data Science" },
    { name: "Network Security" }
  ];
  const createdDirections = [];
  for (const direction of trainingDirections) {
    const createdDirection = await prisma.training_direction.create({
      data: { direction_name: direction.name }
    });
    createdDirections.push(createdDirection);
  }

  // Specialities
  const specialities = [
    { name: "Web Development", direction: createdDirections[0] },
    { name: "Cloud Computing", direction: createdDirections[1] },
    { name: "Cybersecurity", direction: createdDirections[2] }
  ];
  const createdSpecialities = [];
  for (const speciality of specialities) {
    const createdSpeciality = await prisma.speciality.create({
      data: {
        speciality_name: speciality.name,
        direction_id: speciality.direction.direction_id
      }
    });
    createdSpecialities.push(createdSpeciality);
  }

  // Subjects
  const subjects = [
    { name: "Programming Fundamentals", hours: 100 },
    { name: "Advanced Algorithms", hours: 120 },
    { name: "Machine Learning", hours: 150 }
  ];
  const createdSubjects = [];
  for (const subject of subjects) {
    const createdSubject = await prisma.subject.create({
      data: { subject_name: subject.name, hours_count: subject.hours }
    });
    createdSubjects.push(createdSubject);
  }


}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
