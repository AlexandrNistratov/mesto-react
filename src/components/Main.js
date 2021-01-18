import React from 'react';
import { api } from '../utils/Api';
import Card from './Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace,  handleCardClick}) {
    const [userName, setUserName] = React.useState("");
    const [userDescription, setUserDescription] = React.useState("");
    const [userAvatar, setUserAvatar] = React.useState("");
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getUserApi()
            .then(res => {
                setUserName(res.name)
                setUserDescription(res.about)
                setUserAvatar(res.avatar)
            }).catch((err) => alert(err));
    }, [])

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
                            <img className="profile__avatar-image" src={userAvatar} alt="Аватарка"  />
                            <div className="profile__overlay" >
                                <button className="profile__edit-avatar"
                                onClick={onEditAvatar}>
                                </button>
                            </div>
                        </div>
                        <div className="profile__text">
                            <div className="profile__block">
                                <h1 className="profile__info-name">{userName}</h1>
                                <button className="profile__edit-button"
                                onClick={onEditProfile}>
                                </button>
                            </div>
                            <p className="profile__info-text">{userDescription}</p>
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



