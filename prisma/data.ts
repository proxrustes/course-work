import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  async function clearDatabase() {
    await prisma.action_log.deleteMany({});
    await prisma.report.deleteMany({});
    await prisma.plan_change.deleteMany({});
    await prisma.plan_subject.deleteMany({});
    await prisma.study_plan.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.subject.deleteMany({});
    await prisma.speciality.deleteMany({});
    await prisma.training_direction.deleteMany({});
    await prisma.qualification.deleteMany({});
    await prisma.study_duration.deleteMany({});
    await prisma.form_of_study.deleteMany({});
    await prisma.faculty_institute.deleteMany({});
    await prisma.graduating_department.deleteMany({});
    await prisma.education_qualification_level.deleteMany({});
}
await clearDatabase();
  await prisma.user.create({
    data: {
      name: "Student",
      password: "Student",
      access_level: 1,
    },
  });

  await prisma.user.create({
    data: {
      name: "Professor",
      password: "Professor",
      access_level: 2,
    },
  });

  await prisma.user.create({
    data: {
      name: "Department Head",
      password: "Department Head",
      access_level: 3,
    },
  });
  await prisma.user.create({
    data: {
      name: "Dean",
      password: "Dean",
      access_level: 4,
    },
  });
  await prisma.user.create({
    data: {
      name: "Admin",
      password: "Admin",
      access_level: 5,
    },
  });
  await prisma.user.create({
    data: {
      name: "DB Operator",
      password: "DB Operator",
      access_level: 6,
    },
  });
  await prisma.education_qualification_level.create({
    data: { level_name: "Bachelor" }
});
await prisma.education_qualification_level.create({
    data: { level_name: "Master" }
});

// Graduating Department
await prisma.graduating_department.create({
    data: { department_name: "Computer Science", head: "Dr. Smith" }
});

// Faculty Institute
await prisma.faculty_institute.create({
    data: { faculty_name: "Engineering", dean: "Dr. Johnson" }
});

// Form of Study
await prisma.form_of_study.create({
    data: { form_name: "Full-time" }
});
await prisma.form_of_study.create({
    data: { form_name: "Part-time" }
});

// Study Duration
await prisma.study_duration.create({
    data: { duration_length: 4 } // 4 years, for example
});

// Qualification
await prisma.qualification.create({
    data: { qualification_name: "Software Engineer" }
});

// Training Direction
await prisma.training_direction.create({
    data: { direction_name: "Information Technology" }
});

// Speciality
await prisma.speciality.create({
    data: {
        speciality_name: "Web Development",
        direction_id: 1 // Assumes an existing direction_id
    }
});

// Subject
await prisma.subject.create({
    data: { subject_name: "Programming Fundamentals", hours_count: 100 }
});

// User
await prisma.user.create({
    data: {
        name: "John Doe",
        password: "secret123",
        access_level: 1
    }
});

// Study Plan
await prisma.study_plan.create({
    data: {
        is_approved: 1,
        speciality_id: 1, // Assumes an existing speciality_id
        level_id: 1, // Assumes an existing level_id
        department_id: 1, // Assumes an existing department_id
        faculty_id: 1, // Assumes an existing faculty_id
        form_id: 1, // Assumes an existing form_id
        duration_id: 1, // Assumes an existing duration_id
        qualification_id: 1, // Assumes an existing qualification_id
        creation_date: new Date(),
        text: "Sample study plan description"
    }
});

// Plan Subject
await prisma.plan_subject.create({
    data: {
        plan_id: 1, // Assumes an existing plan_id
        subject_id: 1, // Assumes an existing subject_id
        semester: 1
    }
});
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
