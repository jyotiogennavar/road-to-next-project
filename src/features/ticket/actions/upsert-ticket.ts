"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/path";

const upsertTicketSchema = z.object({
  title: z.string().min(3).max(255),
  content: z.string().min(3).max(1024),
});

const upsertTicket = async (
  id: string | undefined,
  _actionState: { message: string },
  formData: FormData
) => {
  try {
    const data = upsertTicketSchema.parse({
      title: formData.get("title"),
      content: formData.get("content"),
    });

    await prisma.ticket.upsert({
      where: {
        id: id || "",
      },
      update: data,
      create: data,
    });
  } catch {
    return { message: "Something went wrong" };
  }

  revalidatePath(ticketsPath());

  if (id) {
    return redirect(ticketPath(id));
  }

  return { message: "Ticket created" };
};

export { upsertTicket };
