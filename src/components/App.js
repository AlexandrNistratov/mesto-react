import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React from 'react';
import { api} from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import  { CurrentCardContext } from '../contexts/CurrentCardContext';

function App() {
    const [ isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [ isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [ isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);

    const [ selectedCard, setSelectedCard] = React.useState(null);

    const [ currentUser, setCurrentUser ] = React.useState([]);

    React.useEffect(() => {
        api.getUserInfo()
            .then(res => {
                setCurrentUser(res)
            }).catch((err) => alert(err));
        }, [])

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
        <CurrentUserContext.Provider value={currentUser}>
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
                    name="avatar-edit"
                    container="avatar-edit"
                    title="Обновить аватар"
                    submit="popup__submit-avatar-edit"
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                >
                    <input type="url" className="popup__input popup__input_avatar-edit" id="link-avatar" required
                       placeholder="Ссылка на картинку" name="link" readOnly />
                    <span className="error" id="link-avatar-error"></span>
                    <button className="popup__submit popup__submit-avatar-edit" type="submit">Сохранить</button>
                </PopupWithForm>
                <PopupWithForm
                    name="popup__info"
                    container="popup__container-min"
                    title="Редактировать профиль"
                    submit="popup__submit-min"
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                >
                    <input className="popup__input popup__input_type_firstname" id="user-name" required minLength="2"
                       maxLength="40"
                       type="text" placeholder="Имя" name="firstname" readOnly />
                    <span className="error" id="user-name-error"></span>
                    <input className="popup__input popup__input_type_career" id="user-career" required minLength="2"
                       maxLength="200"
                       type="text" placeholder="Работа" name="career" readOnly />
                    <span className="error" id="user-career-error"></span>
                    <button className="popup__submit popup__submit-min" type="submit">Сохранить</button>
                </PopupWithForm>
                <PopupWithForm
                    name="popup__add-image"
                    title="Новое место"
                    submit="popup__save-image-button"
                    type="popup__title-min"
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                >
                    <input className="popup__input popup__input_type_name" id="name-card" required minLength="2"
                       maxLength="30"
                       type="text" placeholder="Название" name="name" />
                    <span className="error" id="name-card-error"></span>
                    <input type="url" className="popup__input popup__input_type_link" id="link" required
                       placeholder="Ссылка на картинку"
                       name="link" readOnly />
                    <span className="error" id="link-error"></span>
                <button className="popup__submit popup__save-image-button" type="submit">Создать</button>
                </PopupWithForm>
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
        </CurrentUserContext.Provider>
    );
}

export default App;