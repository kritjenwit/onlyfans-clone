import React from "react";
import { FeedLayout } from "../../components/layouts/Feed";

interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  return (
    <div>
      <FeedLayout />
    </div>
  );
};

export default Index;
