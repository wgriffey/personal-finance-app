export interface InvestmentTableColumn {
    id:
        | 'ticker'
        | 'name'
        | 'price'
        | 'quantity'
        | 'costBasis'
        | 'gainLoss'
        | 'gainLossPercentage';
    label: string;
    minWidth?: number;
    align?: 'center' | 'right' | 'left' | 'inherit' | 'justify' | undefined;
    format?: (value: any) => string;
}
