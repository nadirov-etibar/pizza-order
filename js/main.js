let cart = document.getElementById("shopping_cart");
let cartPage = document.getElementById("cart_page");

let burger = document.getElementById("dropdown");
let menu = document.getElementById("burger_menu");

burger.addEventListener("click", function () {
    if (menu.className === "hidden"){
        menu.className = menu.className.replace("hidden", "burger_menu");
    }

    else {
        menu.className = menu.className.replace("burger_menu", "hidden");
    }
})

let add = document.getElementsByClassName("add-btn");
let count = 0;
let sum = 0;
let spanCount = document.getElementById("span-count");

let pizzas = {
    pizzaImg: [],
    pizzaName: [],
    pizzaDes: [],
    pizzaPrice: [],
    pizzaCount: [],
    pizzaTotal: []
}

let pizzaId = [];


let exchange = document.createElement("div");
let dollarBtn = document.createElement("button");
dollarBtn.innerHTML = "$";
dollarBtn.classList.add("add-btn")
dollarBtn.style.marginRight = "15px"

dollarBtn.addEventListener("click", ()=>{
    if (localStorage.getItem("sign") !== "$"){
        let currentPrice = JSON.parse(localStorage.getItem("pizza"));
        currentPrice.pizzaTotal.forEach(function (item, value) {
            let change = item * 1.0901;

            currentPrice.pizzaTotal.splice(value, 1, change);
            localStorage.setItem("pizza", JSON.stringify(currentPrice))
        })
        localStorage.setItem("sign", "$");
        location.reload();
    }
})

let euroBtn = document.createElement("button");
euroBtn.innerHTML = "€";
euroBtn.classList.add("add-btn");

euroBtn.addEventListener("click", ()=>{
    if (localStorage.getItem("sign") !== "€"){
        let currentPrice = JSON.parse(localStorage.getItem("pizza"));
        currentPrice.pizzaTotal.forEach(function (item, value) {
            let change = item * 0.9174;

            currentPrice.pizzaTotal.splice(value, 1, change);
            localStorage.setItem("pizza", JSON.stringify(currentPrice))
        })

        localStorage.setItem("sign", "€");
        location.reload();
    }
})

for (let i = 0; i < add.length; i++){
    add[i].setAttribute("data-id", i);
    add[i].addEventListener("click", ()=>{
        let pizza = add[i].parentElement.parentElement;

        let pizzaArr = {
            pizzaImg: pizza.childNodes[1].childNodes[1].src,
            pizzaName: pizza.childNodes[3].childNodes[1].textContent,
            pizzaDes: pizza.childNodes[3].childNodes[3].textContent,
            pizzaPrice: parseFloat(pizza.childNodes[5].childNodes[1].childNodes[2].textContent),
        };

        let pizzaIdArr = add[i].dataset.id;

        localStorage.setItem("sign", pizza.childNodes[5].childNodes[1].childNodes[1].textContent);

        if (localStorage.getItem("count") < 1){
            count = count + 1;
            sum = sum + 1;
            localStorage.setItem("count", count);
            spanCount.classList.add("span-count");
            spanCount.innerText = localStorage.getItem("count");

            pizzaId.push(pizzaIdArr);
            localStorage.setItem("pizzaId", JSON.stringify(pizzaId));

            pizzas.pizzaImg.push(pizzaArr.pizzaImg);
            pizzas.pizzaName.push(pizzaArr.pizzaName);
            pizzas.pizzaDes.push(pizzaArr.pizzaDes);
            pizzas.pizzaPrice.push(pizzaArr.pizzaPrice);
            pizzas.pizzaTotal.push(pizzaArr.pizzaPrice);
            pizzas.pizzaCount.push(sum);
            localStorage.setItem("pizza", JSON.stringify(pizzas));
        }

        else{
            if (!localStorage.getItem("pizzaId").includes(pizzaIdArr)){
                let localCount = parseInt(localStorage.getItem("count"));
                let pizzaLocal = JSON.parse(localStorage.getItem("pizza"));
                let pizzaLocalId = JSON.parse(localStorage.getItem("pizzaId"));

                count = localCount + 1;
                sum = 1;
                localStorage.setItem("count", count);
                spanCount.classList.add("span-count");
                spanCount.innerText = localStorage.getItem("count");

                pizzaLocalId.push(pizzaIdArr);
                localStorage.setItem("pizzaId", JSON.stringify(pizzaLocalId));

                pizzaLocal.pizzaImg.push(pizzaArr.pizzaImg);
                pizzaLocal.pizzaName.push(pizzaArr.pizzaName);
                pizzaLocal.pizzaDes.push(pizzaArr.pizzaDes);
                pizzaLocal.pizzaPrice.push(pizzaArr.pizzaPrice);
                pizzaLocal.pizzaTotal.push(pizzaArr.pizzaPrice);
                pizzaLocal.pizzaCount.push(sum);
                localStorage.setItem("pizza", JSON.stringify(pizzaLocal));
            }

            else {
                let pizzaLocal = JSON.parse(localStorage.getItem("pizza"));
                let pizzaLocalId = JSON.parse(localStorage.getItem("pizzaId"));
                let pizzaLocalCount = pizzaLocal.pizzaCount;
                let click = pizzaLocalId.indexOf(pizzaIdArr);
                let price = pizza.childNodes[5].childNodes[1].childNodes[1].textContent;

                let newSum = parseInt(pizzaLocalCount[click]) + 1;
                let amount = price*newSum;

                pizzaLocal.pizzaCount.splice([click], 1, newSum);
                pizzaLocal.pizzaTotal.splice([click], 1, amount);
                localStorage.setItem("pizza", JSON.stringify(pizzaLocal));
            }
        }
    });

}

if (localStorage.getItem("count") > 0) {
    spanCount.classList.add("span-count");
    spanCount.innerText = localStorage.getItem("count");
    let pizzaLocal = JSON.parse(localStorage.getItem("pizza"));
    let sign = localStorage.getItem("sign");

    let rmv = document.getElementById("cart_info");
    rmv.style.display = "none";

    for (let i = 0; i < localStorage.getItem("count"); i++) {
        let list = document.createElement("div");
        list.classList.add("d-flex");
        list.classList.add("justify-content-between");
        list.classList.add("align-items-center");
        list.classList.add("mobile");
        list.classList.add("col-lg-5");
        list.classList.add("col-md-9");
        list.classList.add("col-sm-12");
        list.style.marginTop = "50px";

        let img = document.createElement("img");
        img.classList.add("mobile-img");
        img.width = 100;
        img.src = pizzaLocal.pizzaImg[i];

        let des = document.createElement("div");
        des.style.width = "250px";
        des.classList.add("d-flex");
        des.classList.add("justify-content-center");
        des.classList.add("flex-column");

        let pizzaName = document.createElement("p");
        pizzaName.classList.add("pizza_name");
        pizzaName.innerHTML = pizzaLocal.pizzaName[i];

        let pizzaDes = document.createElement("p");
        pizzaDes.style.color = "gray";
        pizzaDes.innerHTML = pizzaLocal.pizzaDes[i];

        let countDiv = document.createElement("div");
        countDiv.classList.add("d-flex");
        countDiv.classList.add("align-items-center");
        countDiv.classList.add("flex-row");
        countDiv.style.margin = "20px"


        let minus = document.createElement("button");
        minus.innerHTML = "-";
        minus.classList.add("btn-count");
        minus.classList.add("btn-minus");
        minus.style.padding = "5px";
        minus.style.height = "100%";

        let pizzaCount = document.createElement("span");
        pizzaCount.style.marginLeft = "10px";
        pizzaCount.style.marginRight = "10px";
        pizzaCount.innerHTML = parseInt(pizzaLocal.pizzaCount[i]);

        let plus = document.createElement("button");
        plus.innerHTML = "+";
        plus.classList.add("btn-count");
        plus.classList.add("btn-plus");
        plus.style.padding = "5px";
        plus.style.height = "100%"

        let infoDiv = document.createElement("div");
        infoDiv.classList.add("d-flex");
        infoDiv.classList.add("justify-content-between");
        infoDiv.classList.add("align-items-center");
        infoDiv.classList.add("info-div");


        let pizzaPrice = document.createElement("span");
        pizzaPrice.style.marginRight = "10px";
        pizzaPrice.innerHTML = "Price: " + sign + parseFloat(pizzaLocal.pizzaTotal[i]).toFixed(2);

        let deleteBtn = document.createElement("button");
        let trash = document.createElement("i");
        trash.classList.add("fas");
        trash.classList.add("fa-trash-alt");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.classList.add("add-btn");

        list.append(img);
        list.append(des);
        des.append(pizzaName);
        des.append(pizzaDes);
        countDiv.append(minus);
        countDiv.append(pizzaCount);
        countDiv.append(plus);
        deleteBtn.append(trash);
        list.append(countDiv);
        infoDiv.append(pizzaPrice);
        infoDiv.append(deleteBtn);
        list.append(infoDiv);

        cartPage.append(list);
    }

    let total = document.createElement("span");
    let info = document.createElement("span");
    let totalPrice = parseFloat(pizzaLocal.pizzaTotal.reduce((a, b) => a + b, 0)).toFixed(2);
    let delivery = totalPrice/10;

    let amount = parseFloat(totalPrice) + delivery;


    total.innerHTML ="Total Price: " + sign + parseFloat(amount).toFixed(2);
    info.innerHTML = "10% added as a delivery cost";

    total.style.fontSize = "24px";
    total.style.fontWeight = "700";



    let totalPriceDiv = document.createElement("div");

    totalPriceDiv.classList.add("d-flex");
    totalPriceDiv.classList.add("justify-content-between");
    totalPriceDiv.classList.add("align-items-center");
    totalPriceDiv.classList.add("col-lg-5");
    totalPriceDiv.classList.add("col-md-9");
    totalPriceDiv.classList.add("col-sm-12");
    totalPriceDiv.style.marginTop = "50px";
    totalPriceDiv.style.marginBottom = "50px";

    let totalDiv = document.createElement("div");
    totalDiv.classList.add("d-flex");
    totalDiv.classList.add("flex-column");



    exchange.append(dollarBtn);
    exchange.append(euroBtn);
    totalDiv.append(total);
    totalDiv.append(info);
    totalPriceDiv.append(exchange);
    totalPriceDiv.append(totalDiv);
    cartPage.append(totalPriceDiv);
}

let minusBtn = document.getElementsByClassName("btn-minus");
let plusBtn = document.getElementsByClassName("btn-plus");
let deleteBtn = document.getElementsByClassName("delete-btn");

for (let i = 0; i < minusBtn.length; i++){
    minusBtn[i].addEventListener("click", ()=>{
        let pizzaLocal = JSON.parse(localStorage.getItem("pizza"));
        let pizzaCount = pizzaLocal.pizzaCount;
        let pizzaPrice = pizzaLocal.pizzaPrice;

        if (parseInt(pizzaCount[i]) > 1){
            let newCount = parseInt(pizzaCount[i]) - 1;
            let amount = pizzaPrice[i]*newCount;
            pizzaLocal.pizzaCount.splice([i], 1, newCount);
            pizzaLocal.pizzaTotal.splice([i], 1, amount);
            localStorage.setItem("pizza", JSON.stringify(pizzaLocal));
            location.reload();
        }
    })
}

for (let i = 0; i < plusBtn.length; i++){
    plusBtn[i].addEventListener("click", ()=>{
        let pizzaLocal = JSON.parse(localStorage.getItem("pizza"));
        let pizzaCount = pizzaLocal.pizzaCount;
        let pizzaPrice = pizzaLocal.pizzaPrice;

        let newCount = parseInt(pizzaCount[i]) + 1;
        let amount = pizzaPrice[i]*newCount;

        pizzaLocal.pizzaCount.splice([i], 1, newCount);
        pizzaLocal.pizzaTotal.splice([i], 1, amount);
        localStorage.setItem("pizza", JSON.stringify(pizzaLocal));
        location.reload();

    })
}

for (let i = 0; i < deleteBtn.length; i++){
    deleteBtn[i].addEventListener("click", ()=>{
        let count = JSON.parse(localStorage.getItem("count"));
        let pizzaLocal = JSON.parse(localStorage.getItem("pizza"));
        let pizzaId = JSON.parse(localStorage.getItem("pizzaId"));

        if (count === 1){
            localStorage.clear();
        }

        else{
            count = parseInt(count) - 1;

            pizzaLocal.pizzaImg.splice([i], 1);
            pizzaLocal.pizzaName.splice([i], 1);
            pizzaLocal.pizzaDes.splice([i], 1);
            pizzaLocal.pizzaCount.splice([i], 1);
            pizzaLocal.pizzaPrice.splice([i], 1);
            pizzaLocal.pizzaTotal.splice([i], 1);

            pizzaId.splice([i], 1);

            localStorage.setItem("count", JSON.stringify(count));
            localStorage.setItem("pizza", JSON.stringify(pizzaLocal));
            localStorage.setItem("pizzaId", JSON.stringify(pizzaId));
        }
        location.reload();

    })
}