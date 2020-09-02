let popups = Array.from(document.querySelectorAll('.popup'));
let popupEdit = document.querySelector('.popup_edit-profile');
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseEditButton = document.querySelector('.popup__close-edit');
let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__activity');
let formElementEdit = document.querySelector('.popup__form-edit');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let buttons = Array.from(document.querySelectorAll('.popup__save'));
let buttonCreate = document.querySelector('.profile__add-button');
let createPopup = document.querySelector('.popup_create-card');
let closeCreateButton = document.querySelector('.popup__close-add');
let submitSaveButton = document.querySelector('.popup__create_save');
let cardsEl = document.querySelector('.cards');
let closePopupPrev = document.querySelector('.popup__close-preview');


const closePopup = function() {
    const focusPopup = document.querySelector('.popup_opened');
    popupToggle(focusPopup);
    removeCloseOnEsc();
    buttons.forEach((button) => {
        button.removeAttribute('disabled', true);
    });
};

//закрытие попапа по нажатию Escape
const escapePressedHandler = function(event) {
    if (event.key === 'Escape') {
        closePopup();
    }
};

const formSubmitHandlerProfile = function(evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    openPopupEditProfile();
};

// закрытие попапа
const removeCloseOnEsc = function() {
    document.removeEventListener('keydown', escapePressedHandler);
};



const openPopupEditProfile = function() {
    popupToggle(popupEdit);
    document.addEventListener('keydown', escapePressedHandler);
    if (popupEdit.classList.contains('popup_opened')) {
        nameInput.value = name.textContent;
        jobInput.value = job.textContent;
    } else {
        return;
    }
};

//Переключение состояния попапа
const popupToggle = function(popup) { 
    popup.classList.toggle('popup_opened');
};



const openCreatePopup = (evt) => {
    popupToggle(createPopup);
};


//функция удаления карточки
const onClickDeleteCard = (elem) => {
    const parent = elem.closest('.cards__item');

    parent?.remove();
};


//функция добавления и снятия лайка
const onClickLike = (elem) => {
    if(elem.classList.contains("card__like_active")) {
        elem.classList.remove("card__like_active");
    } else {
        elem.classList.add("card__like_active");
    }
};
//открытие попапа preview
const onClickImage = (elem) => {
    const imagePopup =  document.querySelector('.popup__preview');
    const imgElem = imagePopup.querySelector('img');
    const textElem = imagePopup.querySelector('h3');
    imgElem.setAttribute('src', elem.getAttribute('src'));
    textElem.innerHTML = elem.closest('.cards__item').querySelector('.card__text').innerHTML;

    imagePopup.classList.add('popup_opened');
};


 //загрузка шаблона для карточки
const cardEl = (place, link) => (  
    '<div class="cards__item">'+
        '<img onclick="onClickImage(this)" class="card__picture" alt="'+ place +'" src="'+ link +'">'+
        '<button onclick="onClickDeleteCard(this)" type="button" class="card__trash"></button>'+
            '<div class="card__title">'+
                '<h3 class="card__text">'+ place +'</h3>'+
                '<button onclick="onClickLike(this)" type="button" class="card__like"></button>'+
        '</div>'+
    '</div>'
);

//добавление карточки
const addCard = (event) => {
    event.preventDefault();

    const form = document.forms['add-place'];
    const formData = new FormData(form);

    const el = document.createElement('div');
    const domString = cardEl(formData.get('place'), formData.get('link'));
    el.innerHTML = domString;
    cardsEl.prepend(el.firstChild);
}

const drawList = (list) => {
    for(card of list) {
        const el = document.createElement('div');
        const domString = cardEl(card.name, card.link);
        el.innerHTML = domString;
        cardsEl.prepend(el.firstChild);
    }
};

// загрузка массива 
const loadList = () => {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', '/scripts/cards.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {

            drawList(JSON.parse(xobj.responseText).list);
        }
    };
    xobj.send(null);
}

// закрытие попапа по оверлей
popups.forEach(function(element) {
    element.addEventListener('mousedown', function(evt) {   
        if (evt.target !== evt.currentTarget) {
            return
        } else {
            if (element.classList.contains('popup_preview')) {
                popupToggle(element);
            } else {
                closePopup();
            }
        }
    });
});




closeCreateButton.addEventListener('click', closePopup);
closePopupPrev.addEventListener('click', closePopup);
buttonCreate.addEventListener('click', openCreatePopup);
formElementEdit.addEventListener('submit', formSubmitHandlerProfile);
popupOpenButton.addEventListener('click', openPopupEditProfile);
submitSaveButton.addEventListener('click', addCard);
popupCloseEditButton.addEventListener('click', closePopup);
document.addEventListener("DOMContentLoaded", loadList);










