import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// ===== Register clean professional fonts =====
Font.register({
  family: "Helvetica-Bold",
  fonts: [
    { src: "https://fonts.gstatic.com/s/helvetica/v10/Helvetica-Bold.ttf" },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 35,
    fontSize: 11,
    lineHeight: 1.6,
    fontFamily: "Helvetica",
    color: "#000",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  contact: {
    fontSize: 10,
    color: "#333",
  },
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    borderBottom: "1pt solid #000",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  listItem: {
    marginLeft: 10,
    marginBottom: 2,
  },
  projectBlock: {
    marginBottom: 6,
  },
  boldText: {
    fontWeight: "bold",
  },
  smallText: {
    fontSize: 10,
    color: "#444",
  },
});

const ResumePDF = ({ info, skills, projects, educations, achievements }) => (
  <Document>
    <Page style={styles.page} size="A4">
      {/* ===== HEADER ===== */}
      <View style={{ marginBottom: 8 }}>
        <Text style={styles.name}>{info?.name || "Your Name"}</Text>
        <Text style={styles.contact}>
          {info?.address && `${info.address} • `}
          {info?.phone && `${info.phone} • `}
          {info?.email}
        </Text>
        {info?.github && <Text style={styles.contact}>{info.github}</Text>}
        {info?.linkedin && <Text style={styles.contact}>{info.linkedin}</Text>}
      </View>

      {/* ===== CAREER OBJECTIVE ===== */}
      {info?.objective && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Career Objective</Text>
          <Text>{info.objective}</Text>
        </View>
      )}

      {/* ===== SKILLS ===== */}
      {skills?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {skills.map((s, i) => (
            <Text key={i} style={styles.listItem}>
              • {s.category ? `${s.category}: ` : ""}
              {s.name}
              {s.level ? ` (${s.level})` : ""}
            </Text>
          ))}
        </View>
      )}

      {/* ===== PROJECTS ===== */}
      {projects?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {projects.map((p, i) => (
            <View key={i} style={styles.projectBlock}>
              <Text style={styles.boldText}>{p.title}</Text>
              <Text>{p.description}</Text>
              {p.technologies?.length > 0 && (
                <Text style={styles.smallText}>
                  Tools used: {p.technologies.join(", ")}
                </Text>
              )}
              {(p.startDate || p.endDate) && (
                <Text style={styles.smallText}>
                  {p.startDate
                    ? new Date(p.startDate).toLocaleString("default", {
                        month: "short",
                        year: "numeric",
                      })
                    : ""}
                  {" - "}
                  {p.endDate
                    ? new Date(p.endDate).toLocaleString("default", {
                        month: "short",
                        year: "numeric",
                      })
                    : "Present"}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* ===== EDUCATION ===== */}
      {educations?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {educations.map((edu, i) => (
            <View key={i} style={{ marginBottom: 5 }}>
              <Text style={styles.boldText}>{edu.institution}</Text>
              <Text>
                {edu.degree} in {edu.fieldOfStudy}
              </Text>
              <Text style={styles.smallText}>
                {edu.startYear} - {edu.endYear || "Present"}
                {edu.grade && ` • GPA: ${edu.grade}`}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* ===== INTERNSHIP / ACHIEVEMENTS ===== */}
      {achievements?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Internship / Achievements</Text>
          {achievements.map((a, i) => (
            <View key={i} style={{ marginBottom: 5 }}>
              <Text style={styles.boldText}>{a.title}</Text>
              {a.organization && (
                <Text style={styles.smallText}>{a.organization}</Text>
              )}
              {a.description && <Text>{a.description}</Text>}
              {a.date && (
                <Text style={styles.smallText}>
                  {new Date(a.date).toLocaleString("default", {
                    month: "short",
                    year: "numeric",
                  })}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* ===== LANGUAGES ===== */}
      {info?.languages?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          <Text>{info.languages.join("  •  ")}</Text>
        </View>
      )}
    </Page>
  </Document>
);

export default ResumePDF;
