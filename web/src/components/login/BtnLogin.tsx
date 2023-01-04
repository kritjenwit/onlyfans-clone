import { Button } from "primereact/button";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { UserState, loginEmail } from "../../features/users/userSlice";

interface BtnLoginProps {
  userState: UserState;
  formLogin: {
    email: string;
    password: string;
  };
  setFormError: React.Dispatch<React.SetStateAction<string>>;
  alertErrorMsg: React.MutableRefObject<{
    show({}): Function;
    clear(): Function;
  }>;
}

export const BtnLogin: React.FC<BtnLoginProps> = ({
  userState,
  formLogin,
  setFormError,
  alertErrorMsg,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const doLoginEmail = async (e: React.MouseEvent) => {
    console.log("Click");
    console.log(formLogin.email);
    console.log(formLogin.password);

    // e.preventDefault();

    const resultAction = await dispatch(loginEmail(formLogin));
    console.log(resultAction);
    console.log(alertErrorMsg.current);
    if (alertErrorMsg.current) {
      alertErrorMsg.current.clear();
    }
    if (resultAction.payload.code && resultAction.payload.code != 1101) {
      setFormError(resultAction.payload.message);
      alertErrorMsg.current.show([
        {
          severity: "error",
          detail: resultAction.payload.message,
          sticky: false,
        },
      ]);
    }
  };

  return (
    <>
      <Button
        type="button"
        className="blog-button rounded-lg flex justify-center"
        onClick={doLoginEmail}
      >
        {!userState.isLoading ? (
          <span className="ml-2 font-bold">Login</span>
        ) : (
          <i
            className="pi pi-spin pi-spinner text-yellow-400"
            style={{
              fontSize: "1.5em",
            }}
          />
        )}
      </Button>
    </>
  );
};
