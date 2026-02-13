// components/ProjectDetailTabs.jsx

import React, { useState } from "react";
import { Monitor, Image, Video, Code, ExternalLink } from "lucide-react";

const ProjectDetailTabs = ({ project }) => {
  const [activeTab, setActiveTab] = useState("screenshots");

  const tabs = [
    {
      id: "screenshots",
      label: "Screenshots",
      icon: <Image className="w-4 h-4" />,
    },
    { id: "video", label: "Video Demo", icon: <Video className="w-4 h-4" /> },
    { id: "live", label: "Live Demo", icon: <Monitor className="w-4 h-4" /> },
    { id: "code", label: "Source Code", icon: <Code className="w-4 h-4" /> },
  ];

  return (
    <div className="project-detail-tabs mb-12">
      {/* Tab Headers */}
      <div className="flex gap-1 border-b border-gray-400/50 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 px-5 py-3 font-medium transition-all duration-300 relative group
              ${
                activeTab === tab.id
                  ? "text-gray-800"
                  : "text-gray-400 hover:text-gray-600 hover:cursor-pointer"
              }
            `}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-sky-700 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Screenshots Tab */}
        {activeTab === "screenshots" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {project.screenshots.map((screenshot, index) => (
              <div
                key={index}
                className="aspect-video rounded-xl overflow-hidden border border-gray-300 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group relative shadow-lg hover:shadow-xl hover:shadow-blue-500/20"
              >
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                <img
                  src={screenshot}
                  alt={`Screenshot ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        )}

        {/* Video Tab */}
        {activeTab === "video" && project.videoUrl && (
          <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-gray-800 shadow-2xl">
            <video
              src={project.videoUrl}
              controls
              className="w-full h-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-gray-500 hidden">
              <div className="text-center">
                <Video className="w-12 h-12 mb-3 text-gray-600" />
                <p className="text-lg">Video not available</p>
              </div>
            </div>
          </div>
        )}
        {activeTab === "video" && !project.videoUrl && (
          <div className="flex-center flex-col aspect-video border-2 border-dashed border-gray-700 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/30">
            <Video className="w-16 h-16 text-gray-600 mb-4" />
            <p className="text-gray-400 text-lg">No video demo available</p>
          </div>
        )}

        {/* Live Demo Tab */}
        {activeTab === "live" && project.demoUrl && (
          <div className="relative w-full h-[600px] rounded-xl overflow-hidden border-2 border-gray-800 shadow-2xl">
            <iframe
              src={project.demoUrl.trim()}
              title={`${project.title} Demo`}
              className="w-full h-full border-none"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
              loading="lazy"
            />
          </div>
        )}
        {activeTab === "live" && !project.demoUrl && (
          <div className="flex-center flex-col aspect-video border-2 border-dashed border-gray-700 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/30">
            <Monitor className="w-16 h-16 text-gray-600 mb-4" />
            <p className="text-gray-400 text-lg">Live demo not available</p>
            <a
              href={project.sourceUrl.trim()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              View Source Code
            </a>
          </div>
        )}

        {/* Code Tab */}
        {activeTab === "code" && (
          <div className="bg-gray-900 rounded-xl p-6 border-2 border-gray-800 overflow-x-auto">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-sm text-gray-500">
                src/components/Project.js
              </span>
            </div>
            <pre className="text-sm text-gray-300 font-mono bg-gray-950 rounded-lg p-6 overflow-x-auto">
              <code>
                {`// ${project.title}
// Built with ${project.techStack.map((t) => t.name).join(", ")}

import React from 'react';

const ${project.title.replace(/\s+/g, "")} = () => {
  return (
    <div className="project-container">
      <h1>${project.title}</h1>
      <p>${project.description}</p>
      
      {/* Project features */}
      <div className="features">
        {project.results.map((result, index) => (
          <div key={index} className="feature">
            {result}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ${project.title.replace(/\s+/g, "")};`}
              </code>
            </pre>
            <div className="mt-4 p-4 bg-blue-900/30 border-l-4 border-blue-500 rounded-r-lg">
              <p className="text-xs text-blue-200">
                <span className="font-semibold">Note:</span> This is a sample
                code structure. View the complete source code on GitHub for the
                full implementation.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailTabs;
