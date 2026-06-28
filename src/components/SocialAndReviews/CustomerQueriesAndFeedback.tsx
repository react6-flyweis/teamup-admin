import CustomerQueriesLeft from "./CustomerQueriesLeft";
import CustomerQueriesRight from "./CustomerQueriesRight";

export const CustomerQueriesAndFeedback = () => {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white font-poppins">
          Customer Queries and Feedback
        </h2>
      </div>
      <div className="flex gap-6">
        <CustomerQueriesLeft />
        <CustomerQueriesRight />
      </div>
    </div>
  );
};
