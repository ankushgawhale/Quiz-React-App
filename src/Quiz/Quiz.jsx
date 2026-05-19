import React, { useState, useRef } from "react";
import data from "../assets/data";

function Quiz() {
  const [index, setIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const question = data[index];

  const op1 = useRef(null);
  const op2 = useRef(null);
  const op3 = useRef(null);
  const op4 = useRef(null);

  const opArray = [op1, op2, op3, op4];

  const checkAns = (e, ans) => {
    if (lock) return;

    if (question.answer === ans) {
      // Correct Answer
      e.target.classList.add(
        "bg-green-200",
        "text-green-800",
        "border-green-400"
      );

      setScore((prev) => prev + 1);
    } else {
      // Wrong Answer
      e.target.classList.add(
        "bg-red-200",
        "text-red-800",
        "border-red-400"
      );

      // Highlight Correct Answer
      opArray.forEach((op) => {
        if (op.current.textContent === question.answer) {
          op.current.classList.add(
            "bg-green-200",
            "text-green-800",
            "border-green-400"
          );
        }
      });
    }

    setLock(true);
  };

  const nextBtn = () => {
    if (!lock) return;

    // Quiz End
    if (index === data.length - 1) {
      setResult(true);
      return;
    }

    // Next Question
    setIndex((prev) => prev + 1);
    setLock(false);

    // Remove Previous Styles
    opArray.forEach((op) => {
      op.current.classList.remove(
        "bg-green-200",
        "bg-red-200",
        "text-green-800",
        "text-red-800",
        "border-green-400",
        "border-red-400"
      );
    });
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);

    opArray.forEach((op) => {
      op.current?.classList.remove(
        "bg-green-200",
        "bg-red-200",
        "text-green-800",
        "text-red-800",
        "border-green-400",
        "border-red-400"
      );
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center text-blue-600">
          Quiz App
        </h1>

        <hr className="my-6" />

        {result ? (
          // Result Section
          <div className="text-center py-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Quiz Completed 🎉
            </h2>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm">
              <p className="text-xl font-semibold text-gray-700">
                Your Score
              </p>

              <p className="text-5xl font-bold text-blue-600 mt-2">
                {score}/{data.length}
              </p>

              <p className="text-lg text-gray-600 mt-3">
                Percentage:{" "}
                <span className="font-bold text-green-600">
                  {((score / data.length) * 100).toFixed(0)}%
                </span>
              </p>
            </div>

            <button
              onClick={reset}
              className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition"
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          <>
            {/* Question */}
            <h2 className="text-xl font-semibold text-gray-700 mb-6">
              {index + 1}. {question.question}
            </h2>

            {/* Options */}
            <ul className="space-y-3">
              {
                data[index].options.map((op, i)=>{
                  return <li
                  key={i}
                ref={opArray[i]}
                onClick={(e) => checkAns(e, op)}
                className="p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:bg-blue-50 transition-all duration-300"
              >
                {op}
              </li>
                })
              }
            </ul>

            {/* Next Button */}
            <button
              onClick={nextBtn}
              className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition"
            >
              Next
            </button>

            {/* Footer */}
            <div className="mt-5 text-center text-gray-500 font-medium">
              {index + 1} of {data.length}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Quiz;