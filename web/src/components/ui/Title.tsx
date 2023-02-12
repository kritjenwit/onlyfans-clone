import React from "react";

interface TitleProps {
  showBackButton?: boolean;
  showPostButton?: boolean;
}

export const Title: React.FC<TitleProps> = ({}) => {
  return (
    <div>
      <div className="px-4 py-3 text-2xl border-b border-black sticky w-full top-0">
        <div className="flex flex-row justify-between">
          <div>
            <h1>Home</h1>
          </div>
          <div>
            <button className="bg-open-gray text-open-white py-1 px-5 mr-4 rounded-full">Clear</button>
            <button className="bg-open-blue text-open-white py-1 px-5 mr-4 rounded-full">Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};
