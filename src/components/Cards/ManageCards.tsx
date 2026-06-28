import React, { useState } from "react";
import { EditCardModal, AddCardModal } from "@/components/Cards/modals";
import dummyImage from "@/assets/dummyImagesmall.png";
import EditPencilIcon from "@/assets/icons/EditIcon";

interface Card {
  id: number;
  image: string;
  headline: string;
  description: string;
}

const initialCards: Card[] = [
  {
    id: 1,
    image: dummyImage,
    headline: "PLAY, EAT & STAY BOOZE!",
    description: "Step into a world where fun never stops challen..",
  },
  {
    id: 2,
    image: dummyImage,
    headline: "LOREM IPSUM IS SIMPLY",
    description: "Lorem Ipsum is simply dummy text of the prin..",
  },
  {
    id: 3,
    image: dummyImage,
    headline: "LOREM IPSUM IS SIMPLY",
    description: "Lorem Ipsum is simply dummy text of the prin..",
  },
  {
    id: 4,
    image: dummyImage,
    headline: "LOREM IPSUM IS SIMPLY",
    description: "Lorem Ipsum is simply dummy text of the prin..",
  },
  {
    id: 5,
    image: dummyImage,
    headline: "LOREM IPSUM IS SIMPLY",
    description: "Lorem Ipsum is simply dummy text of the prin..",
  },
  {
    id: 6,
    image: dummyImage,
    headline: "LOREM IPSUM IS SIMPLY",
    description: "Lorem Ipsum is simply dummy text of the prin..",
  },
  {
    id: 7,
    image: dummyImage,
    headline: "LOREM IPSUM IS SIMPLY",
    description: "Lorem Ipsum is simply dummy text of the prin..",
  },
  // Add more dummy data as needed
];

const ManageCards: React.FC = () => {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const handleEdit = (card: Card) => {
    setSelectedCard(card);
    setIsEditModalOpen(true);
  };

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Manage your cards</h2>
        <button
          onClick={handleAdd}
          className="bg-[#E1017D] text-white font-semibold px-5 py-2 rounded-lg flex items-center cursor-pointer"
        >
          Add A New Card
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-hidden rounded-lg">
        {/* Table Header */}
        <div className="bg-[#F9D2EA] px-4 py-4 grid grid-cols-5 gap-4 text-center font-bold text-sm">
          <div>Card Number</div>
          <div>Image</div>
          <div>Headline</div>
          <div>Description</div>
          <div>Action</div>
        </div>

        {/* Table Body */}
        <div className="bg-white">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={`grid grid-cols-5 gap-4 px-4 py-4 items-center text-center ${
                index % 2 === 0 ? "bg-[#FDECF6]" : "bg-[#FFFBFD]" 
              } hover:bg-[#f3e2f6] hover:shadow-sm  cursor-pointer`}
            >
              <div>{card.id}</div>
              <div className="flex justify-center">
                <img
                  src={card.image}
                  alt={card.headline}
                  className="w-[38.4px] h-[38.4px] rounded"
                />
              </div>
              <div className="font-medium text-sm uppercase">
                {card.headline}
              </div>
              <div className="font-medium text-sm">{card.description}</div>
              <div className="flex justify-center">
                <button
                  onClick={() => handleEdit(card)}
                  className="border border-black rounded-full px-5 py-2 flex items-center gap-2 cursor-pointer"
                >
                    <EditPencilIcon/>
                  <span className="font-medium">Edit</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {isEditModalOpen && selectedCard && (
        <EditCardModal
          card={selectedCard}
          onClose={() => setIsEditModalOpen(false)}
          onSave={(updatedCard) => {
            setCards(
              cards.map((c) => (c.id === updatedCard.id ? updatedCard : c))
            );
            setIsEditModalOpen(false);
          }}
        />
      )}

      {isAddModalOpen && (
        <AddCardModal
          onClose={() => setIsAddModalOpen(false)}
          onSave={(newCard) => {
            setCards([...cards, { ...newCard, id: cards.length + 1 }]);
            setIsAddModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ManageCards;
