export type PaymentResult =
  | { success: true; transactionId: string }
  | { success: false; reason: string };

export interface BasePayment {
  kind: string;
  amount: number;
  currency?: string;
}

export interface CardPayment extends BasePayment {
  kind: "card";
  cardNumber: string;
  cardHolder: string;
  expiry: string; 
  cvv: string;
}

export interface UPIPayment extends BasePayment {
  kind: "upi";
  upiId: string;
}

export interface CODPayment extends BasePayment {
  kind: "cod";
  contactPhone?: string;
}

export type PaymentMethod = CardPayment | UPIPayment | CODPayment;
