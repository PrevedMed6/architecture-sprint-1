import React, { lazy } from 'react';
const PopupWithForm = lazy(() => import('ui_controls/PopupWithForm').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
})
);

function DeletePlacePopup({ isOpen, card, onDeletePlace, onClose }) {
  
  function handleSubmit(e) {
    e.preventDefault();
    onDeletePlace(card);
  }

  return (
    <React.Suspense>
      <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да" onSubmit={handleSubmit} isOpen={isOpen} onClose={onClose} />
    </React.Suspense>
  );
}

export default DeletePlacePopup;
