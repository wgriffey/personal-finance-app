export interface TransactionTableRow {
    tranId: string;
    account: string | undefined;
    date: string;
    amount: number | undefined;
    companyName: string;
    paymentChannel: string;
    category: string;
    subCategory: string;
}
