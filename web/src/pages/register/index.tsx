import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../components/register/state";
import { useRouter } from "next/router";
import { RenderWhenNotLogin } from "../../components/register/RenderWhenNotLogin";

interface indexProps {}

const Index: React.FC<indexProps> = ({}) => {
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
    router.push("/ref=already_login");
  }

  return <RenderWhenNotLogin />
};

export default Index;
