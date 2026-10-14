import { Fragment } from "react";
import { openInternalLink } from "../lib/actions";

const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

// Renders plain text with [label](url) links. "app:…" links open windows.
const RichText = ({ text }) => {
  const parts = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const [whole, label, href] = match;
    if (match.index > last) parts.push(text.slice(last, match.index));
    parts.push(
      href.startsWith("app:") ? (
        <button
          key={match.index}
          type="button"
          className="text-link"
          onClick={() => openInternalLink(href)}
        >
          {label}
        </button>
      ) : (
        <a
          key={match.index}
          className="text-link"
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {label}
        </a>
      ),
    );
    last = match.index + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.map((part, i) => <Fragment key={i}>{part}</Fragment>);
};

export default RichText;
