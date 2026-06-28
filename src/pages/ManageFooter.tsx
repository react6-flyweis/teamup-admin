import React, { useState } from 'react';
import { EditIcon, TrashIcon } from '@/assets/icons';
import FooterLinkModal from '@/components/ManageFooter/FooterLinkModal';

interface FooterLink {
  id: string;
  label: string;
  url: string;
  content: string;
}

const ManageFooter: React.FC = () => {
  const [links, setLinks] = useState<FooterLink[]>([
    { id: '1', label: 'ABOUT US', url: '/about', content: '<h2>About Team Up</h2><p>Welcome to the ultimate play zone...</p>' },
    { id: '2', label: 'PRIVACY POLICY', url: '/privacy', content: '<h2>Privacy Policy</h2><p>Your privacy is important to us...</p>' },
    { id: '3', label: 'TERMS AND CONDITIONS', url: '/terms', content: '<h2>Terms & Conditions</h2><p>Please read these terms...</p>' },
    { id: '4', label: 'WAIVER', url: '/waiver', content: '<h2>Waiver</h2><p>By participating, you agree to...</p>' },
    { id: '5', label: 'CONTACT US', url: '/contact', content: '<h2>Contact Us</h2><p>Reach out to us at...</p>' },
  ]);

  const [companyInfo, setCompanyInfo] = useState({
    address: '70 Washington Square South, New York, NY 10012, United States',
    phone: '1800 100 8000',
    copyright: '© 2025 Booksy Inc. All rights reserved',
  });

  const [socials, setSocials] = useState({
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com',
  });

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<FooterLink | null>(null);

  const handleOpenAddModal = () => {
    setEditingLink(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (link: FooterLink) => {
    setEditingLink(link);
    setIsModalOpen(true);
  };

  const handleSaveModal = (label: string, url: string, content: string) => {
    if (editingLink) {
      // Edit existing
      setLinks(links.map(l => l.id === editingLink.id ? { ...l, label, url, content } : l));
    } else {
      // Add new
      const newId = Math.random().toString(36).substr(2, 9);
      setLinks([...links, { id: newId, label, url, content }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 text-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Manage Footer</h1>
        <p className="text-gray-400">Configure the content displayed in the website footer.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column */}
        <div className="space-y-8">
          {/* Footer Links */}
          <div className="bg-[#1C1C1C] rounded-xl p-6 border border-[#3A3530]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Top Navigation Links & Content</h2>
              <button 
                onClick={handleOpenAddModal}
                className="bg-[#E1017D] hover:bg-[#c0016a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Add New Link
              </button>
            </div>
            <div className="space-y-3">
              {links.map(link => (
                <div key={link.id} className="flex items-center gap-4 p-3 border border-[#3A3530] rounded-lg bg-[#222222]">
                  <div className="flex-1">
                    <div className="text-sm font-bold text-white mb-1">{link.label}</div>
                    <div className="text-xs text-gray-500 mb-1">{link.url}</div>
                    <div className="text-xs text-gray-400 line-clamp-1 italic bg-[#1A1A1A] p-1 rounded">
                      {link.content.replace(/<[^>]+>/g, '') || "No content written..."}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleOpenEditModal(link)}
                      className="p-2 text-blue-400 hover:text-blue-300"
                    >
                      <EditIcon size={18} color="currentColor" />
                    </button>
                    <button className="p-2 text-red-400 hover:text-red-300" onClick={() => setLinks(links.filter(l => l.id !== link.id))}>
                      <TrashIcon size={18} color="currentColor" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Company Info */}
          <div className="bg-[#1C1C1C] rounded-xl p-6 border border-[#3A3530]">
            <h2 className="text-xl font-semibold text-white mb-6">Company Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Office Address</label>
                <textarea
                  value={companyInfo.address}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                  className="w-full h-20 p-3 rounded bg-[#2A2A2A] border border-[#3A3530] text-white resize-none"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
                <input
                  type="text"
                  value={companyInfo.phone}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                  className="w-full h-10 px-4 rounded bg-[#2A2A2A] border border-[#3A3530] text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Copyright Text</label>
                <input
                  type="text"
                  value={companyInfo.copyright}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, copyright: e.target.value })}
                  className="w-full h-10 px-4 rounded bg-[#2A2A2A] border border-[#3A3530] text-white"
                />
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="bg-[#1C1C1C] rounded-xl p-6 border border-[#3A3530]">
            <h2 className="text-xl font-semibold text-white mb-6">Social Media Links</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Facebook URL</label>
                <input
                  type="text"
                  value={socials.facebook}
                  onChange={(e) => setSocials({ ...socials, facebook: e.target.value })}
                  className="w-full h-10 px-4 rounded bg-[#2A2A2A] border border-[#3A3530] text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Instagram URL</label>
                <input
                  type="text"
                  value={socials.instagram}
                  onChange={(e) => setSocials({ ...socials, instagram: e.target.value })}
                  className="w-full h-10 px-4 rounded bg-[#2A2A2A] border border-[#3A3530] text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">TikTok URL</label>
                <input
                  type="text"
                  value={socials.tiktok}
                  onChange={(e) => setSocials({ ...socials, tiktok: e.target.value })}
                  className="w-full h-10 px-4 rounded bg-[#2A2A2A] border border-[#3A3530] text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button className="bg-[#E1017D] hover:bg-[#c0016a] text-white px-8 py-3 rounded-lg font-medium transition-colors text-lg">
          Save All Footer Changes
        </button>
      </div>

      {isModalOpen && (
        <FooterLinkModal
          initialLabel={editingLink?.label || ''}
          initialUrl={editingLink?.url || ''}
          initialContent={editingLink?.content || ''}
          isAdding={!editingLink}
          onSave={handleSaveModal}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ManageFooter;
