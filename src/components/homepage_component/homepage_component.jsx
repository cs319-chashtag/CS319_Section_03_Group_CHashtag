import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomepageComponent() {
    const navigate = useNavigate();

    return (
        <div class="bg-[#5B2928] w-full h-screen">
            <nav class="p-12 w-full h-min border-gray-200 rounded  dark:bg-gray-800 dark:border-gray-700">
                <div class="container flex flex-wrap items-center justify-between mx-auto">
                    <div class="flex gap-12">
                        <img
                            src={require("../../assets/bilkent.png")}
                            width="100"
                            height="50"
                        />
                        <a href="#" class="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="300"
                                height="75"
                                viewBox="0 0 409.667 79"
                            >
                                <g
                                    id="Group_1"
                                    data-name="Group 1"
                                    transform="translate(-122.333 -93.667)"
                                >
                                    <text
                                        id="Erasmouse"
                                        transform="translate(263 150)"
                                        fill="#fff"
                                        font-size="48"
                                        font-family="Montserrat-Regular, Montserrat"
                                    >
                                        <tspan x="0" y="0">
                                            Erasmouse
                                        </tspan>
                                    </text>
                                    <g
                                        id="laboratory-mouse-svgrepo-com"
                                        transform="translate(80.333 236.242)"
                                    >
                                        <path
                                            id="Path_1"
                                            data-name="Path 1"
                                            d="M110.093,104.147H92.443A19.2,19.2,0,0,0,94.949,94.02c0-18.524-18.026-33.595-40.184-33.595a44.335,44.335,0,0,0-27.276,8.927,16.484,16.484,0,0,0-7.968-2.008c-8.072,0-14.638,5.566-14.638,12.408A11.194,11.194,0,0,0,7.731,87.1,20.2,20.2,0,0,0,0,102.633c0,3.791,1.145,6.594,3.5,8.571,4.178,3.507,10.976,3.452,18.849,3.388,2.139-.017,15.37-.058,17.861-.425,4.613.354,9.713.407,14.555.407,10.309,0,20.169-.214,27.5-2.8a23.136,23.136,0,0,0,5.644-2.833h22.182c3.448,0,6.253,2.378,6.253,5.3s-2.805,5.3-6.253,5.3H39.713c-6.4,0-11.659,4.411-11.73,9.833a9.153,9.153,0,0,0,3.39,7.1,12.774,12.774,0,0,0,8.34,2.951H81.172a2.429,2.429,0,1,0,0-4.792H39.713a6.619,6.619,0,0,1-4.321-1.529,4.741,4.741,0,0,1-1.756-3.679c.036-2.809,2.762-5.094,6.076-5.094h70.38c6.565,0,11.907-4.527,11.907-10.092S116.658,104.147,110.093,104.147ZM10.536,79.752c0-4.2,4.031-7.616,8.985-7.616s8.985,3.416,8.985,7.616a6.545,6.545,0,0,1-.129,1.285q-1.365-.124-2.752-.124a28.954,28.954,0,0,0-13.436,3.233A6.844,6.844,0,0,1,10.536,79.752ZM28.955,109.8c-1.087-.009-2.2-.018-3.33-.018s-2.243.009-3.33.018c-6.608.054-12.314.1-14.817-2-1.227-1.03-1.824-2.72-1.824-5.166C5.653,93.3,14.612,85.7,25.625,85.7a23.109,23.109,0,0,1,6.992,1.069,3.255,3.255,0,0,0,2.66-.311,2.281,2.281,0,0,0,1.153-2.056q-.012-.2-.012-.4c0-4.2,4.03-7.615,8.984-7.615s8.985,3.416,8.985,7.615c0,4.054-3.738,7.395-8.509,7.6a2.93,2.93,0,0,0-2.3,1.186,2.08,2.08,0,0,0-.086,2.278,14.7,14.7,0,0,1,2.1,7.557c0,2.446-.6,4.136-1.824,5.166C41.27,109.9,35.561,109.853,28.955,109.8Zm51.139-2.452c-6.369,2.248-15.615,2.434-25.329,2.434-1.851,0-3.738-.009-5.615-.038a11.271,11.271,0,0,0,2.1-7.11A18.568,18.568,0,0,0,49.956,95.8c5.881-1.625,10.084-6.31,10.084-11.8,0-6.841-6.566-12.407-14.638-12.407a15.62,15.62,0,0,0-11.726,4.99A11.593,11.593,0,0,0,31.552,72.7a38.206,38.206,0,0,1,23.213-7.479c19.04,0,34.531,12.921,34.531,28.8C89.3,100.991,86.458,105.1,80.094,107.348Z"
                                            transform="translate(42 -203)"
                                            fill="#fff"
                                        />
                                        <circle
                                            id="Ellipse_1"
                                            data-name="Ellipse 1"
                                            cx="5"
                                            cy="5"
                                            r="5"
                                            transform="translate(59.969 -113.193)"
                                            fill="#fff"
                                        />
                                    </g>
                                </g>
                            </svg>
                        </a>
                    </div>
                    <div
                        class="hidden w-full md:block md:w-auto"
                        id="navbar-solid-bg"
                    >
                        <ul class="flex flex-col mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                            <li>
                                <button class="relative inline-block text-lg group uppercase tracking-widest">
                                    <span class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                                        <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                                        <span class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                                        <span class="relative font-montserrat">
                                            Contact
                                        </span>
                                    </span>
                                    <span
                                        class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                                        data-rounded="rounded-lg"
                                    ></span>
                                </button>
                            </li>
                            <li>
                                <button
                                    class="relative inline-block text-lg group uppercase tracking-widest"
                                    onClick={() => {
                                        navigate("/loginSelection");
                                    }}
                                >
                                    <span class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                                        <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                                        <span class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                                        <span class="relative font-montserrat">
                                            Login
                                        </span>
                                    </span>
                                    <span
                                        class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                                        data-rounded="rounded-lg"
                                    ></span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="flex">
                <div className="pl-32 py-8">
                    <p className="p-16 font-montserrat text-3xl font-bold tracking-wide text-white uppercase">
                        Erasmus Application Webpage
                    </p>
                    <p class="px-16 py-1 font-montserrat text-5xl font-bold tracking-wide text-white uppercase">
                        There are
                    </p>
                    <p class="px-16 py-2 font-montserrat text-5xl font-bold tracking-wide text-white uppercase">
                        40d 12h 36m
                    </p>
                    <p class="px-16 py-1 font-montserrat text-5xl font-bold tracking-wide text-white uppercase">
                        Time left
                    </p>
                    <div className="px-16 py-8">
                        <button className="w-48 h-16 bg-white rounded-md text-black text-lg uppercase font-bold font-montserrat tracking-wide">
                            Apply Now
                        </button>
                    </div>
                </div>
                <div className="pl-12 w-1/2">
                    <div className="pb-4 tracking-wider font-montserrat text-white uppercase">
                        <p>Browse Universites</p>
                    </div>

                    <div className=" bg-white mr-12 rounded-lg">
                        <div className="px-16 pt-16">
                            <img
                                src={require("../../assets/university2.jpg")}
                                width="1000"
                            />
                        </div>
                        <div className="container flex flex-wrap items-center justify-between mx-auto px-16 p-8">
                            <button>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="40"
                                    height="40"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#000000"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    {" "}
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M16 12l-4 4-4-4M12 8v7" />
                                </svg>
                            </button>

                            <p className="uppercase font-montserrat text-2xl">
                                berlin technische universität
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
