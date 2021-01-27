import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value
        });

    }

    React.useEffect(() => {
        if(isOpen){
            avatarRef.current.value = '';
        }
    },[isOpen])

    return(
        <PopupWithForm
            name="avatar-edit"
            container="avatar-edit"
            title="Обновить аватар"
            submit="avatar-edit"
            textSubmitButton="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input type="url" className="popup__input popup__input_avatar-edit" id="link-avatar" required
                   placeholder="Ссылка на картинку" name="link"  ref={avatarRef} />
            <span className="error" id="link-avatar-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;