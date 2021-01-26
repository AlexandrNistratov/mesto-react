import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const newCardNameRef = React.useRef();
    const newCardLinkRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name: newCardNameRef.current.value,
            link: newCardLinkRef.current.value
        });
            newCardNameRef.current.value = '';
            newCardLinkRef.current.value = '';
    }

    return(
        <PopupWithForm
            name="popup__add-image"
            title="Новое место"
            submit="popup__save-image-button"
            type="popup__title-min"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input className="popup__input popup__input_type_name" id="name-card" required minLength="2"
                   maxLength="30"
                   type="text" placeholder="Название" name="name" ref={newCardNameRef} />
            <span className="error" id="name-card-error"></span>
            <input type="url" className="popup__input popup__input_type_link" id="link" required
                   placeholder="Ссылка на картинку"
                   name="link" ref={newCardLinkRef} />
            <span className="error" id="link-error"></span>
            <button className="popup__submit popup__save-image-button" type="submit">Создать</button>
        </PopupWithForm>
    )
}

export default AddPlacePopup;