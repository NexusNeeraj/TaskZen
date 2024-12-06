import React from "react";
import remiderImg from '../../assets/reminders.svg';
import customImg from '../../assets/customizable.svg';
import easyImg from '../../assets/easyToUse.svg';
import organise from '../../assets/organise.webp';
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      {/* Header Section */}
      <header className="w-full bg-blue-600 text-white p-5 shadow-md">
        <h1 className="text-center text-4xl font-bold">My ToDo</h1>
        <p className="text-center text-lg mt-2">Stay organized, stay productive!</p>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center w-11/12 mt-10 lg:mt-16 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Image */}
        <div className="lg:w-1/2">
          <img
            src={organise}
            alt="Organized Workspace"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="p-10 lg:w-1/2">
          <h2 className="text-3xl font-bold text-blue-600">Organize Your Life</h2>
          <p className="text-gray-700 mt-4">
            Keep track of your tasks, set deadlines, and achieve your goals with our easy-to-use
            ToDo app. Create, edit, and manage your tasks effortlessly.
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500">
            <Link to="/login">Get Started</Link>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-11/12 mt-16">
        <h2 className="text-3xl font-bold text-center text-gray-800">Features</h2>
        <div className="flex flex-col lg:flex-row justify-between items-center mt-10 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center w-full lg:w-1/3">
            <img
              src={easyImg}
              alt="Easy to Use"
              className="mx-auto mb-4 w-24 h-24"
            />
            <h3 className="text-2xl font-semibold text-blue-600">Easy to Use</h3>
            <p className="text-gray-600 mt-2">
              Simple and intuitive interface for managing your tasks.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center w-full lg:w-1/3">
            <img
              src={customImg}
              alt="Customizable"
              className="mx-auto mb-4 w-24 h-24 rounded-full"
            />
            <h3 className="text-2xl font-semibold text-blue-600">Customizable</h3>
            <p className="text-gray-600 mt-2">
              Personalize your experience with custom categories and themes.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center w-full lg:w-1/3">
            <img
              src={remiderImg}
              alt="Reminders"
              className="mx-auto mb-4 w-24 h-24"
            />
            <h3 className="text-2xl font-semibold text-blue-600">Smart Reminders</h3>
            <p className="text-gray-600 mt-2">
              Never miss a task with timely notifications and reminders.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 w-full bg-blue-600 text-white py-5">
        <p className="text-center">© 2024 My ToDo App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
