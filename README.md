# Task Management App

This is a full-stack MERN (MongoDB, Express.js, React, Node.js) application for task management. The app allows users to sign up, log in, create, read, update, and delete notes, pin important notes, search notes, and add hashtags for better organization. The application is styled with Tailwind CSS, and uses Vite as the build tool for React. Notifications are handled with Toastify, modals with React Modal, and JWT for authentication.

---

## Features

1. **User Authentication**:
   - Secure sign-up and login with JWT-based authentication.

2. **Task Management**:
   - Create, update, delete, and view tasks.
   - Pin important tasks for easy access.

3. **Search Functionality**:
   - Search notes using keywords or hashtags.

4. **Hashtag Support**:
   - Add hashtags to notes for better categorization and filtering.

5. **UI Enhancements**:
   - Responsive design using Tailwind CSS.
   - Toast notifications for success, error, and other alerts.
   - React Modal for interactive prompts and forms.

6. **Optimized Performance**:
   - Fast development experience with Vite.

---

## Tech Stack

### Frontend:
- **React.js**: Frontend framework for building the user interface.
- **Vite**: Modern build tool for faster development.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: For making API requests.
- **Toastify**: For notifications.
- **React Router DOM**: For client-side routing.
- **React Modal**: For modals and dialog boxes.

### Backend:
- **Node.js**: JavaScript runtime for server-side programming.
- **Express.js**: Web application framework for building APIs.

### Database:
- **MongoDB**: NoSQL database for storing user data and tasks.

---

## Installation

### Prerequisites:
- Node.js and npm installed on your system.
- MongoDB set up locally or on a cloud service.

### Steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/TaskZen.git
   cd TaskZen
   ```

2. Set up the backend:
   ```bash
   cd backend
   npm install
   ```

   - Create a `.env` file in the `backend` folder with the following variables:
     ```
     MONGO_URI=<your-mongo-db-uri>
     JWT_SECRET=<your-jwt-secret>
     PORT=4000
     ```

   - Start the server:
     ```bash
     npm start
     ```

3. Set up the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

   - Create a `.env` file in the `frontend` folder with the following variable:
     ```
     VITE_BACKEND_URL=http://localhost:4000
     ```

   - Start the development server:
     ```bash
     npm run dev
     ```

4. Access the application:
   - Open your browser and navigate to `http://localhost:5173`.

---

## Project Structure

```
task-management-app/
├── backend/
│   ├── controllers/     # Controllers for handling API requests
│   ├── models/          # Mongoose models for User and Notes
│   ├── routes/          # API routes
│   └── index.js        # Entry point for the backend
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── assets/      # assets
│   │   ├── pages/       # Pages like Login, Signup, Dashboard
│   │   ├── utils/       # for reusable logic
│   │   ├── App.jsx      # Main application component
│   │   └── main.jsx     # Entry point for React app
│   └── vite.config.js   # Vite configuration
│
└── README.md
```

---

## API Endpoints

### User Authentication:
- **POST /api/users/register**: Register a new user.
- **POST /api/users/login**: Log in an existing user.

### Notes Management:
- **GET /api/notes**: Get all notes for the logged-in user.
- **POST /api/notes**: Create a new note.
- **GET /api/notes/:id**: Get a specific note by ID.
- **PUT /api/notes/:id**: Update a specific note by ID.
- **DELETE /api/notes/:id**: Delete a specific note by ID.

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgments

- [MERN Stack Documentation](https://mern.io)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/guide/)
- [React Toastify](https://fkhadra.github.io/react-toastify/introduction)