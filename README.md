# EdTech | Employee Training Portal

A modern, responsive EdTech platform allowing users (students/employees) to browse and enroll in training courses. Built with **Next.js**, **TypeScript**, **Redux Toolkit**, **MongoDB**, and **Tailwind CSS**.

---

## Overview

This Employee Training Portal enables users to:

- View all available training courses
- Read course details (description, duration, prerequisites, etc.)
- Enroll or unenroll in a course (tracked via Redux global state)
- Search/filter courses by keywords
- Access personal dashboard with enrolled courses

## Features Implemented

### Home Page

- Lists all courses from MongoDB
- Displays title, short description, and duration
- Includes a search bar to filter courses by title/description (case-insensitive)
- Clickable cards to view full course details

### Course Details Page

- Shows full course description, instructor, and prerequisites
- "Enroll" button updates Redux store and UI
- Displays confirmation on enroll/unenroll

### My Courses Page

- Displays only the courses enrolled by the logged-in student
- Styled grid layout using Tailwind
- Message and call-to-action link if user hasn't enrolled in any course

### User Role Handling

- Only users with role `"student"` see the enroll button
- Button toggles based on enrollment status
- student get learner dashboard when login
- admin get admin dashboard when login

### Dashboard

- Dashboard page shows user's actions and links
- Metadata added for SEO
- admin dashboard create post link where he can create another corse post

### SEO Metadata

Each page uses metadata with title, description, keywords, and Open Graph data:

- Home
- About
- Contact
- My Courses
- Dashboard

---

## Technologies Used

- **Next.js** (Pages Directory)
- **TypeScript**
- **Redux Toolkit** for global state
- **Tailwind CSS** for styling and responsive layout
- **MongoDB** for course storage
- **SweetAlert2** for visual feedback

---

## How to Run Locally

npm run dev

### 1. Clone the repository

```bash
git clone https://github.com/jeanboscob77/EdTech.git
cd edtech
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/edtech
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
/app              → api
/components       → Reusable components (CourseCard, Navbar, Footer) SearchBar
/app              → for pages page, /about, /my-courses, /dashoard, /contact, api/courses,users,contacts
/store            →👉 store
                   👉coursesSlices
                   👉reduxProvider

/user             → Login  (AppInitializer)
/app              → (if App Router is mixed for layout or metadata)
```

---

## Design Decisions

- Redux was used to manage enrollments globally across pages.
- MongoDB was used for persistent backend data.
- Tailwind was chosen for rapid, consistent responsive UI design.
- Role-based rendering ensures students see appropriate actions only.

---

## 📝 Additional Notes

- Uses dynamic API route `/api/courses` to get all courses or filter by `id` or `userId`
- Each page is optimized with individual metadata export
- Responsive design across mobile, tablet, desktop

---

## 🌐 Deployment

Deployed on Vercel (or other platform). Visit: [https://your-domain.com](https://your-domain.com)

---

## 📜 License

MIT License
