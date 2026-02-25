import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo6.png";
import Header from "../components/Header";
import AnimatedPageWrapper from "../components/AnimatedPageWrapper";
import ProfileForm from "../components/ProfileForm";
import Questionnaire from "../components/Questionnaire";
import Loader from "../components/Loader";
import AlertBox from "../components/AlertBox";
import { fetchQuestionnaire, runAssessment } from "../api/assessment.api";
import { buildPayload } from "../utils/payloadBuilder";

export default function AssessmentPage() {
  const [step, setStep] = useState("start");
  const [profileData, setProfileData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [alert, setAlert] = useState("");

  const navigate = useNavigate();

  /* 🌙 Dark mode */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  /* STEP 1 */
  const handleProfileSubmit = async (profile) => {
    setLoading(true);
    setProfileData(profile);

    try {
      const res = await fetchQuestionnaire(profile.currentClass);
      setQuestions(res.data.questions);
      setStep("questions");
    } catch {
      setAlert("Failed to load questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* STEP 2 */
  const handleAssessmentSubmit = async (answers) => {
    setLoading(true);

    try {
      const payload = buildPayload({ profileData, answers });
      const res = await runAssessment(payload);

      navigate("/report", {
        state: { reportUrl: res.data.reportUrl },
      });
    } catch {
      setAlert("Assessment failed. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-700 bg-[#0B1120] flex flex-col justify-between">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} isLanding={true} />

      <AlertBox message={alert} onClose={() => setAlert("")} />

      {loading && <Loader />}

      <div className="flex-grow w-full flex flex-col items-center justify-center relative lg:justify-start lg:pt-4">
          {/* Global Background Effects - Moved here so they are behind all content */}
          <div className="absolute inset-0 -z-10 h-full w-full bg-[#0B1120] overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0B1120] via-[#1a2c55] to-[#0B1120] opacity-80"></div>
              <div className="absolute bottom-0 right-0 h-[500px] w-[500px] bg-indigo-600/20 blur-[100px] rounded-full mix-blend-screen"></div>
          </div>

          {step === "start" && (
            <div className="relative w-full flex-grow pt-4 sm:pt-8 pb-8 flex flex-col justify-center">
                 <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
                  <div className="max-w-4xl text-left">
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: [0.3, 1, 0.3] }}
                      transition={{ 
                        type: "spring", stiffness: 100, damping: 15, delay: 0.1,
                        opacity: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                      }}
                      className="flex items-center gap-3 mb-4"
                    >
                        <img src={logo} className="w-6 h-6 object-contain" alt="" />
                        <span className="text-indigo-400 font-bold tracking-widest text-xs uppercase">
                          Welcome to College Reviewz
                        </span>
                    </motion.div>

                    <motion.h1
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
                      className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-sky-200 to-sky-400 bg-clip-text text-transparent sm:text-4xl lg:text-5xl mb-4 pb-2"
                    >
                      India’s Most Trusted College Reviews <br />& Counselling Platform
                    </motion.h1>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="mt-4 text-base leading-7 text-slate-300 max-w-2xl"
                    >
                      Discover top colleges, real student reviews, placements, fees, rankings, and
                      everything you need to make the right decision for your future — all in one
                      platform.
                    </motion.p>

                    {/* Features */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-white max-w-4xl">
                        <div className="flex items-start gap-3">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white shrink-0">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <div>
                                  <h3 className="font-semibold text-sm sm:text-base">10,000+ Verified Student Reviews</h3>
                            </div>
                        </div>
                          <div className="flex items-start gap-3">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white shrink-0">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <div>
                                  <h3 className="font-semibold text-sm sm:text-base">AI-powered College Matching</h3>
                            </div>
                        </div>
                          <div className="flex items-start gap-3">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white shrink-0">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <div>
                                  <h3 className="font-semibold text-sm sm:text-base">Neutral, Unbiased Expert Guidance</h3>
                            </div>
                        </div>
                    </div>

                    <p className="mt-8 text-lg font-medium text-indigo-400">
                      You can see your career counselling tool here:
                    </p>


                    {/* Buttons Action Area */}
                    <div className="mt-6 flex flex-wrap gap-4">
                    <motion.div
                       initial={{ y: 20, opacity: 0 }}
                       animate={{ y: 0, opacity: 1 }}
                       transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.5 }}
                    >
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setStep("profile")}
                            className="relative overflow-hidden rounded-full bg-gradient-to-r from-[#007ACC] to-[#47B5FF] px-8 py-3 text-base font-bold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition group"
                          >
                            <span className="absolute inset-0 bg-white transition-transform duration-[250ms] ease-out scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left"></span>
                            <span className="relative z-10 flex items-center gap-2 group-hover:text-[#002D62] transition-colors duration-300">
                              Start Assessment & Earn Rewards
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
                              </svg>
                            </span>
                          </motion.button>
                    </motion.div>

                    </div>


                    {/* Bottom Trust Indicators */}


                  </div>
                </div>
            </div>
          )}

          {(step === "profile" || step === "questions") && (
            <AnimatedPageWrapper direction="right">
              {step === "profile" && (
                  <motion.div 
                    initial={{ x: 50, opacity: 0 }} 
                    animate={{ x: 0, opacity: 1 }} 
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="max-w-4xl mx-auto px-4 w-full p-4 lg:p-8 lg:scale-75 lg:origin-top lg:-mt-10"
                  >
                      <ProfileForm onSubmit={handleProfileSubmit} setAlert={setAlert} />
                  </motion.div>
              )}

              {step === "questions" && (
                  <motion.div 
                    initial={{ x: 50, opacity: 0 }} 
                    animate={{ x: 0, opacity: 1 }} 
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="max-w-4xl mx-auto px-4 w-full p-4 lg:p-8 lg:scale-75 lg:origin-top lg:-mt-10"
                  >
                        <Questionnaire
                          questions={questions}
                          onSubmit={handleAssessmentSubmit}
                        />
                  </motion.div>
              )}
            </AnimatedPageWrapper>
          )}
      </div>

       {/* Footer */}
       <footer className="w-full py-4 text-center text-gray-500 text-xs bg-[#0B1120] border-t border-white/5 mt-auto">
          Copyright © 2026 All Rights Reserved. | Designed by CRZ Academic Review Pvt Ltd.
       </footer>
    </div>
  );
}
