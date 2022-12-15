import React from "react";
import { useNavigate } from "react-router-dom";

export default function Card() {
    const navigate = useNavigate();

    return (
        <div
            id="content"
            class="border border-black bg-white/10 col-span-8 rounded-lg p-6"
        >
            <div id="24h">
                <h1 class="font-bold text-black text-3xl py-4 uppercase">
                    Student Actions
                    <br />
                    <span className="text-gray-600 text-base">
                        Welcome Back, Arda Tavusbay
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
                    <div class="col-span-3 p-6 border border-black rounded-lg">
                        <div className="text-black pb-4">Upcoming Events</div>
                        <div class="grid grid-rows-4 gap-7">
                            <div className="p-4 bg-sky-100 rounded-lg">
                                <span className="text-l text-black">
                                    6 November 2022
                                </span>
                                <br />
                                <span className="text-l text-black">
                                    Pre-Approval Form Upload
                                </span>
                            </div>
                            <div className="p-4 bg-sky-100 rounded-lg">
                                <span className="text-l text-black">
                                    6 November 2022
                                </span>
                                <br />
                                <span className="text-l text-black">
                                    Pre-Approval Form Upload
                                </span>
                            </div>
                            <div className="p-4 bg-sky-100 rounded-lg">
                                <span className="text-l text-black">
                                    6 November 2022
                                </span>
                                <br />
                                <span className="text-l text-black">
                                    Pre-Approval Form Upload
                                </span>
                            </div>
                            <div className="p-4 bg-sky-100 rounded-lg">
                                <span className="text-l text-black">
                                    6 November 2022
                                </span>
                                <br />
                                <span className="text-l text-black">
                                    Pre-Approval Form Upload
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-7 p-6 border border-black rounded-lg">
                        <div className="text-black pb-4">
                            Technical University of Berlin
                        </div>
                        <div className="grid grid-cols-5">
                            <div class="col-span-2 grid grid-rows-5 gap-6">
                                <div className="flex items-center text-center p-4 bg-sky-100 rounded-lg">
                                    <button className="text-center text-xl text-black">
                                        View Old Courses
                                    </button>
                                </div>
                                <div className="flex items-center text-center p-4 bg-sky-100 rounded-lg">
                                    <button className="text-center text-xl text-black">
                                        My Pre-Approval Forms
                                    </button>
                                </div>
                                <div className="flex items-center text-center p-4 bg-sky-100 rounded-lg">
                                    <button className="text-center text-xl text-black">
                                        My Learning Agreement
                                    </button>
                                </div>
                                <div className="flex items-center text-center p-4 bg-sky-100 rounded-lg">
                                    <button className="text-center text-xl text-black">
                                        My Profile
                                    </button>
                                </div>
                                <div className="flex items-center text-center p-4 bg-sky-100 rounded-lg">
                                    <button className="text-center text-xl text-black">
                                        Settings
                                    </button>
                                </div>
                            </div>
                            <div className="px-8 col-span-3">
                                <img
                                    src={require("../../assets/university.jpeg")}
                                    width=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
