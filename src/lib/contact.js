// Contact form delivery. Works with any service that accepts a JSON POST,
// e.g. Formspree (https://formspree.io/f/<id>) or Web3Forms
// (https://api.web3forms.com/submit + VITE_CONTACT_ACCESS_KEY).
// Without an endpoint the form falls back to the visitor's email app.

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT?.trim() || "";
const ACCESS_KEY = import.meta.env.VITE_CONTACT_ACCESS_KEY?.trim() || "";

export const contactConfigured = ENDPOINT.startsWith("https://");

export const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

export const sendMessage = async ({ name, email, subject, message, topic }) => {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name,
      email,
      subject,
      message,
      topic,
      // Formspree reads these; others ignore them.
      _replyto: email,
      _subject: subject,
      ...(ACCESS_KEY && { access_key: ACCESS_KEY, from_name: "srezadev.ir" }),
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false || data.ok === false) {
    throw new Error(data.message || data.error || `HTTP ${res.status}`);
  }
};

export const mailtoHref = (to, { name, subject, message }) =>
  `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    name ? `${message}\n\n${name}` : message,
  )}`;
