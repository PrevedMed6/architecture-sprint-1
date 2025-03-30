import React, { useContext } from "react";
import api from "../utils/api";
import Card from './Card';

function CardsList() {
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    api
      .getCardList()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  return <ul className="places__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
            />
          ))}
    </ul>
}

export default CardsList