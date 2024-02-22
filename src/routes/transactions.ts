import express from 'express';
import { BankingSystem } from '../BankingSystem';

export default function transactionsRoutes(bankingSystem: BankingSystem) {
  const router = express.Router();

  router.post('/', (req, res) => {
    const { fromAccountId, toAccountId, amount } = req.body;
    bankingSystem.transfer(fromAccountId, toAccountId, amount);
    res.sendStatus(200);
  });

  router.get('/:id', (req, res) => {
    const { id } = req.params;
    const transactions = bankingSystem.getTransactions(id);
    res.json(transactions);
  });

  return router;
}
