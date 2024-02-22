import request from 'supertest';
import express from 'express';
import { BankingSystem } from '../BankingSystem';
import accountsRoutes from '../routes/accounts';
import transactionsRoutes from '../routes/transactions';

const app = express();
const bankingSystem = new BankingSystem();

app.use(express.json());
app.use('/accounts', accountsRoutes(bankingSystem));
app.use('/transactions', transactionsRoutes(bankingSystem));

describe('API endpoints', () => {
  test('POST /accounts should create a new account', async () => {
    const response = await request(app)
      .post('/accounts')
      .send({ name: 'John Doe', initialBalance: 1000 });
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('John Doe');
    expect(response.body.balance).toBe(1000);
  });

  test('POST /accounts/:id/deposit should increase account balance', async () => {
    const account = await request(app)
      .post('/accounts')
      .send({ name: 'John Doe', initialBalance: 1000 });
    const response = await request(app)
      .post(`/accounts/${account.body.id}/deposit`)
      .send({ amount: 500 });
    expect(response.status).toBe(200);
  });

  test('POST /accounts/:id/withdraw should decrease account balance', async () => {
    const account = await request(app)
      .post('/accounts')
      .send({ name: 'John Doe', initialBalance: 1000 });
    const response = await request(app)
      .post(`/accounts/${account.body.id}/withdraw`)
      .send({ amount: 500 });
    expect(response.status).toBe(200);
  });

  test('POST /transactions should move money between accounts', async () => {
    const fromAccount = await request(app)
      .post('/accounts')
      .send({ name: 'John Doe', initialBalance: 1000 });
    const toAccount = await request(app)
      .post('/accounts')
      .send({ name: 'Jane Doe', initialBalance: 500 });
    const response = await request(app)
      .post('/transactions')
      .send({ fromAccountId: fromAccount.body.id, toAccountId: toAccount.body.id, amount: 500 });
    expect(response.status).toBe(200);
  });

  test('GET /transactions/:id should return transactions for an account', async () => {
    const fromAccount = await request(app)
      .post('/accounts')
      .send({ name: 'John Doe', initialBalance: 1000 });
    const toAccount = await request(app)
      .post('/accounts')
      .send({ name: 'Jane Doe', initialBalance: 500 });
    await request(app)
      .post('/transactions')
      .send({ fromAccountId: fromAccount.body.id, toAccountId: toAccount.body.id, amount: 500 });
    const response = await request(app)
      .get(`/transactions/${fromAccount.body.id}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].fromAccountId).toBe(fromAccount.body.id);
    expect(response.body[0].toAccountId).toBe(toAccount.body.id);
    expect(response.body[0].amount).toBe(500);
  });
});
