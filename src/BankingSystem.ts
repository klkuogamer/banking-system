export class BankingSystem {
  private accounts: Account[] = [];
  private transactions: Transaction[] = [];

  createAccount(name: string, initialBalance: number): Account {
    const account = { id: Date.now().toString(), name, balance: initialBalance };
    while (this.accounts.find(a => a.id === account.id)) {
      account.id = Date.now().toString();
    }
    this.accounts.push(account);
    return account;
  }

  deposit(accountId: string, amount: number): void {
    const account = this.accounts.find(a => a.id === accountId);
    if (account) {
      account.balance += amount;
    }
  }

  withdraw(accountId: string, amount: number): void {
    const account = this.accounts.find(a => a.id === accountId);
    if (account && account.balance >= amount) {
      account.balance -= amount;
    }
  }

  transfer(fromAccountId: string, toAccountId: string, amount: number): void {
    const fromAccount = this.accounts.find(a => a.id === fromAccountId);
    const toAccount = this.accounts.find(a => a.id === toAccountId);
    if (fromAccount && toAccount && fromAccount.balance >= amount) {
      fromAccount.balance -= amount;
      toAccount.balance += amount;
      const transaction = {
        id: Date.now().toString(),
        fromAccountId,
        toAccountId,
        amount,
        timestamp: new Date()
      };
      this.transactions.push(transaction);
    }
  }


  getTransactions(accountId: string): Transaction[] {
    return this.transactions.filter(t => t.fromAccountId === accountId || t.toAccountId === accountId);
  }
}

interface Account {
  id: string;
  name: string;
  balance: number;
}

interface Transaction {
  id: string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  timestamp: Date;
}
