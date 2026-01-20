import React, { useState } from "react";
import AiNav from "../components/Ai/AiNav";
import AiForm from "../components/Ai/AiForm";
import AiDisplay from "../components/Ai/AiDisplay";
import { useSelector } from "react-redux";

const AiPage = () => {
  const { error, isLoading, setIsLoading, setError } = useSelector(
    (state) => state.chatbot,
  );
  const [maximizeBtn, _] = useState(false);

  return (
    <div className="h-[calc(100vh-4.5rem)] w-full ">
      <div className="chat-section lg:w-[65%] w-full h-full border border-gray-300 rounded-lg overflow-hidden mx-auto flex justify-between flex-col">
        {/* chatbot nav section [ison & btns] */}
        <AiNav
          error={error}
          maximizeBtn={maximizeBtn}
          setPanel={true}
          btns={false}
        />
        {/* chatbot chat display */}
        <AiDisplay loading={isLoading} />
        <div className="inputs h-fit w-full border-l-4 pr-4 border-gray-500 flex justify-between rounded-lg ml-1 mb-1">
          {/* chatbot form   */}
          <AiForm
            setError={setError}
            loading={isLoading}
            setLoading={setIsLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default AiPage;
