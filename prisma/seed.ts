import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tickets = [
  {
    title: "Ticket 1",
    content: "database content. There is a bug in the code",
    status: "CLOSED" as const,
  },
  {
    title: "Ticket 2",
    content: "database content. There is a typo in the code",
    status: "IN_PROGRESS" as const,
  },
  {
    title: "Ticket 3",
    content: "database content. I would like to have a new feature",
    status: "OPEN" as const,
  },
];

const seed = async () => {
  await prisma.ticket.deleteMany({});
  await prisma.ticket.createMany({
    data: tickets,
  });
};

seed();
