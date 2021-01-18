import React from 'react'
import '../index.css';

function Card({card, onCardClick}) {

    function handleClick() {
       onCardClick(card);
    }

    return (
        <li className="card">
            <img className="card__image" src={card.link} alt={card.name}
            onClick={handleClick}/>
            <button className="card__del"></button>
            <div className="card__items">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__item">
                    <button className="card__button"></button>
                    <p className="card__number-likes">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;