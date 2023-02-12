import React from "react";
import { Title } from "../ui/Title";

interface PostProps {}

export const Post: React.FC<PostProps> = ({}) => {
  return (
    <div>
      <Title showPostButton={true} />
      <div className="py-2 px-2">
        <textarea
          rows={1}
          style={{
            height: "56px",
            backgroundColor: "transparent",
            resize: "none",
            border: "none",
            outline: "none",
          }}
          placeholder="New Post ...."
          className="w-full"
          autoComplete="on"
          maxLength={10000}
        ></textarea>
      </div>
      <div className="flex flex-row py-2 px-2 border-b border-black">
        <button className="p-2">
          <i className="pi pi-image"></i>
        </button>
        {/* <button className="p-2">B</button>
        <button className="p-2">C</button> */}
      </div>
    </div>
  );
};
