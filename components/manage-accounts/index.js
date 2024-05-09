"use client";
import { GlobalContext } from "@/context/GlobalContext";
import axios, { all } from "axios";
import { useContext, useEffect, useState } from "react";
import AccountForm from "./AccountForm";
import { useSession } from "next-auth/react";
import { FaTrash } from "react-icons/fa";
import PinPage from "./PinPage";
import { usePathname, useRouter } from "next/navigation";

export default function ManageAccounts() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [formData, setFormData] = useState({ name: "", pin: "", uid: "" });
  const [showIcon, setShowIcon] = useState(false);
  const [showAccountForm, setShowAccountForm] = useState(false);
  const [pin, setPin] = useState("");
  const [showPinContainer, setShowPinContainer] = useState({show:false,account: null});
  const [pinError, setPinError] = useState(false);
  const { allaccounts, setAllaccounts,loginAccount,setLoginAccount } = useContext(GlobalContext);

  //get all accounts api
  async function getAllAccounts() {
    const res = await axios.get(
      `/api/account/all-account?id=${session?.user?.uid}`
    );
    const data = await res.data.data;
    setAllaccounts(data);
  }

  useEffect(() => {
    getAllAccounts();
  }, [pathname]);

  //add accounts api
  async function handleAddAccount() {
    const res = await axios.post("/api/account/create-account", {
      ...formData,
      uid: session?.user?.uid,
    });
    const data = await res.data;
    if (data.success) {
      getAllAccounts();
      setShowAccountForm(false);
    } else {
      getAllAccounts();
    }
  }

  //remove account api
  async function handleRemoveAccount(item){
    const res = await axios.delete(`/api/account/delete-account?id=${item._id}`)
    const data = await res.data
    if(data.success){
      getAllAccounts();
      setShowIcon(false)
    }
  }

  //login account api
  async function handleLoginPin(value, index){
    const res = await axios.post("/api/account/login-account",{
      uid: session?.user?.uid,
      accountId: showPinContainer.account,
      pin: value
    })
    const data = await res.data
    if(data.success){
      setLoginAccount(data.data)
      sessionStorage.setItem("loginAccount",JSON.stringify(showPinContainer.account))
      router.push(pathname)
    }else{
      setPinError(true);
    }
  }  

  return (
    <div className="min-h-screen flex items-center justify-center flex-col relative">
      <div className="flex items-center justify-center flex-col">
        <h2 className="text-white font-bold text-[54px] my-[36px]">
          Who's Watching?
        </h2>
        <ul className="flex gap-8 my-[30px]">
          {allaccounts && allaccounts.length
            ? allaccounts.map((item, i) => (
                <li
                  key={i}
                  className="flex flex-col gap-3 max-w-[200px] w-[155px] cursor-pointer"
                  onClick={()=> showIcon ? null : (
                    setShowPinContainer({show:true,account: item._id})
                  )}
                >
                  <div className="relative">
                    <img
                      src="https://occ-0-2611-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABfNXUMVXGhnCZwPI1SghnGpmUgqS_J-owMff-jig42xPF7vozQS1ge5xTgPTzH7ttfNYQXnsYs4vrMBaadh4E6RTJMVepojWqOXx.png?r=1d4"
                      alt="Account"
                      className="max-w-[200px] rounded min-w-[84px] max-h-[200px] min-h-[84px] object-cover w-[155px] h-[155px]"
                    />
                    {showIcon ? (
                      <div className="absolute z-99 bg-black/60 w-full h-full flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <FaTrash className="cursor-pointer" onClick={()=> handleRemoveAccount(item)}/>
                    </div>
                    ) : null}
                  </div>
                  <span className="text-center">{item.name}</span>
                </li>
              ))
            : null}
          {allaccounts && allaccounts.length < 4 ? (
            <li
              onClick={() => setShowAccountForm(!showAccountForm)}
              className="text-black font-semibold bg-[#e5b109] max-h-[200px] min-h-[84px] w-[155px] h-[155px] flex items-center justify-center cursor-pointer"
            >
              Add Account
            </li>
          ) : null}
        </ul>
        <div className="text-center">
          <span onClick={()=> setShowIcon(!showIcon)} className="border border-gray-200 px-[1.5rem] cursor-pointer py-[0.5rem] tracking-wide inline-flex text-sm">
            Manage Profiles
          </span>
        </div>
      </div>
      {/* //show Pin Page when user click one item */}
      <PinPage 
      pin={pin}
      setPin={setPin}
      setShowPinContainer={setShowPinContainer}
      showPinContainer={showPinContainer.show}
      pinError={pinError}
      setPinError={setPinError}
      handleLoginPin={handleLoginPin}
      />
      {/* //show account form */}
      {showAccountForm && (
        <AccountForm
          formData={formData}
          setFormData={setFormData}
          handleAdd={handleAddAccount}
        />
      )}
    </div>
  );
}
