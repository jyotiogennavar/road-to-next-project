import { Spinner } from "@/components/spinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center self-center h-full w-full">
      <Spinner />
    </div>
  )
}