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


const homeBtn = document.querySelector('.flex2');
const pagesBtn = document.querySelector('.flex');
const cont = document.querySelector('.block');



homeBtn.addEventListener("click", () => {
  cont.classList.remove('aktive');


});


pagesBtn.addEventListener("click", () => {
  cont.classList.toggle('aktive');
})


const homeBtn1 = document.querySelector('.flex2');
const pagesBtn1 = document.querySelector('.flex');
const open = document.querySelector('.open');


pagesBtn1.addEventListener("click", () => {
  open.classList.toggle('active');
});


homeBtn1.addEventListener("click", () => {
  open.classList.remove('active');
});











async function LoadData() {
  const response = await fetch('base.json');
  const data = await response.json();
  console.log(data);
  DisplayData(data);
}

function DisplayData(data) {
  const box = document.querySelector('.box1');
  box.innerHTML = "";

  data.products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('card');


    const imageSrc = Array.isArray(product.images) ? product.images[0] : product.image;

    card.innerHTML = `
      <div class="sss">
        <img class="top" src="${imageSrc}" alt="${product.title}">
      </div>
      <div>
        <h2 class="org">${product.title}</h2>
        <p class="description">${product.description}</p>
        <div class="ssss">
          <div class="yellow"></div>
          <div class="pink"></div>
          <div class="binafsha"></div>
        </div>
        <div class="price">
          <p class="rice">${product.price.toLocaleString()} so'm</p>
        </div>
      </div>
    `;

    box.appendChild(card);
  });
}

LoadData();











let productsData = [];
const box = document.querySelector('.box1');
const page = document.querySelector('.pagee');

async function LoadData() {
  const response = await fetch('base.json');
  const data = await response.json();
  productsData = data.products;
  DisplayData(productsData);
}

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
      </div>
    `;

    box.appendChild(card);
  });
}


box.addEventListener("click", (e) => {
  let card = e.target.closest('.card');
  if (!card) return;

  let index = card.dataset.index;
  let product = productsData[index];
  if (!product) return;

  let ochiq = document.querySelector('.ochiq');
  if (!ochiq) {
    ochiq = document.createElement('div');
    ochiq.classList.add('ochiq');
    page.append(ochiq);
  }

  let imagesHTML = '';
  if (Array.isArray(product.images)) {
    product.images.forEach(img => {
      imagesHTML += `<div class="images"><img src="${img}" alt=""></div>`;
    });
  }

  ochiq.innerHTML = `
      <div>
          ${imagesHTML}
      </div>
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
              <p>${product.price}</p>
          </div>
          <p class="color">Color</p>
          <div class="add">
              <p class="add-to">Add To Cart</p>
              <img src="./img/Vector.png" alt="">
          </div>
          <p class="categories">Categories :</p>
          <p>${product.category}</p>
          <div class="share">
              <p>SHare</p>
          </div>
          <button class="yopish">Yopish</button>
      </div>
  `;

  const yopishBtn = ochiq.querySelector('.yopish');
  if (yopishBtn) {
    yopishBtn.addEventListener('click', () => {
      ochiq.remove();
      box.classList.remove('block');
    });
  }

  box.classList.add('block');
});







const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll('.box1 .card');

  cards.forEach(card => {
    const title = card.querySelector('.org').textContent.toLowerCase(); 
    if (title.includes(query)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});




const filterSelect = document.getElementById('filter');

filterSelect.addEventListener('change', () => {
  const selectedCategory = filterSelect.value.toLowerCase();



  const filtered = selectedCategory === ""
    ? productsData
    : productsData.filter(product => product.category.toLowerCase() === selectedCategory);

  DisplayData(filtered);
});




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



const page1 = document.querySelector('.pagee');

page1.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-to')) {
    console.log('boildi');
    alert('bosildi ');

    let ochiq2 = document.createElement("div");

    if (ochiq2) {
      ochiq2.setAttribute("class", ".sub");
    }

    page1.append(ochiq2)


  }
});



// const container = document.querySelector('.container7')
// const svg = document.querySelector('.svggg');
// const felll = document.querySelector('.felll')
// const pen = document.querySelector('.pen')
// svg.addEventListener('click', () => {


//   const savat = document.createElement('div');
//   savat.setAttribute("class", "savat");
//   box.classList.add('block');
//   felll.classList.add('click');
//   pen.classList.add('pens');
//   savat.classList.add('savat1')

//   container.append(savat);
// });




LoadData();




