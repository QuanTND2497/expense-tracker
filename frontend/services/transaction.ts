import { User } from '@/constant/interfaces';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getTransactions = async (user: User | null) => {
    if (!user) {
        return [];
    }

    try {
        const response = await fetch(`${apiUrl}/api/transactions`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        });

        if (response.ok) {
            const transactions = await response.json();
            return transactions;
        }
        return [];
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return [];
    }
};

export const getTransaction = async (id: string, user: User | null) => {
    if (!user) {
        return null;
    }

    try {
        const response = await fetch(`${apiUrl}/api/transactions/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        });

        if (response.ok) {
            const transaction = await response.json();
            return transaction;
        }
        return null;
    } catch (error) {
        console.error('Error fetching transaction:', error);
        return null;
    }
};

export const createTransaction = async (
    data: {
        amount: number;
        currency: string;
        categoryId: string;
        date: string;
        description?: string;
        type?: 'income' | 'expense';
    },
    user: User | null
) => {
    if (!user) {
        return null;
    }

    try {
        const response = await fetch(`${apiUrl}/api/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const transaction = await response.json();
            return transaction;
        }
        return null;
    } catch (error) {
        console.error('Error creating transaction:', error);
        return null;
    }
};

export const updateTransaction = async (
    id: string,
    data: {
        amount?: number;
        currency?: string;
        categoryId?: string;
        date?: string;
        description?: string;
        type?: 'income' | 'expense';
    },
    user: User | null
) => {
    if (!user) {
        return null;
    }

    try {
        const response = await fetch(`${apiUrl}/api/transactions/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const transaction = await response.json();
            return transaction;
        }
        return null;
    } catch (error) {
        console.error('Error updating transaction:', error);
        return null;
    }
};

export const deleteTransaction = async (id: string, user: User | null) => {
    if (!user) {
        return false;
    }

    try {
        const response = await fetch(`${apiUrl}/api/transactions/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            }
        });

        return response.ok;
    } catch (error) {
        console.error('Error deleting transaction:', error);
        return false;
    }
};
