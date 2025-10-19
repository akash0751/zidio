import React, { useEffect, useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "./ResumePdf";

const HomePage = () => {
  const [info, setInfo] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [educations, setEducations] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      jwtDecode(token);
      fetchAllData(token);
    } catch (err) {
      console.error("Invalid token:", err);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, []);

  const fetchAllData = async (token) => {
    try {
      const [infoRes, skillRes, projectRes, eduRes, achievementRes] = await Promise.all([
        axios.get(`${api}/api/info`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${api}/api/skills`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${api}/api/projects`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${api}/api/educations`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${api}/api/achievement`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      setInfo(infoRes.data);
      setSkills(skillRes.data);
      setProjects(projectRes.data);
      setEducations(eduRes.data);
      setAchievements(achievementRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
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
      <Navbar />
      <div className="container py-5">

        {/* PDF Download Button */}
        <div className="text-center mb-4">
          <PDFDownloadLink
            document={
              <ResumePDF
                info={info}
                skills={skills}
                projects={projects}
                educations={educations}
                achievements={achievements}
              />
            }
            fileName={`${info?.name || "Resume"}_Resume.pdf`}
          >
            {({ loading }) => (
              <button className="btn btn-success">
                {loading ? "Generating..." : "Download Resume PDF"}
              </button>
            )}
          </PDFDownloadLink>
        </div>

        {/* Info Section */}
        <div className="text-center mb-5">
          <h1 className="fw-bold">{info?.name || "Your Name"}</h1>
          <p className="mb-1">{info?.email}</p>
          <p className="mb-1">{info?.phone}</p>
          <p className="mb-1">{info?.address}</p>
          <div className="mt-2">
            {info?.github && (
              <a href={info.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark btn-sm me-2">
                GitHub
              </a>
            )}
            {info?.linkedin && (
              <a href={info.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary btn-sm">
                LinkedIn
              </a>
            )}
          </div>
        </div>

        {/* Skills Section */}
        <section className="mb-5">
          <h3 className="text-dark mb-3 border-bottom pb-2">Skills</h3>
          <div className="d-flex flex-wrap gap-2">
            {skills.length === 0 ? (
              <p className="text-muted">No skills added yet.</p>
            ) : (
              skills.map((skill) => (
                <span key={skill._id} className="badge bg-primary p-2">
                  {skill.name} ({skill.level})
                </span>
              ))
            )}
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-5">
          <h3 className="text-dark mb-3 border-bottom pb-2">Education</h3>
          <div className="row">
            {educations.length === 0 ? (
              <p className="text-muted">No education records found.</p>
            ) : (
              educations.map((edu) => (
                <div className="col-md-6 mb-3" key={edu._id}>
                  <div className="card shadow-sm border-0 p-3 h-100">
                    <h5 className="fw-bold">{edu.degree}</h5>
                    <p className="mb-1 text-muted">{edu.fieldOfStudy}</p>
                    <p className="mb-1">{edu.institution}</p>
                    <small className="text-muted">
                      {edu.startYear} - {edu.endYear || "Present"}
                    </small>
                    {edu.grade && <div className="text-primary mt-1">Grade: {edu.grade}</div>}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Projects Section */}
        <section className="mb-5">
          <h3 className="text-dark mb-3 border-bottom pb-2">Projects</h3>
          <div className="row">
            {projects.length === 0 ? (
              <p className="text-muted">No projects added yet.</p>
            ) : (
              projects.map((project) => (
                <div className="col-md-6 mb-3" key={project._id}>
                  <div className="card shadow-sm border-0 p-3 h-100">
                    <h5 className="fw-bold text-primary">{project.title}</h5>
                    <p>{project.description}</p>
                    <small className="text-muted">
                      {project.startDate ? new Date(project.startDate).toLocaleDateString() : ""} -{" "}
                      {project.endDate ? new Date(project.endDate).toLocaleDateString() : "Present"}
                    </small>
                    <div className="mt-2">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="badge bg-secondary me-1">
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-primary btn-sm mt-2"
                      >
                        View Project
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Achievements Section */}
        <section className="mb-5">
          <h3 className="text-dark mb-3 border-bottom pb-2">Achievements</h3>
          <div className="row">
            {achievements.length === 0 ? (
              <p className="text-muted">No achievements yet.</p>
            ) : (
              achievements.map((item) => (
                <div className="col-md-6 col-lg-4 mb-3" key={item._id}>
                  <div className="card shadow-sm border-0 p-3 h-100">
                    <h5 className="fw-bold text-success">{item.title}</h5>
                    <p className="mb-1 text-muted">{item.organization}</p>
                    <p>{item.description}</p>
                    <small className="text-muted">
                      {new Date(item.date).toLocaleDateString()}
                    </small>
                    {item.certificateLink && (
                      <a
                        href={item.certificateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-success btn-sm mt-2"
                      >
                        View Certificate
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </>
  );
};

export default HomePage;
