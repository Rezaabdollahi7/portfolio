// components/SafariTabs.jsx

import React from "react";
import { X, Plus } from "lucide-react";

const SafariTabs = ({
  tabs,
  activeTabId,
  onTabClick,
  onCloseTab,
  onNewTab,
}) => {
  return (
    <div className="safari-tabs  ">
      <div className="flex items-center gap-2 px-4 py-2">
        {/* Tab List */}
        <div className="flex-1 flex gap-1.5 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`
                safari-tab flex items-center gap-2.5 px-4 py-2 rounded-t-lg cursor-pointer
                transition-all duration-300 relative group overflow-hidden
                ${
                  activeTabId === tab.id
                    ? "bg-linear-to-r from-blue-500/20 to-blue-700/20 text-white shadow-lg shadow-blue-500/20 border border-blue-500/30"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-transparent hover:border-gray-600/50"
                }
              `}
              onClick={() => onTabClick(tab.id)}
            >
              {/* Background Gradient for Active Tab */}
              {activeTabId === tab.id && (
                <div className="absolute inset-0 bg-linear-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}

              {/* Tab Content */}
              <div className="flex items-center gap-2 min-w-0">
                {tab.type === "projects" ? (
                  <svg
                    className="w-4 h-4 shrink-0 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                ) : tab.type === "project-detail" ? (
                  <svg
                    className="w-4 h-4 shrink-0 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                ) : tab.type === "blog" ? (
                  <svg
                    className="w-4 h-4 shrink-0 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 shrink-0 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                )}
                <span className="text-sm font-medium truncate max-w-[180px] text-black/60">
                  {tab.title}
                </span>
              </div>

              {/* Close Button */}
              {tabs.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseTab(tab.id);
                  }}
                  className={`
                    ml-1.5 p-1 rounded-full opacity-50 group-hover:opacity-100
                    transition-all duration-200 hover:bg-white/20 hover:scale-110
                    ${activeTabId === tab.id ? "opacity-100" : ""}
                  `}
                  aria-label="Close tab"
                >
                  <X className="size-3 text-black hover:text-black/60" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* New Tab Button */}
        <button
          onClick={onNewTab}
          className="flex items-center justify-center w-9 h-9 rounded-full  transition-all duration-300 group border border-blue-500/30 hover:border-blue-500/50"
          aria-label="New tab"
        >
          <Plus className="w-4 h-4 text-blue-400 group-hover:rotate-90 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default SafariTabs;
