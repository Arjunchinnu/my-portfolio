import About from "./about/About";
import PostData from "./admin/PostData";
import Footer from "./Footer";
import Hero from "./Home/Hero";
import Login from "./login/Login";
import Navbar from "./Navbar";
import Portfolio from "./portfolio/Portfolio";
import Resume from "./resume/Resume";
import EditForm from "./portfolio/EditForm";
import PageNotFound from "./PageNotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [projects, setProjects] = useState([]);

  // Fetch projects from backend
  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/displayProjects");
      setProjects(res.data.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  useEffect(() => {
    fetchProjects(); // load once on mount
  }, []);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <Resume />
              <Portfolio data={projects} setData={setProjects} />
              <PostData onProjectAdded={fetchProjects} />
              <Footer />
            </>
          }
        />

        <Route path="/edit/:id" element={<EditForm />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
