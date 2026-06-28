import  { useState } from 'react';
import { CustomerCard } from '../components/Customers/CustomerCard';
import { SearchIcon } from '../assets/icons';
import { LocationSelector } from '@/components/Header';
import { CustomerProfile } from '@/components/Customers/CustomerProfile';

const mockUsers = [
  {
    id: 'U1245369',
    name: 'John Smith',
    email: 'Johnsmith@example.com',
    phone: '+91 0000000000',
    totalVisits: 86,
    totalSpent: 1050,
    lastVisit: '24/04/2025',
    avatar: 'src/assets/Avatar.jpg'
  },
  {
    id: 'U1245370',
    name: 'John Smith',
    email: 'Johnsmith@example.com',
    phone: '+91 0000000000',
    totalVisits: 86,
    totalSpent: 1050,
    lastVisit: '24/04/2025',
    avatar: 'src/assets/Avatar.jpg'
  },
  {
    id: 'U1245371',
    name: 'John Smith',
    email: 'Johnsmith@example.com',
    phone: '+91 0000000000',
    totalVisits: 86,
    totalSpent: 1050,
    lastVisit: '24/04/2025',
    avatar: 'src/assets/Avatar.jpg'
  },
  {
    id: 'U1245372',
    name: 'John Smith',
    email: 'Johnsmith@example.com',
    phone: '+91 0000000000',
    totalVisits: 86,
    totalSpent: 1050,
    lastVisit: '24/04/2025',
    avatar: 'src/assets/Avatar.jpg'
  }, {
    id: 'U1245372',
    name: 'John Smith',
    email: 'Johnsmith@example.com',
    phone: '+91 0000000000',
    totalVisits: 86,
    totalSpent: 1050,
    lastVisit: '24/04/2025',
    avatar: 'src/assets/Avatar.jpg'
  }, {
    id: 'U1245372',
    name: 'John Smith',
    email: 'Johnsmith@example.com',
    phone: '+91 0000000000',
    totalVisits: 86,
    totalSpent: 1050,
    lastVisit: '24/04/2025',
    avatar: 'src/assets/Avatar.jpg'
  }, {
    id: 'U1245372',
    name: 'John Smith',
    email: 'Johnsmith@example.com',
    phone: '+91 0000000000',
    totalVisits: 86,
    totalSpent: 1050,
    lastVisit: '24/04/2025',
    avatar: 'src/assets/Avatar.jpg'
  }, {
    id: 'U1245372',
    name: 'John Smith',
    email: 'Johnsmith@example.com',
    phone: '+91 0000000000',
    totalVisits: 86,
    totalSpent: 1050,
    lastVisit: '24/04/2025',
    avatar: 'src/assets/Avatar.jpg'
  }, {
    id: 'U1245372',
    name: 'John Smith',
    email: 'Johnsmith@example.com',
    phone: '+91 0000000000',
    totalVisits: 86,
    totalSpent: 1050,
    lastVisit: '24/04/2025',
    avatar: 'src/assets/Avatar.jpg'
  }, {
    id: 'U1245372',
    name: 'John Smith',
    email: 'Johnsmith@example.com',
    phone: '+91 0000000000',
    totalVisits: 86,
    totalSpent: 1050,
    lastVisit: '24/04/2025',
    avatar: 'src/assets/Avatar.jpg'
  },
  // Add more mock users with similar data
];

const Customers = () => {
  const [selectedUser, setSelectedUser] = useState(mockUsers[0]);

  return (
    <div className="p-4 flex gap-6">
      {/* Left Section */}
      <div className="w-[320px] h-[780px] bg-[#F9D2EA] rounded-2xl p-4">
        {/* Search User */}
        <div className="w-full h-10 bg-white rounded-lg px-4 flex items-center gap-3">
          <SearchIcon className="w-6 h-6" />
          <input
            type="text"
            placeholder="Search User"
            className="flex-1 outline-none text-[#4A4A4A] font-poppins"
          />
        </div>

        {/* Location Selector */}
        <div className="mt-4">
          <LocationSelector  className="w-full" />
        </div>

        {/* Users List */}
        <div className="mt-8 flex flex-col gap-4 max-h-[580px] overflow-y-auto custom-scrollbar">
          {mockUsers.map((user, index) => (
            <CustomerCard
              key={index}
              user={user}
              isSelected={user === selectedUser}
              onClick={() => setSelectedUser(user)}
            />
          ))}
        </div>
      </div>

      {/* Right Section */}
      {selectedUser && (
        <CustomerProfile user={selectedUser} />
      )}
    </div>
  );
};

export default Customers;