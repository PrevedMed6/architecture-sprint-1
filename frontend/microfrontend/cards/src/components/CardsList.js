import React, { useContext, useEffect } from "react";
import api from "../utils/api";
import Card from './Card';
import { CurrentUserContext } from 'user_context';
import '../blocks/places/places.css';
import DeletePlacePopup from './DeletePlacePopup';
import ShowPlacePopup from './ShowPlacePopup';
import AddPlacePopup from './AddPlacePopup';

function CardsList() {

  const { currentUser } = useContext(CurrentUserContext);
  const [cards, setCards] = React.useState([]);
  const [deletePopupIsOpen, setDeletePopupIsOpen] = React.useState(false);
  const [showPopupIsOpen, setShowPopupIsOpen] = React.useState(false);
  const [addPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [cardToDelete, setCardToDelete] = React.useState();
  const [selectedCard, setSelectedCard] = React.useState();

  useEffect(() => {
    api
      .getCardList()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    addEventListener("add_card_button_click", handleAddPlaceClick);
    return () => {
      removeEventListener("add_card_button_click", handleAddPlaceClick);
    }
  }, []);

  function onCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser?._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function onCardDelete(card) {
    setCardToDelete(card);
    setDeletePopupIsOpen(true);
  }

  function handleCardDelete(card) {
    closeDeletePopup();
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleCardAddSubmit(newCard) {
    api
      .addCard(newCard)
      .then((newCardFull) => {
        setCards([newCardFull, ...cards]);
        closeAddPopup();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setShowPopupIsOpen(true);
  }

  function closeDeletePopup() {
    setDeletePopupIsOpen(false);
  }

  function closeShowPopup() {
    setShowPopupIsOpen(false);
  }

  function closeAddPopup() {
    setIsAddPlacePopupOpen(false);
  }

  return <>
    <ul className="places__list">
      {
        cards?.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
            onCardClick={handleCardClick}
          />
        ))}
    </ul>
    <DeletePlacePopup card={cardToDelete} isOpen={deletePopupIsOpen} onDeletePlace={handleCardDelete} onClose={closeDeletePopup}></DeletePlacePopup>
    <ShowPlacePopup card={selectedCard} isOpen={showPopupIsOpen} onClose={closeShowPopup}></ShowPlacePopup>
    <AddPlacePopup isOpen={addPlacePopupOpen} onClose={closeAddPopup} onAddPlace={handleCardAddSubmit}></AddPlacePopup>
  </>
}

export default CardsList