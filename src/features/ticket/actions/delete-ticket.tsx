"use server";
import { prisma } from "@/lib/prisma";


export const deleteTicket = async (ticketId: string) => {
  // delete ticket
  await prisma.ticket.delete({
    where: {
      id: ticketId,
    },
  });
}