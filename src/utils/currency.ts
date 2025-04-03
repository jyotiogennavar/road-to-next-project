import { MyBig } from "@/lib/big";

/**
 * Convert a number to a currency string.
 * @param amount - The amount in cents.
 * @returns The formatted currency string.
 */

export const toCent = (amount: number) => 
 new MyBig(amount).mul(100).round(2).toNumber();

export const fromCent = (amount: number) => 
  new MyBig(amount).div(100).round(2).toNumber();
 

export const toCurrencyFromCent = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(fromCent(amount));
};
