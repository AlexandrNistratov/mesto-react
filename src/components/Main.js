import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace,  handleCardClick, cards, onCardDelete, onCardLike}) {

    const currentUser = React.useContext(CurrentUserContext);

    return(
        <main className="content">
            <section className="profile">
                <div className="profile__info">
                    <div className="profile__avatar">
                        <img className="profile__avatar-image" src={currentUser.avatar} alt="Аватарка"  />
                        <div className="profile__overlay"
                             onClick={onEditAvatar}>
                            <button className="profile__edit-avatar"></button>
                        </div>
                    </div>
                    <div className="profile__text">
                        <div className="profile__block">
                            <h1 className="profile__info-name">{currentUser.name}</h1>
                            <button className="profile__edit-button"
                                    onClick={onEditProfile}>
                            </button>
                        </div>
                        <p className="profile__info-text">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-button"
                        onClick={onAddPlace}>
                </button>
            </section>
            <section className="elements">
                {
                    cards.map((card) => <Card key={card._id} card={card} onCardClick={handleCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />)
                }
            </section>
        </main>
    )

}

export default Main;