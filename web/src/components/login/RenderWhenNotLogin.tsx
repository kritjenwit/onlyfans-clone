import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Messages } from "primereact/messages";
import { useAppSelector } from "./state";
import { BtnLogin } from "./BtnLogin";
import { BtnLoginGoogle } from "./BtnLoginGoogle";
import Link from "next/link";

interface RenderWhenNotLoginProps {}

const backgroundImageUrl =
  "https://images.unsplash.com/photo-1667423520863-8653106f18e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2128&q=80";
const logoMlive = "https://img.winnine.com.au/main/all_new/logo-top.png";

export const RenderWhenNotLogin: React.FC<RenderWhenNotLoginProps> = ({}) => {
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState<string>("");
  const alertErrorMsg = useRef<any>();

  const handleChange = (
    e: React.ChangeEvent & React.ChangeEvent<{ name: string; value: any }>
  ) => {
    setFormLogin((state) => {
      return { ...state, [e.target.name]: e.target.value };
    });
  };

  const userState = useAppSelector((state) => state.user);

  return (
    <div>
      <div className="flex lg:flex-row w-full lg:h-screen">
        <div className="hidden lg:block lg:w-2/3">
          <picture>
            <source srcSet={backgroundImageUrl} type="image/jpg" />
            <img
              className="w-full h-screen object-cover"
              src={backgroundImageUrl}
              alt="background-image"
            />
          </picture>
        </div>
        <div className="flex flex-auto lg:flex-auto lg:w-0 md:flex-none md:w-1/2 md:mx-auto sm:w-1/2 sm:mx-auto flex-col py-12">
          <div className="logo-icon mx-auto">
            <picture>
              <source srcSet={logoMlive} type="image/png" />
              <img src={logoMlive} alt="" />
            </picture>
          </div>

          <div className="mt-3 mb-0 mx-8">
            <Messages className="w-full" ref={alertErrorMsg} />
          </div>

          <div className="flex flex-col m-8 pb-4 p-inputtext-lg border-b-2 border-yellow-200">
            <div className="flex flex-col mb-2">
              <label className="text-muted font-medium text-lg" htmlFor="email">
                Email
              </label>
              <InputText
                className="w-full border-2 border-yellow-100 mt-2 px-2 rounded-lg bg-transparent text-black"
                type="text"
                name="email"
                placeholder="Enter E-mail"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label
                className="text-muted font-medium text-lg"
                htmlFor="password"
              >
                Password
              </label>
              <InputText
                className="w-full border-2 border-yellow-100 mt-2 px-2 rounded-lg bg-transparent text-black"
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <BtnLogin
              userState={userState}
              formLogin={formLogin}
              setFormError={setFormError}
              alertErrorMsg={alertErrorMsg}
            />
            <div className="flex justify-center mt-2 underline text-slate-400">
              <Link className="mx-2" href="/register">
                Register
              </Link>
              <Link className="mx-2" href="/forgot-password">
                Forgot Password?
              </Link>
            </div>
          </div>
          <div className="flex flex-auto flex-col mx-8 items-center space-y-2">
            <BtnLoginGoogle
              userState={userState}
              setFormError={setFormError}
              alertErrorMsg={alertErrorMsg}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
