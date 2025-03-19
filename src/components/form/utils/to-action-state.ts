import { ZodError } from "zod";

export type ActionState = {
  message: string;
  payload?: FormData;
  fieldErrors?: Record<string, string[] | undefined>;
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: "",
  fieldErrors: {},
};

export const fromErrorToActionState = (
  error: unknown,
  formData?: FormData
): ActionState => {
  if (error instanceof ZodError) {
    return {
      message: "",
      fieldErrors: error.flatten().fieldErrors,
      payload: formData,
    };
  } else if (error instanceof Error) {
    return {
      message: error.message,
      fieldErrors: {},
      payload: formData,
    };
  } else {
    return {
      message: "Something went wrong",
      fieldErrors: {},
      payload: formData,
    };
  }
};
