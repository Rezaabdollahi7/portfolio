import WindowHeader from "../components/window/WindowHeader";
import { useT } from "../i18n";

const Text = ({ data }) => {
  const t = useT();
  if (!data) return <WindowHeader title={t("window.txtfile")} />;
  const { name, title, subtitle, description = [] } = data;

  return (
    <>
      <WindowHeader title={name} backLabel={t("win.back")} />
      <article className="window-body text-doc">
        {title && <h1 className="text-doc-title">{title}</h1>}
        {subtitle && <p className="text-doc-subtitle">{subtitle}</p>}
        {description.map((para) => (
          <p key={para.slice(0, 32)} className="prose-p">
            {para}
          </p>
        ))}
      </article>
    </>
  );
};

export default Text;
