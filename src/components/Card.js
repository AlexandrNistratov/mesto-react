import React from 'react'
import '../index.css';
import { CurrentCardContext } from '../contexts/CurrentCardContext';

function Card({card, onCardClick}) {
    const cardContext = React.useContext(CurrentCardContext);

    function handleClick() {
       onCardClick(card);
    }

    return (
        <li className="card">
            <img className="card__image" src={cardContext.link} alt={cardContext.name}
            onClick={handleClick}/>
            <button className="card__del"></button>
            <div className="card__items">
                <h2 className="card__title">{cardContext.name}</h2>
                <div className="card__item">
                    <button className="card__button"></button>
                    <p className="card__number-likes">{cardContext.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;