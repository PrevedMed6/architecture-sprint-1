import React, { lazy } from 'react';
const ImagePopup = lazy(() => import('ui_controls/ImagePopup').catch(() => {
  return { default: () => <div className='error'>Component is not available!</div> };
})
);

function ShowPlacePopup({ isOpen, card, onClose }) {
  return (
    <React.Suspense>
      <ImagePopup image={card} isOpen={isOpen} onClose={onClose} />
    </React.Suspense>
  );
}

export default ShowPlacePopup;
