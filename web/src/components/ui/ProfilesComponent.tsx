import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useAppSelector } from "../register/state";

interface ProfilesComponentProps {}

export const ProfilesComponent: React.FC<ProfilesComponentProps> = ({}) => {
  const userState = useAppSelector((state) => state.user);
  const router = useRouter();
  const sidebarItems = [
    {
      name: "Home",
      link: "/",
      icon: "pi-home",
    },
    {
      name: "Subscriptions",
      link: "/subscriptions",
      icon: "pi-heart",
    },
    {
      name: "My Profile",
      link: `/${userState.user?.idx}`,
      icon: "pi-user",
    },
    {
      name: "Logout",
      link: "/logout",
      icon: "pi-sign-out",
    },
  ];
  return (
    <>
      <div className="flex flex-col py-12 ml-6 space-y-4">
        <div className="flex items-center">
          <picture>
            <source srcSet={userState.user?.img_url} />
            <img
              className="w-16 h-16 rounded-full object-cover"
              src={userState.user?.img_url}
              alt="profileImage"
            />
          </picture>
          <div className="flex flex-col pl-4">
            <div className="text-open-dark font-semibold">
              {userState.user?.nickname}
            </div>
            <div className="text-open-dark font-semibold">
              {userState.user?.idx}
            </div>
          </div>
        </div>
        <div>
          <ul className="space-y-4">
            {sidebarItems.map((item) => (
              <li key={item.link} className="group">
                <Link href={item.link}>
                  <div
                    className={`flex space-x-6 py-3 mr-8 pl-4 hover:bg-open-blue group-hover:text-open-white transition rounded-full drop-shadow-sm ${
                      router.asPath == item.link
                        ? "bg-open-blue text-open-white"
                        : "bg-white"
                    }`}
                  >
                    <i
                      className={`pi text-xl font-medium group-hover:text-open-white ${
                        item.icon
                      } ${
                        router.asPath == item.link
                          ? "bg-open-blue text-open-white"
                          : "text-open-dark"
                      }`}
                    ></i>
                    <div
                      className={`text-xl font-medium group-hover:text-open-white ${
                        router.asPath == item.link
                          ? "bg-open-blue text-open-white"
                          : "text-open-dark"
                      }`}
                    >
                      {item.name}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
