import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/app/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
      password: "alice12",
    },
  });
  const category = await prisma.category.create({
    data: {
      userId: user.id,
      categoryType: "INCOME",
      categoryName: "Salary",
    },
  });
  const transaction = await prisma.transaction.create({
    data: {
      userId: user.id,
      categoryId: category.id,
      amount: 100000,
      description: "Salary Month",
    },
  });
  const budget = await prisma.budget.create({
    data: {
      userId: user.id,
      budgetAmount: 500000,
      time: new Date(),
    },
  });
  console.log(user, category, transaction, budget);
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
