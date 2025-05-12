import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateToPastes, removeFromPastes } from "../redux/pasteSlice";
import { NavLink, useSearchParams } from "react-router-dom";
import { resetAllPastes } from "../redux/pasteSlice";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams(); 

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClick = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
  };

  const handleCopy = (pasteId) => {
    const paste = pastes.find((paste) => paste._id === pasteId);
    if (paste) {
      navigator.clipboard.writeText(paste.content).then(() => {
        alert("Copied to clipboard!");
      });
    }
    
  };


  const handleShare = (pasteId) => {
    const shareableLink = `http://localhost:5174/pastes/${pasteId}`;
    navigator.clipboard.writeText(shareableLink).then(() => {
      alert("Shareable link copied to clipboard!");
    });

  };

   const handleReset =()=>{
     dispatch(resetAllPastes())
   }

  return (
    <div>
      <div className="flex  gap-4 mx-auto">
        <input
          type="text"
          placeholder="Search pastes..."
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          className="w-full h-10 p-2 border border-gray-300 rounded-md my-4"
        />
        <button 
        onClick={handleReset}
        className="w-[30%] sm:w-[5%] p-2 h-10 my-[15px] bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 ease-in-out">
          Reset
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              id={paste._id}
              className="my-4 p-4 border border-gray-300 rounded-md">
              <div>
                <h2 className="text-lg font-bold">Title : {paste.title}</h2>
              </div>
              <div>
                <p>Content: {paste.content}</p>
              </div>
              <div className="place-self-end">
                <p className="text-sm text-gray-500 ">
                  {new Date(paste.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-4 mt-4">
                <NavLink to={`/?pasteId=${paste._id}`}>
                  <button
                    onClick={() => handleEdit(paste._id)}
                    className="bg-blue-500 text-white text-xs lg:text-2xl px-[2px] lg:px-4 py-[1px] lg:py-2 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out">
                    Edit
                  </button>
                </NavLink>
                <button
                  onClick={() => handleClick(paste._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200 ease-in-out text-xs lg:text-2xl px-[2px] lg:px-4 py-[1px] lg:py-2">
                  Delete
                </button>
                <NavLink to={`/pastes/${paste._id}`}>
                  <button
                    onClick={() => handleView(paste._id)}
                    className="bg-green-500 text-white text-xs lg:text-2xl px-[2px] lg:px-4 py-[1px] lg:py-2 rounded-md hover:bg-green-600 transition duration-200 ease-in-out">
                    View
                  </button>
                </NavLink>
                <button
                  onClick={() => handleShare(paste._id)}
                  className="bg-purple-500 text-white text-xs lg:text-2xl px-[2px] lg:px-4 py-[1px] lg:py-2 rounded-md hover:bg-purple-600 transition duration-200 ease-in-out">
                  Share
                </button>
                <button
                  onClick={() => handleCopy(paste._id)}
                  className="bg-gray-500 text-white text-xs lg:text-2xl px-[2px] lg:px-4 py-[1px] lg:py-2 rounded-md hover:bg-gray-600 transition duration-200 ease-in-out">
                  Copy
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No pastes found</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
