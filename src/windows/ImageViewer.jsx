import WindowHeader from "../components/window/WindowHeader";
import { useT } from "../i18n";

const ImageViewer = ({ data }) => {
  const t = useT();
  if (!data) return <WindowHeader title={t("window.imgfile")} />;
  const { name, imageUrl } = data;

  return (
    <>
      <WindowHeader title={name} backLabel={t("win.back")} />
      <div className="window-body image-viewer">
        <img src={imageUrl} alt={name} decoding="async" />
      </div>
    </>
  );
};

export default ImageViewer;
