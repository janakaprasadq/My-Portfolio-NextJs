import { PrismaClient } from '@prisma/client';
import { projects, experiences, education, skills, personalInfo } from '../data';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // 1. Clear existing data
  await prisma.project.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.education.deleteMany();
  await prisma.skillCategory.deleteMany();
  await prisma.profile.deleteMany();

  // 2. Seed Profile
  await prisma.profile.create({
    data: {
      ...personalInfo
    },
  });
  console.log('Seeded Profile');

  // 3. Seed Experience
  for (const exp of experiences) {
    await prisma.experience.create({
      data: {
       role: exp.role,
       company: exp.company,
       period: exp.period,
       description: exp.description
      },
    });
  }
  console.log('Seeded Experience');

  // 4. Seed Education
  for (const edu of education) {
    await prisma.education.create({
      data: {
        degree: edu.degree,
        institution: edu.institution,
        period: edu.period,
        details: edu.details,
      },
    });
  }
  console.log('Seeded Education');

  // 5. Seed Skills
  for (const skillCat of skills) {
    await prisma.skillCategory.create({
      data: {
        name: skillCat.name,
        skills: skillCat.skills,
      },
    });
  }
  console.log('Seeded Skills');

  // 6. Seed Projects
  for (const project of projects) {
    await prisma.project.create({
      data: {
        title: project.title,
        category: project.category,
        description: project.description,
        longDescription: project.longDescription,
        techStack: project.techStack,
        imageUrl: project.imageUrl,
        gallery: project.gallery || [],
        features: project.features || [],
        liveDemoUrl: project.liveDemoUrl,
        githubUrl: project.githubUrl,
      },
    });
  }
  console.log('Seeded Projects');

  console.log('Seed finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
