import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./hooks/useTransactions";
import { GlobalStyle } from "./styles/global";
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const handleOpenNewTransactionModal = () => {
    setModalTitle("Cadastrar Transação");
    setIsNewTransactionModalOpen(true);
  }

  const handleCloseNewTransactionModal = () => {
    setModalTitle('');
    setIsNewTransactionModalOpen(false);
  }

  return <TransactionsProvider>
    <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
    <Dashboard/>
    <NewTransactionModal
      isOpen={isNewTransactionModalOpen}
      onRequestClose={handleCloseNewTransactionModal}
      title={modalTitle}
    />
    <ToastContainer />
    <GlobalStyle />
  </TransactionsProvider>
}
