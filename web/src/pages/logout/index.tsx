import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { logout } from "../../features/users/userSlice";
import { isServer } from "../../utils/isServer";
interface IndexProps {}

const Index: React.FC<IndexProps> = ({}) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  if (!isServer()) {
    dispatch(logout());
    router.push("/login");
  }

  return (
    <div>
      <h1>Logging out</h1>
    </div>
  );
};

export default Index;
