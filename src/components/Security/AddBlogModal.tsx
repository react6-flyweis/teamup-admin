import React from 'react';
import BlogModal from './BlogModal';

interface AddBlogModalProps {
  onClose: () => void;
  onSave: (blog: { headline: string; subHeadline: string; description: string; image: string }) => void;
}

const AddBlogModal: React.FC<AddBlogModalProps> = ({ onClose, onSave }) => {
  return (
    <BlogModal
      title="Add Blog"
      onClose={onClose}
      onSubmit={onSave}
      submitLabel="Add Blog"
    />
  );
};

export default AddBlogModal;
