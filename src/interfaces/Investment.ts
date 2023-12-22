export interface Investment {
    account_id: string;
    security_id: string;
    security_name: string;
    security_ticker: string;
    price: number;
    price_as_of: Date;
    cost_basis: number;
    quantity: number;
}
