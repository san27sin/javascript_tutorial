'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function() {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function(header) {
    header.addEventListener('click', function(event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function() {
    filterSizes.classList.toggle('hidden');
});


//Начало моего кода

const items = document.querySelectorAll(".featuredItem");
const basket = document.querySelector(".cartIconWrap");
const basketText = basket.querySelector("span");
const basketTable = document.querySelector(".basket");
const basketRow = document.querySelector(".basketRow");
const totalValue = basketTable.querySelector(".basketTotalValue");

const itemsList = new Map();

class Item {
    amount = 0;
    totalprice = 0;
    constructor(price) {
        this.price = price;
    }
}

basket.addEventListener("mouseover", () => {
    basketRow.innerHTML = BasketRowHtml(itemsList);
    totalValue.textContent = TotalAmountOfItems(itemsList);
    basketTable.classList.toggle("hidden");
});

basket.addEventListener("mouseout", () => {
    basketTable.classList.toggle("hidden");
});

for(let a = 0; a < items.length; a++) {
    items[a].querySelector("button").addEventListener("click", () => {
        let name = items[a].querySelector(".featuredName").textContent;
        let price = Number(items[a].querySelector(".featuredPrice").textContent.replace('$',''));
        let item;
        if (itemsList.has(name)) {
            item = itemsList.get(name);
            item.amount++;
            item.totalprice += price;
        } else {
            item = new Item(price);
            item.amount++;
            item.totalprice = price;
            itemsList.set(name, item);
        }
        basketText.textContent = AmountOfItems(itemsList);        
    });
}

function BasketRowHtml (items) {
    let html = "<div>Название товара</div><div>Количество</div><div>Цена за шт.</div><div>Итого</div>";
    items.forEach((value,key) => {
        html += `<div>${key}</div>
        <div>${value.amount}</div>
        <div>$${value.price}</div>
        <div>$${value.totalprice}</div>`;
    });
    return html;
}

function AmountOfItems (items) {
    let amountOfItems = 0;
    for (let item of items.values()) {
        amountOfItems += item.amount;
    }
    return amountOfItems;
}

function TotalAmountOfItems (items) {
    let totalPrice = 0;
    for (let item of items.values()) {
        totalPrice += item.totalprice;
    }
    return totalPrice;
}
