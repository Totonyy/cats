// class Cat {
//     constructor(name, img_link, age, rate, favourite, description, id){
//         this.name = name;
//         this.img_link = img_link;
//         this.age = age;
//         this.rate = rate;
//         this.favourite = favourite;
//         this.description = description;
//         this.id = id;
//     }
// };

// let catContent = "";
// cats.forEach(function(item){
//     let rate = item.rate;
//     catContent += `
//         <div class="card_cat">
//             <div class="cat-img" style="background-image: url(${item.img_link})"></div>
//             <h3>${item.name}</h3>
//             <p class="rate">
//                 ${rate}
//             </p>
//         </div>
//     `
// });
    
// document.querySelector('main').innerHTML += catContent;

// cats.forEach(function(item){
//     let tagRate = document.querySelector('.rate');
//     let rate = item.rate;
//     console.log(tagRate);
//     console.log(rate);
    // for (let i=1; i<=rate; i++){
    //     let catRate = document.createElement("img");
    //     catRate.src = "img/cat-fill.svg";
    //     catRate.alt= "^_^";
    //     // console.log(999);
    //     // console.log(tagRate);
    //     // tagRate.appendChild(catRate);
    // };    
// });


const infoBlock = document.querySelector(".popup");
const main = document.querySelector('main');

cats.forEach(function(item){
    let rate = item.rate; 

    let cardCat =  document.createElement("div");
    cardCat.className = 'card_cat';
    main.append(cardCat);

    let catImg = document.createElement("div");
    catImg.className = "cat-img";
    catImg.style.backgroundImage = `url(${item.img_link})`;
    cardCat.append(catImg);

    let catName = document.createElement("h3");
    catName.innerHTML = item.name;
    cardCat.append(catName);

    let catRate = document.createElement("p");
    catRate.className = 'rate';
    cardCat.append(catRate);

    for (let i=1; i<=rate; i++){
        let catRateImg = document.createElement("img");
        catRateImg.className = "rate-img";
        catRateImg.src = "img/cat-fill.svg";
        catRateImg.alt= "^_^";
        catRate.append(catRateImg);        
    };
    let noRate = 10-rate;
        if (noRate >= 1) {
            for (let i=1; i<=noRate; i++){
                let catNoRateImg = document.createElement("img");
                catNoRateImg.className = "rate-img";
                catNoRateImg.src = "img/cat-stroke.svg";
                catNoRateImg.alt= "o_o";
                catRate.append(catNoRateImg);
            } 
        }
});

const getWord = function (year, w1, w2, w0) {
    if (year % 100 < 11 || n % 100 > 14) {
        if (year % 10 === 1) {
            return w1;
        } else if (year % 10 >= 2 && year % 10 <= 4) {
            return w2;
        } else {
            return w0;
        }
    } else {
        return w0;
    }
};

const showPopup = function (data) {
    infoBlock.classList.add("popup_active");
    infoBlock.firstElementChild.innerHTML = `
        <img class="info-img" src="${data.img_link}" alt="${data.name}">
        <div class="information">
            <h2>${data.name}</h2>
            <h3>${data.age} ${getWord(data.age, "год", "года", "лет")}</h3>
            <p>${data.description}</p>
        </div>
        <div class="popup_close" onclick="closePopup()">
            <img class="popup_close-img" src="img/close.png" alt="close">
        </div>
    `;
};

const closePopup = function () {
    infoBlock.classList.remove("popup_active");
};

const cards = document.getElementsByClassName("card_cat");
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function(e) {
        showPopup(cats[i]);
    })
};