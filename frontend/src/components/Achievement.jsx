import React, { useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AchievementPage = () => {
  const [achievements, setAchievements] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    certificateLink: "",
    organization: "",
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_URL;

  // 🔒 Verify Token and Get User ID
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      jwtDecode(token);
      fetchAchievements(token);
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, []);

  // 📥 Fetch Achievements
  const fetchAchievements = async (token) => {
    try {
      const res = await axios.get(`${api}/api/achievement`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAchievements(res.data);
    } catch (err) {
      console.error("Error fetching achievements:", err);
    }
  };

  // 📝 Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ➕ Add or Update Achievement
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    try {
      if (editId) {
        await axios.put(`${api}/api/achievement/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(`${api}/api/achievement`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setFormData({
        title: "",
        description: "",
        date: "",
        certificateLink: "",
        organization: "",
      });
      setEditId(null);
      fetchAchievements(token);
    } catch (err) {
      console.error("Error saving achievement:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✏️ Edit Achievement
  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      description: item.description,
      date: item.date ? item.date.split("T")[0] : "",
      certificateLink: item.certificateLink,
      organization: item.organization,
    });
    setEditId(item._id);
  };

  // ❌ Delete Achievement
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to delete this achievement?")) return;
    try {
      await axios.delete(`${api}/api/achievement/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAchievements(token);
    } catch (err) {
      console.error("Error deleting achievement:", err);
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4">
        <h3 className="text-center mb-4 text-primary">
          {editId ? "Edit Achievement" : "Add Achievement"}
        </h3>

        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Organization</label>
            <input
              type="text"
              name="organization"
              className="form-control"
              value={formData.organization}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-12">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="2"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Date</label>
            <input
              type="date"
              name="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-8">
            <label className="form-label">Certificate Link</label>
            <input
              type="text"
              name="certificateLink"
              className="form-control"
              value={formData.certificateLink}
              onChange={handleChange}
            />
          </div>

          <div className="text-center mt-3">
            <button className="btn btn-primary px-4" type="submit" disabled={loading}>
              {loading ? "Saving..." : editId ? "Update Achievement" : "Add Achievement"}
            </button>
            {editId && (
              <button
                type="button"
                className="btn btn-secondary ms-3"
                onClick={() => {
                  setEditId(null);
                  setFormData({
                    title: "",
                    description: "",
                    date: "",
                    certificateLink: "",
                    organization: "",
                  });
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Display List */}
      <div className="mt-5">
        <h4 className="text-primary mb-3">Your Achievements</h4>
        <div className="row">
          {achievements.length === 0 ? (
            <p className="text-muted text-center">No achievements added yet.</p>
          ) : (
            achievements.map((item) => (
              <div key={item._id} className="col-md-6 col-lg-4 mb-4">
                <div className="card shadow-sm h-100 border-0">
                  <div className="card-body">
                    <h5 className="card-title text-primary">{item.title}</h5>
                    <p className="card-text small text-muted">
                      {item.organization} — {new Date(item.date).toLocaleDateString()}
                    </p>
                    <p>{item.description}</p>
                    {item.certificateLink && (
                      <a
                        href={item.certificateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary btn-sm"
                      >
                        View Certificate
                      </a>
                    )}
                  </div>
                  <div className="card-footer bg-light d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-outline-success"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AchievementPage;
