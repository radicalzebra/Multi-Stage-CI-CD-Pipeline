const db = [];
class UserWithBasic {
  signedIN = false;
  id = Math.trunc(Math.random() * (100 - 70) + 70);
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
const john = new UserWithBasic('John Doe', 'johndoe@gmail.com', 'john456');
const janeUs = new UserWithBasic('Jane Doe', 'janedoe@gmail.com', 'jane456');

db.push(john);
db.push(janeUs);
class App {
  constructor() {
    this._uiSelectors();
    this._listeners();
    this.reveal();
    this.IntObserver();
    this.lazyLoading();
    this.counter = 0;
  }

  _uiSelectors() {
    this.selectors = {
      section: document.querySelectorAll('section'),
      header: document.querySelector('.header'),
      modal: document.querySelector('.modal'),
      overlay: document.querySelector('.overlay'),
      btn: document.querySelectorAll('.bt'),
      btnscroll: document.querySelector('#btn-scroll'),
      feat: document.querySelector('#features'),
      listnav: document.querySelector('.nav__list'),
      opBox: document.querySelector('.op-box'),
      opmt: document.querySelector('.op'),
      img: document.querySelectorAll('.feature-img'),
      arrow: document.querySelectorAll('.test__box'),
      test: document.querySelectorAll('.test'),
      modalform: document.querySelector('.modal__form'),
      inp: document.getElementById('name'),
      lname: document.getElementById('lname'),
      email: document.getElementById('email'),
      pass: document.getElementById('pass'),
      modalformSign: document.querySelector('.modal__bform'),
      signedInp: document.getElementById('signedN'),
      lpass: document.getElementById('lpass'),
      btnSigned: document.querySelector('#signedBtn'),
    };
  }
  btnScrollTo(e) {
    e.preventDefault();
    const s1coords = this.selectors.feat.getBoundingClientRect();

    this.selectors.feat.scrollIntoView({ behavior: 'smooth' });
  }
  slider(e) {
    if (!e.target.classList.contains('test__svg')) {
      return;
    }
    const arr = [...this.selectors.test];
    if (e.target.classList.contains('test__svg--left')) {
      this.counter++;
      if (this.counter >= arr.length) {
        this.counter = 0;
      }

      for (let i = 0; i < arr.length; i++) {
        arr[i].style.transform = `translateX(${(i - this.counter) * 100}%)`;
      }
    } else if (e.target.classList.contains('test__svg--right')) {
      this.counter--;
      if (this.counter < 0) {
        this.counter = arr.length - 1;
      }
      for (let i = 0; i < arr.length; i++) {
        arr[i].style.transform = `translateX(${(i - this.counter) * 100}%)`;
      }
    }
  }
  _scrollToPos(e) {
    e.preventDefault();

    if (
      !e.target.classList.contains('nav__it-list') ||
      e.target.classList.contains('nav__it-list--1')
    )
      return;
    const elem = e.target.getAttribute('href');
    console.log(elem);
    document.querySelector(elem).scrollIntoView({ behavior: 'smooth' });
  }
  tabbed(e) {
    if (!e.target.classList.contains('op__head')) {
      return;
    }
    const [one, two] = e.target.classList;
    [...e.target.parentElement.children].forEach((el) => {
      if (el != e.target) {
        el.style.transform = 'translateY(0rem)';
      } else {
        el.style.transform = 'translateY(-1rem)';
      }
    });
    let ind = two.slice(-1);
    const arr = this.selectors.opBox.children;
    for (let i = 1; i < arr.length; i++) {
      if (i !== Number(ind)) {
        arr[i].classList.add('hidden');
      } else {
        arr[i].classList.remove('hidden');
      }
    }
  }
  ffade(e) {
    if (e.target.classList.contains('nav__it-list')) {
      e.target
        .closest('.nav__list')
        .querySelectorAll('.nav__it-list')
        .forEach((el) => {
          if (e.target != el) {
            el.style.opacity = '.5';
            el.style.transition = 'all .3s ease';
          }
        });
    }
  }
  unFade(e) {
    e.target
      .closest('.nav__list')
      .querySelectorAll('.nav__it-list')
      .forEach((el) => {
        if (e.target != el) {
          el.style.opacity = '1';
        }
      });
  }
  reveal() {
    const observer = new IntersectionObserver(
      ([entry], observer) => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.remove('sec-hidden');
        observer.unobserve(entry.target);
      },
      {
        root: null,
        threshold: 0.15,
      }
    );
    this.selectors.section.forEach((sec) => {
      sec.classList.add('sec-hidden');
      observer.observe(sec);
    });
  }
  IntObserver() {
    let headerObserver = new IntersectionObserver(
      (entry, observe) => {
        const [enter] = entry;
        if (!enter.isIntersecting) {
          this.selectors.listnav
            .closest('nav')
            .parentElement.classList.add('sticky');
        } else {
          this.selectors.listnav
            .closest('nav')
            .parentElement.classList.remove('sticky');
        }
      },
      {
        root: null,
        threshold: 0,
        rootMargin: '-90px',
      }
    );
    headerObserver.observe(this.selectors.header);
  }
  lazyLoading() {
    const observe = new IntersectionObserver(
      ([entry], observer) => {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.src = entry.target.dataset.src;
        // once it finished loading the image it will fire the load ev
        entry.target.addEventListener('load', () => {
          entry.target.classList.remove('lazy');
        });
        observer.unobserve(entry.target);
      },
      {
        root: null,
        threshold: 0,
        rootMargin: '200px',
      }
    );
    this.selectors.img.forEach((el) => {
      observe.observe(el);
    });
  }

  createError() {
    const html = `<div class="error">
   <div>Enter Correct Details</div>
   </div>`;
    this.selectors.modalformSign.insertAdjacentHTML('afterbegin', html);
  }
  LoginFormSub(e) {
    e.preventDefault();
    const { signedInp, lpass } = this.selectors;
    const name = signedInp.value.trim();
    const password = lpass.value;
    const nameMod = name
      .split(' ')[0]
      .charAt(0)
      .toUpperCase()
      .concat(name.substring(1));
    console.log(db);
    const datab = db.find((el) => {
      if (el.name === nameMod && password === el.password) {
        return el;
      }
    });
    if (!datab) {
      this.createError();
      this.selectors.btnSigned.disabled = true;
      setTimeout(() => {
        this.selectors.btnSigned.disabled = false;
        this.selectors.modalformSign.children[0].remove();
      }, 1500);
      return;
    }

    datab.signedIN = true;
    this.changeLoc(datab);
  }

  setLocalStorage() {
    localStorage.setItem('bank', JSON.stringify(db));
  }
  changeLoc(db) {
    this.setLocalStorage();
    const qs = Object.keys(db)
      .filter((key) => {
        if (key == 'name' || key == 'email') {
          return key;
        }
      })
      .map((key) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(db[key])}`;
      })
      .join('&');
    let url = `?${qs}`;
    location.href = `/dashboard.html${url}`;
    // localStrogae the data is linked to the url in which we are using the app
  }
  showForm(...styles) {
    this.selectors.modalform.closest('.modal__front').style.backfaceVisibility =
      styles[0];
    this.selectors.modalform.closest('.modal__front').style.transform =
      styles[1];
    this.selectors.modalformSign.closest('.modal__back').style.transform =
      styles[2];
    this.loginFormVis = true;
  }
  createUser(e) {
    e.preventDefault();
    const { inp, lname, email, pass } = this.selectors;
    const name = inp.value + ' ' + lname.value;
    const user = new UserWithBasic(name, email.value, pass.value);

    db.push(user);
    this.showForm('hidden', 'rotateY(180deg)', 'rotateY(0deg)');
  }
  _listeners() {
    this.selectors.modalformSign.addEventListener(
      'submit',
      this.LoginFormSub.bind(this)
    );
    this.selectors.modalform.addEventListener(
      'submit',
      this.createUser.bind(this)
    );
    this.selectors.arrow.forEach((el) => {
      el.addEventListener('click', this.slider.bind(this));
    });
    // window.addEventListener("scroll", this.sticky.bind(this));
    this.selectors.listnav.addEventListener('mouseout', this.unFade);
    this.selectors.listnav.addEventListener('mouseover', this.ffade);
    this.selectors.opBox.addEventListener('click', this.tabbed.bind(this));
    this.selectors.listnav.addEventListener('click', this._scrollToPos);
    this.selectors.btnscroll.addEventListener(
      'click',
      this.btnScrollTo.bind(this)
    );
    this.selectors.overlay.addEventListener('click', () => {
      this.opLog();
    });
    this.selectors.btn.forEach((el) => {
      el.addEventListener('click', this.openModal.bind(this));
    });
  }
  opLog() {
    let bool =
      this.selectors.modal.classList.contains('hidden') &&
      this.selectors.overlay.classList.contains('hidden');
    if (bool) {
      this.selectors.modal.classList.remove('hidden');
      this.selectors.overlay.classList.remove('hidden');
    } else {
      this.selectors.modal.classList.add('hidden');
      this.selectors.overlay.classList.add('hidden');
      this.showForm('visible', 'rotateY(0deg)', 'rotateY(-180deg)');
      this.loginFormVis = false;
    }
  }
  openModal(e) {
    e.preventDefault();
    this.opLog();
  }
}

const app = new App();
console.log('-->>> MADE BY DANISH IQBAL <<<--');
