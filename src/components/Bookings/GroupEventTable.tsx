import { useState } from "react";
import Pagination from "@/utils/Pagination";
import StatusDropdown, { type BookingStatus } from "../common/StatusDropdown";

interface GroupEvent {
  eventId: string;
  eventName: string;
  eventDate: string;
  timeSlot: string;
  guestCount: number;
  capacityLimit: number;
  vipAccess: boolean;
  status: BookingStatus;
  amountPaid: number;
}

const initialEvents: GroupEvent[] = [
  {
    eventId: "#EV1001",
    eventName: "Corporate Meeting",
    eventDate: "10/05/2025",
    timeSlot: "9 AM, Monday",
    guestCount: 50,
    capacityLimit: 100,
    vipAccess: true,
    status: "Confirm",
    amountPaid: 5000,
  },
  {
    eventId: "#EV1002",
    eventName: "Team Building",
    eventDate: "11/05/2025",
    timeSlot: "3 PM, Tuesday",
    guestCount: 40,
    capacityLimit: 80,
    vipAccess: false,
    status: "Pending",
    amountPaid: 3200,
  },
  {
    eventId: "#EV1003",
    eventName: "Birthday Party",
    eventDate: "12/05/2025",
    timeSlot: "2 PM, Wednesday",
    guestCount: 25,
    capacityLimit: 30,
    vipAccess: false,
    status: "Cancelled",
    amountPaid: 1800,
  },
  {
    eventId: "#EV1004",
    eventName: "Product Launch",
    eventDate: "13/05/2025",
    timeSlot: "10 AM, Thursday",
    guestCount: 100,
    capacityLimit: 150,
    vipAccess: true,
    status: "Confirm",
    amountPaid: 12000,
  },
  {
    eventId: "#EV1005",
    eventName: "Wedding Reception",
    eventDate: "14/05/2025",
    timeSlot: "6 PM, Friday",
    guestCount: 200,
    capacityLimit: 250,
    vipAccess: true,
    status: "Pending",
    amountPaid: 22000,
  },
  {
    eventId: "#EV1006",
    eventName: "Charity Gala",
    eventDate: "15/05/2025",
    timeSlot: "8 PM, Saturday",
    guestCount: 150,
    capacityLimit: 200,
    vipAccess: true,
    status: "Confirm",
    amountPaid: 18000,
  },
  {
    eventId: "#EV1007",
    eventName: "Conference",
    eventDate: "16/05/2025",
    timeSlot: "11 AM, Sunday",
    guestCount: 75,
    capacityLimit: 100,
    vipAccess: false,
    status: "Pending",
    amountPaid: 7500,
  },
  {
    eventId: "#EV1008",
    eventName: "Seminar",
    eventDate: "17/05/2025",
    timeSlot: "1 PM, Monday",
    guestCount: 60,
    capacityLimit: 80,
    vipAccess: false,
    status: "Cancelled",
    amountPaid: 2500,
  },
  {
    eventId: "#EV1009",
    eventName: "Networking Night",
    eventDate: "18/05/2025",
    timeSlot: "7 PM, Tuesday",
    guestCount: 90,
    capacityLimit: 120,
    vipAccess: true,
    status: "Confirm",
    amountPaid: 9800,
  },
  {
    eventId: "#EV1010",
    eventName: "Music Concert",
    eventDate: "19/05/2025",
    timeSlot: "9 PM, Wednesday",
    guestCount: 300,
    capacityLimit: 350,
    vipAccess: false,
    status: "Pending",
    amountPaid: 30000,
  },
  {
    eventId: "#EV1011",
    eventName: "Art Exhibition",
    eventDate: "20/05/2025",
    timeSlot: "5 PM, Thursday",
    guestCount: 80,
    capacityLimit: 100,
    vipAccess: true,
    status: "Cancelled",
    amountPaid: 6000,
  },
  {
    eventId: "#EV1012",
    eventName: "Fashion Show",
    eventDate: "21/05/2025",
    timeSlot: "7 PM, Friday",
    guestCount: 120,
    capacityLimit: 150,
    vipAccess: true,
    status: "Confirm",
    amountPaid: 16000,
  },
  {
    eventId: "#EV1013",
    eventName: "Book Fair",
    eventDate: "22/05/2025",
    timeSlot: "4 PM, Saturday",
    guestCount: 40,
    capacityLimit: 60,
    vipAccess: false,
    status: "Pending",
    amountPaid: 2000,
  },
  {
    eventId: "#EV1014",
    eventName: "Startup Pitch",
    eventDate: "23/05/2025",
    timeSlot: "2 PM, Sunday",
    guestCount: 35,
    capacityLimit: 50,
    vipAccess: false,
    status: "Cancelled",
    amountPaid: 1000,
  },
  {
    eventId: "#EV1015",
    eventName: "Networking Lunch",
    eventDate: "24/05/2025",
    timeSlot: "12 PM, Monday",
    guestCount: 60,
    capacityLimit: 70,
    vipAccess: true,
    status: "Confirm",
    amountPaid: 7000,
  },
  {
    eventId: "#EV1016",
    eventName: "Awards Ceremony",
    eventDate: "25/05/2025",
    timeSlot: "3 PM, Tuesday",
    guestCount: 250,
    capacityLimit: 300,
    vipAccess: true,
    status: "Pending",
    amountPaid: 25000,
  },
  {
    eventId: "#EV1017",
    eventName: "Workshop",
    eventDate: "26/05/2025",
    timeSlot: "10 AM, Wednesday",
    guestCount: 30,
    capacityLimit: 35,
    vipAccess: false,
    status: "Cancelled",
    amountPaid: 1500,
  },
  {
    eventId: "#EV1018",
    eventName: "Retreat",
    eventDate: "27/05/2025",
    timeSlot: "6 PM, Thursday",
    guestCount: 40,
    capacityLimit: 55,
    vipAccess: true,
    status: "Confirm",
    amountPaid: 4000,
  },
  {
    eventId: "#EV1019",
    eventName: "Family Gathering",
    eventDate: "28/05/2025",
    timeSlot: "5 PM, Friday",
    guestCount: 25,
    capacityLimit: 30,
    vipAccess: false,
    status: "Pending",
    amountPaid: 1200,
  },
  {
    eventId: "#EV1020",
    eventName: "Movie Night",
    eventDate: "29/05/2025",
    timeSlot: "8 PM, Saturday",
    guestCount: 70,
    capacityLimit: 100,
    vipAccess: true,
    status: "Confirm",
    amountPaid: 3000,
  },
];

const ROWS_PER_PAGE = 10;

const columns = [
  { key: "eventId", label: "Event ID" },
  { key: "eventName", label: "Event Name" },
  { key: "eventDate", label: "Event Date" },
  { key: "timeSlot", label: "Time Slot" },
  { key: "guestCount", label: "Guest Count" },
  { key: "capacityLimit", label: "Capacity Limit" },
  { key: "vipAccess", label: "VIP Access" },
  { key: "status", label: "Status" },
  { key: "amountPaid", label: "Amount Paid" },
];

export default function GroupEventTable() {
  const [selectedStatus, setSelectedStatus] = useState<BookingStatus>("All");
  const [page, setPage] = useState(1);

  const handleStatusChange = (newStatus: BookingStatus) => {
    setSelectedStatus(newStatus);
    setPage(1); // Reset to first page when changing filter
  };

  // Filter events based on selected status
  const filteredEvents =
    selectedStatus === "All"
      ? initialEvents
      : initialEvents.filter((event) => event.status === selectedStatus);

  const pageData = filteredEvents.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredEvents.length / ROWS_PER_PAGE);

  return (
    <section className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white font-poppins">
          Group & Corporate Event Reservation
        </h2>
        <StatusDropdown
          currentStatus={selectedStatus}
          onChange={handleStatusChange}
        />
      </div>

      <div className="rounded-[10px] overflow-hidden shadow-lg">
        <table
          className="w-full text-center border-separate"
          style={{ borderSpacing: 0 }}
        >
          <thead>
            <tr className="bg-[#F9D2EA]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="py-4 px-2 font-bold text-[14px] text-black font-montserrat"
                  style={{
                    borderTopLeftRadius: col.key === columns[0].key ? 8 : 0,
                    borderTopRightRadius:
                      col.key === columns[columns.length - 1].key ? 8 : 0,
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((event, idx) => (
              <tr
                key={`${event.eventId}-${idx}`}
                className={`${
                  idx % 2 === 0 ? "bg-[#FDECF6]" : "bg-[#FFFBFD]"
                } hover:bg-[#f3e2f6] transition-all duration-200 ease-in-out cursor-pointer`}
              >
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {event.eventId}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {event.eventName}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {event.eventDate}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {event.timeSlot}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {event.guestCount}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {event.capacityLimit}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  {event.vipAccess ? "Yes" : "No"}
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  <div
                    className={`inline-block px-3 py-1 rounded-full ${
                      event.status === "Confirm"
                        ? "bg-[#14AE5C]"
                        : event.status === "Pending"
                        ? "bg-[#E8B931]"
                        : "bg-[#EC221F]"
                    } text-white`}
                  >
                    {event.status}
                  </div>
                </td>
                <td className="py-4 px-2 font-montserrat font-medium text-[14px]">
                  ${event.amountPaid}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-end py-4 px-4 bg-transparent">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </section>
  );
}
