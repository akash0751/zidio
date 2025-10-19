import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const EducationPage = () => {
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_URL;

  const [educations, setEducations] = useState([]);
  const [institution, setInstitution] = useState("");
  const [degree, setDegree] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [grade, setGrade] = useState("");
  const [editingEducationId, setEditingEducationId] = useState(null);

  // ✅ Verify token + fetch educations
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }
    fetchEducations(token);
  }, [navigate]);

  // 📚 Fetch education records
  const fetchEducations = async (token) => {
    try {
      const res = await axiosInstance.get(`${api}/api/educations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEducations(res.data);
    } catch (err) {
      console.error("Fetch education error:", err);
      alert("Failed to fetch education details.");
    }
  };

  // ➕ Add / ✏️ Update Education
  const handleAddOrUpdateEducation = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      if (editingEducationId) {
        // Update education
        const res = await axiosInstance.put(
          `${api}/api/educations/${editingEducationId}`,
          { institution, degree, fieldOfStudy, startYear, endYear, grade },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEducations(
          educations.map((edu) =>
            edu._id === editingEducationId ? res.data : edu
          )
        );
        setEditingEducationId(null);
      } else {
        // Add new education
        const res = await axiosInstance.post(
          `${api}/api/educations`,
          { institution, degree, fieldOfStudy, startYear, endYear, grade },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEducations([...educations, res.data]);
      }

      // Reset form
      resetForm();
    } catch (err) {
      console.error("Education operation error:", err);
      alert("Failed to add/update education.");
    }
  };

  // ✏️ Edit
  const handleEditEducation = (education) => {
    setEditingEducationId(education._id);
    setInstitution(education.institution);
    setDegree(education.degree);
    setFieldOfStudy(education.fieldOfStudy);
    setStartYear(education.startYear || "");
    setEndYear(education.endYear || "");
    setGrade(education.grade || "");
  };

  // ❌ Delete
  const handleDeleteEducation = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!window.confirm("Are you sure you want to delete this education?"))
      return;

    try {
      await axiosInstance.delete(`${api}/api/educations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEducations(educations.filter((edu) => edu._id !== id));
    } catch (err) {
      console.error("Delete education error:", err);
      alert("Failed to delete education.");
    }
  };

  // ♻️ Reset Form
  const resetForm = () => {
    setInstitution("");
    setDegree("");
    setFieldOfStudy("");
    setStartYear("");
    setEndYear("");
    setGrade("");
    setEditingEducationId(null);
  };

  // 🖼️ UI
  return (
    <div className="container my-4">
      <h2 className="mb-4">Manage Your Education</h2>

      {/* Form Section */}
      <div className="card p-4 mb-4 shadow-sm">
        <h4>{editingEducationId ? "Edit Education" : "Add Education"}</h4>
        <form className="row g-3" onSubmit={handleAddOrUpdateEducation}>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Institution Name"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Degree"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Field of Study"
              value={fieldOfStudy}
              onChange={(e) => setFieldOfStudy(e.target.value)}
              required
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Start Year"
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="End Year"
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Grade / Percentage"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              {editingEducationId ? "Update Education" : "Add Education"}
            </button>
            {editingEducationId && (
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Display Section */}
      <div className="card p-4 shadow-sm">
        <h4 className="mb-3">Your Education</h4>
        {educations.length === 0 ? (
          <p>No education records added yet.</p>
        ) : (
          <ul className="list-group">
            {educations.map((edu) => (
              <li
                key={edu._id}
                className="list-group-item d-flex justify-content-between align-items-start flex-column flex-md-row"
              >
                <div>
                  <h5 className="mb-1">{edu.degree}</h5>
                  <p className="mb-1">
                    {edu.fieldOfStudy} — {edu.institution}
                  </p>
                  <p className="small text-muted mb-1">
                    {edu.startYear} - {edu.endYear || "Present"}
                  </p>
                  {edu.grade && <p>Grade: {edu.grade}</p>}
                </div>
                <div>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEditEducation(edu)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteEducation(edu._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EducationPage;
