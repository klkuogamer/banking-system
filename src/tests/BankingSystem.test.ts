import { BankingSystem } from '../BankingSystem';

describe('BankingSystem', () => {
  let bankingSystem: BankingSystem;

  beforeEach(() => {
    bankingSystem = new BankingSystem();
  });

  test('createAccount should create a new account', () => {
    const account = bankingSystem.createAccount('John Doe', 1000);
    expect(account.id).toBeDefined();
    expect(account.name).toBe('John Doe');
    expect(account.balance).toBe(1000);
  });

  test('deposit should increase account balance', () => {
    const account = bankingSystem.createAccount('John Doe', 1000);
    bankingSystem.deposit(account.id, 500);
    expect(account.balance).toBe(1500);
  });

  test('withdraw should decrease account balance', () => {
    const account = bankingSystem.createAccount('John Doe', 1000);
    bankingSystem.withdraw(account.id, 500);
    expect(account.balance).toBe(500);
  });

  test('transfer should move money between accounts', () => {
    const fromAccount = bankingSystem.createAccount('John Doe', 1000);
    const toAccount = bankingSystem.createAccount('Jane Doe', 500);
    bankingSystem.transfer(fromAccount.id, toAccount.id, 500);
    expect(fromAccount.balance).toBe(500);
    expect(toAccount.balance).toBe(1000);
  });

  test('getTransactions should return transactions for an account', () => {
    const fromAccount = bankingSystem.createAccount('John Doe', 1000);
    const toAccount = bankingSystem.createAccount('Jane Doe', 500);
    bankingSystem.transfer(fromAccount.id, toAccount.id, 500);
    const transactions = bankingSystem.getTransactions(fromAccount.id);
    expect(transactions.length).toBe(1);
    expect(transactions[0].fromAccountId).toBe(fromAccount.id);
    expect(transactions[0].toAccountId).toBe(toAccount.id);
    expect(transactions[0].amount).toBe(500);
  });
});
