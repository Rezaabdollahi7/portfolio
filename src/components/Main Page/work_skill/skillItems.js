const SkillItem = (props) => {
    return (
        <div className="skill-item bg-pattern-2 bg-center bg-cover rounded-7xl border-6 border-gray-200 p-10  ">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 200 200" class="h-10 w-10 outline outline-gray-300 outline-offset-8  rounded-lg ">{props.svg}</svg>
            <h5 className='text-2xl text-favblue-100 font-bold mt-6'>{props.name}</h5>
            <p className='mt-5 text-lg text-gray-400'>{props.desc}</p>
            <div className="range-wrapper flex items-center  w-full h-2 rounded-md mt-8 bg-gray-500">
                <div className="range-blue w-[60%] bg-favblue-50 h-2 rounded-md"></div>
                <span className='bg-favblue-50 py-4 px-3 rounded-lg  z-10 h-4 flex items-center text-white'>{props.Percent}</span>
            </div>
        </div>
    );
};

export default SkillItem;