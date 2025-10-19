import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const ProjectPage = () => {
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_URL;

  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [link, setLink] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [editingProjectId, setEditingProjectId] = useState(null);

  // 🧩 Verify token + fetch projects
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first.");
      navigate("/login");
      return;
    }
    fetchProjects(token);
  }, [navigate]);

  // 🔹 Fetch Projects
  const fetchProjects = async (token) => {
    try {
      const res = await axiosInstance.get(`${api}/api/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
    } catch (err) {
      console.error("Fetch projects error:", err);
      alert("Failed to fetch projects.");
    }
  };

  // 🔹 Add or Update Project
  const handleAddOrUpdateProject = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    const techArray = technologies.split(",").map((t) => t.trim());

    try {
      if (editingProjectId) {
        // Update
        const res = await axiosInstance.put(
          `${api}/api/projects/${editingProjectId}`,
          { title, description, technologies: techArray, link, startDate, endDate },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProjects(
          projects.map((p) => (p._id === editingProjectId ? res.data : p))
        );
        setEditingProjectId(null);
      } else {
        // Add new
        const res = await axiosInstance.post(
          `${api}/api/projects`,
          { title, description, technologies: techArray, link, startDate, endDate },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProjects([...projects, res.data]);
      }

      // Reset form
      setTitle("");
      setDescription("");
      setTechnologies("");
      setLink("");
      setStartDate("");
      setEndDate("");
    } catch (err) {
      console.error("Project operation error:", err);
      alert("Failed to add/update project.");
    }
  };

  // 🔹 Edit
  const handleEditProject = (project) => {
    setEditingProjectId(project._id);
    setTitle(project.title);
    setDescription(project.description);
    setTechnologies(project.technologies.join(", "));
    setLink(project.link || "");
    setStartDate(project.startDate ? project.startDate.split("T")[0] : "");
    setEndDate(project.endDate ? project.endDate.split("T")[0] : "");
  };

  // 🔹 Delete
  const handleDeleteProject = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await axiosInstance.delete(`${api}/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete project error:", err);
      alert("Failed to delete project.");
    }
  };

  // 🖼️ UI
  return (
    <div className="container my-4">
      <h2 className="mb-4">Manage Your Projects</h2>

      <div className="card p-4 mb-4 shadow-sm">
        <h4>{editingProjectId ? "Edit Project" : "Add Project"}</h4>
        <form className="row g-3" onSubmit={handleAddOrUpdateProject}>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Project Link (optional)"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="date"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <input
              type="date"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="col-12">
            <textarea
              className="form-control"
              rows="3"
              placeholder="Project Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="col-12">
            <input
              type="text"
              className="form-control"
              placeholder="Technologies (comma separated)"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              {editingProjectId ? "Update Project" : "Add Project"}
            </button>
            {editingProjectId && (
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => {
                  setEditingProjectId(null);
                  setTitle("");
                  setDescription("");
                  setTechnologies("");
                  setLink("");
                  setStartDate("");
                  setEndDate("");
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="card p-4 shadow-sm">
        <h4 className="mb-3">Your Projects</h4>
        {projects.length === 0 ? (
          <p>No projects added yet.</p>
        ) : (
          <ul className="list-group">
            {projects.map((project) => (
              <li
                key={project._id}
                className="list-group-item d-flex justify-content-between align-items-start flex-column flex-md-row"
              >
                <div>
                  <h5 className="mb-1">{project.title}</h5>
                  <p className="mb-1">{project.description}</p>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.link}
                    </a>
                  )}
                  <p className="small text-muted mb-1">
                    {project.startDate && (
                      <>Start: {new Date(project.startDate).toLocaleDateString()} </>
                    )}
                    {project.endDate && (
                      <> | End: {new Date(project.endDate).toLocaleDateString()}</>
                    )}
                  </p>
                  <p>
                    <strong>Tech:</strong>{" "}
                    {project.technologies && project.technologies.join(", ")}
                  </p>
                </div>
                <div>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEditProject(project)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDeleteProject(project._id)}
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

export default ProjectPage;
