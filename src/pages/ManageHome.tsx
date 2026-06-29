import React, { useState } from "react";
import HeroSectionForm from "@/components/ManageHome/HeroSectionForm";
import BoomBundlesForm from "@/components/ManageHome/BoomBundlesForm";
import LocationHoursForm from "@/components/ManageHome/LocationHoursForm";
import ChooseGamesForm from "@/components/ManageHome/ChooseGamesForm";
import BitesAndEventsForm from "@/components/ManageHome/BitesAndEventsForm";
import { mockHomePageData } from "@/components/ManageHome/mockData";

type Tab = 'hero' | 'bundles' | 'location' | 'games' | 'bites';

const ManageHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('hero');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'hero', label: 'Hero Banner' },
    { id: 'bundles', label: 'Boom Bundles' },
    { id: 'location', label: 'Location & Hours' },
    { id: 'games', label: 'Choose Game' },
    { id: 'bites', label: 'Bites & Events' },
  ];

  return (
    <div className="p-6 text-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Manage Home</h1>
        <p className="text-gray-400">Configure the content displayed on the homepage.</p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 border-b border-[#3A3530] mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'border-[#E1017D] text-[#E1017D]'
                : 'border-transparent text-gray-400 hover:text-white hover:border-gray-500'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'hero' && <HeroSectionForm initialData={mockHomePageData.hero} />}
        {activeTab === 'bundles' && <BoomBundlesForm initialData={mockHomePageData.bundles} />}
        {activeTab === 'location' && <LocationHoursForm />}
        {activeTab === 'games' && <ChooseGamesForm />}
        {activeTab === 'bites' && (
          <BitesAndEventsForm 
            initialBites={mockHomePageData.bites} 
            initialNightsOut={mockHomePageData.nightsOut} 
          />
        )}
      </div>
    </div>
  );
};

export default ManageHome;


