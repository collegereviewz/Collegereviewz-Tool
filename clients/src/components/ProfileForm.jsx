import { useState } from "react";
import Card from "./Card";
import { motion } from "framer-motion";

const COUNTRY_CODES = [
  { code: "+91", label: "India", maxLength: 10 },
  { code: "+1", label: "USA / Canada", maxLength: 15 },
  { code: "+44", label: "UK", maxLength: 15 },
  { code: "+61", label: "Australia", maxLength: 15 },
  { code: "+971", label: "UAE", maxLength: 15 },
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
        <h2 className="mb-8 text-center text-2xl font-semibold text-white dark:text-white text-slate-900">
          🎓 Student Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <div className="flex gap-2">
            <select
              className="input w-28"
              value={profileData.countryCode}
              onChange={(e) => {
                handleChange("countryCode", e.target.value);
                handleChange("phoneNumber", "");
              }}
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code}
                </option>
              ))}
            </select>

            <input
              type="tel"
              placeholder="Phone Number"
              className="input flex-1"
              value={profileData.phoneNumber}
              onChange={(e) => handlePhoneChange(e.target.value)}
            />
          </div>

          <select
            className="input"
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
            className="input"
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
            className="input"
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
            className="input"
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
            className="input"
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

          <label className="flex items-center gap-3 dark:text-white text-slate-900">
            <input
              type="checkbox"
              checked={profileData.coachingAffordability}
              onChange={(e) =>
                handleChange("coachingAffordability", e.target.checked)
              }
            />
            Can afford coaching?
          </label>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={handleSubmit}
            className="rounded-full bg-indigo-600 px-10 py-3 font-semibold text-white hover:bg-indigo-700 transition"
          >
            Save & Continue →
          </button>
        </div>
      </Card>
    </motion.div>
  );
}
