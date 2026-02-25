import { useState } from "react";
import Card from "./Card";
import ProgressBar from "./ProgressBar";
import { motion, AnimatePresence } from "framer-motion";

export default function Questionnaire({ questions = [], onSubmit }) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [direction, setDirection] = useState(0);

  const q = questions[idx];
  const hasAnswered = answers[q?.id] !== undefined;

  const select = (opt) => {
    setAnswers(prev => ({ ...prev, [q.id]: opt }));
  };

  const next = () => {
    if (!hasAnswered) return;

    if (idx < questions.length - 1) {
      setDirection(1);
      setIdx(i => i + 1);
    } else {
      onSubmit(answers);
    }
  };

  const prev = () => {
    if (idx > 0) {
      setDirection(-1);
      setIdx(i => i - 1);
    }
  };

  if (!q) return null;

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 20 : -20,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center"
    >
      <Card>
        <ProgressBar current={idx + 1} total={questions.length} />

        <div className="mb-4 text-sm text-indigo-300">
          Question {idx + 1} of {questions.length}
        </div>

        <div className="min-h-[300px] flex flex-col">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={idx}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex-grow"
              >
                <div className="mb-2">
                  <span className="inline-flex items-center rounded-md bg-indigo-500/10 px-2 py-1 text-xs font-medium text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                    {q.section ? q.section.charAt(0).toUpperCase() + q.section.slice(1).toLowerCase() : "General"}
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">
                  {q.text}
                </h3>
                {q.explanation && (
                  <p className="mb-6 text-sm text-indigo-300 italic">
                    ({q.explanation})
                  </p>
                )}

                <div className="space-y-4">
                  {q.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => select(i)}
                      className={`w-full rounded-xl border p-3 text-left transition-colors
                        ${
                          answers[q.id] === i
                            ? "border-indigo-500 bg-indigo-500/20 text-white"
                            : "border-indigo-500/40 text-indigo-100 hover:bg-indigo-500/10"
                        }`}
                    >
                      {typeof opt === "string" ? opt : opt.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            disabled={idx === 0}
            onClick={prev}
            className="relative overflow-hidden group rounded-lg bg-gray-700 px-6 py-2 text-white disabled:opacity-40 transition-all"
          >
            <span className="absolute inset-0 bg-white transition-transform duration-[250ms] ease-out scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left"></span>
            <span className="relative z-10 group-hover:text-[#002D62] transition-colors duration-300">
               Previous
            </span>
          </button>

          <button
            disabled={!hasAnswered}
            onClick={next}
            className={`relative overflow-hidden rounded-lg px-6 py-2 font-bold transition-all shadow-md
              ${
                !hasAnswered
                  ? "bg-gray-400 text-gray-700 cursor-not-allowed opacity-60"
                  : idx === questions.length - 1
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg cursor-pointer group"
                    : "bg-gradient-to-r from-[#007ACC] to-[#47B5FF] text-white cursor-pointer hover:shadow-lg"
              }`}
          >
            {hasAnswered && idx === questions.length - 1 && (
                <span className="absolute inset-0 bg-white transition-transform duration-[250ms] ease-out scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left"></span>
            )}
            <span className={`relative z-10 flex items-center gap-2 transition-colors duration-300 ${hasAnswered && idx === questions.length - 1 ? "group-hover:text-green-800" : ""}`}>
               {idx === questions.length - 1 ? "Submit" : "Next →"}
            </span>
          </button>
        </div>
      </Card>
    </motion.div>
  );
}
