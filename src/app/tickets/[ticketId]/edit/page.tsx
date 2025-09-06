import { notFound } from "next/navigation";
import { CardCompact } from "@/components/ui/card-compact";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isOwner } from "@/features/auth/utils/is-owner";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";
import { getTicket } from "@/features/ticket/queries/get-ticket";

type TicketEditPageProps = {
  params: Promise<{ ticketId: string }>;
};

const TicketEditPage = async ({ params }: TicketEditPageProps) => {

  const { user } = await getAuth();
  const { ticketId } = await params;
  const ticket = await getTicket(ticketId);

  const isTicketFound = !!ticket;
  const isTicketOwner = isOwner(user, ticket);

  if (!isTicketFound || !isTicketOwner) {
    notFound();
  }
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <CardCompact
        title="Edit ticket"
        content={<TicketUpsertForm ticket={ticket} />}
        description="Edit an existing ticket"
        className="w-full max-w-[420px]"
      />
    </div>
  );
};

export default TicketEditPage;

// We add the logic to check if the user is the owner of the ticket to be able to
//  edit it and if not, we redirect to the not found page
// and if the ticket is not found, we redirect to the not found page.
// video course - Ownership
