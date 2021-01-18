function ImagePopup({card, onClose}) {
    return (
        <div className={card ? "popup popup__open-card popup_is-opened" : "popup__open-card"}>
            <div className="popup__card">
                <button className="popup__close popup__close-card" type="button"
                    onClick={onClose}>
                </button>
                <img className="popup__image" src={card ? card.link : ""}
                     alt={card ? card.name : ""} />
                <h2 className="popup__text">{card ? card.name : ""}</h2>
            </div>
        </div>
    )
}

export default ImagePopup;