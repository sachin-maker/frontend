import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProjectView = () => {
  const [project, setProject] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getProject = async () => {
      try {
        const { data } = await axios.get(
          `https://backend1-ebon.vercel.app/api/v1/project/get/${id}`,
          { withCredentials: true }
        );
        setProject(data.project);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch project");
      }
    };
    getProject();
  }, [id]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen px-5 md:px-0 relative bg-gray-100 dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* 🔥 Background Blur Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-[100px] opacity-30"
        style={{
          backgroundImage: `url(${
            project?.projectBanner?.url || "/avatarHolder.jpg"
          })`,
        }}
      />

      {/* Project Card */}
      <motion.div
        className="max-w-3xl w-full bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 backdrop-blur-lg bg-opacity-80 dark:bg-opacity-80"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          {project ? project.title : <Skeleton width={200} height={30} />}
        </h1>

        {/* Banner */}
        {project ? (
          <motion.img
            src={project.projectBanner?.url || "/avatarHolder.jpg"}
            alt={project.title}
            className="w-full h-64 object-cover rounded-lg mt-4 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          />
        ) : (
          <Skeleton height={250} className="w-full rounded-lg mt-4" />
        )}

        {/* Description */}
        <motion.div className="mt-6 text-gray-700 dark:text-gray-300">
          <p className="text-xl font-semibold">📖 Description:</p>
          {project ? (
            <ul className="list-disc pl-6 space-y-1">
              {project.description.split(". ").map((sentence, index) => (
                <li key={index}>{sentence}</li>
              ))}
            </ul>
          ) : (
            <Skeleton count={4} className="mt-2" />
          )}
        </motion.div>

        {/* Technologies */}
        <motion.div className="mt-6">
          <p className="text-xl font-semibold mb-2">🛠 Technologies:</p>
          {project ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {project.technologies.split(", ").map((tech, index) => (
                <span
                  key={index}
                  className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-lg text-sm font-medium text-center shadow-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          ) : (
            <Skeleton height={20} width="80%" className="mt-2" />
          )}
        </motion.div>

        {/* Stack */}
        <motion.p className="mt-6 text-lg text-gray-800 dark:text-gray-300">
          <strong>📌 Stack:</strong>{" "}
          {project ? project.stack : <Skeleton width={100} />}
        </motion.p>

        {/* Deployment Info */}
        <motion.p className="mt-3 text-lg text-gray-800 dark:text-gray-300">
          <strong>🚀 Deployed:</strong>{" "}
          {project ? project.deployed : <Skeleton width={150} />}
        </motion.p>

        {/* Links */}
        <motion.div className="mt-6 flex flex-col gap-3">
          <p className="text-xl font-semibold">🔗 Links:</p>
          {project ? (
            <>
              <Link
                to={project.gitRepoLink}
                target="_blank"
                className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 transition-all"
              >
                GitHub Repository
              </Link>
              <Link
                to={project.projectLink}
                target="_blank"
                className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 transition-all"
              >
                Live Project
              </Link>
            </>
          ) : (
            <Skeleton width={200} />
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectView;
