// components/ProjectDetailTabs.jsx

import React, { useState, useEffect, useCallback } from "react";
import {
  Monitor,
  Image,
  Video,
  Code,
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ─── Lightbox ─────────────────────────────────────────────────────────────────

const Lightbox = ({ screenshots, initialIndex, onClose }) => {
  const [current, setCurrent] = useState(initialIndex);

  const prev = useCallback(() => {
    setCurrent((i) => (i === 0 ? screenshots.length - 1 : i - 1));
  }, [screenshots.length]);

  const next = useCallback(() => {
    setCurrent((i) => (i === screenshots.length - 1 ? 0 : i + 1));
  }, [screenshots.length]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, onClose]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-modal" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose}>
          <X className="w-5 h-5" />
        </button>

        <div className="lightbox-counter">
          {current + 1} / {screenshots.length}
        </div>

        <div className="lightbox-img-wrapper">
          <img
            key={current}
            src={screenshots[current]}
            alt={`Screenshot ${current + 1}`}
            className="lightbox-img"
          />
        </div>

        {screenshots.length > 1 && (
          <>
            <button className="lightbox-arrow left" onClick={prev}>
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button className="lightbox-arrow right" onClick={next}>
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {screenshots.length > 1 && (
          <div className="lightbox-dots">
            {screenshots.map((_, i) => (
              <button
                key={i}
                className={"lightbox-dot" + (i === current ? " active" : "")}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        )}

        {screenshots.length > 1 && (
          <div className="lightbox-thumbs">
            {screenshots.map((src, i) => (
              <div
                key={i}
                className={"lightbox-thumb" + (i === current ? " active" : "")}
                onClick={() => setCurrent(i)}
              >
                <img src={src} alt={"thumb " + (i + 1)} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────

const ProjectDetailTabs = ({ project }) => {
  const [activeTab, setActiveTab] = useState("screenshots");
  const [lightboxIndex, setLightboxIndex] = useState(null);

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
    <>
      {lightboxIndex !== null && (
        <Lightbox
          screenshots={project.screenshots}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      <div className="project-detail-tabs mb-12">
        <div className="flex gap-1 border-b border-gray-400/50 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={
                "flex items-center gap-2 px-5 py-3 font-medium transition-all duration-300 relative group " +
                (activeTab === tab.id
                  ? "text-blue-900 dark:text-white"
                  : "text-gray-400 hover:text-gray-600 hover:cursor-pointer")
              }
            >
              {tab.icon}
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-sky-700 rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === "screenshots" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {project.screenshots.map((screenshot, index) => (
                <div
                  key={index}
                  className="aspect-video rounded-xl overflow-hidden border border-gray-300 hover:border-blue-500/50 transition-all duration-300 cursor-zoom-in group relative shadow-lg hover:shadow-xl hover:shadow-blue-500/20"
                  onClick={() => setLightboxIndex(index)}
                >
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300 z-10" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="bg-black/60 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                      Click to expand
                    </div>
                  </div>
                  <img
                    src={screenshot}
                    alt={"Screenshot " + (index + 1)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === "video" && project.videoUrl && (
            <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-gray-800 shadow-2xl">
              <video
                src={project.videoUrl}
                controls
                className="w-full h-full object-cover"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          {activeTab === "video" && !project.videoUrl && (
            <div className="flex-center flex-col aspect-video border-2 border-dashed border-gray-700 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/30">
              <Video className="w-16 h-16 text-gray-600 mb-4" />
              <p className="text-gray-400 text-lg">No video demo available</p>
            </div>
          )}

          {activeTab === "live" && project.demoUrl && (
            <div className="relative w-full h-[600px] rounded-xl overflow-hidden border-2 border-gray-800 shadow-2xl">
              <iframe
                src={project.demoUrl.trim()}
                title={project.title + " Demo"}
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
                <code>{`// ${project.title}
// Built with ${project.techStack.map((t) => t.name).join(", ")}

import React from 'react';

const ${project.title.replace(/\s+/g, "")} = () => {
  return (
    <div className="project-container">
      <h1>${project.title}</h1>
      <p>${project.description}</p>
    </div>
  );
};

export default ${project.title.replace(/\s+/g, "")};`}</code>
              </pre>
              <div className="mt-4 p-4 bg-blue-900/30 border-l-4 border-blue-500 rounded-r-lg">
                <p className="text-xs text-blue-200">
                  <span className="font-semibold">Note:</span> This is a sample
                  code structure. View the complete source code on GitHub for
                  the full implementation.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectDetailTabs;
