import React from 'react';
import '../blocks/popup/popup.css';
import '../blocks/popup/_is-opened/popup_is-opened.css';

function ImagePopup({ isOpen, image, onClose }) {
  return (
    <div className={`popup popup_type_image ${isOpen ? 'popup_is-opened' : ''}`}>
      <div className="popup__content popup__content_content_image">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <img alt={image ? image.name : ''} src={image ? image.link : ''} className="popup__image" />
        <p className="popup__caption">{image ? image.name : ''}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
