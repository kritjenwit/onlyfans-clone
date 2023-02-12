import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { FeedLayout } from "../layouts/Feed";
import { Post } from "../index/Post";

interface RenderWhenLoggedInProps {}

export const RenderWhenLoggedIn: React.FC<RenderWhenLoggedInProps> = ({}) => {
  const dispatch: AppDispatch = useDispatch();
  return <FeedLayout CenterComponent={Post} />;
};
