// ========== GLOBAL MASSIVLAR ==========
let productsData = []; // base.json dan keladi
let cart = []; // savat uchun

// ========== SWIPER ==========
const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");

var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  on: {
    autoplayTimeLeft(s, time, progress) {
      progressCircle.style.setProperty("--progress", 1 - progress);
      progressContent.textContent = `${Math.ceil(time / 3000)}s`;
    }
  }
});

// ========== MENU TOGGLE ==========
const homeBtn = document.querySelector('.flex2');
const pagesBtn = document.querySelector('.flex');
const cont = document.querySelector('.block');
const open = document.querySelector('.open');

homeBtn.addEventListener("click", () => {
  cont.classList.remove('aktive');
  open.classList.remove('active');
});

pagesBtn.addEventListener("click", () => {
  cont.classList.toggle('aktive');
  open.classList.toggle('active');
});

// ========== LOAD DATA ==========
async function LoadData() {
  const response = await fetch('base.json');
  const data = await response.json();
  productsData = data.products;
  DisplayData(productsData);
}

// ========== DISPLAY DATA ==========
const box = document.querySelector('.box1');
const page = document.querySelector('.pagee');

function DisplayData(data) {
  box.innerHTML = "";

  data.forEach((product, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;

    const imageSrc = Array.isArray(product.images) ? product.images[0] : product.image;

    card.innerHTML = `
      <div class="sss">
        <img class="top" src="${imageSrc}" alt="${product.title}">
      </div>
      <div>
        <h2 class="org">${product.title}</h2>
        <p class="description">${product.description}</p>
        <div class="price">
          <p class="rice">${product.price.toLocaleString()} so'm</p>
        </div>
        <button class="add-to">Add to Cart</button>
      </div>
    `;

    box.appendChild(card);
  });
}

const fell = document.querySelector('.felll')

box.addEventListener("click", (e) => {
  const card = e.target.closest('.card');
  if (!card) return;



  const index = card.dataset.index;
  const product = productsData[index];
  if (!product) return;




  if (e.target.classList.contains('add-to')) {
    AddTo(product);
    return;
  }


  let ochiq = document.querySelector('.ochiq');
  if (!ochiq) {
    ochiq = document.createElement('div');
    ochiq.classList.add('ochiq');
    page.appendChild(ochiq);
  }

  let imagesHTML = '';
  if (Array.isArray(product.images)) {
    product.images.forEach(img => {
      imagesHTML += `<div class="images"><img src="${img}" alt=""></div>`;
    });
  }
  box.classList.add('block')
  fell.classList.add('fel')

  ochiq.innerHTML = `
    <div>${imagesHTML}</div>
    <div class="imgg">
      <img src="${product.images[0]}" alt="">
    </div>
    <div>
      <h1 class="titlrr">${product.title}</h1>
      <div class="reyting">
        <img src="./img/Group 236.png" alt="">
        <p>${product.stars || 0}</p>
      </div>
      <div class="price1">
        <p>${product.price.toLocaleString()} so'm</p>
      </div>
      <p class="color">Color</p>
      <div class="add">
        <img src="./img/Vector.png" alt="">
      </div>
      <p class="categories">Categories :</p>
      <p>${product.category}</p>
      <div class="share"><p>Share</p></div>
      <button class="yopish">Yopish</button>
    </div>
  `;


  const yopishBtn = ochiq.querySelector('.yopish');
  if (yopishBtn) {
    yopishBtn.addEventListener('click', () => {
      ochiq.remove();
      box.style.display = 'grod';
      fell.style.display = 'block';
      box.classList.remove('block');
      fell.classList.remove('fel');
    });
  }
});

// ========== SEARCH ==========
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll('.box1 .card');

  cards.forEach(card => {
    const title = card.querySelector('.org').textContent.toLowerCase();
    card.style.display = title.includes(query) ? 'block' : 'none';
  });
});

// ========== FILTER ==========
const filterSelect = document.getElementById('filter');

filterSelect.addEventListener('change', () => {
  const selectedCategory = filterSelect.value.toLowerCase();
  const filtered = selectedCategory === ""
    ? productsData
    : productsData.filter(product => product.category.toLowerCase() === selectedCategory);

  DisplayData(filtered);
});

// ========== COUNTDOWN ==========
let time = 1 * 1 * 60;
const hour = document.querySelector(".time-Hour");
const minute = document.querySelector(".time-minut");
const second = document.querySelector(".time-secund");
const price = document.querySelectorAll('.scid-price');

const countdown = setInterval(() => {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = time % 60;

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  hour.textContent = hours;
  minute.textContent = minutes;
  second.textContent = seconds;

  time--;

  if (time < 0) {
    clearInterval(countdown);
    hour.textContent = "00";
    minute.textContent = "00";
    second.textContent = "00";

    price.forEach(el => el.style.display = 'none');
    price.forEach(el => el.style.color = 'red');
  }
}, 1000);

// ========== CART ==========
const shopBox = document.querySelector(".cars1");
function AddTo(product) {
  // Agar savatda shunaqa product bo'lsa, hech narsa qilmaymiz
  const exists = cart.find(item => item.id === product.id);
  if (exists) return;

  // Yangi itemni count bilan qo'shamiz
  cart.push({ ...product, count: 1 });
  renderCart();
}

function renderCart() {
  if (cart.length < 1) {
    shopBox.innerHTML = `<h5>Sizda hozircha hech nima yo'q</h5>`;
    return;
  }

  shopBox.innerHTML = "";

  cart.forEach(item => {
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="buy-item">
        <img class="kichkina-img" src="${Array.isArray(item.images) ? item.images[0] : item.image}" alt="">
        <h5>${item.title}</h5>
        <p class="desc">${item.description}</p>
        <div class="man-mus">
          <button class="btn-minus">-</button>
          <button class="btn-count">${item.count}</button>
          <button class="btn-plus">+</button>
        </div>
        <p class="item-price">${(item.price * item.count).toLocaleString()} so'm</p>
        <button class="delete-btn">delete</button>
      </div>
    `;
    shopBox.appendChild(div);

    // + tugma
    div.querySelector('.btn-plus').addEventListener('click', () => {
      item.count++;
      renderCart();
    });

    // - tugma
    div.querySelector('.btn-minus').addEventListener('click', () => {
      if (item.count > 1) {
        item.count--;
      } else {
        cart = cart.filter(i => i.id !== item.id); // count 0 bo'lsa o'chirish
      }
      renderCart();
    });

    // delete tugma
    div.querySelector('.delete-btn').addEventListener('click', () => {
      cart = cart.filter(i => i.id !== item.id);
      renderCart();
    });
  });
}


const n1 = document.querySelector('#svg-n1');
const shop = document.querySelector('.shop')
n1.addEventListener('click', () => {
  shop.classList.toggle('kors'); // shop ko‘rsin/yashirsin
  box.classList.toggle('block'); // box1 ko‘rsin/yashirsin
});








// ========== INITIAL LOAD ==========
LoadData();
