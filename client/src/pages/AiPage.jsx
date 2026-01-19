import React, { useState } from "react";
import AiNav from "../components/Ai/AiNav";
import AiForm from "../components/Ai/AiForm";
import AiDisplay from "../components/Ai/AiDisplay";

const AiPage = () => {
  const [error, setError] = useState(false);
  const [maximizeBtn, _] = useState(false);
  const [messages, setMessages] = useState([]);


  return (
    <div className="h-[calc(100vh-4.5rem)] w-full bg-gray-700">
      <div className="chat-section w-[55%] h-full bg-gray-300 mx-auto flex justify-between flex-col rounded">
        <AiNav error={error} maximizeBtn={maximizeBtn} setPanel={true} btns={false} />
        <AiDisplay messages={messages} />
        <div className="inputs h-fit w-full border-l-4 pr-4 border-gray-500 flex justify-between pl-2 rounded-lg">
            <AiForm setError={setError} setMessages={setMessages} />
        </div>
      </div>
    </div>
  );
};

export default AiPage;

