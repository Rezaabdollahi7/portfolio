import { Copy, Github, Mail, MessageCircle, Phone, Send } from "lucide-react";
import WindowHeader from "../components/window/WindowHeader";
import { useNow } from "../hooks/useNow";
import { copyEmail, openWindow } from "../lib/actions";
import { useContent } from "../i18n/content";
import { formatDate, useLocale, useT } from "../i18n";

const ICONS = { github: Github, telegram: Send, email: Mail };

const Contact = () => {
  const now = useNow();
  const t = useT();
  const locale = useLocale();
  const { profile, socials } = useContent();
  const telegram = socials.find((s) => s.id === "telegram");
  const time = formatDate(now, { hour: "numeric", minute: "2-digit", timeZone: profile.timezone }, locale);

  const actions = [
    { key: "message", icon: MessageCircle, href: telegram.href },
    { key: "call", icon: Phone, href: profile.phoneHref },
  ];

  return (
    <>
      <WindowHeader title={t("contact.title")} />
      <div className="window-body contact-card">
        <div className="contact-hero">
          <img
            className="contact-avatar"
            src="/images/profile/reza-256.webp"
            alt={profile.name}
            width="96"
            height="96"
            decoding="async"
          />
          <h1 className="contact-name">{profile.name}</h1>
          <p className="contact-role">
            {profile.role} · {profile.location}
          </p>
          <p className="contact-time tabular-nums">{t("contact.localTime", { time })}</p>
          <p className="availability">
            <span className="availability-dot" aria-hidden="true" />
            {profile.availability}
          </p>
        </div>

        <div className="contact-actions">
          {actions.map(({ key, icon: Icon, href }) => (
            <a
              key={key}
              href={href}
              className="contact-action"
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              <Icon aria-hidden="true" />
              <span>{t(`contact.${key}`)}</span>
            </a>
          ))}
          <button type="button" className="contact-action" onClick={() => openWindow("mail")}>
            <Mail aria-hidden="true" />
            <span>{t("contact.mail")}</span>
          </button>
          <button type="button" className="contact-action" onClick={copyEmail}>
            <Copy aria-hidden="true" />
            <span>{t("contact.copy")}</span>
          </button>
        </div>

        <dl className="contact-rows">
          <div className="contact-row">
            <dt>{t("contact.email")}</dt>
            <dd>
              <a href={`mailto:${profile.email}`} className="ltr">
                {profile.email}
              </a>
            </dd>
          </div>
          <div className="contact-row">
            <dt>{t("contact.phone")}</dt>
            <dd>
              <a href={profile.phoneHref} className="ltr tabular-nums">
                {profile.phone}
              </a>
            </dd>
          </div>
          <div className="contact-row">
            <dt>{t("contact.website")}</dt>
            <dd>
              <a href={profile.website} className="ltr">
                srezadev.ir
              </a>
            </dd>
          </div>
          {socials
            .filter((s) => s.id !== "email")
            .map((s) => {
              const Icon = ICONS[s.id];
              return (
                <div key={s.id} className="contact-row">
                  <dt>{t(`contact.${s.id}`)}</dt>
                  <dd>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      <Icon aria-hidden="true" className="contact-row-icon" />
                      <span className="ltr">{s.handle}</span>
                    </a>
                  </dd>
                </div>
              );
            })}
        </dl>

        <p className="contact-note">{t("contact.note")}</p>
      </div>
    </>
  );
};

export default Contact;
