import React from "react";
import Button from "../Button/Button";

export default function AccountForm({setFormData,formData,handleAdd}) {
  return (
    <div className="px-8 py-4 bg-black rounded fixed flex flex-col gap-2 top-[40px] right-[20px]">
      <input type="text"
      className="px-4 py-3 bg-white rounded-lg text-black"
      name="name"
      value={formData["name"]}
      onChange={(e)=> setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })}
      />
      <input type="password"
      className="px-4 py-3 bg-white rounded-lg text-black"
      name="pin"
      value={formData["pin"]}
      onChange={(e)=> setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })}
      />
      <Button onClick={handleAdd} text={"Save"} style={"w-full bg-[#CC9607] rounded-lg text-black"}/>
    </div>
  );
}
