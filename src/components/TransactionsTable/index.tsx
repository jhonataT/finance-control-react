import moment from 'moment';
import { formatToBRL } from "../../hooks/useFormatBRL";
import { TransactionsContextData, useTransactions } from "../../hooks/useTransactions";
import { TransactionsContainer } from "./styles";

export const TransactionsTable = () => {
    const { transactions }: TransactionsContextData = useTransactions();
    
    return <TransactionsContainer>
        <table>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Valor</th>
                    <th>Categoria</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
                {
                    Array.isArray(transactions) && transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.title}</td>
                            <td className={transaction.type}>
                                {formatToBRL(transaction.amount)}
                            </td>
                            <td>{transaction.category}</td>
                            <td>{moment(transaction.createdAt).format('DD/MM/YYYY')}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </TransactionsContainer>
}