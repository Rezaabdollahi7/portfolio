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
  MoveRight,
} from "lucide-react";
import { blogPosts } from "#constants";
import { useEffect, useState } from "react";

const Safari = ({ data }) => {
  const demoUrl = data?.demoUrl;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (demoUrl) setIsLoading(true);
  }, [demoUrl]);

  const handleLoad = () => setIsLoading(false);

  return (
    <section id="safari">
      <div id="window-header">
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
              placeholder={demoUrl ? demoUrl : "Search or Enter website name"}
              className="flex-1"
              readOnly={!!demoUrl}
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Share className="icon" />
          <Plus className="icon" />
          <Copy className="icon" />
        </div>
      </div>

      {demoUrl ? (
        <div className="demo-container w-full h-[calc(100%-40px)] relative">
          {isLoading && (
            <div className="absolute inset-0 flex-center bg-white text-gray-500">
              Loading demo...
            </div>
          )}
          <iframe
            src={demoUrl}
            title="Project Demo"
            className="w-full h-full border-none"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
            onLoad={handleLoad}
          />
        </div>
      ) : (
        <div className="blog p-6 overflow-y-auto h-[calc(100%-40px)]">
          <h2 className="text-2xl font-bold mb-6">My Developer Blog</h2>
          <div className="space-y-8">
            {blogPosts.map(({ id, image, title, date, link }) => (
              <div
                key={id}
                className="blog-post grid grid-cols-[2fr_3fr] gap-4"
              >
                <div>
                  <img src={image} alt={title} className="rounded-lg w-full" />
                </div>
                <div className="content flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{date}</p>
                    <h3 className="font-semibold mt-1">{title}</h3>
                  </div>
                  <a
                    href={link.trim()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline flex items-center gap-1 mt-2"
                  >
                    Check out the full post
                    <MoveRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");
export default SafariWindow;
