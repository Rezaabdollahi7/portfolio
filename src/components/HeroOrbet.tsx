import { PropsWithChildren } from "react";

export default function HeroOrbet({
  children,
  size,
  rotation,
}: PropsWithChildren<{ size: number; rotation: number }>) {
  return (
    <div className="absolute size-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2   ">
      <div
        className="  "
        style={{
          height: `${size}px`,
          width: `${size}px`,
          transform: `rotate(${rotation}deg)`,
        }}
      >
        <div className=" inline-flex animate-pulse">{children}</div>
      </div>
    </div>
  );
}
