const infoBlock = document.querySelector(".popup");
const main = document.querySelector('main');

const rate = function(numberRate){
    let noRate = 10-numberRate;
    let count = '';
    for (let i=1; i<=numberRate; i++){
        count += '<img class="rate-img" src="img/cat-fill.svg" alt="^_^">';        
    };
    if (noRate >= 1) {
        for (let i=1; i<=noRate; i++){
            count += '<img class="rate-img" src="img/cat-stroke.svg" alt=o_o">'
        };
    };
    return count;   
};

//рендер котов из файла
// cats.forEach(function(item){
//     const itemCat = `
//         <div class="card_cat">
//             <div class="cat-img" style="background-image: url(${item.img_link})"></div>
//             <h3>${item.name}</h3>
//             <p class="rate">${rate(item.rate)}</p> 
//             ${showBtnDel()}
//         </div>
//     `;
//     main.innerHTML += itemCat;
// });

const getWord = function (year, w1, w2, w0) {
    if (year % 100 < 11 || year % 100 > 14) {
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
        ${showBtnEdit()} 
    `;
};

const closePopup = function () {
    infoBlock.classList.remove("popup_active");
};

//попап для рендера котов из файла:
// const cards = document.getElementsByClassName("cat-img");
// for (let i = 0; i < cards.length; i++) {
//     cards[i].addEventListener("click", function(e) {
//         showPopup(cats[i]);
//     })
// };

const storageAllCats = window.localStorage;
//получили котов, отрендерили, записали в локу, навесили обработчик попапа
function getCats(){
    api.getAllCats()
        .then(allCats =>{      
            // console.log(allCats.data);
            allCats.data.forEach(function(item){
                const itemCat = `
                    <div class="card_cat">
                        <div class="cat-img" style="background-image: url(${item.img_link})"></div>
                        <h3>${item.name}</h3>
                        <p class="rate">${rate(item.rate)}</p> 
                        ${showBtnDel()}
                    </div>
                `;
                main.innerHTML += itemCat;
            });

            if(!storageAllCats.getItem("allCats")){
                storageAllCats.setItem("allCats", JSON.stringify(allCats.data))
            };

            const cards = document.getElementsByClassName("cat-img");
            for (let i = 0; i < cards.length; i++) {
                cards[i].addEventListener("click", function(e) {
                    showPopup(allCats.data[i]);
                });
            };
        });
} 
getCats();

const authForm = document.querySelector('.auth-form');
const inputName = authForm.querySelector('.auth-form_input');

authForm.addEventListener('submit', (e)=> {
    // e.preventDefault(); //отмена перезагрузки страницы
    if(inputName.value.trim() !== ""){
        document.cookie = `user=${inputName.value}; secure; samesite=lax;` //запись сессионной куки. secure-кука по https передается. samesite=lax - не разлогинит, если перешли по ссылке
        e.target.reset(); //или inputName.value = ""; -очистка поля ввода после ввода имени в инпут
        // window.location.replace('/') -переход на нужную страницу
    }   
    else {
        alert('Пожалуйста, введите ваше имя')
    }
});

function showAuthForm(){
    if(Cookies.get('user')){
        authForm.innerHTML = `
            <div class="hello-name">Привет, ${Cookies.get('user')}!</div>
        `;
        document.querySelector('header').innerHTML += `
            <button type="button" class="btn_add">добавить кота</button>
            <button type="button" class="btn_update">обновить</button>
            <button type="button" class="btn_logOut">Выход</button>
        `;
    };
};
function showBtnDel(){
    if(Cookies.get('user')){
        // return `<button type="button" class="btn_delete">удалить</button>`
        return `<div class="btn_delete" onclick="btnDel()">удалить</div>`
    } else {
        return ""
    }
};
function showBtnEdit(){
    if(Cookies.get('user')){
        return `<div class="btn_edit" onclick="btnEdit()">изменить</div>`
    } else {
        return ""
    }
};

showAuthForm();

function btnsEvList(){
    if(Cookies.get('user')){
        const btnAdd = document.querySelector('.btn_add');
        btnAdd.addEventListener('click', ()=>{
            console.log(2);
        });
        const btnUpd = document.querySelector('.btn_update');
        btnUpd.addEventListener('click', ()=>{
            console.log(3);
            // storageAllCats.clear();
        });
        const btnLogOut = document.querySelector('.btn_logOut');
        btnLogOut.addEventListener('click', ()=>{
            // console.log(4);
            document.cookie = `user=${inputName.value}; max-age=0`;
            location.reload();
        });
    };
};
function btnEdit(){
    addEventListener('click', console.log(5));
}
function btnDel(){
    addEventListener('click', console.log(1));
}

btnsEvList();


// function handleClickButtonDelete(){
//     api.getAllCats()
//         .then(allCats =>{
//             allCats.data.forEach(function(item){
//                 api.deleteCat(item.id)
//                     .then((data) => {
//                         console.log(data);
//                         // if(data.message === 'ok'){
//                         //     newCardElement.remove();
//                         //     const oldData = getLocalStorageData('cats');
//                         //     const newData = oldData.filter(item => item.id !== dataCat.id);
//                         //     setLocalStorageData('cats', newData);
//                         // }
//                     })
//             })  
//         })      
// }
// function btnDel(){
//     addEventListener('click', handleClickButtonDelete);
// }

// сессия пользователя-кнопка Логина надпись Войдите для редактирования

//     на карточках кнопки Удалить с предварительным уведомлением, Изменить

// если время будет   если лога нет, то попап по таймауту с кнопкой закрытия. Зайдите чтобы редактировать котанов

// все запросы перезаписывают локал стор

// кнопка Обновить котов запрашивает обновленные данные и обновляет их в локал стор