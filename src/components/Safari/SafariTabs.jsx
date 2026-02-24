// components/SafariTabs.jsx

import React from "react";
import { X, Plus } from "lucide-react";
import { Sparkle } from "lucide-react";
import { AppWindow } from "lucide-react";

const SafariTabs = ({
  tabs,
  activeTabId,
  onTabClick,
  onCloseTab,
  onNewTab,
}) => {
  return (
    <div className="safari-tabs shrink-0 ">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-black/20">
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
                <div className="absolute inset-0 bg-linear-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity " />
              )}

              {/* Tab Content */}
              <div className="flex items-center gap-2 min-w-0">
                {tab.type === "projects" ? (
                  <Sparkle className="w-4 h-4 flex-shrink-0 text-blue-400" />
                ) : tab.type === "project-detail" ? (
                  <AppWindow className="w-4 h-4 flex-shrink-0 text-green-400" />
                ) : (
                  <AppWindow className="w-4 h-4 flex-shrink-0 text-gray-400" />
                )}
                <span className="text-sm font-medium truncate max-w-[180px] text-black/60 dark:text-white">
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
