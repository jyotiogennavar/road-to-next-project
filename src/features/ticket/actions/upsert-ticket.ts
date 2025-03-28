"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { setCookiebyKey } from "@/actions/cooies";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { ticketPath, ticketsPath } from "@/path";

const upsertTicketSchema = z.object({
  title: z.string().min(3).max(255),
  content: z.string().min(3).max(1024),
});

const upsertTicket = async (
  id: string | undefined,
  _actionState: ActionState,
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
  } catch (error) {
    return fromErrorToActionState(error, formData);
  }

  revalidatePath(ticketsPath());

  if (id) {
    setCookiebyKey("toast", "Ticket updated");
    return redirect(ticketPath(id));
  }

  return toActionState("SUCCESS" ,'Ticket created ');
};

export { upsertTicket };
