import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tickets = [
  {
    title: "Ticket 1",
    content: "database content. There is a bug in the code",
    status: "CLOSED" as const,
    deadline: new Date().toISOString().split("T")[0], // current date in YYYY-MM-DD format
    bounty: 499, // $4.99
  },
  {
    title: "Ticket 2",
    content: "database content. There is a typo in the code",
    status: "IN_PROGRESS" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 399, // $3.99
  },
  {
    title: "Ticket 3",
    content: "database content. I would like to have a new feature",
    status: "OPEN" as const,
    deadline: new Date().toISOString().split("T")[0],
    bounty: 199, // $1.99
  },
];

const seed = async () => {
  await prisma.ticket.deleteMany({});
  await prisma.ticket.createMany({
    data: tickets,
  });
};

seed();

// The seed.ts file in Prisma is used to populate your database with initial or test data. It allows
//  you to programmatically insert data into your database when setting up a new environment or
//  refreshing data for testing.

// use integers for the bounty field cuz its easier to work with ints rather than floats and this is considered a best practice