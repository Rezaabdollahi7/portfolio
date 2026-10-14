import WindowHeader from "../components/window/WindowHeader";

const ImageViewer = ({ data }) => {
  if (!data) return <WindowHeader title="Preview" />;
  const { name, imageUrl } = data;

  return (
    <>
      <WindowHeader title={name} backLabel="Back" />
      <div className="window-body image-viewer">
        <img src={imageUrl} alt={name} decoding="async" />
      </div>
    </>
  );
};

export default ImageViewer;
