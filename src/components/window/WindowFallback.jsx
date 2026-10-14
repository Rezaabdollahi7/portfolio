import WindowHeader from "./WindowHeader";

const WindowFallback = ({ title }) => (
  <>
    <WindowHeader title={title} />
    <div className="window-body grid place-items-center" aria-busy="true">
      <div className="spinner" aria-label="Loading" />
    </div>
  </>
);

export default WindowFallback;
