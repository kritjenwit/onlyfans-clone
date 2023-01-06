import React from "react";
import { Navbar } from "../ui/Navbar";
import { ProfilesComponent } from "../ui/ProfilesComponent";

interface FeedLayoutProps {}

export const FeedLayout: React.FC<FeedLayoutProps> = ({}) => {
  return (
    <div>
      <div className="flex flex-col">
        {/* <div className="sticky top-0 z-50">
        <Navbar />
      </div> */}
        <div className="flex w-full">
          <div
            className="hidden lg:block sticky top-[3.2rem] basis-1/4 h-screen bg-open-white"
            style={{
              borderRight: "1px solid black",
            }}
          >
            <div>
              <ProfilesComponent />
            </div>
          </div>
          <div className="bg-open-white basis-full md:basis-3/5 lg:basis-2/4 px-8 lg:px-16">
            {/* <Post /> */}
            <div>{/* <Feed /> */}</div>
          </div>
          <div className="hidden md:block sticky basis-2/5 lg:basis-1/4 top-[3.2rem] h-screen bg-open-white">
            {/* <Sidebar /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
