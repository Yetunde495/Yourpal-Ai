import { useState } from "react";
import BtnIcon from "../../assets/btnIcon.png";
import { Icons } from "../../components/icons";

const InterviewQuestions = () => {
  const questionsData = [
    {
      id: 1,
      text: "Can you describe a project where you had to balance user needs with business goals? How did you ensure both were met?",
    },
    {
      id: 2,
      text: "Lorem ipsum dolor sit amet consectetur. In sed sit consequat dolor orci. Id ligula vel nisi at ut pretium facilisi in. Ut nullam faucibus.",
    },
    {
      id: 3,
      text: "Lorem ipsum dolor sit amet consectetur. In sed sit consequat dolor orci. Id ligula vel nisi at ut pretium facilisi in. Ut nullam faucibus.",
    },
    // Add more questions as needed
  ];
  const [selectedQuestion, setSelectedQuestion] = useState(questionsData[0]);
  const [answer, setAnswer] = useState(selectedQuestion.text);

  const handleQuestionClick = (question: any) => {
    setSelectedQuestion(question);
    setAnswer(question.text);
  };
  return (
    <div className="py-3 px-10 bg-white mt-10">
      <div className="flex justify-between items-center mb-[3em]">
        <h2 className="text-lg font-semibold mb-4">Interview Questions</h2>
        <button className="group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-[#60BEE2] via-[#5E4D84] to-[#8FC2DA] group-hover:from-[#60BEE2] group-hover:via-[#5E4D84] group-hover:to-[#8FC2DA] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
          <span className="relative px-5 py-1 transition-all ease-in duration-200 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0 flex gap-2">
            <img src={BtnIcon} /> Generate
          </span>
        </button>
      </div>

      <div>
        {questionsData.map((question, index) => (
          <div key={question.id} className="relative mb-4 flex gap-3">
            <div className="font-bold mb-1">{index + 1}.</div>

            <div
              className={`border w-full ${
                selectedQuestion.id === question.id
                  ? "border-dashed"
                  : "border-transparent"
              } rounded`}
              onClick={() => handleQuestionClick(question)}
            >
              {/* Show tools only for the selected question */}
              {selectedQuestion.id === question.id && (
                <div className="absolute top-2 right-2 flex space-x-2 -mt-5">
                  {" "}
                  <button className="group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-[#60BEE2] via-[#5E4D84] to-[#8FC2DA] group-hover:from-[#60BEE2] group-hover:via-[#5E4D84] group-hover:to-[#8FC2DA] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                    <span className="relative px-5 py-1 transition-all ease-in duration-200 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0 flex gap-2">
                      <img src={BtnIcon} /> Writing Assistant
                    </span>
                  </button>
                  <button className="bg-[#8343CC] text-white rounded-full h-[24px] w-[24px] flex items-center justify-center">
                    <Icons.add />
                  </button>
                  <button className="bg-[#8343CC] text-white rounded-full  h-[24px] w-[24px] flex items-center justify-center">
                    <Icons.minus />
                  </button>
                  <button className="bg-[#8343CC] text-white rounded-full  h-[24px] w-[24px] flex items-center justify-center">
                    <Icons.singleSort />
                  </button>
                </div>
              )}

              <textarea
                className={`w-full p-2 ${
                  selectedQuestion.id === question.id
                    ? "bg-white"
                    : "bg-transparent"
                }`}
                value={answer}
                placeholder="Write your answer here..."
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterviewQuestions;
