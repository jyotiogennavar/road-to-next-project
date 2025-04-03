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
  deadline: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "is required"),
  bounty : z.coerce.number().min(0).max(9999),
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
      deadline: formData.get("deadline"),
      bounty: formData.get("bounty"),
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
