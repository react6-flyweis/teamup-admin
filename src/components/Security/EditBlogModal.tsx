import React from 'react';
import BlogModal from './BlogModal';

interface Blog {
  id: number;
  image: string;
  headline: string;
  subHeadline: string;
  description: string;
  date: string;
}

interface EditBlogModalProps {
  blog: Blog;
  onClose: () => void;
  onSave: (blog: Blog) => void;
}

const EditBlogModal: React.FC<EditBlogModalProps> = ({ blog, onClose, onSave }) => {
  return (
    <BlogModal
      title="Edit Blog"
      initialData={{
        headline: blog.headline,
        subHeadline: blog.subHeadline,
        description: blog.description,
        image: blog.image,
      }}
      onClose={onClose}
      onSubmit={(data) => onSave({ ...blog, ...data })}
      submitLabel="Save"
    />
  );
};

export default EditBlogModal;
