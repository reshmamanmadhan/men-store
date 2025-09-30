import type { PaymentMethod } from "../models/Payment";

export const mockPayments: PaymentMethod[] = [
  {
    kind: "card",
    amount: 4200,
    currency: "INR",
    cardNumber: "4111111111111111",
    cardHolder: "Bob Smith",
    expiry: "12/27",
    cvv: "123",
  },
  {
    kind: "upi",
    amount: 5000,
    currency: "INR",
    upiId: "alice@upi",
  },
  {
    kind: "cod",
    amount: 7500,
    currency: "INR",
    contactPhone: "+91-9876543210",
  },
];
