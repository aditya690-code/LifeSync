import React, { useState } from "react";
import AiNav from "../components/Ai/AiNav";
import AiForm from "../components/Ai/AiForm";

const AiPage = () => {
  const [error, setError] = useState(false);
  const [maximizeBtn, setMaximizeBtn] = useState(false);
  const [panal, setPanel] = useState(true);


  return (
    <div className="h-[calc(100vh-4.5rem)] w-full bg-gray-700">
      <div className="chat-section w-[55%] h-full bg-gray-300 mx-auto flex justify-between flex-col rounded">
        <AiNav error={error} maximizeBtn={maximizeBtn} setPanel={setPanel} btns={false} />
        <div className="display flex flex-col px-4 py-2 gap-1 justify-start w-full flex-1 overflow-y-auto no-scrollbar bg-white">
          <p className="chat-bot">Hello, how i can help you </p>
          <p className="chat-user">Hello, i am Aditya</p>
        </div>
        <div className="inputs w-full border-l-4 pr-4 border-gray-500 flex justify-between pl-2 rounded-lg">
            <AiForm setError={setError} />
        </div>
      </div>
    </div>
  );
};

export default AiPage;
