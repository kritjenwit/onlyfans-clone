import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../components/login/state";
import { RenderWhenNotLogin } from "../../components/login/RenderWhenNotLogin";
import { useRouter } from "next/router";

interface loginProps {}

const Index: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const userState = useAppSelector((state) => state.user);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, [userState.isLogin]);

  if (!mounted) {
    return <div>Loading</div>;
  }

  if (userState.isLogin) {
    router.push("/");
  }

  return <RenderWhenNotLogin />;
};

export default Index;
