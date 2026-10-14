import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { Check, Circle, Pin, Search, SquarePen } from "lucide-react";
import WindowHeader from "../components/window/WindowHeader";
import { useWindowContext } from "../components/window/WindowContext";
import RichText from "../components/RichText";
import { useContent } from "../i18n/content";
import { useT } from "../i18n";
import { useBackLayer } from "../hooks/useBackLayer";

const plain = (text) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

const preview = (note) => {
  const block = note.blocks.find((b) => b.type === "p" || b.type === "ul");
  if (!block) return "";
  return plain(block.type === "p" ? block.text : block.items[0]);
};

const searchable = (note) =>
  [
    note.title,
    ...note.blocks.flatMap((b) =>
      b.text ? [b.text, b.label ?? ""] : (b.items ?? []).map((i) => i.text ?? i),
    ),
  ]
    .join(" ")
    .toLowerCase();

const Block = ({ block }) => {
  const t = useT();
  switch (block.type) {
    case "h1":
      return <h1 className="note-h1">{block.text}</h1>;
    case "h2":
      return <h2 className="note-h2">{block.text}</h2>;
    case "p":
      return (
        <p className="note-p">
          <RichText text={block.text} />
        </p>
      );
    case "ul":
      return (
        <ul className="note-ul">
          {block.items.map((item) => (
            <li key={item}>
              <RichText text={item} />
            </li>
          ))}
        </ul>
      );
    case "row":
      return (
        <p className="note-row">
          <span className="note-row-label">{block.label}</span>
          <span>{block.text}</span>
        </p>
      );
    case "todo":
      return (
        <ul className="note-todo">
          {block.items.map((item) => (
            <li key={item.text} data-done={item.done}>
              {item.done ? (
                <Check aria-label={t("notes.done")} className="note-check" />
              ) : (
                <Circle aria-label={t("notes.todo")} className="note-circle" />
              )}
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
};

const Notes = ({ data, openCount }) => {
  const { isMobile, isVisible } = useWindowContext();
  const { notes } = useContent();
  const t = useT();
  const [activeId, setActiveId] = useState(data?.noteId ?? notes[0].id);
  // On phones the list is its own screen, like iOS Notes.
  const [showList, setShowList] = useState(!data?.noteId);
  const [query, setQuery] = useState("");
  const contentRef = useRef(null);

  // Opened with a specific note (Spotlight, a link, the desktop).
  const [handled, setHandled] = useState(openCount);
  if (openCount !== handled) {
    setHandled(openCount);
    if (data?.noteId) {
      setActiveId(data.noteId);
      setShowList(false);
    }
  }

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 });
  }, [activeId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? notes.filter((n) => searchable(n).includes(q)) : notes;
  }, [query, notes]);

  const active = notes.find((n) => n.id === activeId) ?? notes[0];
  const pinned = filtered.filter((n) => n.pinned);
  const others = filtered.filter((n) => !n.pinned);

  const select = (id) => {
    setActiveId(id);
    setShowList(false);
  };

  const renderGroup = (label, items, icon) =>
    items.length > 0 && (
      <div className="notes-group">
        <h3 className="notes-group-title">
          {icon}
          {label}
        </h3>
        <ul>
          {items.map((note) => (
            <li key={note.id}>
              <button
                type="button"
                className={clsx("note-item", note.id === active.id && "is-active")}
                aria-current={note.id === active.id ? "true" : undefined}
                onClick={() => select(note.id)}
              >
                <span className="note-item-title">
                  <span aria-hidden="true">{note.emoji}</span> {note.title}
                </span>
                <span className="note-item-meta">
                  <span className="note-item-date">{note.date}</span>
                  <span className="note-item-preview">{preview(note)}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );

  const listView = isMobile && showList;
  useBackLayer(isMobile && !showList, () => setShowList(true), { enabled: isVisible });

  return (
    <>
      <WindowHeader
        title={isMobile ? (listView ? t("notes.title") : "") : t("notes.title")}
        backLabel={isMobile && !listView ? t("notes.title") : undefined}
        onBack={isMobile && !listView ? () => setShowList(true) : undefined}
        className="notes-header"
      >
        <SquarePen aria-hidden="true" className="notes-compose" />
      </WindowHeader>

      <div className="window-body notes-layout @container">
        {(!isMobile || listView) && (
          <aside className="notes-sidebar" aria-label={t("notes.all")}>
            <label className="search-field">
              <Search aria-hidden="true" />
              <span className="sr-only">{t("notes.searchLabel")}</span>
              <input
                type="search"
                placeholder={t("notes.search")}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            {renderGroup(t("notes.pinned"), pinned, <Pin aria-hidden="true" />)}
            {renderGroup(t("notes.notes"), others)}
            {filtered.length === 0 && (
              <p className="notes-empty">{t("notes.none", { q: query })}</p>
            )}
          </aside>
        )}

        {(!isMobile || !listView) && (
          <article ref={contentRef} className="notes-content">
            <p className="note-date">{active.date}</p>
            {active.blocks.map((block, i) => (
              <Block key={`${active.id}-${i}`} block={block} />
            ))}
          </article>
        )}
      </div>
    </>
  );
};

export default Notes;
