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
    prisma.training_direction.deleteMany(),
    prisma.speciality.deleteMany(),
    prisma.study_duration.deleteMany(),
    prisma.form_of_study.deleteMany(),
    prisma.faculty_institute.deleteMany(),
    prisma.graduating_department.deleteMany(),
    prisma.education_qualification_level.deleteMany(),
  ];
  await Promise.all(deleteOperations);

  // Users
  const userRoles = [
    "Student",
    "Professor",
    "Department Head",
    "Dean",
    "Administrator",
  ];
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
  const qualificationLevels = ["Бакалавр", "Магістр", "Доктор"];
  const createdQualificationLevels = [];
  for (const level of qualificationLevels) {
    const createdLevel = await prisma.education_qualification_level.create({
      data: { level_name: level },
    });
    createdQualificationLevels.push(createdLevel);
  }

  // Graduating Departments
  const departments = [
    { name: "ІСТ", head: "Тоні Старк" },
    { name: "БМІ", head: "Брюс Беннер" },
    { name: "ІПІ", head: "Ілон Маск" },
  ];
  const createdDepartments = [];
  for (const department of departments) {
    const createdDepartment = await prisma.graduating_department.create({
      data: { department_name: department.name, head: department.head },
    });
    createdDepartments.push(createdDepartment);
  }

  // Faculty Institutes
  const faculties = [
    { name: "FIOT", dean: "Нікола Тесла" },
    { name: "ФБМІ", dean: "Доктор Лектер" },
  ];
  const createdFaculties = [];
  for (const faculty of faculties) {
    const createdFaculty = await prisma.faculty_institute.create({
      data: { faculty_name: faculty.name, dean: faculty.dean },
    });
    createdFaculties.push(createdFaculty);
  }

  // Forms of Study
  const studyForms = ["Очна", "Заочна", "Вечірня", "Дистанційна"];
  const createdStudyForms = [];
  for (const form of studyForms) {
    const createdForm = await prisma.form_of_study.create({
      data: { form_name: form },
    });
    createdStudyForms.push(createdForm);
  }

  // Study Durations
  const durations = [1, 2, 3, 4]; // Семестри
  const createdDurations = [];
  for (const duration of durations) {
    const createdDuration = await prisma.study_duration.create({
      data: { duration_length: duration },
    });
    createdDurations.push(createdDuration);
  }

  // Training Directions
  const trainingDirections = [
    { name: "121" },
    { name: "122" },
    { name: "126" },
    { name: "091" },
  ];
  const createdDirections = [];
  for (const direction of trainingDirections) {
    const createdDirection = await prisma.training_direction.create({
      data: { direction_name: direction.name },
    });
    createdDirections.push(createdDirection);
  }

  // Specialities
  const specialities = [
    { name: "Прикладна математика", direction: createdDirections[0] },
    { name: "Інформаційні системи та технології", direction: createdDirections[0] },
    { name: "Веб розробка", direction: createdDirections[1] },
    { name: "Інформаційне забезпечення робототехнічних систем", direction: createdDirections[2] },
    { name: "Інформаційні управляючі системи та технології", direction: createdDirections[2] },
    { name: "Інтегровані інформаційні системи", direction: createdDirections[1] },
    { name: "Прикладна біологія", direction: createdDirections[3] },
    { name: "Фізична терапія", direction: createdDirections[3] },
    { name: "Кібернетика", direction: createdDirections[3] },
  ];
  const createdSpecialities = [];
  for (const speciality of specialities) {
    const createdSpeciality = await prisma.speciality.create({
      data: {
        speciality_name: speciality.name,
        direction_id: speciality.direction.direction_id,
      },
    });
    createdSpecialities.push(createdSpeciality);
  }

  // Subjects
  const subjects = [
    { name: "Дискретна математика" },
    { name: "Вища математика" },
    { name: "Machine Learning" },
    { name: "Основи програмування" },
    { name: "ТРПЗ" },
    { name: "Linux" },
    { name: "Основи біології" },
    { name: "Електроніка" },
    { name: "Органічна хімія" },
  ];
  const createdSubjects = [];
  for (const subject of subjects) {
    const createdSubject = await prisma.subject.create({
      data: { subject_name: subject.name },
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
