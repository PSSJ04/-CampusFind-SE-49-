# CampusFind - Sri Lankan University Lost and Found Platform

## Selected Problem
In large university campuses across Sri Lanka (specifically SLIIT), students frequently lose valuable items (e.g., student IDs, wallets, lecture notes) and have no reliable, centralized digital system to report, track, or recover them. Current methods rely on word of mouth or unorganized social media groups.

## Proposed Solution
**CampusFind** is a centralized, digital Lost and Found platform tailored for university students. It solves the problem of disconnected reporting by providing a unified web application where users can report lost or found items, search the database, filter by specific criteria, and update item statuses when they are claimed or returned.

## Main Features
- **Report Lost/Found Items**: Easily submit details including item type, name, location, and description.
- **Search & Filter**: Find items quickly with partial text search and category/location filters.
- **Status Updates**: Mark active items as "Claimed/Returned" once the issue is resolved.
- **Mobile Responsive**: Fully responsive UI tailored for mobile phones to allow on-the-go reporting.

## Technologies Used
- **Frontend**: React (Vite), Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)

## AI Tools Used (AI Prompt Log)
- Generated via Gemini Agentic IDE using AI Prompts based on MERN stack hackathon grading rubric constraints.

## Team Member Details
- Pamith Kaluarachchi

## Installation Instructions

### Prerequisites
- Node.js installed
- MongoDB installed/running

### Setup
1. Clone the repository
2. Backend Setup:
   ```bash
   cd backend
   npm install
   # Create a .env file and add PORT=5000 and MONGO_URI
   npm start
   ```
3. Frontend Setup:
   ```bash
   cd frontend
   npm install
   # Set VITE_API_URL in .env if backend is not on port 5000
   npm run dev
   ```

## Deployment Links
- **Vercel (Frontend)**: [Placeholder Link]
- **Render (Backend)**: [Placeholder Link]
