import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './StudentAssignment.css';

const API_BASE_URL = 'http://localhost:5000/api';
const ASSIGNMENTS_URL = `${API_BASE_URL}/teacherassignment`;
const FILE_UPLOAD_URL = `${API_BASE_URL}/submissions/upload`;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
console.log("Token:", localStorage.getItem('token'));


const StudentAssignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [answers, setAnswers] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const fetchAssignments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(ASSIGNMENTS_URL);
      const data = res.data.assignments || res.data;

      const initAnswers = {};
      const initStatus = {};
      const initFiles = {};

      data.forEach((a) => {
        initStatus[a._id] = 'Not Submitted';
        a.assignmentQuestions.forEach((q, index) => {
          const key = `${a._id}_${index}`;
          initAnswers[key] = '';
          initFiles[key] = null;
        });
      });

      setAssignments(data);
      setAnswers(initAnswers);
      setSubmissionStatus(initStatus);
      setUploadedFiles(initFiles);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch assignments');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const handleAnswerChange = (id, index, value) => {
    const key = `${id}_${index}`;
    setAnswers({ ...answers, [key]: value });
  };

  const handleFileUpload = async (id, index, file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('assignmentId', id);
    formData.append('questionIndex', index);

    try {
      const res = await axios.post(FILE_UPLOAD_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const key = `${id}_${index}`;
      setUploadedFiles((prev) => ({
        ...prev,
        [key]: {
          fileName: file.name,
          filePath: res.data.filePath,
          fileUrl: res.data.fileUrl,
        },
      }));

      toast.success('File uploaded successfully');
    } catch (err) {
      console.error(err);
      toast.error('File upload failed');
    }
  };

  const submitAssignment = async (id) => {
    try {
      const assignment = assignments.find((a) => a._id === id);
      const submissionAnswers = assignment.assignmentQuestions.map((q, index) => {
        const key = `${id}_${index}`;
        const file = uploadedFiles[key];
        return {
          questionId: q._id,
          answerText: answers[key] || '',
          attachedFile: file
            ? {
                fileName: file.fileName,
                filePath: file.filePath,
              }
            : null,
        };
      });

      const payload = {
        answers: submissionAnswers,
        submissionDate: new Date().toISOString(),
      };

     await axiosInstance.post(`/assignments/${id}/submissions`, payload);


      toast.success('Assignment submitted successfully');
      setSubmissionStatus({ ...submissionStatus, [id]: 'Submitted' });
      setShowModal(false);
      fetchAssignments();
    } catch (err) {
      console.error(err);
      toast.error('Assignment submission failed');
    }
  };

  const openModal = (assignment) => {
    setSelectedAssignment(assignment);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedAssignment(null);
  };

  return (
    <div className="student-assignment-container">
      <h2>📚 My Assignments</h2>
      {loading ? (
        <p>Loading assignments...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Teacher</th>
              <th>Class</th>
              <th>Due Date</th>
              <th>Questions</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a) => (
              <tr key={a._id}>
                <td>{a.subject}</td>
                <td>{a.teacher?.username}</td>
                <td>{a.class}{a.section ? ` - ${a.section}` : ''}</td>

                <td>{a.endDate ? new Date(a.endDate).toLocaleDateString() : 'N/A'}</td>
                <td>{a.assignmentQuestions.length}</td>
                <td>{submissionStatus[a._id]}</td>
                <td>
                  <button onClick={() => openModal(a)}>View</button>
                  {submissionStatus[a._id] !== 'Submitted' && (
                    <button onClick={() => submitAssignment(a._id)}>Submit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && selectedAssignment && (
        <div className="modal">
          <h3>{selectedAssignment.subject} Assignment</h3>
          <button onClick={closeModal}>❌ Close</button>
          {selectedAssignment.assignmentQuestions.map((q, index) => {
            const key = `${selectedAssignment._id}_${index}`;
            return (
              <div key={index} className="question-block">
                <p>
                  <strong>Q{index + 1}:</strong> {q.questionText}
                </p>
                <textarea
                  value={answers[key]}
                  onChange={(e) =>
                    handleAnswerChange(selectedAssignment._id, index, e.target.value)
                  }
                  placeholder="Type your answer here"
                />
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  onChange={(e) =>
                    handleFileUpload(selectedAssignment._id, index, e.target.files[0])
                  }
                />
                {uploadedFiles[key] && (
                  <p>
                    📎 {uploadedFiles[key].fileName}{' '}
                    <a href={uploadedFiles[key].fileUrl} target="_blank" rel="noreferrer">
                      (View)
                    </a>
                  </p>
                )}
              </div>
            );
          })}
          {submissionStatus[selectedAssignment._id] !== 'Submitted' && (
            <button onClick={() => submitAssignment(selectedAssignment._id)}>
              ✅ Submit Assignment
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentAssignment;
