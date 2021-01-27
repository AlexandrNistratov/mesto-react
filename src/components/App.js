import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import React from 'react';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup';

function App() {
    const [ isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
    const [ isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
    const [ isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
    const [ selectedCard, setSelectedCard] = React.useState(null);

    const [currentUser, setCurrentUser] = React.useState('');

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
        setSelectedCard(null);
    }
    //Изменение инфо
    function handleUpdateUser(data) {
        api.addUserInfo(data).then((res) => {
            setCurrentUser(res);
            closeAllPopups();
        }).catch((err) => alert(err));
    }
    // Изменение аватара
    function handleUpdateAvatar(data) {
        api.addUserAvatar(data).then((res) => {
            setCurrentUser(res);
            closeAllPopups();
        }).catch((err) => alert(err));
    }
    //Отрисовка карточек с сервера
    const [cards, setCards] = React.useState([]);
    React.useEffect(() => {
        api.getAllCards()
            .then(data => {
                setCards(data)
            }).catch((err) => alert(err));
    }, []);

    // Лайк
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        isLiked ? (
            //Отправляем запрос для удаления лайка
            api.dislikeCard(card._id).then((res) => {
                const dislikeCard = cards.map((item) => item._id === card._id ? res : item);
                setCards(dislikeCard)
            }).catch((err) => alert(err))
        ) : (
            // Отправляем запрос в API и получаем обновлённые данные карточки
            api.likeCard(card._id, !isLiked).then((newCard) => {
                // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
                const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                // Обновляем стейт
                setCards(newCards);
            }).catch((err) => alert(err))
        )
    };
    // Удаление карточки
    function  handleCardDelete(card) {
        // Определяем, являемся ли мы владельцем текущей карточки
        const isOwn = card.owner._id === currentUser._id;

        if (isOwn) {
            api.deleteCards(card._id).then(() => {
                const filterCard = cards.filter((item) => item._id !== card._id)
                setCards(filterCard);
            }).catch((err) => alert(err));
        }
    }
    //Создаем новую карточку
    function handleAddPlaceSubmit(data) {
        api.addNewCards(data).then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        }).catch((err) => alert(err));
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
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}

                />
                <Footer />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
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
        </CurrentUserContext.Provider>
    );
}

export default App;