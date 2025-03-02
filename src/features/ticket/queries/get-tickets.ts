import { initialTickets } from "@/data";

export const getTickets = async () => {
  // return initialTickets;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return new Promise((resolve) => {
    resolve(initialTickets);
  });
};