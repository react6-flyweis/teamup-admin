import React from 'react';
import CardModal from './CardModal';

interface AddCardModalProps {
  onClose: () => void;
  onSave: (card: { headline: string; description: string; image: string }) => void;
}

const AddCardModal: React.FC<AddCardModalProps> = ({ onClose, onSave }) => {
  return (
    <CardModal
      title="Add A New Card"
      onClose={onClose}
      onSubmit={onSave}
      submitLabel="Add Card"
    />
  );
};

export default AddCardModal;
