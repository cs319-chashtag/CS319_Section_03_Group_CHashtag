import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomepageComponent() {
    const navigate = useNavigate();

    return (
        <div class="bg-white-900 w-full h-screen flex flex-col lg:flex-row items-center justify-center space-y-16 lg:space-y-0 space-x-8 2xl:space-x-0">
            <div class="w-full lg:w-1/2 flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center">
                <div class="grid gap-4 grid-cols-2 mb-8">
                    <img
                        src={require("../../assets/bilkent.png")}
                        width="100"
                        height="50"
                    />
                    <img
                        src={require("../../assets/logonob.jpg")}
                        width="100"
                        height="50"
                    />
                </div>
                <p class="text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider text-gray-600">
                    ERASMOUSE
                </p>
                <p class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-gray-300 mt-2">
                    Erasmus Web Application
                </p>
                <p class="text-lg md:text-xl lg:text-2xl text-gray-500 my-12"></p>
                <a
                    href="#"
                    onClick={() => {
                        navigate("/loginPage");
                    }}
                    class="flex items-center space-x-2 bg-gray-600 text-gray-100 px-4 py-2 rounded transition duration-150"
                    title="login"
                >
                    <span>LogIn</span>
                </a>
            </div>
            <div class="w-full lg:w-1/2 flex flex-col items-center justify-center lg:py-4 yl:py-4 lg:px-2 xl:px-0 text-center">
                <div
                    class="flex items-center space-y-3 space-x-2 bg-white text-gray-700 px-2 py-2 border border-white rounded-lg"
                    title="login"
                >
                    <img
                        src={require("../../assets/university.jpeg")}
                        width="700"
                        height="1000"
                    />
                </div>

                <a
                    href="#"
                    class="flex items-center space-y-3 space-x-2 bg-white text-gray-700 px-2 py-2 border border-black rounded-lg"
                    title="login"
                >
                    <span>Browse Universities</span>
                </a>
            </div>
        </div>
    );
}
