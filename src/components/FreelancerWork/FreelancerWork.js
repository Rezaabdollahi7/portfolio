import React from "react";
const FreelancerWork = () => {
    return (
        <section id="freelancer" className="w-[95%]  lg:w-[90%]  rounded-tr-9xl rounded-br-9xl px-8 lg:px-28 py-12 -mb-[75%]  lg:-mb-[19%] relative  z-40  bg-pattern-2 bg-center bg-cover bg-blend-multiply bg-blue-700 grid grid-cols-1   lg:grid-cols-2 gap-10  lg:gap-10 items-center  justify-center " >
            {/* text section */}
            <div className="freeTxt order-1  ">
                <p className=" text-xl lg:text-2xl font-semibold text-white">I Am Available For</p>
                <h4 className="text-4xl  lg:text-6xl font-bold text-white mt-4 " >Freelance Work</h4>
                <p className="mt-4 lg:text-xl  text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                <div className="btn-wrapper mt-16  ">
                    <a href="#" className=" bg-white text-favblue-50 px-12 py-4 rounded-xl font-semibold hover:bg-favblue-100 hover:text-white transition-all duration-300 delay-75 " >DOWNLOAD CV</a>
                </div>
            </div>

            {/* photo section */}
            <div className="freePic lg:order-2">
                <img src={process.env.PUBLIC_URL + '/images/freelanceWork.png'} alt="" />
            </div>
        </section>
    );
};

export default FreelancerWork;