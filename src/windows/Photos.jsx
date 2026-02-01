import { WindowControlls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import { gallery, photosLinks } from "#constants";
import useWindowStore from "../store/window";
import { Mail } from "lucide-react";
import { Search } from "lucide-react";

const Photos = () => {
  const { openWindow } = useWindowStore();

  return (
    <section id="photos">
      <div id="window-header">
        <WindowControlls target="photos" />

        <div className="w-full flex justify-end items-center gap-3 text-gray-500">
          <Mail className="icon" />
          <Search className="icon" />
        </div>
      </div>

      <div className="flex w-full min-w-2xl">
        <div className="sidebar">
          <h2>Photos</h2>
          <ul>
            {photosLinks.map(({ id, icon, title }) => (
              <li key={id}>
                <img src={icon} alt={title} />
                <p>{title}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="gallery">
          <ul>
            {gallery.map(({ id, img }) => (
              <li
                key={id}
                onClick={() =>
                  openWindow("imgfile", {
                    id,
                    name: "gallery Image",
                    icon: "/images/image.png",
                    kind: "file",
                    fileType: "img",
                    umageUrl: img,
                  })
                }
              >
                <img src={img} alt={`Gallery image ${id}`} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
const PhotosWindow = WindowWrapper(Photos, "photos");
export default PhotosWindow;
