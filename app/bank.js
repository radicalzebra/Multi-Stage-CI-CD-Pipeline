class Bank {
  #currentlySignedUser = null;
  #clUsers = [];
  #db = [];
  bankL = 5000;
  constructor() {}
  userDb(acc) {
    this.#db.push(acc);
    this.setCurrentlySigned();
  }
  getUser(name) {
    const foundUser = this.#db.find((el) => {
      return name === el.name && !el.signedIn;
    });
    return foundUser;
  }
  checkUsersAndTransfer(name, amt) {
    const foundUser = this.getUser(name);
    const taccept = this._transferMoneyGrant(amt);
    if (foundUser && taccept) {
      return true;
    }
    return false;
  }
  checkDue() {
    if (this.#currentlySignedUser.due >= -1000) {
      return true;
    }
    return false;
  }
  _transferMoneyGrant(val) {
    if (this.#currentlySignedUser.due >= -1000 && val <= 1000) {
      console.log(this.#currentlySignedUser.due);
      return true;
    }
    return false;
  }
  checkForLoan(val) {
    return this._loanGrant(val);
  }
  _loanGrant(val) {
    const bal = (20 / 100) * this.#currentlySignedUser.balance;
    if (this.bankL >= 3000) {
      if (
        val > bal &&
        val < bal + 2000 &&
        this.#currentlySignedUser.due > -500
      ) {
        return true;
      }
    }
    return false;
  }
  getdb() {
    return this.#db;
  }
  logOutCurrentlySigned() {
    this.#currentlySignedUser = null;
  }
  setCurrentlySigned() {
    this.#currentlySignedUser = this.#db.find((el) => {
      return el.signedIn == true;
    });
  }
  clAcc() {}
}
//   named export
export const bank = new Bank();
//   named export and default exp
