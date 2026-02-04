const { UsersClient } = require("../../helpers/apiClients/index.js");

const TOTAL_USERS = 199999;
const BATCH_SIZE = 100;
const PASSWORD = "1234ASDF1234asdf";

async function seedUsers() {
  console.log("🌱 Seeding users...");
  const startingDate = Date.now();

  for (let i = 0 + 150000; i < TOTAL_USERS; i += BATCH_SIZE) {
    const batch = [];

    for (let j = i; j < i + BATCH_SIZE && j < TOTAL_USERS; j++) {
      batch.push(
        UsersClient.createUser(`user${j}`, `user${j}@gmail.com`, PASSWORD),
      );
    }

    await Promise.all(batch);
    console.log(
      `✅ Users ${i} - ${Math.min(i + BATCH_SIZE - 1, TOTAL_USERS)} created`,
    );
  }

  const finishDate = Date.now();
  console.log(`Total time ${(finishDate - startingDate) / 1000}s`);
  console.log(
    `Time for each user ${(((finishDate - startingDate) / TOTAL_USERS)).toFixed(2)}ms`,
  );
  console.log("🎉 Done seeding users");
}

// Ejecute
seedUsers()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("❌ Error seeding users", err);
    process.exit(1);
  });
