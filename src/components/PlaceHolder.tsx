import { OctagonAlert } from "lucide-react";
import React, { cloneElement } from "react";

type PlaceHolderProps = {
  label: string;
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>, "svg">;
  button?: React.ReactElement<HTMLButtonElement, "button">;
};

const Placeholder = ({
  label,
  button = <div/>,
  icon = <OctagonAlert />,
}: PlaceHolderProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-2">
      {cloneElement(icon, {
        className: "w-16 h-16",
      })}
      <p className="text-md font-semibold">{label}</p>
      {cloneElement(button, {
        className: "h-10",
      })}
    </div>
  );
};

export { Placeholder };
