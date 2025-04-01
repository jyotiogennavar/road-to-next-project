import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Spinner } from "@/components/spinner";
import { CardCompact } from "@/components/ui/card-compact";
import { TicketList } from "@/features/ticket/components/ticket-list";
import { TicketUpsertForm } from "@/features/ticket/components/ticket-upsert-form";

const TicketsPage = () => {
  return (
    <>
      <div className="flex-1 flex flex-col gap-y-4">
        <Header title="Tickets" subtitle="Manage your tickets here" />

        <CardCompact
          title="Create a ticket"
          description="Create a new ticket to get help"
          content={<TicketUpsertForm />}
          className="w-full max-w-[420px] self-center"
        />

        <Suspense fallback={<Spinner />}>
          <TicketList />
        </Suspense>
      </div>
      
    </>
  );
};

export default TicketsPage;
