// viewAssignment.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ASSIGNMENTS_URL = `/teacherassignment`;

const ViewAssignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(ASSIGNMENTS_URL);
        setAssignments(res.data.assignments || res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch assignments');
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div className="teacher-assignment-container">
      <h2>📚 Assignment Submissions</h2>
      {loading ? (
        <p>Loading assignments...</p>
      ) : (
        <div className="assignment-list">
          {assignments.map((assignment) => (
            <div key={assignment._id} className="assignment-card">
              <h3>{assignment.subject}</h3>
              <p>Class: {assignment.class}{assignment.section ? `-${assignment.section}` : ''}</p>
              <p>Due Date: {new Date(assignment.endDate).toLocaleDateString()}</p>

              <h4>Submissions:</h4>
              {assignment.submissions && assignment.submissions.length > 0 ? (
                <table className="submissions-table">
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>Class & Section</th>
                      <th>Submission Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
  {assignment.submissions.map((submission) => (
    <tr key={submission._id}>
      <td>{submission.student?.username || 'N/A'}</td>
      <td>
        {submission.student?.class || 'N/A'}
        {submission.student?.section ? `-${submission.student.section}` : ''}
      </td>
      <td>{new Date(submission.submissionDate).toLocaleString()}</td>
      <td>Submitted</td>
    </tr>
  ))}
</tbody>

                </table>
              ) : (
                <p>No submissions yet</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAssignment;
