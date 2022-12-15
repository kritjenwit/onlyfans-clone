import React, { useEffect, useState } from "react";
import { useAppSelector } from "./state";
import { RenderWhenLoggedIn } from "./RenderWhenLoggedIn";
import { RenderWhenNotLogin } from "./RenderWhenNotLogin";

interface loginProps {}

const Index: React.FC<loginProps> = ({}) => {
  const userState = useAppSelector((state) => state.user);
  console.log(userState.isLogin);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, [userState.isLogin]);

  if (!mounted) {
    return <div>Loading</div>;
  }

  if (!userState.isLogin) {
    return <RenderWhenNotLogin />;
  } else {
    return <RenderWhenLoggedIn />;
  }
};

export default Index;
