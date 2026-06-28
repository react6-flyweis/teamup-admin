import  { useState } from "react";
import BlogTab from "../components/Security/BlogTab";
import AboutUsTab from "../components/Security/AboutUsTab";

const Security = () => {
  const [activeTab, setActiveTab] = useState("Blog");

  const tabs = ["Blog", "About Us", "Privacy Policy", "Terms Of Service", "Cookies", "Contact Us"];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Blog":
        return <BlogTab />;
      case "About Us":
        return <AboutUsTab />;
      case "Privacy Policy":
        return <div className="text-white p-8 text-center">Privacy Policy content coming soon...</div>;
      case "Terms Of Service":
        return <div className="text-white p-8 text-center">Terms Of Service content coming soon...</div>;
      case "Cookies":
        return <div className="text-white p-8 text-center">Cookies content coming soon...</div>;
      case "Contact Us":
        return <div className="text-white p-8 text-center">Contact Us content coming soon...</div>;
      default:
        return <BlogTab />;
    }
  };

  return (
    <div className="text-white">
      {/* Tabs Section */}
      <div className="flex flex-wrap gap-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-7 py-2.5 rounded-full font-bold text-xl leading-[33px] font-poppins transition-all duration-200 ${
              activeTab === tab
                ? "bg-white text-black border border-white"
                : "bg-transparent text-white border border-white hover:bg-white hover:text-black"
            }`}
            style={{
              minHeight: 53,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default Security;