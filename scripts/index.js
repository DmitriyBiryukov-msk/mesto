const popups = Array.from(document.querySelectorAll('.popup'));
const popupEdit = document.querySelector('.popup_edit-profile');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseEditButton = document.querySelector('.popup__close-edit');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__activity');
const formElementEdit = document.querySelector('.popup__form-edit');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const buttons = Array.from(document.querySelectorAll('.popup__save'));


const closePopup = function() {
    const focusPopup = document.querySelector('.popup_opened');
    popupToggle(focusPopup);
    removeCloseOnEsc(); 
    buttons.forEach((button) => {
        button.classList.remove(validationConfig.inactiveButtonClass);
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