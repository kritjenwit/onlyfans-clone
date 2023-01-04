import { Button } from "primereact/button";
import React from "react";
import { useDispatch } from "react-redux";
import { resultLoginGoogle } from "../../app/firebase";
import { AppDispatch } from "../../app/store";
import { loginGoogle, UserState } from "../../features/users/userSlice";

interface BtnLoginGoogleProps {
  userState: UserState;
  setFormError: React.Dispatch<React.SetStateAction<string>>;
  alertErrorMsg: React.MutableRefObject<{
    show({}): Function;
    clear(): Function;
  }>;
}

const iconGoogle =
  "https://lh3.googleusercontent.com/jUoaTIlBn5ibfQcND2n5OMD6Z7xoqNj-ShHlFR6QuLffLXD5pS8V2eNg1rGlrsRrnDkoQ28O8UHzqzBQKAGY4l1CS2NQSq2SkRScK6FOjl82jppyohK-";

export const BtnLoginGoogle: React.FC<BtnLoginGoogleProps> = ({
  userState,
  setFormError,
  alertErrorMsg,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const googleLogin = async () => {
    let response = await resultLoginGoogle();
    console.log(response);
    if (response.user) {
      let formLogin = {
        email: response.user.email!,
        password: response.user.uid!,
        photoURL: response.user.photoURL!,
        displayName: response.user.displayName!,
      };
      const resultAction = await dispatch(loginGoogle(formLogin));
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
    }
  };

  return (
    <Button
      type="button"
      className="w-full rounded-lg justify-center px-3"
      onClick={() => googleLogin()}
    >
      <picture>
        <source srcSet={iconGoogle} type="image/png" />
        <img alt="logo" src={iconGoogle} style={{ width: "1.5rem" }} />
      </picture>
      {!userState.isLoading ? (
        <span className="ml-2 font-bold" v-if="!userStore.loader">
          Login with Google
        </span>
      ) : (
        <i
          className="pi pi-spin pi-spinner text-yellow-400"
          style={{
            fontSize: "1.5rem",
          }}
        />
      )}
    </Button>
  );
};
