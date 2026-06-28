import React, { useState } from 'react';
import type { HeroSection } from './types';
import Toggle from '@/components/common/Toggle';
import UploadIcon from '@/assets/icons/UploadIcon';

interface HeroSectionFormProps {
  initialData: HeroSection;
}

const HeroSectionForm: React.FC<HeroSectionFormProps> = ({ initialData }) => {
  const [data, setData] = useState<HeroSection>(initialData);

  return (
    <div className="bg-[#1C1C1C] rounded-xl p-6 border border-[#3A3530]">
      <h2 className="text-xl font-semibold text-white mb-6">Hero Section & Top Banner</h2>

      {/* Top Banner Settings */}
      <div className="mb-8 border-b border-[#3A3530] pb-6">
        <h3 className="text-lg font-medium text-white mb-4">Top Banner</h3>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={data.topBannerText}
            onChange={(e) => setData({ ...data, topBannerText: e.target.value })}
            className="flex-1 h-12 px-4 rounded-lg bg-[#E1017D] border border-gray-300 text-white font-bold"
            placeholder="e.g. TIPSY THRILLS - SIPS & THRILLS FRI 15TH AUG"
          />
          <Toggle
            activeText="ON"
            inactiveText="OFF"
            checked={data.isTopBannerActive}
            onChange={(checked) => setData({ ...data, isTopBannerActive: checked })}
          />
        </div>
      </div>

      {/* Hero Banner Settings */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Hero Banner</h3>
        
        <div className="space-y-6">
          {/* Background Video */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Background Video URL</label>
            <div className="relative w-full h-[200px] rounded-lg border-2 border-dashed border-gray-500 flex flex-col items-center justify-center overflow-hidden">
              {data.backgroundMediaUrl ? (
                <>
                  <video src={data.backgroundMediaUrl} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-50" />
                  <div className="relative z-10 flex flex-col items-center">
                    <button className="bg-black/50 px-4 py-2 rounded text-white text-sm backdrop-blur-sm" onClick={() => setData({...data, backgroundMediaUrl: ''})}>Remove Video</button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <UploadIcon size={32} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-400 text-sm">Enter video URL below</p>
                </div>
              )}
            </div>
            <input
              type="text"
              value={data.backgroundMediaUrl}
              onChange={(e) => setData({ ...data, backgroundMediaUrl: e.target.value })}
              className="w-full h-10 px-4 mt-3 rounded bg-[#2A2A2A] border border-[#3A3530] text-white text-sm"
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Hero Title</label>
              <input
                type="text"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                className="w-full h-10 px-4 rounded bg-[#2A2A2A] border border-[#3A3530] text-white"
              />
            </div>
            
            {/* Subtitle / Location */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Subtitle / Location</label>
              <input
                type="text"
                value={data.subtitle}
                onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                className="w-full h-10 px-4 rounded bg-[#2A2A2A] border border-[#3A3530] text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Primary Button */}
            <div className="p-4 border border-[#3A3530] rounded-lg">
              <h4 className="text-white mb-3 font-medium">Primary Button</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Text</label>
                  <input
                    type="text"
                    value={data.buttons.primaryText}
                    onChange={(e) => setData({ ...data, buttons: { ...data.buttons, primaryText: e.target.value } })}
                    className="w-full h-9 px-3 rounded bg-[#2A2A2A] border border-[#3A3530] text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Link</label>
                  <input
                    type="text"
                    value={data.buttons.primaryLink}
                    onChange={(e) => setData({ ...data, buttons: { ...data.buttons, primaryLink: e.target.value } })}
                    className="w-full h-9 px-3 rounded bg-[#2A2A2A] border border-[#3A3530] text-white text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Secondary Button */}
            <div className="p-4 border border-[#3A3530] rounded-lg">
              <h4 className="text-white mb-3 font-medium">Secondary Button</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Text</label>
                  <input
                    type="text"
                    value={data.buttons.secondaryText}
                    onChange={(e) => setData({ ...data, buttons: { ...data.buttons, secondaryText: e.target.value } })}
                    className="w-full h-9 px-3 rounded bg-[#2A2A2A] border border-[#3A3530] text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Link</label>
                  <input
                    type="text"
                    value={data.buttons.secondaryLink}
                    onChange={(e) => setData({ ...data, buttons: { ...data.buttons, secondaryLink: e.target.value } })}
                    className="w-full h-9 px-3 rounded bg-[#2A2A2A] border border-[#3A3530] text-white text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <button className="bg-[#E1017D] hover:bg-[#c0016a] text-white px-6 py-2 rounded-lg font-medium transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default HeroSectionForm;
