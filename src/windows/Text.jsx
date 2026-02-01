import { WindowControlls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";

const Text = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile?.data;

  if (!data) {
    return null;
  }

  const { name, image, subtitle, description } = data;

  return (
    <section id="txtfile">
      <div id="window-header">
        <WindowControlls target="txtfile" />
        <h2>{name || "Text File"}</h2>
      </div>
      <div className="p-5 space-y-6 bg-white">
        {image ? (
          <div className="w-full">
            <img src={image} alt={name} className="w-full h-auto rounded" />
          </div>
        ) : null}
        {subtitle ? (
          <h3 className="text-lg font-semibold">{subtitle}</h3>
        ) : null}
        {Array.isArray(description) && description.length > 0 ? (
          <div className="space-y-3 leading-relaxed text-base text-gray-800">
            {description.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No content available</p>
        )}
      </div>
    </section>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");
export default TextWindow;
