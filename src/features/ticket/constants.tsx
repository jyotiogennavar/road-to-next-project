import { CircleCheck, File, PencilLine } from "lucide-react";

export const TICKET_ICONS = {
  OPEN: <File />,
  IN_PROGRESS: <PencilLine />,
  CLOSED: <CircleCheck />,
};

export const TICKET_STATUS_LABELS = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  CLOSED: "Closed",
};
