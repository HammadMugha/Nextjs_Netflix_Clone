"use client";
import Login from "@/app/login/page";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalProvider({ children }) {
  const { data: session } = useSession();
  const [loginAccount, setLoginAccount] = useState(null);
  const [allaccounts, setAllaccounts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setLoginAccount(JSON.parse(sessionStorage.getItem("loginAccount")));
  }, []);

  // if (session === undefined) return <Login />;

  return (
    <GlobalContext.Provider
      value={{ loginAccount, setLoginAccount, allaccounts, setAllaccounts,searchResults, setSearchResults }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
