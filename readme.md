# AI-Powered Resume Scanner

An intelligent recruitment tool that analyzes PDF resumes to determine job role compatibility using skill-extraction and matching logic.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MySQL Database
- Gemini API Key

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AI_Powered_Resume_Scanner
   ```

2. **Server Configuration**
   - Navigate to `server` directory: `cd server`
   - Install dependencies: `npm install`
   - Create `.env` file from `.env.example` and fill in your details.
   - Run migrations: `npm run migrate`
   - Seed database (optional): `npm run seed`
   - Start server: `npm run dev`

3. **Client Configuration**
   - Navigate to `client` directory: `cd client`
   - Install dependencies: `npm install`
   - Create `.env` file from `.env.example`.
   - Start client: `npm run dev`

### 🔑 Sample Credentials
Use the following credentials to test the application:
- **Email:** `abc@gmail.com`
- **Password:** `User123!`

---

## Core Features

### 🔐 Authentication & Security
* **User Registration & Login:** Secure account creation and access.
* **JWT Authentication:** Protected API routes and session management using JSON Web Tokens.
* **User Dashboard:** A personalized starting point for logged-in users with a modern, simple UI.

### 📄 Resume Processing
* **Strict PDF Upload:** Support for PDF file formats only to ensure data consistency.
* **Text Extraction:** Automated parsing of content from uploaded resume files.
* **Skill Identification:** Intelligent extraction of technical and soft skills from the parsed text.

### 📊 Matching & Analysis
* **Job Role Selection:** Dropdown interface to select from predefined industry job roles.
* **Smart Comparison:** Real-time matching of extracted resume skills against job requirements.
* **Match Analytics:**
    * Match percentage calculation.
    * List of successfully matched skills.
    * Identification of missing skills.
* **Career Optimization:** Actionable suggestions for missing skills to help users improve their profiles.

### 🕒 History & Tracking
* **Scan History:** A dedicated page for authenticated users to track and review all previous resume scans and match results.