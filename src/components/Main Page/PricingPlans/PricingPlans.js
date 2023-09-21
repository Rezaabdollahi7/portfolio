import React from "react";

const PricingPlans = () => {
    return (
        <section id="PricingPlans" className="w-ull pt-64  lg:pt-80 pb-16   bg-plans  bg-center bg-cover bg-blend-multiply " >
            <div className="tittle-wrap flex justify-center mt-32 items-center flex-col w-full">
                <h3 className="text-4xl  lg:text-6xl text-favblue-100 font-bold " >My Pric<span className="bg-white rounded-3xl py-1 mx-1">ing</span> <span className="text-favblue-50 f-conveat">Plans</span> </h3>
                <p className="px-4 lg:px-0 lg:text-xl text-center  mt-8 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod <br />  tempor incididunt ut labore et dolore.</p>
            </div>

            {/* items wrap */}
            <div className="item-wrap grid lg:grid-cols-3 gap-10 w-[93%]  lg:w-[80%] mx-auto mt-16  ">
                {/* item 1 */}
                <div className="item flex flex-col items-start justify-start  ">
                    <div className="item-tittle bg-pattern-4  rounded-tr-3xl rounded-tl-3xl w-full bg-cover bg-blend-multiply    px-16 pb-8 pt-16  lg:pt-24 ">
                        <h5 className=" text-2xl text-favblue-100 font-bold capitalize">STANDARD PLAN</h5>
                    </div>

                    <div className="item-body flex flex-col items-start pl-16 justify-start bg-pattern-2 bg-center bg-cover  border-6 border-t-0  border-gray-200 rounded-b-2xl  w-full ">
                        <p className="text-4xl  lg:text-6xl mt-8 text-favblue-100 font-bold"><span className="text-favblue-50 text-3xl "> $ </span>80.99</p>
                        <p className="mt-4 font-semibold  lg:text-xl text-favblue-50">Monthly Package</p>
                        <ul className="mt-5">
                            <li className="lg:text-lg text-gray-500 mt-2" >Web Development</li>
                            <li className="lg:text-lg text-gray-500 mt-2" >Digital Marketing</li>
                            <li className="lg:text-lg text-gray-500 mt-2" >Graphic Design</li>
                            <li className="lg:text-lg text-gray-500 mt-2" >24/Support</li>
                        </ul>
                        <button className="my-12 px-12 py-4 bg-favblue-50 text-white font-bold lg:text-lg rounded-xl hover:bg-white hover:text-favblue-50 border-2 border-transparent  hover:border-2 hover:border-favblue-50  transition-all duration-300 delay-75 ">CHOOSE NOW</button>
                    </div>
                </div>

                {/* item 2 */}
                <div className="item flex flex-col items-start justify-start mt-12  ">
                    <div className="item-tittle bg-pattern-4 bg-blend-multiply bg-center bg-blue-700  rounded-tr-3xl rounded-tl-3xl w-full bg-cover  px-16 pb-8 pt-24 ">
                        <h5 className=" text-2xl text-white font-bold capitalize">STANDARD PLAN</h5>
                    </div>

                    <div className="item-body flex flex-col items-start pl-16 justify-start bg-pattern-2 bg-center bg-cover bg-blend-multiply  bg-blue-700  rounded-b-2xl  w-full ">
                        <p className="text-6xl mt-8 text-white font-bold"><span className="text-white text-3xl "> $ </span>80.99</p>
                        <p className="mt-4 font-semibold  text-xl text-favblue-50">Monthly Package</p>
                        <ul className="mt-5">
                            <li className="text-lg text-gray-200 mt-2" >Web Development</li>
                            <li className="text-lg text-gray-200 mt-2" >Digital Marketing</li>
                            <li className="text-lg text-gray-200 mt-2" >Graphic Design</li>
                            <li className="text-lg text-gray-200 mt-2" >24/Support</li>
                        </ul>
                        <button className="my-12 z-50 px-12 py-4 bg-white text-favblue-50 font-bold text-lg rounded-xl hover:bg-favblue-100 hover:text-white border-2 border-transparent  hover:border-2 hover:border-favblue-50  transition-all duration-300 delay-75 ">CHOOSE NOW</button>
                    </div>
                </div>

                {/* item 3 */}
                <div className="item flex flex-col items-start justify-start  ">
                    <div className="item-tittle bg-pattern-4  rounded-tr-3xl rounded-tl-3xl w-full bg-cover bg-blend-multiply    px-16 pb-8 pt-16  lg:pt-24 ">
                        <h5 className=" text-2xl text-favblue-100 font-bold capitalize">STANDARD PLAN</h5>
                    </div>

                    <div className="item-body flex flex-col items-start pl-16 justify-start bg-pattern-2 bg-center bg-cover  border-6 border-t-0  border-gray-200 rounded-b-2xl  w-full ">
                        <p className="text-4xl  lg:text-6xl mt-8 text-favblue-100 font-bold"><span className="text-favblue-50 text-3xl "> $ </span>80.99</p>
                        <p className="mt-4 font-semibold  lg:text-xl text-favblue-50">Monthly Package</p>
                        <ul className="mt-5">
                            <li className="lg:text-lg text-gray-500 mt-2" >Web Development</li>
                            <li className="lg:text-lg text-gray-500 mt-2" >Digital Marketing</li>
                            <li className="lg:text-lg text-gray-500 mt-2" >Graphic Design</li>
                            <li className="lg:text-lg text-gray-500 mt-2" >24/Support</li>
                        </ul>
                        <button className="my-12 px-12 py-4 bg-favblue-50 text-white font-bold lg:text-lg rounded-xl hover:bg-white hover:text-favblue-50 border-2 border-transparent  hover:border-2 hover:border-favblue-50  transition-all duration-300 delay-75 ">CHOOSE NOW</button>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default PricingPlans;