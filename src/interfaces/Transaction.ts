export interface Transaction {
    id: string;
    transactionId: string;
    amount: number;
    date: Date;
    name: string;
    paymentChannel: string;
    primaryCategory: string;
    detailedCategory: string;
    accountId: string;
}
