export interface InvestmentTableRow {
    securityId?: string;
    ticker?: string;
    name: string | undefined;
    price: number;
    quantity: number;
    costBasis: number;
    gainLoss: number;
    gainLossPercentage: number;
}
