import React from 'react';
function PopupWithForm({ isOpen, name, container, onClose, title, children, type, onSubmit}) {
    return (
        <div className={isOpen ? `popup popup__${name} popup_is-opened` : `popup popup__${name}`}>
            <div className={`popup__container popup__container-${container}`}>
                <form onSubmit={onSubmit} className={`popup__form popup__form-${name}`} name="information" noValidate >
                    <button className={`popup__close`} type="button"
                            onClick={onClose}>
                    </button>
                    <h2 className={`popup__title popup__title-${type}`}>{title}</h2>
                    {children}
                </form>
            </div>
        </div>
    )
}
export default PopupWithForm;