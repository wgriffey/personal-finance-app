export interface Account {
    id: string;
    linkToken?: string;
    item: string;
    account_id: string;
    available_balance: number;
    current_balance: number;
    name: string;
    account_type: string;
    account_subtype: string;
}
