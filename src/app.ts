import express from 'express';
import { BankingSystem } from './BankingSystem';
import accountsRoutes from './routes/accounts';
import transactionsRoutes from './routes/transactions';

const app = express();
const bankingSystem = new BankingSystem();

app.use(express.json());

app.use('/accounts', accountsRoutes(bankingSystem));
app.use('/transactions', transactionsRoutes(bankingSystem));

app.listen(3000, () => {
  console.log('Banking system is running on port  3000');
});
