import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Spinner } from "@/components/spinner";
import { TicketList } from "@/features/ticket/components/ticket-list";

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-4">
      <Header title="Tickets" subtitle="Manage your tickets here" />


        <Suspense fallback={<Spinner />}>
          <TicketList />
        </Suspense>

    </div>
  );
};

export default TicketsPage;
