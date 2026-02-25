import { useState } from "react";
import Card from "./Card";
import { motion } from "framer-motion";

const COUNTRY_CODES = [
  { code: "+91", label: "India", maxLength: 10, flag: "🇮🇳" },
  { code: "+1", label: "USA / Canada", maxLength: 15, flag: "🇺🇸" },
  { code: "+44", label: "UK", maxLength: 15, flag: "🇬🇧" },
  { code: "+61", label: "Australia", maxLength: 15, flag: "🇦🇺" },
  { code: "+971", label: "UAE", maxLength: 15, flag: "🇦🇪" },
];

export default function ProfileForm({ onSubmit, setAlert }) {
  const [profileData, setProfileData] = useState({
    name: "",
    email:"",
    countryCode: "+91",
    phoneNumber: "",
    openToAbroad: "",
    age: "",
    currentClass: "",
    stream: "",
    familyAnnualBudget: "",
    educationLoanComfort: "",
    coachingAffordability: false,
  });

  const selectedCountry = COUNTRY_CODES.find(
    (c) => c.code === profileData.countryCode
  );

  const handleChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhoneChange = (value) => {
    if (!/^\d*$/.test(value)) return;
    if (selectedCountry && value.length > selectedCountry.maxLength) return;
    handleChange("phoneNumber", value);
  };

  const handleSubmit = () => {
    if (
      !profileData.name ||
      !profileData.email ||
      !profileData.phoneNumber ||
      profileData.openToAbroad === "" ||
      !profileData.age ||
      !profileData.currentClass ||
      !profileData.stream
    ) {
      setAlert("Please fill all required fields");
      return;
    }

    if (
      profileData.countryCode === "+91" &&
      profileData.phoneNumber.length !== 10
    ) {
      setAlert("Indian phone number must be exactly 10 digits");
      return;
    }

    onSubmit({
      ...profileData,
      phoneNumber: `${profileData.countryCode}${profileData.phoneNumber}`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex justify-center"
    >
      <Card>
        <h2 className="mb-4 text-center text-2xl font-semibold text-white dark:text-white text-slate-900">
          🎓 Student Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="input"
            value={profileData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <input
            type="text"
            placeholder="xyz@gmail.com"
            className="input"
            value={profileData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <div className="flex flex-row gap-2">
            <select
              className="input w-[5.5rem] sm:w-28 shrink-0 px-2 text-gray-400"
              value={profileData.countryCode}
              onChange={(e) => {
                handleChange("countryCode", e.target.value);
                handleChange("phoneNumber", "");
              }}
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code}
                </option>
              ))}
            </select>

            <input
              type="tel"
              placeholder="Phone Number"
              className="input flex-1 min-w-0"
              value={profileData.phoneNumber}
              onChange={(e) => handlePhoneChange(e.target.value)}
            />
          </div>

          <select
            className={`input ${profileData.openToAbroad === "" ? "text-gray-400" : "text-gray-900 dark:text-white"}`}
            value={profileData.openToAbroad}
            onChange={(e) =>
              handleChange("openToAbroad", e.target.value === "true")
            }
          >
            <option value="">Open to Study Abroad?</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          <input
            type="number"
            placeholder="Age"
            className="input"
            value={profileData.age}
            onChange={(e) => handleChange("age", e.target.value)}
          />

          <select
            className={`input ${!profileData.currentClass ? "text-gray-400" : "text-gray-900 dark:text-white"}`}
            value={profileData.currentClass}
            onChange={(e) => handleChange("currentClass", e.target.value)}
          >
            <option value="">Current Class</option>
            <option>Class 9</option>
            <option>Class 10</option>
            <option>Class 11</option>
            <option>Class 12</option>
            <option>Dropper</option>
            <option>Undergraduate</option>
          </select>

          <select
            className={`input ${!profileData.stream ? "text-gray-400" : "text-gray-900 dark:text-white"}`}
            value={profileData.stream}
            onChange={(e) => handleChange("stream", e.target.value)}
          >
            <option value="">Stream</option>
            <option>Science</option>
            <option>Commerce</option>
            <option>Arts</option>
            <option>Undecided</option>
          </select>

          <select
            className={`input ${!profileData.familyAnnualBudget ? "text-gray-400" : "text-gray-900 dark:text-white"}`}
            value={profileData.familyAnnualBudget}
            onChange={(e) => handleChange("familyAnnualBudget", e.target.value)}
          >
            <option value="">Family Annual Budget</option>
            <option>1–3 Lakh</option>
            <option>3–6 Lakh</option>
            <option>6–10 Lakh</option>
            <option>&gt; 10 Lakh</option>
          </select>

          <select
            className={`input ${!profileData.educationLoanComfort ? "text-gray-400" : "text-gray-900 dark:text-white"}`}
            value={profileData.educationLoanComfort}
            onChange={(e) =>
              handleChange("educationLoanComfort", e.target.value)
            }
          >
            <option value="">Education Loan Comfort</option>
            <option>Yes</option>
            <option>Maybe</option>
            <option>No</option>
          </select>

          <div 
            onClick={() => handleChange("coachingAffordability", !profileData.coachingAffordability)}
            className={`col-span-1 md:col-span-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-4 flex items-center justify-between cursor-pointer group hover:border-indigo-500 transition-all ${profileData.coachingAffordability ? "ring-2 ring-indigo-500/20 border-indigo-500" : ""}`}
            role="switch"
            aria-checked={profileData.coachingAffordability}
          >
            <span className="font-medium text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              Can afford coaching?
            </span>
            
            <div className={`relative w-12 h-7 rounded-full p-1 transition-colors duration-300 ${profileData.coachingAffordability ? "bg-gradient-to-r from-[#007ACC] to-[#47B5FF]" : "bg-slate-300 dark:bg-slate-600"}`}>
               <motion.div
                  layout
                  className="w-5 h-5 bg-white rounded-full shadow-md"
                  initial={false}
                  animate={{ x: profileData.coachingAffordability ? 20 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
               />
            </div>
            
            <input
              type="checkbox"
              className="sr-only"
              checked={profileData.coachingAffordability}
              readOnly
            />
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={handleSubmit}
            className="relative overflow-hidden group rounded-full bg-gradient-to-r from-[#007ACC] to-[#47B5FF] px-10 py-3 font-bold text-white shadow-lg hover:shadow-xl transition-all"
          >
            <span className="absolute inset-0 bg-white transition-transform duration-[250ms] ease-out scale-x-0 group-hover:scale-x-100 origin-right group-hover:origin-left"></span>
            <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-[#002D62] transition-colors duration-300">
              Save & Continue →
            </span>
          </button>
        </div>
      </Card>
    </motion.div>
  );
}
