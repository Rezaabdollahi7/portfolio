import { useMemo, useState } from "react";
import clsx from "clsx";
import { Images } from "lucide-react";
import WindowHeader from "../components/window/WindowHeader";
import Lightbox from "../components/Lightbox";
import { projects } from "#constants";

// Albums = projects. "Library" = every screenshot.
const albums = [
  {
    id: "library",
    name: "Library",
    cover: projects[0].thumbnail,
    photos: projects.flatMap((p) => p.screenshots.map((src) => ({ src, project: p.title }))),
  },
  ...projects.map((p) => ({
    id: p.id,
    name: p.title,
    cover: p.thumbnail,
    photos: p.screenshots.map((src) => ({ src, project: p.title })),
  })),
];

const Photos = () => {
  const [albumId, setAlbumId] = useState("library");
  const [lightbox, setLightbox] = useState(null);
  const album = albums.find((a) => a.id === albumId);
  const images = useMemo(() => album.photos.map((p) => p.src), [album]);

  return (
    <>
      <WindowHeader title="Photos" backLabel="Home">
        <span className="header-count">{album.photos.length} photos</span>
      </WindowHeader>

      <div className="window-body photos-layout @container">
        <aside className="photos-sidebar" aria-label="Albums">
          <p className="sidebar-heading">Albums</p>
          <ul>
            {albums.map((a) => (
              <li key={a.id}>
                <button
                  type="button"
                  className={clsx("sidebar-item", a.id === albumId && "is-active")}
                  aria-current={a.id === albumId ? "true" : undefined}
                  onClick={() => setAlbumId(a.id)}
                >
                  {a.id === "library" ? (
                    <Images aria-hidden="true" className="sidebar-glyph" />
                  ) : (
                    <img src={a.cover} alt="" aria-hidden="true" className="album-thumb" />
                  )}
                  <span className="truncate">{a.name}</span>
                  <span className="sidebar-count">{a.photos.length}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="photos-grid">
          {album.photos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              className="photo-tile"
              onClick={() => setLightbox(i)}
              aria-label={`Open ${photo.project} screenshot`}
            >
              <img src={photo.src} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <Lightbox
          images={images}
          index={lightbox}
          title={album.name}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
};

export default Photos;
