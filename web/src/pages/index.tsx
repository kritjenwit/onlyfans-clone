import React, { useEffect, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { useRouter } from "next/router";
import { RenderWhenLoggedIn } from "../components/index/RenderWhenLoggedIn";

interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {
  const userState = useAppSelector((state) => state.user);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, [userState.isLogin]);

  if (!mounted) {
    return <div>Loading</div>;
  }
  
  if (!userState.isLogin) {
    router.push("/login");
  }

  console.log(userState.user)

  return <RenderWhenLoggedIn />;
};

export default Index;
