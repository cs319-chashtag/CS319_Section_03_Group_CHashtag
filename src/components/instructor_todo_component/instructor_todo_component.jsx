import React from "react";
import { useNavigate } from "react-router-dom";

export default function InstructorToDoComponent() {
    const navigate = useNavigate();

    return (
        <div class="antialiased bg-white w-full min-h-screen text-black relative py-4">
            <div class="grid grid-cols-10 mx-auto gap-2 sm:gap-4 md:gap-6 lg:gap-10 xl:gap-4 max-w-7xl my-10 ">
                <div
                    id="menu"
                    class="w-64 border border-black bg-white/10 col-span-2 rounded-lg p-4 "
                >
                    <a
                        href="#"
                        class="flex flex-col space-y-2 md:space-y-0 md:flex-row mb-5 items-center md:space-x-2 hover:bg-white/10 group transition duration-150 ease-linear rounded-lg group w-full py-3 px-2"
                    >
                        <div>
                            <img
                                class="rounded-full w-10 h-10 relative object-cover"
                                src={require("../../assets/can_alkan_photo.jpg")}
                                alt=""
                            />
                        </div>
                        <div>
                            <p class="font-medium text-black group-hover:text-indigo-400 leading-4">
                                Can Alkan
                            </p>
                            <span class="text-xs text-slate-400">
                                Erasmouse Coordinator
                            </span>
                        </div>
                    </a>
                    <hr class="my-2 border-black" />
                    <div id="menu" class="flex flex-col space-y-2 my-5">
                        <a
                            href="#"
                            onClick={() => {
                                navigate("/instructor");
                            }}
                            class="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
                        >
                            <div class="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-6 h-6 group-hover:text-indigo-400"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p class="font-bold text-base lg:text-lg text-black leading-4 group-hover:text-indigo-400">
                                        Homepage
                                    </p>
                                    <p class="text-slate-400 text-sm hidden md:block">
                                        Data overview
                                    </p>
                                </div>
                            </div>
                        </a>
                        
                        <a
                            href="#"
                            onClick={() => {
                                navigate("/instructor/todoPage");
                            }}
                            class="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
                        >
                            <div class="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke="currentColor"
                                        class="w-6 h-6 group-hover:text-indigo-400"
                                    >
                                        <line
                                            x1="8"
                                            y1="6"
                                            x2="21"
                                            y2="6"
                                        ></line>
                                        <line
                                            x1="8"
                                            y1="12"
                                            x2="21"
                                            y2="12"
                                        ></line>
                                        <line
                                            x1="8"
                                            y1="18"
                                            x2="21"
                                            y2="18"
                                        ></line>
                                        <line
                                            x1="3"
                                            y1="6"
                                            x2="3.01"
                                            y2="6"
                                        ></line>
                                        <line
                                            x1="3"
                                            y1="12"
                                            x2="3.01"
                                            y2="12"
                                        ></line>
                                        <line
                                            x1="3"
                                            y1="18"
                                            x2="3.01"
                                            y2="18"
                                        ></line>
                                    </svg>
                                </div>
                                <div>
                                    <p class="font-bold text-base lg:text-lg text-black leading-4 group-hover:text-indigo-400">
                                        Todo List
                                    </p>
                                    <p class="text-slate-400 text-sm hidden md:block">
                                        Manage Tasks
                                    </p>
                                </div>
                            </div>
                        </a>
                        <a
                            href="#"
                            onClick={() => {
                                navigate("/instructor/profile");
                            }}
                            class="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
                        >
                            <div class="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-6 h-6 group-hover:text-indigo-400"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                                        />
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p class="font-bold text-base lg:text-lg text-black leading-4 group-hover:text-indigo-400">
                                        Profile
                                    </p>
                                    <p class="text-slate-400 text-sm hidden md:block">
                                        Edit Profile
                                    </p>
                                </div>
                            </div>
                        </a>

                        <a
                            href="#"
                            onClick={() => {
                                navigate("/instructor/help");
                            }}
                            class="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
                        >
                            <div class="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="w-6 h-6 group-hover:text-indigo-400"
                                    >
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                        <line
                                            x1="12"
                                            y1="17"
                                            x2="12.01"
                                            y2="17"
                                        ></line>
                                    </svg>
                                </div>
                                <div>
                                    <p class="font-bold text-base lg:text-lg text-black leading-4 group-hover:text-indigo-400">
                                        Help
                                    </p>
                                    <p class="text-slate-400 text-sm hidden md:block">
                                        Show Help
                                    </p>
                                </div>
                            </div>
                        </a>
                        <a
                            href="#"
                            onClick={() => {
                                navigate("/loginSelection");
                            }}
                            class="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
                        >
                            <div class="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="w-6 h-6 group-hover:text-indigo-400"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p class="font-bold text-base lg:text-lg text-black leading-4 group-hover:text-indigo-400">
                                        Logout
                                    </p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <p class="text-sm text-center text-gray-600">
                        v0.1 | &copy; Erasmouse
                    </p>
                </div>
                <div
                    id="content"
                    class="border border-black bg-white/10 col-span-8 rounded-lg p-6"
                >
                    <div id="24h">
                        <h1 class="font-bold text-black text-3xl py-4 uppercase">
                        Instructor Actions - To Do Page
                            <br />
                            <span className="text-gray-600 text-base">
                                Welcome Back, Can Alkan
                            </span>
                        </h1>
                        <div
                            id="stats"
                            class="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        ></div>
                    </div>
                    <div id="last-incomes">
                        <div
                            id="stats"
                            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-10 gap-4"
                        >
                            <div class="col-span-7 p-6 border border-black rounded-lg">
                                <div className="text-black pb-4">
                                    To Do List
                                </div>

                                <div class="grid grid-cols-4 grid-rows-4 gap-2">
                                    <div className="col-span-2 p-4 bg-sky-100 rounded-lg">
                                        <span className="text-l text-black">
                                            Don not forget to mail to
                                            universities!
                                        </span>
                                    </div>
                                    <div className="col-span-1 flex items-center text-center p-4 bg-emerald-700 rounded-full">
                                        <button className="col-span-1 text-center text-xl text-black">
                                            Done
                                        </button>
                                    </div>
                                    <div className="col-span-1 flex items-center text-center p-4 bg-orange-700 rounded-full">
                                        <button className="col-span-1 text-center text-xl text-black">
                                            Delete
                                        </button>
                                    </div>
                                    <div className="col-span-2 p-4 bg-sky-100 rounded-lg">
                                        <span className="text-l text-black">
                                            Check for preapproval deadline!
                                        </span>
                                    </div>
                                    <div className="col-span-1 flex items-center text-center p-4 bg-emerald-700 rounded-full">
                                        <button className="col-span-1 text-center text-xl text-black">
                                            Done
                                        </button>
                                    </div>
                                    <div className="col-span-1 flex items-center text-center p-4 bg-orange-700 rounded-full">
                                        <button className="col-span-1 text-center text-xl text-black">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-span-3 p-6 space-y-3 border border-black rounded-lg">
                                <div className="text-black pb-4">
                                    Create a To Do
                                </div>
                                <form
                                    action="https://formbold.com/s/FORM_ID"
                                    method="POST"
                                >
                                    <div class="mb-5">
                                        <label
                                            for="todo"
                                            class="mb-2 block text-base font-medium text-[#07074D]"
                                        >
                                            Write Your To Do
                                        </label>
                                        <input
                                            type="text"
                                            name="todo"
                                            id="todo"
                                            placeholder="a lot to do :)"
                                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-10 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        />
                                        <div>
                                            <button class="w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
