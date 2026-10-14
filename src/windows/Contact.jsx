import { Copy, Github, Linkedin, Mail, MessageCircle, Phone, Send } from "lucide-react";
import WindowHeader from "../components/window/WindowHeader";
import { profile, socials } from "#constants";
import { useNow } from "../hooks/useNow";
import { copyEmail } from "../lib/actions";

const tehranTime = (date) =>
  new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: profile.timezone,
  }).format(date);

const ICONS = { github: Github, linkedin: Linkedin, telegram: Send, email: Mail };

const Contact = () => {
  const now = useNow();
  const telegram = socials.find((s) => s.id === "telegram");

  const actions = [
    { label: "message", icon: MessageCircle, href: telegram.href },
    { label: "call", icon: Phone, href: profile.phoneHref },
    { label: "mail", icon: Mail, href: `mailto:${profile.email}` },
  ];

  return (
    <>
      <WindowHeader title="Contacts" backLabel="Home" />
      <div className="window-body contact-card">
        <div className="contact-hero">
          <div className="contact-avatar" aria-hidden="true">
            {profile.initials}
          </div>
          <h1 className="contact-name">{profile.name}</h1>
          <p className="contact-role">
            {profile.role} · {profile.location}
          </p>
          <p className="contact-time">
            <span className="tabular-nums">{tehranTime(now)}</span> local time in Tehran
          </p>
          <p className="availability">
            <span className="availability-dot" aria-hidden="true" />
            {profile.availability}
          </p>
        </div>

        <div className="contact-actions">
          {actions.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              className="contact-action"
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
            </a>
          ))}
          <button type="button" className="contact-action" onClick={copyEmail}>
            <Copy aria-hidden="true" />
            <span>copy email</span>
          </button>
        </div>

        <dl className="contact-rows">
          <div className="contact-row">
            <dt>email</dt>
            <dd>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </dd>
          </div>
          <div className="contact-row">
            <dt>phone</dt>
            <dd>
              <a href={profile.phoneHref} className="tabular-nums">
                {profile.phone}
              </a>
            </dd>
          </div>
          <div className="contact-row">
            <dt>website</dt>
            <dd>
              <a href={profile.website}>srezadev.ir</a>
            </dd>
          </div>
          {socials
            .filter((s) => s.id !== "email")
            .map((s) => {
              const Icon = ICONS[s.id];
              return (
                <div key={s.id} className="contact-row">
                  <dt>{s.label.toLowerCase()}</dt>
                  <dd>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      <Icon aria-hidden="true" className="contact-row-icon" />
                      {s.handle}
                    </a>
                  </dd>
                </div>
              );
            })}
        </dl>

        <p className="contact-note">
          Got an idea, a bug to fix, or just want to talk tech? Email or Telegram
          is the fastest way to reach me.
        </p>
      </div>
    </>
  );
};

export default Contact;
