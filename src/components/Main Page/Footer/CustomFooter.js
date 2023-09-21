import React from "react";

const CustomFooter = () => {
    return(
        <footer className="w-full flex flex-col lg:flex-row justify-between items-center py-8 lg:w-[90%] mx-auto px-6 ">
            <p className="lg:text-lg text-gray-500  ">© 2022 All Right Reserved.</p>
            <a href="#" className="lg:ml-auto lg:text-lg text-gray-500  mt-4 lg:mt-0 "> Terms & Condition</a>
            <a href="#" className="lg:text-lg text-gray-500 lg:ml-4 lg:border-l-2 border-favblue-100 lg:pl-4  mt-4 lg:mt-0  "> Privacy Policy</a>
        </footer>
    );
};

export default CustomFooter ;