class User {
  signedIn = false;
  transacthistory = [];
  #moneySp = [];
  #friendlist = [];
  due = 0;
  card = {
    name,
    num: Math.trunc(Math.random() * (9000 - 5000) + 5000),
    cvv: Math.trunc(Math.random() * (800 - 300) + 300),
    exp: `${Math.trunc(Math.random() * (30 - 10)) + 10}/10`,
  };
  constructor(name, email, password, id, starttr) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.id = id;
    this.starttr = starttr;
    this.card.name = this.name;
    this.basePush();
  }
  basePush() {
    this.transacthistory.push(this.starttr);
  }
  addTotransact(transact) {
    this.transacthistory.push(transact);
  }
  friendsadd(name) {
    this.#friendlist.push(name);
  }
  transferMoney() {}
  getTransact() {
    return this.transacthistory;
  }
  takeLoan() {}
}
class transact {
  constructor(to, date, amt) {
    this.to = to;
    this.date = date;
    this.amt = amt;
  }
}
class MoneySpent {
  constructor(name, perc, amt) {
    (this.name = name), (this.perc = perc), (this.amt = amt);
  }
}
export { User, transact, MoneySpent };
