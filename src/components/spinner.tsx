import { LoaderCircle } from "lucide-react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center self-center h-full w-full">
      <LoaderCircle className="h-14 w-14 animate-spin" />
    </div>
  )
  
};

export { Spinner };
