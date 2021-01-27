import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

// Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `card__del ${isOwn ? 'card__del-active' : 'card__del'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

// Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `card__button ${isLiked ? 'card__button-like' : 'card__button'}`
    );

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    return (
        <li className="card">
            <img className="card__image" src={card.link} alt={card.name}
                 onClick={handleClick}/>
            <button className={cardDeleteButtonClassName}
            onClick={handleDeleteClick}>
            </button>
            <div className="card__items">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__item">
                    <button className={cardLikeButtonClassName}
                    onClick={handleLikeClick}>
                    </button>
                    <p className="card__number-likes">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;