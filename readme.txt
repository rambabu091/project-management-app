==================================================
ProjectFlow - Project Management Web App
==================================================

This is a simple, easy-to-understand Project Management App built with:
- Backend: NestJS, TypeORM, SQLite (No extra DB setup needed!)
- Frontend: ReactJS (Vite), React Router DOM, Axios
- Styling: Pure CSS with a premium dark-mode glassmorphism design.

## Features
- Authentication (Signup & Login) using JWT
- Role-based Access Control (Admin / Member)
- Admin can create Projects and Tasks
- Dashboard to track Task status (TODO, IN_PROGRESS, DONE)
- Responsive and modern UI

==================================================
HOW TO RUN
==================================================

Prerequisites: Node.js (v18+)

1. Start the Backend
--------------------------------
cd backend
npm install
npm run start

The backend will start at http://localhost:3000.
SQLite will automatically create a `database.sqlite` file in the backend folder.

2. Start the Frontend
--------------------------------
cd frontend
npm install
npm run dev

The frontend will start typically at http://localhost:5173.

==================================================
TESTING INSTRUCTIONS
==================================================

1. Open the frontend URL in your browser.
2. Sign up for a new account.
   Note: The default signup role is 'Member'. To test 'Admin' features, you would normally assign roles via an Admin panel or database seeding. For testing purposes, you can manually modify the `database.sqlite` file, or adjust the `auth.service.ts` to assign 'Admin' by default during signup.
3. Login with your credentials.
4. If Admin, navigate to "Projects" and click "+ New Project".
5. Go to Dashboard to view your assigned tasks (if you have created tasks via API/Postman).

==================================================
API ENDPOINTS
==================================================

Auth:
- POST /auth/signup : { email, password, role }
- POST /auth/login : { email, password } -> returns access_token

Users:
- POST /users/make-admin/:email : Changes a user's role to 'Admin'

Projects: (Requires JWT)
- GET /projects
- POST /projects (Admin only) : { name, description }

Tasks: (Requires JWT)
- GET /tasks
- POST /tasks (Admin only) : { title, description, projectId }
- PATCH /tasks/:id/status : { status: "TODO" | "IN_PROGRESS" | "DONE" }
