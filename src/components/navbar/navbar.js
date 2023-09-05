

import React, { useEffect } from 'react';
import './navbar.css';

const Navbar = () => {
    useEffect(() => {
        const menu_btn = document.getElementById('menu-btn');
        const menu = document.getElementById('menu');

        menu_btn.addEventListener('click', function () {
            menu_btn.classList.toggle('open');
            menu.classList.toggle('flex');
            menu.classList.toggle('hidden');
        });

        // حذف event listener در هنگام unmount کردن کامپوننت
        return () => {
            menu_btn.removeEventListener('click', function () {
                menu_btn.classList.toggle('open');
                menu.classList.toggle('flex');
                menu.classList.toggle('hidden');
            });
        };
    }, []);

    return (
        <nav className='relative container mx-auto p-6'>
            {/* flex container for all items  */}
            <div className='flex items-center justify-between'>
                {/* flex container for logo menu  */}
                <div className='flex items-center space-x-20'>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANsAAAAoCAYAAAB3hY/3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA25pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3MUE3QTZCODQzNkRFQzExQUU1QzhBQUQyNEFDMTY4MyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4RTc1QURCQTMzOEQxMUVEQjBBRkZFQkYzMjdDMkM2RSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4RTc1QURCOTMzOEQxMUVEQjBBRkZFQkYzMjdDMkM2RSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDplOGUwNmRlNi1kN2YwLTZkNDEtYWFlMy1iOWYwMzkwNjJhNDAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzFBN0E2Qjg0MzZERUMxMUFFNUM4QUFEMjRBQzE2ODMiLz4gPC9yZGY6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" alt='logo' ></img>
                    {/* left menu */}
                    <div className=' space-x-8 font-bold lg:flex'>
                        <a className='text-gray-500' href='#' >Home</a>
                        <a className='text-gray-500' href='#' >Home</a>
                        <a className='text-gray-500' href='#' >Home</a>
                    </div>
                </div>
                {/* right buttons menu */}
                <div className='hidden lg:flex items-center space-x-6 font-bold text-gray-400'>
                    <div className=''>Login</div>
                    <a className='px-8 py-3 font-bold text-white bg-cyan-500 rounded-full '>ُsign up</a>
                </div>
                {/* hamburger menu  */}
                <button id='menu-btn' className='block hamburger  lg:hidden focus:outline-none cursor-pointer w-[24px] h-[24px] transition-all relative ' type='button'>
                    <span className='hamburger-top absolute w-[24px] h-[3px] top-0 left-0   '></span>
                    <span className='hamburger-middle absolute w-[24px] h-[3px] top-0 left-0   '></span>
                    <span className='hamburger-bottom absolute w-[24px] h-[3px] top-0 left-0   '></span>
                </button>
            </div>
            {/* Mobile Menu */}
            <div id='menu' className='hidden  absolute  p-6 rounded-lg bg-blue-600 left-6 right-6 top-20 z-100'>
                <div className='flex items-center justify-center flex-col w-full space-y-6 font-bold text-white rounded-sm'>
                    <a className='w-full text-center'>Feauth</a>
                    <a className='w-full text-center'>Feauth</a>
                    <a className='w-full text-center'>Feauth</a>
                    <a className='w-full text-center pt-6 border-t border-gray-400'>Feauth</a>
                    <a className='w-full text-center'>Feauth</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
