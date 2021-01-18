import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React from 'react';

function App() {
    const [ isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [ isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [ isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [ selectedCard, setSelectedCard] = React.useState(null);

    function handleEditAvatarClick () {
        setEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick () {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick () {
        setAddPlacePopupOpen(true);
    }

    function handleCardClick(data) {
        setSelectedCard(data);
    }

    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setSelectedCard(false);
    }


  return (
    <div className="App">
            <Header />
            <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                handleCardClick={handleCardClick}
            />
            <Footer />
            <PopupWithForm
                name="popup__avatar-edit"
                container="popup__container-avatar-edit"
                title="Обновить аватар"
                submit="popup__submit-avatar-edit"
                children=
                    {
                        <>
                            <input type="url" className="popup__input popup__input_avatar-edit" id="link-avatar" required
                                   placeholder="Ссылка на картинку" name="link" readOnly />
                            <span className="error" id="link-avatar-error"></span>
                            <button className="popup__submit popup__submit-avatar-edit" type="submit">Сохранить
                            </button>
                        </>
                    }
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
            />
            <PopupWithForm
                name="popup__info"
                container="popup__container-min"
                title="Редактировать профиль"
                submit="popup__submit-min"
                children={
                    <>
                        <input className="popup__input popup__input_type_firstname" id="user-name" required minLength="2"
                               maxLength="40"
                               type="text" placeholder="Имя" name="firstname" readOnly />
                        <span className="error" id="user-name-error"></span>
                        <input className="popup__input popup__input_type_career" id="user-career" required minLength="2"
                               maxLength="200"
                               type="text" placeholder="Работа" name="career" readOnly />
                        <span className="error" id="user-career-error"></span>
                        <button className="popup__submit popup__submit-min" type="submit">Сохранить</button>
                    </>
                }
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
            />
            <PopupWithForm
                name="popup__add-image"
                title="Новое место"
                submit="popup__save-image-button"
                type="popup__title-min"
                children={
                    <>
                        <input className="popup__input popup__input_type_name" id="name-card" required minLength="2"
                               maxLength="30"
                               type="text" placeholder="Название" name="name" />
                        <span className="error" id="name-card-error"></span>
                        <input type="url" className="popup__input popup__input_type_link" id="link" required
                               placeholder="Ссылка на картинку"
                               name="link" readOnly />
                        <span className="error" id="link-error"></span>
                        <button className="popup__submit popup__save-image-button" type="submit">Создать
                        </button>
                    </>
                }
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
            />
            <PopupWithForm
                name="popup__with-submit"
                container="popup__container-with-submit"
                title="Вы уверены?"
                submit="popup__submit-with-submit"
                type="popup__title-with-submit"
            />
            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
            />
    </div>
  );
}

export default App;
