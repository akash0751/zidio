import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
const SkillPage = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [category, setCategory] = useState("General");
  const [editingSkillId, setEditingSkillId] = useState(null);
  const api = import.meta.env.VITE_API_URL;

  // Check token and fetch skills
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }
    try {
          jwtDecode(token);
          fetchSkills(token);
        } catch (err) {
          console.error("Invalid token:", err);
          localStorage.removeItem("token");
          navigate("/login");
        }
  }, []);

  const fetchSkills = async (token) => {
    try {
      const res = await axiosInstance.get(`${api}/api/skills`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSkills(res.data);
    } catch (err) {
      console.error("Fetch skills error:", err);
      alert("Failed to fetch skills.");
    }
  };

  const handleAddOrUpdateSkill = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      if (editingSkillId) {
        // Update skill
        const res = await axiosInstance.put(
          `${api}/api/skills/${editingSkillId}`,
          { name, level, category },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSkills(skills.map(s => (s._id === editingSkillId ? res.data : s)));
        setEditingSkillId(null);
      } else {
        // Add new skill
        const res = await axiosInstance.post(
          `${api}/api/skills`,
          { name, level, category },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSkills([...skills, res.data]);
      }
      setName("");
      setLevel("Beginner");
      setCategory("General");
    } catch (err) {
      console.error("Skill operation error:", err);
      alert("Failed to add/update skill.");
    }
  };

  const handleEditSkill = (skill) => {
    setEditingSkillId(skill._id);
    setName(skill.name);
    setLevel(skill.level);
    setCategory(skill.category);
  };

  const handleDeleteSkill = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!window.confirm("Are you sure you want to delete this skill?")) return;

    try {
      await axiosInstance.delete(`${api}/api/skills/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSkills(skills.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Delete skill error:", err);
      alert("Failed to delete skill.");
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4">Manage Your Skills</h2>

      <div className="card p-4 mb-4 shadow-sm">
        <h4>{editingSkillId ? "Edit Skill" : "Add Skill"}</h4>
        <form className="row g-3" onSubmit={handleAddOrUpdateSkill}>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Skill Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-select"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Expert</option>
            </select>
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Category (e.g., Programming)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              {editingSkillId ? "Update Skill" : "Add Skill"}
            </button>
            {editingSkillId && (
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => {
                  setEditingSkillId(null);
                  setName("");
                  setLevel("Beginner");
                  setCategory("General");
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="card p-4 shadow-sm">
        <h4 className="mb-3">Your Skills</h4>
        {skills.length === 0 ? (
          <p>No skills added yet.</p>
        ) : (
          <ul className="list-group">
            {skills.map((skill) => (
              <li
                key={skill._id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{skill.name}</strong> ({skill.level}) - {skill.category}
                </div>
                <div>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEditSkill(skill)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteSkill(skill._id)}
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

export default SkillPage;
