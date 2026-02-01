import { WindowControlls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import { Search } from "lucide-react";
import { Plus } from "lucide-react";
import { Copy } from "lucide-react";
import { Share } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { PanelLeft } from "lucide-react";
import { blogPosts } from "../constants";
import { MoveRight } from "lucide-react";

const Safari = () => {
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
              placeholder="Search or Enter website name"
              className="flex-1"
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Share className="icon" />
          <Plus className="icon" />
          <Copy className="icon" />
        </div>
      </div>

      <div className="blog">
        <h2>My Developer Blog</h2>

        <div className="space-y-8">
          {blogPosts.map(({ id, image, title, date, link }) => (
            <div key={id} className="blog-post">
              <div className="col-span-2">
                <img src={image} alt={title} />
              </div>

              <div className="content">
                <p>{date}</p>
                <h3>{title}</h3>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  Ckeck Out the full post
                  <MoveRight className="icon-hover" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");
export default SafariWindow;
