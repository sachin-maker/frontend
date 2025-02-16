import {
  ExternalLink,
  Github,
  Linkedin,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { motion } from "framer-motion";

const ShimmerHero = () => (
  <div className="animate-pulse space-y-6 p-6 rounded-lg shadow-md max-w-2xl mx-auto text-center md:text-left">
    <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
    <div className="h-10 w-60 bg-gray-300 dark:bg-gray-700 rounded"></div>
    <div className="h-10 w-80 bg-gray-300 dark:bg-gray-700 rounded"></div>
    <div className="flex gap-5 mt-5">
      <div className="h-7 w-7 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      <div className="h-7 w-7 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
    </div>
    <div className="h-12 w-40 bg-gray-300 dark:bg-gray-700 rounded mt-6"></div>
    <div className="h-6 w-full bg-gray-300 dark:bg-gray-700 rounded mt-8"></div>
  </div>
);

const Hero = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get(
          "https://backend1-ebon.vercel.app/api/v1/user/portfolio/me",
          { withCredentials: true }
        );
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getMyProfile();
  }, []);

  const handleResumeClick = () => {
    window.open("/sachin_deshpande_resume.pdf", "_blank");
  };

  if (!user) return <ShimmerHero />;

  return (
    <motion.div
      className="w-full text-center md:text-left"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div className="flex items-center gap-2 mb-2">
        <span className="bg-green-400 animate-pulse rounded-full h-2 w-2 shadow-md"></span>
        <p>Online</p>
      </motion.div>

      <h1 className="text-3xl font-bold text-indigo-500">Hey, I'm {user.name}</h1>
      <h1 className="text-xl text-gray-700 dark:text-gray-300">
        <Typewriter words={["Frontend Developer", "MERN Stack Developer"]} loop cursor />
      </h1>

      <motion.div className="flex gap-5 mt-5">
        {user.linkedInURL && (
          <Link to={user.linkedInURL} target="_blank" className="text-sky-500">
            <Linkedin className="w-7 h-7" />
          </Link>
        )}
      </motion.div>

      <motion.div className="mt-6 flex gap-4">
        <Link to={user.githubURL} target="_blank">
          <Button className="bg-gray-900 text-white flex items-center gap-2 px-6 py-2">
            <Github /> Github
          </Button>
        </Link>
        <Button onClick={handleResumeClick} className="bg-indigo-600 text-white px-6 py-2">
          <ExternalLink /> Resume
        </Button>
      </motion.div>

      <motion.p className="mt-8 text-lg text-gray-700 dark:text-gray-300">{user.aboutMe}</motion.p>
    </motion.div>
  );
};

export default Hero;
