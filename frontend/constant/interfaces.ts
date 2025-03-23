export interface Transaction {
    _id: string;
    amount: number;
    currency: string;
    categoryId: string;
    category?: Category;
    date: string;
    description?: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    type: 'income' | 'expense';
}

export interface Category {
    id: string;
    name: string;
    description: string;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    token: string;
}
