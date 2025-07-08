import React from 'react';

const AssignmentStatus = ({ submittedBy }) => {
  if (!submittedBy) return null;

  const { name, class: className, section } = submittedBy;

  return (
    <div className="assignment-status">
      <h2>📘 Assignment Submitted!</h2>
      <p><strong>Student Name:</strong> {name}</p>
      <p><strong>Class:</strong> {className}</p>
      <p><strong>Section:</strong> {section}</p>
    </div>
  );
};

export default AssignmentStatus;
