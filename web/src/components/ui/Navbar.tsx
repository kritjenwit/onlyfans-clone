import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppSelector } from "../../app/hooks";

interface NavbarProps {}

const onlyFansLogo =
  "https://i0.wp.com/overhorizonmedia.com/wp-content/uploads/2022/05/1024px-OnlyFans_logo.svg.png?w=1024&ssl=1";

const midIcon = [
  {
    icon: "pi-home",
    link: `/`,
  },
  {
    icon: "pi-heart",
    link: "/subscriptions",
  },
];

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const router = useRouter();
  const userState = useAppSelector((state) => state.user);
  return (
    <>
      <nav className="bg-open-blue border-gray-200 px-2 sm:px-4 h-14 dark:bg-open-blue">
        <div className="container flex justify-between items-center mx-auto h-full">
          <Link href="/" className="flex items-center">
            <picture>
              <source srcSet={onlyFansLogo} />
              <img
                src={onlyFansLogo}
                className="mr-3 w-12 h-12"
                alt="openfans-logo"
              />
            </picture>
            <span className="text-xl font-semibold dark:text-white">
              Openfans
            </span>
          </Link>
          <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
            <ul className="flex -my-2 space-x-2">
              {midIcon.map((icon) => (
                <li
                  key={icon.link}
                  className={`h-full cursor-pointer group ${
                    router.asPath === icon.link
                      ? "border-b-2 hover:border-none"
                      : ""
                  }`}
                >
                  <Link href={icon.link} passHref>
                    <i
                      className={`py-1 px-8 hover:bg-open-white hover:rounded-lg rounded-lg transition text-open-white group-hover:text-open-blue text-3xl pi ${icon.icon}`}
                    ></i>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:block md:w-auto" id="mobile-menu">
            <ul className="flex items-center space-x-2">
              <li className="h-full cursor-pointer group">
                <picture>
                  <source srcSet={userState.user?.img_url} />
                  <img
                    src={userState.user?.img_url}
                    className="w-12 h-12 rounded-full object-cover"
                    alt="profile Logo"
                  />
                </picture>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
