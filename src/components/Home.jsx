import React from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { useEffect } from "react";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);

      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);



  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

   

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }
    setTitle("");
    setValue("");
    setSearchParams({});
  }
  return (
    <div>
      <div className="flex my-[20px] gap-4 mx-auto">
        <input
          type="text justify-between"
          placeholder="Paste your Title here"
          className="w-full h-10 p-2 border border-gray-300 rounded-md "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createPaste}
          className="w-[15%] text-xs xl:text-sm px-2 h-10 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 ease-in-out">
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>
      <div>
        <textarea
          className="my-[20px] w-full  border border-gray-300 rounded-md p-2"
          value={value}
          placeholder="Paste your code here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;
