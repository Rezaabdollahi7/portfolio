import { GiStarShuriken } from "react-icons/gi";

export default function AboutCardHeader({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="card-header">
      <div className="flex items-center gap-2">
        <GiStarShuriken className="size-9 text-emerald-300" />
        <h3 className="font-serif text-3xl">{title}</h3>
      </div>
      <p className="text-sm text-white/60 mt-2 ">{desc}</p>
    </div>
  );
}
