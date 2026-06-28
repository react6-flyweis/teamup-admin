import { CustomerQueriesAndFeedback } from "@/components/SocialAndReviews/CustomerQueriesAndFeedback";
import PositiveReviewsTable from "@/components/SocialAndReviews/PositiveReviews";
import ReviewAndRating from "@/components/SocialAndReviews/ReviewAndRatings";
import React from "react";

const SocialReviews: React.FC = () => {
  return (
    <div className="">
      <ReviewAndRating />
      <PositiveReviewsTable/>
      <CustomerQueriesAndFeedback/>
    </div>
  );
};

export default SocialReviews;
