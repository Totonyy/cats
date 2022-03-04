const infoBlock = document.querySelector(".popup");
const main = document.querySelector('main');
const storageAllCats = window.localStorage;

let oneCat = {};

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
                        ${showBtnDel(item.id)}
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
        ${showBtnEdit(data)} 
    `;
};

const showPopupCatAdd = function (data) {
    infoBlock.classList.add("popup_active");
    infoBlock.firstElementChild.innerHTML = `
        <form class="popup_form-add">
            <input type="text" placeholder="id" name="id" id="id">
            <input type="text" placeholder="Имя" name="name" id="name">
            <input type="text" placeholder="Изображение" name="img_link" id="img_link">
            <input type="text" placeholder="Описание" name="description" id="description">
            <input type="text" placeholder="Рейтинг" name="rate" id="rate">
            <input type="text" placeholder="Возраст" name="age" id="age">
            <button type="submit">Отправить</button>
        </form>
        <div class="popup_close" onclick="closePopup()">
            <img class="popup_close-img" src="img/close.png" alt="close">
        </div>
    `;
    
    const formAdd = document.querySelector('.popup_form-add'); //форма нового кота
    const formInputId = formAdd.querySelector('#id');
    const formInputName = formAdd.querySelector('#name');
    const formInputImg = formAdd.querySelector('#img_link');
    const formInputDesc = formAdd.querySelector('#description');
    const formInputRate = formAdd.querySelector('#rate');
    const formInputAge = formAdd.querySelector('#age');

    formAdd.addEventListener('submit', (evt)=> {
        evt.preventDefault();
        const bodyJSON = {
            id: formInputId.value,
            name: formInputName.value,
            img_link: formInputImg.value,
            description: formInputDesc.value,
            rate: formInputRate.value,
            age: formInputAge.value,
        };

        api.addCat(bodyJSON)
            .then(()=>{
                reloadDataCats();
                location.reload(); 
            })
    })
};

const showPopupCatEdit = function (id) { 
    infoBlock.classList.add("popup_active");
    infoBlock.firstElementChild.innerHTML = `
        <form class="popup_form-edit">
            <input type="text" placeholder="id" name="id" id="id_edit">
            <input type="text" placeholder="Имя" name="name" id="name_edit">
            <input type="text" placeholder="Изображение" name="img_link" id="img_link_edit">
            <input type="text" placeholder="Описание" name="description" id="description_edit">
            <input type="text" placeholder="Рейтинг" name="rate" id="rate_edit">
            <input type="text" placeholder="Возраст" name="age" id="age_edit">
            <button type="submit">Отправить</button>
        </form>
        <div class="popup_close" onclick="closePopup()">
            <img class="popup_close-img" src="img/close.png" alt="close">
        </div>
    `;

    const formEdit = document.querySelector('.popup_form-edit'); //редактируем кота
    const inputs = formEdit.querySelectorAll("input");

    const formInputId = formEdit.querySelector('#id_edit');
    const formInputName = formEdit.querySelector('#name_edit');
    const formInputImg = formEdit.querySelector('#img_link_edit');
    const formInputDesc = formEdit.querySelector('#description_edit');
    const formInputRate = formEdit.querySelector('#rate_edit');
    const formInputAge = formEdit.querySelector('#age_edit');

    inputs.forEach(input => {
       input.value = oneCat[input.name] //сложно, подсмотрел у Максима
    });

    formEdit.addEventListener('submit', (evt)=> {
        evt.preventDefault();
        const bodyJSON = {
            id: formInputId.value,
            name: formInputName.value,
            img_link: formInputImg.value,
            description: formInputDesc.value,
            rate: formInputRate.value,
            age: formInputAge.value,
        };
       
        api.updateCat(bodyJSON.id, bodyJSON)
            .then(()=>{
                reloadDataCats();
                location.reload(); 
            })
    })
};


const closePopup = function () {
    infoBlock.classList.remove("popup_active");
};

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
function showBtnDel(id){
    if(Cookies.get('user')){
        // console.log(id);
        // return `<button type="button" class="btn_delete">удалить</button>`

        return `<div class="btn_delete" onclick="btnDel(${id})">удалить</div>`
    } else {
        return ""
    }
};
function showBtnEdit(dataCat){
    if(Cookies.get('user')){
        //console.log(dataCat); //данные по коту
        oneCat = dataCat;
        // console.log(oneCat);
        return `<div class="btn_edit" onclick="btnEdit(${dataCat.id})">изменить</div>`
    } else {
        return ""
    }
};
showAuthForm();

function btnsEvList(){
    if(Cookies.get('user')){
        const btnAdd = document.querySelector('.btn_add');
        btnAdd.addEventListener('click', ()=>{
            // console.log(2);
            showPopupCatAdd()
        });
        const btnUpd = document.querySelector('.btn_update');
        btnUpd.addEventListener('click', ()=>{
            // console.log(3);
            reloadDataCats();
        });
        const btnLogOut = document.querySelector('.btn_logOut');
        btnLogOut.addEventListener('click', ()=>{
            // console.log(4);
            document.cookie = `user=${inputName.value}; max-age=0`;
            location.reload();
        });
    };
};


function btnEdit(id){
    // console.log(data);
    showPopupCatEdit(id);
    // api.getCatById(idForEdit)

};

function btnDel(id){
    // console.log(id);
    //5 часов спустя я-таки добился этого >_<
    api.deleteCat(id)
        .then(()=>{
            reloadDataCats();
            location.reload(); 
        })

}

btnsEvList();

function reloadDataCats(){
    storageAllCats.clear();
    main.innerHTML = "";
    getCats();
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

//попап для рендера котов из файла:
// const cards = document.getElementsByClassName("cat-img");
// for (let i = 0; i < cards.length; i++) {
//     cards[i].addEventListener("click", function(e) {
//         showPopup(cats[i]);
//     })
// };
