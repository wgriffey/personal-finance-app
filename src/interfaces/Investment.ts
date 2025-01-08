export interface Investment {
    id: string,
    accountId: string;
    securityId: string;
    securityName: string;
    securityTicker: string;
    price: number;
    priceAsOf: Date;
    costBasis: number;
    quantity: number;
}
