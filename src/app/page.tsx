import Link from "next/link";
import { Header } from "@/components/Header";
import { ticketsPath } from "@/path";

const HomePage = () => {
  return (
    <div className="flex flex-col  gap-4">

      <Header title="Ticket Management System" subtitle="Helps you organize your day-to-day task!" />

      <div className="flex flex-col items-center space-y-4 border-gray-200 py-4">
        <Link href={ticketsPath()} className="py-6 text-blue-600">
          Go to tickets
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
