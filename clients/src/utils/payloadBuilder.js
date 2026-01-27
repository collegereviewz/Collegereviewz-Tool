// src/utils/payloadBuilder.js

export const buildPayload = ({ profileData, answers }) => {
  const uniqueStudentId = `student-${Date.now()}-${Math.floor(
    Math.random() * 1000
  )}`;

  return {
    studentId: uniqueStudentId,
    profileData: {
      name: profileData.name,
      email:profileData.email,
      phoneNumber: profileData.phoneNumber,
      openToAbroad: profileData.openToAbroad,
      age: Number(profileData.age),
      currentClass: profileData.currentClass,
      stream: profileData.stream,
      familyAnnualBudget: profileData.familyAnnualBudget,
      educationLoanComfort: profileData.educationLoanComfort,
      coachingAffordability: profileData.coachingAffordability
    },
    answers
  };
};
