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


const closePopup = function() {
    const focusPopup = document.querySelector('.popup_opened');
    popupToggle(focusPopup);
    removeCloseOnEsc(); 
    buttons.forEach((button) => {
        button.removeAttribute('disabled', true);
    });
};


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


const popupToggle = function(popup) { //Переключение состояния popup'а
    popup.classList.toggle('popup_opened');
};

formElementEdit.addEventListener('submit', formSubmitHandlerProfile);
popupOpenButton.addEventListener('click', openPopupEditProfile);
popupCloseEditButton.addEventListener('click', closePopup);