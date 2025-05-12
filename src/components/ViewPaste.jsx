import React from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);

      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  const { id } = useParams();

  const paste = allPastes.find((p) => p._id === id);

  return (
    <div>
      <div className="flex my-[20px] gap-4 mx-auto">
        <input
          type="text justify-between"
          placeholder="Paste your Title here"
          className="w-full h-10 p-2 border border-gray-300 rounded-md "
          value={paste.title}
          disabled={true}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <textarea
          className="my-[20px] w-full  border border-gray-300 rounded-md p-2"
          value={paste.content}
          placeholder="Paste your code here"
          disabled={true}
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewPaste;
