"use client";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useState } from "react";

const Page = () => {
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    setMessage("");
    await fetchEventSource("/api", {
      method: "POST",
      onmessage(ev) {
        setMessage((prev) => `${prev}${ev.data}\n`);
      },
    });
  };

  return (
    <div className="w-full max-w-md min-w-[200px]">
      <button
        onClick={handleClick}
        className="bg-blue-500 px-4 py-2 rounded-md text-white"
      >
        Start Stream
      </button>

      <div className="bg-white p-4 rounded-md mt-4 w-full whitespace-pre-line">
        {message
          ? message
          : "Click on start stream button to see message generating here !"}
      </div>
    </div>
  );
};

export default Page;
