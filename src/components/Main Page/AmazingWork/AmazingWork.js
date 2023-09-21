import React from "react";

const AmazingWork  = () => {
    return(
        <section id="amazingWork" className="w-[92%] mx-auto ">
            <div className="tittle-wrap flex justify-center mt-32 items-center flex-col w-full">
                <h3 className="text-4xl  lg:text-6xl text-favblue-100 font-bold " >My Amaz<span className="bg-purple-500/10 rounded-3xl py-1 mx-1">ing</span> <span className="text-favblue-50 f-conveat">Works</span> </h3>
                <p className="px-4 lg:px-0 lg:text-xl text-center  mt-8 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod <br />  tempor incididunt ut labore et dolore.</p>
            </div>
            {/* grid wrapper */}
            <div className="works-wrapper my-16 grid lg:grid-cols-4 gap-6 lg:grid-rows-7 lg:h-[50rem]">
                <div className="item bg-sky-400 text-white lg:col-span-1 row-span-3 rounded-5xl overflow-hidden "><img src={process.env.PUBLIC_URL + '/images/AmazingWork/pic-1.jpg'} className="w-full h-full hover:scale-110 hover:rotate-2 transition-all duration-300 delay-75 ease-in-out "  alt="" /></div>
                <div className="item bg-sky-400 text-white lg:col-span-2 row-span-5 rounded-5xl overflow-hidden "><img src={process.env.PUBLIC_URL + '/images/AmazingWork/pic-2.jpg'} className="w-full h-full hover:scale-110 hover:rotate-2 transition-all duration-300 delay-75 ease-in-out "  alt="" /></div>
                <div className="item bg-sky-400 text-white lg:col-span-1 row-span-3 rounded-5xl overflow-hidden "><img src={process.env.PUBLIC_URL + '/images/AmazingWork/pic-3.jpg'} className="w-full h-full hover:scale-110 hover:rotate-2 transition-all duration-300 delay-75 ease-in-out "  alt="" /></div>
                <div className="item bg-sky-400 text-white lg:col-span-1 row-span-4 rounded-5xl overflow-hidden "><img src={process.env.PUBLIC_URL + '/images/AmazingWork/pic-4.jpg'} className="w-full h-full hover:scale-110 hover:rotate-2 transition-all duration-300 delay-75 ease-in-out "  alt="" /></div>
                <div className="item bg-sky-400 text-white lg:col-span-1 row-span-4 rounded-5xl overflow-hidden "><img src={process.env.PUBLIC_URL + '/images/AmazingWork/pic-7.jpg'} className="w-full h-full hover:scale-110 hover:rotate-2 transition-all duration-300 delay-75 ease-in-out "  alt="" /></div>
                <div className="item bg-sky-400 text-white lg:col-span-1 row-span-2 rounded-5xl overflow-hidden "><img src={process.env.PUBLIC_URL + '/images/AmazingWork/pic-6.jpg'} className="w-full h-full hover:scale-110 hover:rotate-2 transition-all duration-300 delay-75 ease-in-out "  alt="" /></div>
                <div className="item bg-sky-400 text-white lg:col-span-1 row-span-2 rounded-5xl overflow-hidden "><img src={process.env.PUBLIC_URL + '/images/AmazingWork/pic-5.jpg'} className="w-full h-full hover:scale-110 hover:rotate-2 transition-all duration-300 delay-75 ease-in-out "  alt="" /></div>
            </div>
            <div className="works-desc text-center mb-16 ">
                <p className="lg:text-xl text-gray-500">Want to see my professional work. <a href="#" className="text-lg lg:text-2xl text-favblue-50 hover:text-favblue-100 font-semibold underline underline-offset-8 decoration-favblue-50 hover:decoration-favblue-100 transition-all"> Click here to View More</a></p>
            </div>
        </section>
    );
};
export default AmazingWork ;