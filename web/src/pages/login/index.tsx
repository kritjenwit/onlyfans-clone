import React, { useEffect, useState } from "react";
import { useAppSelector } from "./../../components/login/state";
import { RenderWhenLoggedIn } from "../../components/login/RenderWhenLoggedIn";
import { RenderWhenNotLogin } from "../../components/login/RenderWhenNotLogin";

interface loginProps {}

const Index: React.FC<loginProps> = ({}) => {
  const userState = useAppSelector((state) => state.user);
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
