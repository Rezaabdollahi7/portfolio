import { WindowControlls } from "#components";
import { socials } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";

const Contact = () => {
  return (
    <section id="contact">
      <div id="window-header">
        <WindowControlls target="contact" />
        <h2>Contact Me</h2>
      </div>

      <div className="p-5 space-y-5">
        <img
          src="/images/adrian.jpg"
          alt="Reza"
          className="w-20 rounded-full"
        />
        <h3>Lets Connect</h3>
        <p>Got an idea ? A bug to fix ? or just wanna talk tech ? Im in</p>
        <p>Srezaabdollahi7@gmail.com</p>
        <ul>
          {socials.map(({ id, bg, link, icon, text }) => (
            <li key={id} style={{ background: bg }}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                <img src={icon} alt={text} className="size-5" />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow;
