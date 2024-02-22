import express from 'express';
import { BankingSystem } from '../BankingSystem';

export default function accountsRoutes(bankingSystem: BankingSystem) {
  const router = express.Router();

  router.post('/', (req, res) => {
    const { name, initialBalance } = req.body;
    const account = bankingSystem.createAccount(name, initialBalance);
    res.status(201).json(account);
  });

  router.post('/:id/deposit', (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;
    bankingSystem.deposit(id, amount);
    res.sendStatus(200);
  });

  router.post('/:id/withdraw', (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;
    bankingSystem.withdraw(id, amount);
    res.sendStatus(200);
  });

  return router;
}
