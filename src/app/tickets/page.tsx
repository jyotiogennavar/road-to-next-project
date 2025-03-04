import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Header } from "@/components/Header";
import { Placeholder } from "@/components/PlaceHolder";
import { Spinner } from "@/components/spinner";
import { TicketList } from "@/features/ticket/components/ticket-list";

const TicketsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-4">
      <Header title="Tickets" subtitle="Manage your tickets here" />

      <ErrorBoundary fallback={<Placeholder label="Something went wrong" />}>
        <Suspense fallback={<Spinner />}>
          <TicketList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default TicketsPage;
