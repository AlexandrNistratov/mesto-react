import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value
        });
        avatarRef.current.value = '';
    }
    return(
        <PopupWithForm
            name="popup__avatar-edit"
            container="avatar-edit"
            title="Обновить аватар"
            submit="popup__submit-avatar-edit"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input type="url" className="popup__input popup__input_avatar-edit" id="link-avatar" required
                   placeholder="Ссылка на картинку" name="link"  ref={avatarRef} />
            <span className="error" id="link-avatar-error"></span>
            <button className="popup__submit popup__submit-avatar-edit" type="submit">Сохранить</button>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;