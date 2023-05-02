import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

export interface Transaction {
    id: number,
    title: string,
    amount: number,
    type: string,
    category: string,
    createdAt: Date
};

export type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
    children: ReactNode
};

export interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (Transaction: TransactionInput) => Promise<string>;
}

export const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export const TransactionsProvider = ({ children }: TransactionsProviderProps) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [reload, setReload] = useState(true);

    useEffect(() => {
        if(reload) {
            api.get('transactions')
            .then(res => {
                setTransactions(res?.data?.transactions || []);
                setReload(false);
            });
        }
    }, [reload]);

    const createTransaction = async (transactionInput: TransactionInput) => {
        const response = await api.post('/transactions', transactionInput);
        const { transaction } = response.data;

        console.log("transaction", transaction)
        
        if(transaction && transaction.id) {
            setReload(true);
            setTransactions([...transactions, transaction]);
            return 'success';
        }
        
        return 'error';
    }

    return <TransactionsContext.Provider value={{ transactions, createTransaction }}>
        {children}
    </TransactionsContext.Provider>
}

export const useTransactions = (): TransactionsContextData => {
    const context = useContext<TransactionsContextData>(TransactionsContext);

    return context;
}