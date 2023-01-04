import { Button } from "primereact/button";
import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { UserState, registerEmail } from "../../features/users/userSlice";

interface BtnRegisterProps {
  userState: UserState;
  formRegister: {
    email: string;
    password: string;
    confirmPassword: string;
  };
  setFormError: React.Dispatch<React.SetStateAction<string>>;
  alertErrorMsg: React.MutableRefObject<{
    show({}): Function;
    clear(): Function;
  }>;
}

export const BtnRegister: React.FC<BtnRegisterProps> = ({
  userState,
  formRegister,
  setFormError,
  alertErrorMsg,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const doRegister = async (e: React.MouseEvent) => {
    console.log("Click");
    console.log(formRegister.email);
    console.log(formRegister.password);

    e.preventDefault();

    const resultAction = await dispatch(registerEmail(formRegister));

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
        className="blog-button rounded-lg flex justify-center w-full"
        onClick={doRegister}
      >
        {!userState.isLoading ? (
          <span className="ml-2 font-bold">Register</span>
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
