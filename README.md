**Description**:
A full-stack web application that allows users to maintain and showcase their professional portfolio, including personal information, skills, education, projects, and achievements. Users can login securely via JWT authentication, view and update their information, and generate a professional PDF resume directly from the app. The app is responsive and displays all portfolio details in a clean, structured, and professional layout.

**Key Features**:

JWT-based authentication (login/logout)

Add, update, and view personal info, skills, education, projects, achievements

Generate downloadable PDF resume with a professional layout

Responsive UI with Bootstrap cards, badges, and sections

Dynamic sections populated from MongoDB database

PDF generation using @react-pdf/renderer and jsPDF

**Tools & Technologies Used**:

Frontend: React.js, Bootstrap 5, HTML5, CSS3, jsPDF, html2canvas, @react-pdf/renderer

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ORM)

Authentication: JWT (JSON Web Tokens)

API Calls: Axios for REST API requests

**Usage**:

User signs up or logs in to the app.

Add or update personal info, skills, education, projects, and achievements.

View the portfolio in a clean, professional format.

Click the “Download Resume PDF” button to generate a professional resume instantly.

All data is saved securely in MongoDB and displayed dynamically.
