import Big from "big.js";

Big.DP = 2; // Set the default decimal places to 2
Big.RM = Big.roundHalfEven; // Set the default rounding mode to round half even

export const MyBig = Big;