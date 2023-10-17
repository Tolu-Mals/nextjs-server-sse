import { fetchEventSource } from "@fortaine/fetch-event-source";

const Page = async () => {
  await fetchEventSource("http://localhost:3000/api", {
    method: "POST",
    async onmessage(ev) {
      console.log("Message: ", ev.data);
    },
  });

  return (
    <div className="w-full p-4 max-w-md min-w-[200px]">
      <button className="bg-blue-500 px-4 py-2 rounded-md text-white">
        Start Stream
      </button>

      <div className="bg-white p-4 rounded-md mt-4 w-full whitespace-pre-line">
        {"Click on start stream button to see message generating here !"}
      </div>
    </div>
  );
};

export default Page;
