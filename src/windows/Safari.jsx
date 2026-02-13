// windows/Safari.jsx

import { WindowControlls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import {
  Search,
  Plus,
  Copy,
  Share,
  ShieldHalf,
  ChevronLeft,
  ChevronRight,
  PanelLeft,
} from "lucide-react";
import { projects } from "#constants";
import { useState } from "react";
import ProjectsGrid from "#components/ProjectsGrid";
import ProjectDetail from "#components/ProjectDetail";
import SafariTabs from "#components/SafariTabs";

const Safari = () => {
  const [isTabLoading, setIsTabLoading] = useState(false);

  // Tab state management
  const [tabs, setTabs] = useState([
    { id: "projects", title: "Projects", type: "projects" },
  ]);
  const [activeTabId, setActiveTabId] = useState("projects");

  // Tab handlers
  const handleTabClick = (tabId) => {
    setActiveTabId(tabId);
  };

  const handleCloseTab = (tabId) => {
    if (tabs.length === 1) return;

    setTabs((prev) => prev.filter((tab) => tab.id !== tabId));

    if (activeTabId === tabId) {
      setActiveTabId(tabs[0].id);
    }
  };

  const handleNewTab = () => {
    const newTabId = `projects-${Date.now()}`;
    const newTab = { id: newTabId, title: "Projects", type: "projects" };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newTabId);
  };

  const handleProjectClick = (project) => {
    setIsTabLoading(true);

    const projectTabId = `project-${project.id}`;
    const existingTab = tabs.find((tab) => tab.id === projectTabId);

    if (existingTab) {
      setActiveTabId(projectTabId);
    } else {
      const newTab = {
        id: projectTabId,
        title: project.title,
        type: "project-detail",
        projectId: project.id,
      };
      setTabs((prev) => [...prev, newTab]);
      setActiveTabId(projectTabId);
    }

    // Simulate loading
    setTimeout(() => {
      setIsTabLoading(false);
    }, 100);
  };

  const handleBackToProjects = () => {
    setIsTabLoading(true);

    const projectsTab = tabs.find((tab) => tab.id === "projects");

    if (projectsTab) {
      setActiveTabId("projects");
    } else {
      const newTab = { id: "projects", title: "Projects", type: "projects" };
      setTabs((prev) => [...prev, newTab]);
      setActiveTabId("projects");
    }

    setTimeout(() => {
      setIsTabLoading(false);
    }, 100);
  };

  // Get active tab content
  const getTabContent = () => {
    const activeTab = tabs.find((tab) => tab.id === activeTabId);

    if (!activeTab) return null;

    // Show loading skeleton when switching tabs
    if (isTabLoading && activeTab.type === "project-detail") {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading project...</p>
          </div>
        </div>
      );
    }

    switch (activeTab.type) {
      case "projects":
        return (
          <ProjectsGrid
            projects={projects}
            onProjectClick={handleProjectClick}
          />
        );

      case "project-detail":
        const project = projects.find((p) => p.id === activeTab.projectId);
        return project ? (
          <ProjectDetail project={project} onBack={handleBackToProjects} />
        ) : null;

      default:
        return null;
    }
  };

  // Get URL for address bar
  const getAddressBarUrl = () => {
    const activeTab = tabs.find((tab) => tab.id === activeTabId);

    if (!activeTab) return "https://portfolio.com";

    switch (activeTab.type) {
      case "projects":
        return "https://portfolio.com/projects";

      case "project-detail":
        const project = projects.find((p) => p.id === activeTab.projectId);
        return project
          ? `https://portfolio.com/projects/${project.title
              .toLowerCase()
              .replace(/\s+/g, "-")}`
          : "";

      default:
        return "https://portfolio.com";
    }
  };

  return (
    <section id="safari">
      {/* Window Header */}
      <div id="window-header" className="border-b border-gray-700/50">
        <WindowControlls target="safari" />
        <PanelLeft className="ml-10 icon" />

        <div className="flex items-center gap-1 ml-5">
          <ChevronRight className="icon" />
          <ChevronLeft className="icon" />
        </div>

        <div className="flex-1 flex-center gap-3">
          <ShieldHalf className="icon" />
          <div className="search">
            <Search className="icon" />
            <input
              type="text"
              value={getAddressBarUrl()}
              readOnly
              className="flex-1 bg-transparent"
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Share className="icon" />
          <Plus className="icon" />
          <Copy className="icon" />
        </div>
      </div>

      {/* Tabs */}
      <SafariTabs
        tabs={tabs}
        activeTabId={activeTabId}
        onTabClick={handleTabClick}
        onCloseTab={handleCloseTab}
        onNewTab={handleNewTab}
      />

      {/* Tab Content */}
      <div className="tab-content min-h-[calc(30rem)] max-h-[40rem] overflow-y-scroll">
        {getTabContent()}
      </div>
    </section>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");
export default SafariWindow;
