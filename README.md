# SpottyBird Wildlife Rehabilitation

## Table of Contents

1. [About the Project](#1-about-the-project)
   - 1.1 [Project Description](#11-project-description)
   - 1.2 [Problem Statement](#12-problem-statement)
   - 1.3 [Built With](#13-built-with)
2. [Getting Started](#2-getting-started)
   - 2.1 [Prerequisites](#21-prerequisites)
   - 2.2 [How to Install](#22-how-to-install)
3. [Features and Usage](#3-features-and-usage)
4. [Architecture / System Design](#4-architecture--system-design)
5. [Deployment Summary](#5-deployment-summary)
6. [Challenges and Solutions](#6-challenges-and-solutions)
7. [Authors and Acknowledgements](#7-authors-and-acknowledgements)

---

## 1. About the Project

### 1.1 Project Description
**SpottyBird** is a full-stack MERN (MongoDB, Express.js, React, Node.js) application built for the Week 15 Summative Assessment. The project translates a UI/UX design provided by a student from the **UX200 Design class** into a fully functional, responsive, and production-ready web application. 

SpottyBird serves as a digital management system for wildlife rehabilitation centres. It allows administrators and volunteers to securely log in, track incoming animal rescue cases, monitor rehabilitation stages, and manage user profiles.

### 1.2 Problem Statement
Wildlife rehabilitation centres often rely on fragmented paper records or disjointed spreadsheets to track animal intake, medical severity, and volunteer assignments. SpottyBird solves this by providing a centralized digital dashboard. It implements strict Role-Based Access Control (RBAC) to ensure volunteers can view data, but only Administrators can approve, deny, or alter critical case states.

### 1.3 Built With
* **Frontend:** React, Vite, CSS3
* **Backend:** Node.js, Express.js (ES Modules), Multer (Multipart File Uploads)
* **Database:** MongoDB, Mongoose
* **Authentication:** JSON Web Tokens (JWT), bcryptjs

---

## 2. Getting Started

### 2.1 Prerequisites
- Node.js and npm installed
- MongoDB connection URI (e.g., MongoDB Atlas)
- Git

### 2.2 How to Install

1. **Clone the Repository**
   ```bash
   git clone https://github.com/WihanBurger/Wihan_Burger_Summative.git
   cd Wihan_Burger_Summative
   ```

2. **Set Up the Backend**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend/` directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```
   Start the backend server:
   ```bash
   npm run dev
   ```

3. **Set Up the Frontend**
   Open a new terminal window:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   The application will run locally at `http://localhost:5173`.

---

## 3. Features and Usage
* **Role-Based Access Control (RBAC):** Distinct interfaces and permissions for `Administrator` and `Volunteer` roles, enforced via backend Express middleware.
* **Dynamic Analytics Dashboard:** Live KPI metrics and SVG line charts that calculate data directly from MongoDB case records.
* **Case Management:** A secure table view where admins can Accept or Deny incoming wildlife cases, updating their status and urgency dynamically.
* **Profile Image Uploads:** Users can upload profile photos via a `FormData` multipart request, processed and stored locally via Multer.
* **Responsive Design:** Flexible CSS layout that scales from desktop down to mobile viewports.

---

## 4. Architecture / System Design
* **Frontend State:** Managed via React hooks (`useState`, `useEffect`) and local storage for JWT session persistence.
* **Backend API:** RESTful API structured with separate route modules (`auth.js`, `users.js`, `cases.js`).
* **Middleware:** Dual-layer security. `protect` verifies the JWT, and `adminOnly` inspects the user role before hitting the database.

---

## 5. Deployment Summary
As per the project brief, the application frontend has been successfully deployed to two separate hosting platforms:

* **Platform 1 (Azure Static Web Apps):** [https://salmon-water-0a5d9c210.6.azurestaticapps.net/](https://salmon-water-0a5d9c210.6.azurestaticapps.net/)
  * **Configuration:** Deployed by connecting the GitHub repository to Azure. Azure automatically generated a GitHub Actions CI/CD workflow file to build the Vite React app (`npm run build`) and deploy the `dist` folder upon every push to the `main` branch.
* **Platform 2 (AWS Amplify):** [https://main.d1d3quujqj8yrb.amplifyapp.com/](https://main.d1d3quujqj8yrb.amplifyapp.com/)
  * **Configuration:** Connected directly to the GitHub repository via the AWS console. AWS Amplify automatically detected the Vite build settings and established a continuous deployment pipeline.

*(Note: The backend API runs separately and connects to a cloud-hosted MongoDB Atlas cluster).*

---

## 6. Challenges and Solutions
1. **Multipart File Data (Profile Pictures):** Standard Express JSON middleware cannot read binary image files. **Solution:** Implemented `Multer` on the backend to intercept `FormData` requests, save the files to an `uploads/` directory, and store the file path string in MongoDB.
2. **ES Modules Pathing:** Using `import` syntax broke Node's default `__dirname` variable, which was required to serve the uploaded images statically. **Solution:** Used Node's `url` and `path` modules (`fileURLToPath`) to manually reconstruct the directory path.
3. **Tracking Node Modules:** Git was initially tracking thousands of dependency files. **Solution:** Created a strict `.gitignore` file and cleared the Git cache (`git rm -r --cached node_modules`) to keep the repository clean and secure.

---

## 7. Authors and Acknowledgements
* **Developer:** Wihan Burger
* **Module:** Week 15 Summative Assessment (Interactive Development)
