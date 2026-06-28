import React, { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { CloseIcon } from '@/assets/icons';

interface FooterLinkModalProps {
  initialLabel: string;
  initialUrl: string;
  initialContent?: string;
  isAdding: boolean;
  onSave: (label: string, url: string, content: string) => void;
  onClose: () => void;
}

const FooterLinkModal: React.FC<FooterLinkModalProps> = ({ 
  initialLabel, 
  initialUrl, 
  initialContent = '', 
  isAdding, 
  onSave, 
  onClose 
}) => {
  const [label, setLabel] = useState(initialLabel);
  const [url, setUrl] = useState(initialUrl);
  const [content, setContent] = useState(initialContent);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ],
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#1C1C1C] rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-[#3A3530] shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-[#3A3530]">
          <h2 className="text-xl font-bold text-white">
            {isAdding ? 'Add Footer Link' : `Edit Content: ${initialLabel}`}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <CloseIcon />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Link Label</label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full h-10 px-4 rounded bg-[#2A2A2A] border border-[#3A3530] text-white"
                placeholder="e.g. ABOUT US"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Internal URL Path</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full h-10 px-4 rounded bg-[#2A2A2A] border border-[#3A3530] text-white"
                placeholder="e.g. /about"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Page Content</label>
            <div className="bg-white rounded-lg overflow-hidden border border-[#3A3530]">
              <ReactQuill 
                theme="snow" 
                value={content} 
                onChange={setContent} 
                modules={modules}
                className="text-black h-[300px]"
                style={{ height: '300px', paddingBottom: '42px' }}
              />
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-[#3A3530] flex justify-end gap-4 bg-[#1C1C1C] rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg font-medium text-white border border-gray-600 hover:bg-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(label, url, content)}
            className="bg-[#E1017D] hover:bg-[#c0016a] text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Save Content
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterLinkModal;
