import { TransactionsContextData, useTransactions } from '../../hooks/useTransactions';
import { formatToBRL } from '../../hooks/useFormatBRL';
import { SummaryContainer } from "./styles";
import icomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';

interface CalculatedValues {
    deposits: number,
    withdraws: number,
    total: number
};

export const Summary = () => {
    const { transactions }: TransactionsContextData = useTransactions();

    const calculatedValues: CalculatedValues = transactions.reduce((acc, transaction) => {
        if(transaction.type === 'deposit') {
            acc.deposits += transaction.amount;
            acc.total += transaction.amount;
        } else if(transaction.type === 'withdraw') {
            acc.withdraws += transaction.amount;
            acc.total -= transaction.amount;
        }

        return acc;
    }, {
        deposits: 0,
        withdraws: 0,
        total: 0
    })

    return <SummaryContainer>
        <div>
            <header>
                <p>Entradas</p>
                <img src={icomeImg} alt="entradas" />
            </header>
            <strong>
                {formatToBRL(calculatedValues.deposits)}
            </strong>
        </div>
        <div>
            <header>
                <p>Saídas</p>
                <img src={outcomeImg} alt="Saídas" />
            </header>
            <strong>
                {formatToBRL(calculatedValues.withdraws)}
            </strong>
        </div>
        <div className="highlight-background">
            <header>
                <p>Total</p>
                <img src={totalImg} alt="total" />
            </header>
            <strong>
                {formatToBRL(calculatedValues.total)}
            </strong>
        </div>
    </SummaryContainer>
}