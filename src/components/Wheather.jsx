import { wheather } from "#constants";

const Wheather = () => {
  return (
    <section
      id="wheather"
      className=" w-72 h-68 absolute top-6 p-5 right-[calc(2%+19.5rem)] bg-linear-to-b from-[#14497d] to-[#5286ba] rounded-4xl text-white flex flex-col gap-2"
    >
      <p className="text-2xl font-bold">{wheather.city}</p>
      <p className="text-7xl font-medium mt-4">{wheather.degre}</p>
      <img src={wheather.img} alt="whether icon" className="size-8" />
      <p className="font-semibold">{wheather.text}</p>
      <p>{wheather.minMax}</p>
    </section>
  );
};

export default Wheather;
