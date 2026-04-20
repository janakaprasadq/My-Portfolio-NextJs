import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Starting feature migration...");

  const projects = await prisma.project.findMany({
    where: {
      features: {
        isEmpty: false,
      },
    },
  });

  console.log(`Found ${projects.length} projects to migrate.`);

  for (const project of projects) {
    console.log(`Migrating features for: ${project.title}`);
    
    // Create ProjectFeature records for each string in the features array
    const featuresToCreate = project.features.map((f: string) => ({
      label: f,
      description: "", // Initial empty description
      projectId: project.id,
    }));

    if (featuresToCreate.length > 0) {
      await prisma.projectFeature.createMany({
        data: featuresToCreate,
      });
    }
  }

  console.log("✅ Migration complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
