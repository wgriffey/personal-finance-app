export interface Account {
    id: string;
    linkToken?: string;
    item: string;
    accountId: string;
    availableBalance: number;
    currentBalance: number;
    name: string;
    accountType: string;
    accountSubtype: string;
}
