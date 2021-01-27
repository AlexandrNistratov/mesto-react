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
    }
    React.useEffect(() => {
        if(isOpen){
            newCardNameRef.current.value = '';
            newCardLinkRef.current.value = '';
        }
    },[isOpen])

    return(
        <PopupWithForm
            name="add-image"
            title="Новое место"
            type="min"
            submit="image-button"
            textSubmitButton="Создать"
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
        </PopupWithForm>
    )
}

export default AddPlacePopup;