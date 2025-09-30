import { bank } from './bank.js';
import { User, transact, MoneySpent } from './user.js';

const uiSelectors = () => {
  return {
    userN: document.querySelector('.user__name'),
    userE: document.querySelector('.user__email'),
    cardIn: document.querySelector('.card__inf'),
    cardNum: document.querySelector('.card__num'),
    cardM: document.querySelector('.card__main'),
    cardExp: document.querySelector('.card__info--1 .card__inf'),
    cardcv: document.querySelector('.card__info--2 .card__inf'),
    balance: document.querySelector('.accbalance__main'),
    ul: document.querySelector('.transact'),
    formTransfer: document.querySelector('.form--transfer'),
    formTTinp: document.querySelector('.form--transfer .form__inp'),
    formTinp2: document.querySelector('.form--transfer .form__amt'),
    reqLoan: document.querySelector('.form--loan'),
    inpL: document.querySelector('.form--loan .form__amt'),
    logOut: document.querySelector('.logout__sp'),
  };
};
const createUserProfile = (user) => {
  const { name, email, id, password, signedIN } = user;
  const userAc = new User(
    name,
    email,
    password,
    id,
    new transact('Hulu', '11th May', -89)
  );
  userAc.signedIn = signedIN;
  userAc.balance = 6700;
  const rest = updateUserAmt(userAc);
  userAc.balance += rest;
  addDue(userAc);
  updateBal(user);
  return userAc;
};
const addDue = (user) => {
  if (user.balance <= 0) {
    user.due = user.balance;
  }
};
const display = (userAc, dis, disCard, changeTrans) => {
  function change() {
    updateBal(userAc);
    dis(userAc);
    disCard(userAc);
    changeTrans(userAc);
  }
  change();
};
function updateUserAmt(user) {
  const rest = user.getTransact().reduce((counter, el) => {
    return el.amt + counter;
  }, 0);
  return rest;
}
function updateBal(userAc) {
  uiSelectors().balance.textContent = `$${userAc.balance}`;
}
function upDateInfo(user) {
  changeTrans(user);
  updateBal(user);
}
function transferMoney(e) {
  e.preventDefault();
  const { formTTinp, formTinp2 } = uiSelectors();
  const name = formTTinp.value.trim();
  const amt = Number(formTinp2.value);
  const bool = bank.checkUsersAndTransfer(name, amt);
  console.log(bank.getdb());
  if (!bool) {
    console.log('Not Found');
    return;
  }
  const userTo = bank.getUser(name);
  this.addTotransact(new transact(name, 'Today', -amt));
  userTo.addTotransact(new transact(name, 'Today', +amt));
  userTo.balance += amt;
  this.balance -= amt;
  addDue(this);
  upDateInfo(this);
}
function grantLoan(e) {
  e.preventDefault();
  const val = Number(uiSelectors().inpL.value);
  const bool = bank.checkForLoan(val);
  console.log(bool);
  if (!bool) {
    return;
  }
  this.balance += val;
  console.log(this);
  updateBal(this);
}
function logOut(e) {
  const confirm = document.createElement('div');
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  //   overlay.classList.add("hidden");
  //   <div class="overlay hidden"></div>
  confirm.classList.add('confirm');
  const html = `<span>Are you Sure</span>
    <div>
    <button class="yes btn">Yes</button>
    <button class="No btn">No</button>
    </div>`;
  confirm.innerHTML = html;
  console.log(confirm);
  document.body.append(confirm);
  document.body.append(overlay);
  document
    .querySelector('.confirm')
    .addEventListener('click', currLog.bind(this));
}
function showLoginForm() {}
function currLog(e) {
  if (!e.target.classList.contains('btn')) {
    console.log('jjj');
    return;
  }
  if (e.target.classList.contains('yes')) {
    this.signedIn = false;
    bank.logOutCurrentlySigned();
    document.querySelector('.confirm').style.display = 'none';
    document.querySelector('.overlay').classList.add('hidden');
    // localStorage.setItem("bank", JSON.stringify(bank.getdb()));
    document.body.querySelector('main').style.display = 'none';
    showLoginForm();
  } else {
  }
}
function listeners(user) {
  uiSelectors().formTransfer.addEventListener(
    'submit',
    transferMoney.bind(user)
  );

  uiSelectors().reqLoan.addEventListener('submit', grantLoan.bind(user));
  uiSelectors().logOut.addEventListener('click', logOut.bind(user));
}
function changeTrans(userAc) {
  const transactHis = userAc.transacthistory;
  console.log(transactHis);
  let html = '';
  transactHis.forEach((element) => {
    html += ` <li class="transact__item">
    <span class="transact__style"></span>
    <h3 class="transact__heading">
        ${element.to}
    </h3>
    <span class="transact__date">${element.date}</span>
    <svg class="transact__svg">
        <use xlink:href="img/sprite.svg#icon-icon3">
    </svg>
    <div class="transact__amt">
       $${element.amt < 0 ? -element.amt : element.amt}
    </div>
</li>`;
  });
  uiSelectors().ul.innerHTML = html;
}
function displayCard(userAc) {
  let j = '';
  for (let i = 0, h = 1, k = 0; i < 16; i++) {
    if (i == 3 * h + k) {
      (j += '*'), (j += ' '), (h += 1), (k += 1);
    } else {
      j += '*';
    }
  }
  const { cardIn, cardNum, cardM, cardExp, cardcv } = uiSelectors();
  cardNum.innerHTML = `${j}   <span class="card__main"> ${userAc.card.num}</span>`;
  cardExp.textContent = userAc.card.exp;
  cardcv.textContent = userAc.card.cvv;
  cardIn.textContent = userAc.card.name;
}
function displayUser(userAc) {
  const { userN, userE } = uiSelectors();
  userN.textContent = userAc.name;
  userE.textContent = userAc.email;
}

window.addEventListener('load', (e) => {
  if (!location.search) {
    return;
  }

  const dec = window.location.search.substring(1);
  const params = new URLSearchParams(dec);
  const retdb = JSON.parse(localStorage.getItem('bank'));
  retdb
    .map((el) => {
      return createUserProfile(el);
    })
    .forEach((el) => {
      bank.userDb(el);
    });
  const user = bank.getdb().find((el) => {
    return el.email == params.get('email') && el.name == params.get('name');
  });
  if (!user) {
    console.log('Errrorr');
  }
  listeners(user);
  display(user, displayUser, displayCard, changeTrans);
  // localStorage.removeItem("bank");
});
new transact('Amazon', '9th May', '-90');
new transact('Netflix', '9th May', '-90');
