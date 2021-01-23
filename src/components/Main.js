import React from 'react';
import { api } from '../utils/Api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace,  handleCardClick}) {
    const userContext = React.useContext(CurrentUserContext);
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getAllCards()
            .then(data => {
                setCards(data)
            }).catch((err) => alert(err));
    }, []);

    return(
            <main className="content">
                <section className="profile">
                    <div className="profile__info">
                        <div className="profile__avatar">
                            <img className="profile__avatar-image" src={userContext.avatar} alt="Аватарка"  />
                            <div className="profile__overlay"
                                 onClick={onEditAvatar}>
                                <button className="profile__edit-avatar"></button>
                            </div>
                        </div>
                        <div className="profile__text">
                            <div className="profile__block">
                                <h1 className="profile__info-name">{userContext.name}</h1>
                                <button className="profile__edit-button"
                                onClick={onEditProfile}>
                                </button>
                            </div>
                            <p className="profile__info-text">{userContext.about}</p>
                        </div>
                    </div>
                    <button className="profile__add-button"
                    onClick={onAddPlace}>
                    </button>
                </section>
                <section className="elements">
                    {
                        cards.map((card) => <Card key={card._id} card={card} onCardClick={handleCardClick}/>)
                    }
                </section>
            </main>
    )

}

export default Main;



