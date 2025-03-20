export interface Transaction {
    id: string;
    name: string;
    description: string;
    amount: string;
    currency: string;
    date: string;
    userId: string;
    categoryId: string | Category;
    createdAt: string;
    updatedAt: string;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
}

