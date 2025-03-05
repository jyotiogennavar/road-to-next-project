"use server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ticketsPath } from "@/path";


export const deleteTicket = async (id: string) => {
  // delete ticket
  await prisma.ticket.delete({
    where: {
      id,
    },
  });

  redirect(ticketsPath());
}


// the aim in next js is to keep any component as server component as possible
// so that we can use the server component to fetch data from the server. Now at times when we
//  need server functions in client components we can Server actions to do that. 
// Server actions are just functions that are imported in the client component and used to perform server side actions.
// here the delete function is a server action that is imported in the client component and used to delete the ticket.

// we use the "use server" pragma to tell the compiler that this function is a server action.
// this is a function that is run on the server and not on the client.