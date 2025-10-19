import React, { useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const InfoPage = () => {
  const [info, setInfo] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    github: "",
    linkedin: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_URL;

  // 🔒 Verify token & fetch info
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      jwtDecode(token); // verify token
      fetchInfo(token);
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, []);

  const fetchInfo = async (token) => {
    try {
      const res = await axios.get(`${api}/api/info`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInfo(res.data);
      setFormData({
        name: res.data.name,
        email: res.data.email,
        phone: res.data.phone,
        address: res.data.address,
        github: res.data.github || "",
        linkedin: res.data.linkedin || "",
      });
    } catch (err) {
      console.error("Error fetching info:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    setSaving(true);
    try {
      const res = await axios.post(`${api}/api/info`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInfo(res.data);
      alert("Information saved successfully!");
    } catch (err) {
      console.error("Error saving info:", err);
      alert("Failed to save information.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    if (!window.confirm("Are you sure you want to delete your info?")) return;

    try {
      await axios.delete(`${api}/api/info`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInfo(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        github: "",
        linkedin: "",
      });
      alert("Information deleted successfully!");
    } catch (err) {
      console.error("Error deleting info:", err);
      alert("Failed to delete information.");
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );

  return (
    <>
      
      <div className="container py-5">
        <h2 className="text-center mb-5 text-primary fw-bold">My Information</h2>

        <div className="row">
          {/* Form Section */}
          <div className="col-md-6 mb-4">
            <div className="card shadow-sm p-4">
              <h4 className="mb-4">{info ? "Update Info" : "Add Info"}</h4>
              <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-12">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Address</label>
                  <textarea
                    name="address"
                    className="form-control"
                    rows="2"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <div className="col-md-6">
                  <label className="form-label">GitHub</label>
                  <input
                    type="text"
                    name="github"
                    className="form-control"
                    value={formData.github}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">LinkedIn</label>
                  <input
                    type="text"
                    name="linkedin"
                    className="form-control"
                    value={formData.linkedin}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 mt-3">
                  <button type="submit" className="btn btn-primary me-2" disabled={saving}>
                    {saving ? "Saving..." : info ? "Update Info" : "Add Info"}
                  </button>
                  {info && (
                    <button type="button" className="btn btn-danger" onClick={handleDelete}>
                      Delete Info
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Display Info */}
          {info && (
            <div className="col-md-6 mb-4">
              <div className="card shadow-sm p-4 h-100">
                <h4 className="text-primary mb-3">Your Info</h4>
                <p><strong>Name:</strong> {info.name}</p>
                <p><strong>Email:</strong> {info.email}</p>
                <p><strong>Phone:</strong> {info.phone}</p>
                <p><strong>Address:</strong> {info.address}</p>
                {info.github && (
                  <p>
                    <strong>GitHub:</strong>{" "}
                    <a href={info.github} target="_blank" rel="noopener noreferrer">
                      {info.github}
                    </a>
                  </p>
                )}
                {info.linkedin && (
                  <p>
                    <strong>LinkedIn:</strong>{" "}
                    <a href={info.linkedin} target="_blank" rel="noopener noreferrer">
                      {info.linkedin}
                    </a>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InfoPage;
