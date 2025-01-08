export interface TransactionTableColumn {
    id:
        | 'account'
        | 'date'
        | 'amount'
        | 'companyName'
        | 'paymentChannel'
        | 'category'
        | 'subCategory';
    label: string;
    minWidth?: number;
    align?: 'center' | 'right' | 'left' | 'inherit' | 'justify' | undefined;
    format?: (value: any) => string;
}
