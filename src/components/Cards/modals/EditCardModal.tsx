import React from 'react';
import CardModal from './CardModal';

interface Card {
  id: number;
  image: string;
  headline: string;
  description: string;
}

interface EditCardModalProps {
  card: Card;
  onClose: () => void;
  onSave: (card: Card) => void;
}

const EditCardModal: React.FC<EditCardModalProps> = ({ card, onClose, onSave }) => {
  return (
    <CardModal
      title={`Edit Card ${card.id}`}
      initialData={{
        headline: card.headline,
        description: card.description,
        image: card.image,
      }}
      onClose={onClose}
      onSubmit={(data) => onSave({ ...card, ...data })}
      submitLabel="Save"
    />
  );
};

export default EditCardModal;
