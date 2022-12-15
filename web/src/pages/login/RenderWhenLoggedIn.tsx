import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Button } from "primereact/button";
import { logout } from "../../features/users/userSlice";
import { isServer } from "../../utils/isServer";

interface RenderWhenLoggedInProps {}

export const RenderWhenLoggedIn: React.FC<RenderWhenLoggedInProps> = ({}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  if (!isServer()) {
    // router.push("/");
  }
  return (
    <div>
      <Button type="button" onClick={() => dispatch(logout())}>
        Logout
      </Button>
    </div>
  );
};
