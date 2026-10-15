import { useMemo, useState } from "react";
import clsx from "clsx";
import { Images } from "lucide-react";
import WindowHeader from "../components/window/WindowHeader";
import Lightbox from "../components/Lightbox";
import { useContent } from "../i18n/content";
import { useT, localizeDigits } from "../i18n";

// Albums = projects. "Library" = every screenshot.
const buildAlbums = (projects, libraryName) => [
  {
    id: "library",
    name: libraryName,
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
  const { projects } = useContent();
  const t = useT();
  const albums = useMemo(() => buildAlbums(projects, t("photos.library")), [projects, t]);
  const [albumId, setAlbumId] = useState("library");
  const [lightbox, setLightbox] = useState(null);
  const album = albums.find((a) => a.id === albumId);
  const images = useMemo(() => album.photos.map((p) => p.src), [album]);

  return (
    <>
      <WindowHeader title={t("photos.title")}>
        <span className="header-count">{t("photos.count", { count: album.photos.length })}</span>
      </WindowHeader>

      <div className="window-body photos-layout @container">
        <aside className="photos-sidebar" aria-label={t("photos.albums")}>
          <p className="sidebar-heading">{t("photos.albums")}</p>
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
                  <span className="sidebar-count">{localizeDigits(a.photos.length)}</span>
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
              aria-label={t("photos.open", { title: photo.project })}
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
