import useWindowStore from "#store/window";

const WindowControlls = ({ target }) => {
  const { closeWindow } = useWindowStore();
  return (
    <div id="window-controls">
      <div className="close" onClick={() => closeWindow(target)}></div>
      <div className="minimize"></div>
      <div className="maximize"></div>
    </div>
  );
};

export default WindowControlls;
