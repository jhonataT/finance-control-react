import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { customToast } from '../Toast';
import { TransactionsContextData, useTransactions } from '../../hooks/useTransactions';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { ModalContainer, RadioBox, TransactionTypeContainer } from "./styles";

Modal.setAppElement('#root');

type TransactionType = 'deposit' | 'withdraw';

interface NewTransactionModalProps {
    onRequestClose: () => void,
    isOpen: boolean,
    title?: string
};

interface FormValues {
    title: string;
    amount: number;
    category: string;
}

export const NewTransactionModal = ({
    onRequestClose,
    isOpen,
    title
}: NewTransactionModalProps) => {
    const { createTransaction }: TransactionsContextData = useTransactions();
    const [formValues, setFormValues] = useState<FormValues>({
        title: '',
        amount: 0,
        category: ''
    });
    const [transactionType, setTransactionType] = useState<TransactionType>('deposit');

    const handleCreateNewTransaction = async (event: FormEvent) => {
        event.preventDefault();
        const response = await createTransaction({...formValues, type: transactionType})

        if(response === 'success') {
            customToast('Transação cadastrada com sucesso.', 'success');
            onRequestClose();
            setFormValues({ title: '', amount: 0, category: '' });
            return;
        }

        customToast('Erro ao cadastrar transação, tente novamente.', 'error');
    }

    return <Modal
            className="react-modal-content"
            overlayClassName="react-modal-overlay"
            isOpen={isOpen}
            onRequestClose={onRequestClose}
        >
            <button onClick={onRequestClose} className="react-modal-close">
                <img src={closeImg} alt="Fechar modal"/>
            </button>
            <ModalContainer onSubmit={handleCreateNewTransaction}>
                <h2>{title}</h2>
                <input
                    placeholder='Título'
                    value={formValues.title}
                    onChange={(event) => setFormValues({...formValues, title: event.target?.value})}
                />
                <input
                    type="number"
                    placeholder='Valor'
                    value={formValues.amount}
                    onChange={(event) => setFormValues({...formValues, amount: Number(event.target?.value)})}
                />
                <TransactionTypeContainer>
                    <RadioBox
                        type="button"
                        isActive={transactionType === 'deposit'}
                        activeColor="green"
                        onClick={() => setTransactionType('deposit')}
                    >
                        <img src={incomeImg} alt="Tipo Entrada"/>
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox
                        type="button"
                        isActive={transactionType === 'withdraw'}
                        activeColor="red"
                        onClick={() => setTransactionType('withdraw')}
                    >
                        <img src={outcomeImg} alt="Tipo Saída"/>
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>
                <input
                    placeholder='categoria'
                    value={formValues.category}
                    onChange={(event) => setFormValues({...formValues, category: event.target?.value})}
                />
                <button type="submit">Cadastrar</button>
            </ModalContainer>
    </Modal>
}