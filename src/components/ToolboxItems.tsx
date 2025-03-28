export default function ToolboxItems({
  items,
}: {
  items: { title: string; icon: React.ReactNode }[];
}) {
  return (
    <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex flex-none">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex py-2 px-3 rounded-lg outline-2 outline-white/10 items-center gap-4"
          >
            <span>{item.icon}</span>
            <span className="font-semibold">{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
