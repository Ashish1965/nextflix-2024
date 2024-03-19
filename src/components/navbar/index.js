"use client";

import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import Search from "./search";
import { AiOutlineSearch } from "react-icons/ai";
import { GlobalContext } from "@/context";
import AccountPopup from "./account-popup";
import CircleLoader from "../circle-loader";
import DetailsPopup from "../details-popup";
import { FaChevronDown } from "react-icons/fa6";

export default function Navbar() {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAccountPopup, setShowAccountPopup] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const {
    setPageLoader,
    loggedInAccount,
    setAccounts,
    accounts,
    setLoggedInAccount,
    pageLoader,
    showDetailsPopup,
    setShowDetailsPopup,
    showDrop,
    setShowDrop,
  } = useContext(GlobalContext);

  const menuItems = [
    {
      id: "home",
      title: "Home",
      path: "/browse",
    },
    {
      id: "tv",
      title: "TV",
      path: "/tv",
    },
    {
      id: "movies",
      title: "Movies",
      path: "/movies",
    },
    {
      id: "my-list",
      title: "My List",
      path: `/my-list/${session?.user?.uid}/${loggedInAccount?._id}`,
    },
  ];

  function handleDropDown() {
    setDropDown(!dropDown);
    // console.log(dropDown);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) setIsScrolled(true);
      else setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  async function getAllAccounts() {
    const res = await fetch(
      `/api/account/get-all-accounts?id=${session?.user?.uid}`,
      {
        method: "GET",
      }
    );
    const res2 = await res.json();

    // console.log(data);
    // return data;
    if (res2 && res2.data && res2.data.length) {
      setAccounts(res2.data);
      setPageLoader(false);
    } else {
      setPageLoader(false);
    }
  }

  useEffect(() => {
    getAllAccounts();
  }, []);

  if (pageLoader) {
    return <CircleLoader />;
  }

  return (
    <div className="relative min-w-fit">
      <header
        className={`header ${isScrolled && "bg-[#141414]"} hover:bg-[#141414]`}
      >
        <div className="flex items-center space-x-2 md:space-x-10">
          {!showDrop && (
            <div className="md:hidden flex flex-row justify-center items-center gap-3">
              <img
                src="https://rb.gy/ulxxee"
                width={120}
                height={120}
                alt="NETFLIX"
                className="cursor-pointer object-contain"
                onClick={() => router.push("/browse")}
              />
              <div className="md:hidden" onClick={handleDropDown}>
                <FaChevronDown />
              </div>
            </div>
          )}
          <div className="hidden md:block">
            <img
              src="https://rb.gy/ulxxee"
              width={120}
              height={120}
              alt="NETFLIX"
              className="cursor-pointer object-contain"
              onClick={() => router.push("/browse")}
            />
          </div>

          <ul className="hidden md:space-x-4 md:flex cursor-pointer">
            {menuItems.map((item) => (
              <li
                onClick={() => {
                  setPageLoader(true);
                  router.push(item.path);
                  setSearchQuery("");
                  setShowSearchBar(false);
                }}
                className="cursor-pointer text-[16px] font-light text-[#e5e5e5] transition duration-[.4s] hover:text-[#b3b3b3]"
                key={item.id}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="font-light flex items-center space-x-4 text-sm">
          {showSearchBar ? (
            <Search
              pathName={pathName}
              router={router}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setPageLoader={setPageLoader}
              setShowSearchBar={setShowSearchBar}
            />
          ) : (
            <AiOutlineSearch
              onClick={() => {
                setShowSearchBar(true);
                setShowDrop(!showDrop);
                // handleDropDown();
              }}
              className="sm:inline sm:w-6 sm:h-6 cursor-pointer"
            />
          )}
          <div
            onClick={() => setShowAccountPopup(!showAccountPopup)}
            className="flex gap-2 items-center cursor-pointer sm:pr-5 md:mr-3"
          >
            <img
              src="https://occ-0-2611-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4"
              alt="Current Profile"
              className="max-w-[30px] rounded min-w-[20px] max-h-[30px] min-h-[20px] object-cover w-[30px] h-[30px]"
            />
            <p>{loggedInAccount && loggedInAccount.name}</p>
          </div>
        </div>
      </header>
      <DetailsPopup show={showDetailsPopup} setShow={setShowDetailsPopup} />
      {showAccountPopup && (
        <AccountPopup
          accounts={accounts}
          setPageLoader={setPageLoader}
          signOut={signOut}
          loggedInAccount={loggedInAccount}
          setLoggedInAccount={setLoggedInAccount}
        />
      )}

      {dropDown && (
        <div className="px-8 py-8 fixed top-[50px] gap-3 flex flex-col items-start ml-16 bg-black opacity-[.9] z-[999]">
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {menuItems.map((item) => (
              <li
                onClick={() => {
                  setPageLoader(true);
                  router.push(item.path);
                  setSearchQuery("");
                  setShowSearchBar(false);
                  setDropDown(false);
                }}
                key={item.id}
              >
                <div
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {item.title}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
