const product = {
  crazy: {
    name: "Crazy",
    price: 31000,
    amount: 0,
    img: "images/products/burger-1.png",
    get totalSum() {
      return this.price * this.amount;
    },
  },
  light: {
    name: "Light",
    price: 26000,
    amount: 0,
    img: "images/products/burger-2.png",
    get totalSum() {
      return this.price * this.amount;
    },
  },
  cheeseburger: {
    name: "CheeseBurger",
    price: 29000,
    amount: 0,
    img: "images/products/burger-3.png",
    get totalSum() {
      return this.price * this.amount;
    },
  },
  dburger: {
    name: "dBurger",
    price: 24000,
    amount: 0,
    img: "images/products/burger-4.png",
    get totalSum() {
      return this.price * this.amount;
    },
  },
};

const productBtns = document.querySelectorAll(".burger__item-info-add"),
  cartBtn = document.querySelector(".nav__right-btn"),
  cartList = document.querySelector(".nav__right-list"),
  cartClose = document.querySelector(".nav__right-top-close"),
  cartBurgers = document.querySelector(".nav__right-burgers"),
  cartTotalPrice = document.querySelector(".nav__right-bottom-price");
  cartCount = document.querySelector(".nav__right-amount");

productBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    plus(this);
  });
});

function plus(btn) {
  // closest() - подключается к указаному ближайшему родителю
  let parent = btn.closest(".burger__item"),
    parentId = parent.getAttribute("id");
  product[parentId].amount++;
  basket();
}



cartBtn.addEventListener('click', () => cartList.classList.add('active'))
cartClose.addEventListener('click', () => cartList.classList.remove('active'))



function basket() {
  let productArray = [];
  for (let key in product) {
    let burger = product[key];
    let productCard = document.querySelector(`#${burger.name.toLowerCase()}`);
    let productAmount = productCard.querySelector(".burger__item-count");
    if (burger.amount > 0) {
      productArray.push(burger);
      productAmount.classList.add("active");
      productAmount.innerHTML = burger.amount;
    } else {
      productAmount.classList.remove("active");
      productAmount.innerHTML = 0;
    }
  }
  let allCount = totalCountProduct()
  if(allCount > 0) {
    cartCount.classList.add('active')
  }else {
    cartCount.classList.remove('active')
  }
  cartCount.innerHTML = allCount
  
  
  
  productArray.forEach((item) => {
    cartBurgers.innerHTML += cartItemBurger(item)
  })
  
  cartTotalPrice.innerHTML = totalSumProduct()
  
}


function totalCountProduct() {
  let total = 0
  for(let key in product) {
    total += product[key].amount
  }
  return total
}

function totalSumProduct() {
  let sum = 0;
  for(let key in product) {
    sum += product[key].totalSum
  }
  return sum +  ' cумм'
}


function cartItemBurger(product) {
  let { name, amount, img, totalSum: price } = product
  return  `<div class="nav__right-item">
            <div class="nav__right-item-left">
              <img src="${img}" alt="">
              <div class="nav__right-item-info">
                <p class="nav__right-item-name">${name}</p>
                <p class="nav__right-item-price">${price} сум</p>
              </div>
            </div>
            <div class="nav__right-item-right" id="${name.toLowerCase()}-burger" >
              <button data-symbol="-" class=" nav__burger-btn nav__right-item-minus">-</button>
              <output class="nav__right-output">${amount}</output>
              <button data-symbol="+" class=" nav__burger-btn nav__right-item-plus">+</button>
            </div>
          </div>`
}

window.addEventListener('click', (event) => {
  let element = event.target
  if(element.classList.contains('nav__burger-btn')) {
      let dataValue = element.getAttribute('data-symbol')
      let parent = element.closest('.nav__right-item-right')
      if(parent) {
        let idParent = parent.getAttribute('id').split('-')[0]
        if(dataValue == '-') {
          product[idParent].amount--
        }else if(dataValue == '+') {
          product[idParent].amount++
        }
        basket()
      }
  }
})