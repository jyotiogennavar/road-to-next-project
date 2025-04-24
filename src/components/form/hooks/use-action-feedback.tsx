import { useEffect, useRef } from "react";
import { ActionState } from "@/components/form/utils/to-action-state";

type OnArgs = {
  actionState: ActionState;
};

type UseActionFeedbackOptions = {
  onSuccess?: (args: OnArgs) => void;
  onError?: (args: OnArgs) => void;
};

const useActionFeedback = (
  actionState: ActionState,
  options: UseActionFeedbackOptions
) => {
  const prevTimestamp = useRef(actionState.timestamp);
  const isUpdated = prevTimestamp.current !== actionState.timestamp;

  useEffect(() => {
    if (!isUpdated) return;

    if (actionState.status === "SUCCESS") {
      options.onSuccess?.({ actionState });
      console.log("Success", actionState);
    }

    if (actionState.status === "ERROR") {
      options.onError?.({ actionState });
      console.log("Error", actionState);
    }

    prevTimestamp.current = actionState.timestamp;
  }, [isUpdated, actionState, options]);
};

export { useActionFeedback };
