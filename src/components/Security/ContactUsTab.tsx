import  { useState } from "react";
import ShareIcon from "../../assets/icons/ShareIcon";
import Pagination from "@/utils/Pagination";
import ReplyModal from "./ReplyModal";

interface ContactEntry {
  id: number;
  name: string;
  enquiryType: string;
  email: string;
  phoneNo: string;
  comment: string;
}

const initialContactData: ContactEntry[] = [
  {
    id: 1,
    name: "John Smith",
    enquiryType: "Corporate",
    email: "example@email.com",
    phoneNo: "+1 987456 3698",
    comment: "Lorem Ipsum is simply dummy text..."
  },
  {
    id: 2,
    name: "John Smith",
    enquiryType: "Existing Booking",
    email: "example@email.com",
    phoneNo: "+1 987456 3698",
    comment: "Lorem Ipsum is simply dummy text..."
  },
  {
    id: 3,
    name: "John Smith",
    enquiryType: "Lost Property",
    email: "example@email.com",
    phoneNo: "+1 987456 3698",
    comment: "Lorem Ipsum is simply dummy text..."
  },
  {
    id: 4,
    name: "John Smith",
    enquiryType: "VAT Requests",
    email: "example@email.com",
    phoneNo: "+1 987456 3698",
    comment: "Lorem Ipsum is simply dummy text..."
  },
  {
    id: 5,
    name: "John Smith",
    enquiryType: "Press/Marketing Enquiries",
    email: "example@email.com",
    phoneNo: "+1 987456 3698",
    comment: "Lorem Ipsum is simply dummy text..."
  },
  {
    id: 6,
    name: "John Smith",
    enquiryType: "Other",
    email: "example@email.com",
    phoneNo: "+1 987456 3698",
    comment: "Lorem Ipsum is simply dummy text..."
  },
  {
    id: 7,
    name: "John Smith",
    enquiryType: "Existing Booking",
    email: "example@email.com",
    phoneNo: "+1 987456 3698",
    comment: "Lorem Ipsum is simply dummy text..."
  },
  {
    id: 8,
    name: "John Smith",
    enquiryType: "Other",
    email: "example@email.com",
    phoneNo: "+1 987456 3698",
    comment: "Lorem Ipsum is simply dummy text..."
  },
  {
    id: 9,
    name: "John Smith",
    enquiryType: "Existing Booking",
    email: "example@email.com",
    phoneNo: "+1 987456 3698",
    comment: "Lorem Ipsum is simply dummy text..."
  },
  {
    id: 10,
    name: "John Smith",
    enquiryType: "Other",
    email: "example@email.com",
    phoneNo: "+1 987456 3698",
    comment: "Lorem Ipsum is simply dummy text..."
  },
  {
    id: 11,
    name: "John Smith",
    enquiryType: "Existing Booking",
    email: "example@email.com",
    phoneNo: "+1 987456 3698",
    comment: "Lorem Ipsum is simply dummy text..."
  },
  {
    id: 12,
    name: "John Smith",
    enquiryType: "Lost Property",
    email: "example@email.com",
    phoneNo: "+1 987456 3698",
    comment: "Lorem Ipsum is simply dummy text..."
  }
];

const ROWS_PER_PAGE = 10;

const columns = [
  { key: "name", label: "Name" },
  { key: "enquiryType", label: "Enquiry Type" },
  { key: "email", label: "Email" },
  { key: "phoneNo", label: "Phone No" },
  { key: "comment", label: "Comment" },
  { key: "reply", label: "Reply" },
];

const ContactUsTab = () => {
  const [contactData] = useState<ContactEntry[]>(initialContactData);
  const [page, setPage] = useState(1);
  const [selectedContact, setSelectedContact] = useState<ContactEntry | null>(null);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  const pageData = contactData.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );
  const totalPages = Math.ceil(contactData.length / ROWS_PER_PAGE);

  const handleReplyClick = (contact: ContactEntry) => {
    setSelectedContact(contact);
    setIsReplyModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsReplyModalOpen(false);
    setSelectedContact(null);
  };

  const handleSendReply = (replyData: any) => {
    console.log("Sending reply:", replyData);
    handleCloseModal();
  };

  return (
    <div className="text-white">
      <div className="rounded-lg overflow-hidden shadow-lg">
        <table
          className="w-full text-center border-separate"
          style={{ borderSpacing: 0 }}
        >
          <thead>
            <tr className="bg-[#F9D2EA]">
              {columns.map((col, index) => (
                <th
                  key={col.key}
                  className="py-4 px-4 font-bold text-sm text-black font-montserrat"
                  style={{
                    borderTopLeftRadius: index === 0 ? 8 : 0,
                    borderTopRightRadius: index === columns.length - 1 ? 8 : 0,
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((contact, idx) => (
              <tr
                key={`${contact.id}-${idx}`}
                className={`${
                  idx % 2 === 0 ? "bg-[#FDECF6]" : "bg-[#FFFBFD]"
                } hover:bg-[#f3e2f6] transition-all duration-200 ease-in-out text-black`}
              >
                <td className="py-4 px-4 font-montserrat font-medium text-sm">
                  {contact.name}
                </td>
                <td className="py-4 px-4 font-montserrat font-medium text-sm">
                  {contact.enquiryType}
                </td>
                <td className="py-4 px-4 font-montserrat font-medium text-sm">
                  {contact.email}
                </td>
                <td className="py-4 px-4 font-montserrat font-medium text-sm">
                  {contact.phoneNo}
                </td>
                <td className="py-4 px-4 font-montserrat font-medium text-sm max-w-[200px] truncate">
                  {contact.comment}
                </td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => handleReplyClick(contact)}
                    className="flex items-center justify-center hover:opacity-70 transition-opacity"
                  >
                    <ShareIcon size={20} color="#000000" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="flex items-center justify-end py-4 px-4 bg-transparent">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>

      {/* Reply Modal */}
      {selectedContact && (
        <ReplyModal
          open={isReplyModalOpen}
          onClose={handleCloseModal}
          onSend={handleSendReply}
          contactData={selectedContact}
        />
      )}
    </div>
  );
};

export default ContactUsTab;
