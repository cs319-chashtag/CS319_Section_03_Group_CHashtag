import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function CoordinatorMainpageComponent() {
    const navigate = useNavigate();
    let [infos, setInfos] = useState([0]);
    let [coorinfos, setCoorInfos] = useState([0]);
    let [loading, setLoading] = useState(true);
    let [data,setData] = useState([]);
    let [selectedFile,setSelectedFile] = useState(null);
    function handleChange(e) {
        this.setState({ ...this.state, selectedFile: e.target.files[0] });
      };
      
    async function handleSubmit (e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append(
          'file',
          this.state.selectedFile,
          this.state.selectedFile.name
        );
        await fetch('/uploadStudent', {
          method: 'POST',
          body: formData,
        });
      };
    useEffect(() => {
        async function getter()  {
            await fetch ("/coordinator",{
                method: "GET",
                headers: {"Content-type": "application/json"},
            }).then((res) => res.json()
            ).then((res) => {
                setInfos(res.coorinfo);
                setCoorInfos(res.coorinfo2);
                console.log(res.coorinfo);
                console.log(res.coorinfo2);
                return res;
            });
        }
        getter();
    },[]);
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
                            {infos.firstName} {infos.lastName}
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
                                navigate("/coordinator");
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
                                navigate("/coordinator/waitingPreapprovals");
                            }}
                            class="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group"
                        >
                            <div class="relative flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
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
                                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p class="font-bold text-base lg:text-lg text-black leading-4 group-hover:text-indigo-400">
                                        Pre-Approval Forms
                                    </p>
                                    <p class="text-slate-400 text-sm hidden md:block">
                                        View Form
                                    </p>
                                </div>
                            </div>
                        </a>
                        <a
                            href="#"
                            onClick={() => {
                                navigate("/coordinator/waitingAgreements");
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
                                            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p class="font-bold text-base lg:text-lg text-black leading-4 group-hover:text-indigo-400">
                                        Learning Agreement
                                    </p>
                                    <p class="text-slate-400 text-sm hidden md:block">
                                        View Agreement
                                    </p>
                                </div>
                            </div>
                        </a>
                        <a
                            href="#"
                            onClick={() => {
                                navigate("/coordinator/todoPage");
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
                                navigate("/coordinator/profile");
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
                                navigate("/coordinator/help");
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
                            Coordinator Actions
                            <br />
                            <span className="text-gray-600 text-base">
                                Welcome Back, {infos.firstName} {infos.lastName}
                            </span>
                        </h1>
                        <div
                            id="stats"
                            class="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        ></div>
                    </div>
                    <div id="">
                        <div id="" class="grid grid-cols-12 gap-4">
                            <div class="col-span-4 p-6 border border-black rounded-lg">
                                <div className="text-black pb-4">
                                    Upcoming Events
                                </div>

                                <div class="grid  gap-4">
                                    <div className="p-2 border border-black rounded-lg">
                                        <div className="text-center p-4 mb-4 border border-black rounded-lg">
                                            <span className="text-black">
                                                Assign Students
                                            </span>
                                        </div>
                                        <div class="flex items-center justify-center w-full">
                                            <label
                                                for="dropzone-file"
                                                class="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                            >
                                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg
                                                        aria-hidden="true"
                                                        class="w-10 h-10 mb-3 text-gray-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                        ></path>
                                                    </svg>
                                                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <span class="font-semibold">
                                                            Click to upload
                                                        </span>{" "}
                                                        or drag and drop
                                                    </p>
                                                    <p class="text-xs text-gray-500 dark:text-gray-400">
                                                        XLSX FILE (EXCEL)
                                                    </p>
                                                </div>
                                                <input
                                                    id="dropzone-file"
                                                    type="file"
                                                    class="hidden"
                                                />
                                            </label>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-amber-100 rounded-lg">
                                        <span className="text-l text-black">
                                            6 November 2022
                                        </span>
                                        <br />
                                        <span className="text-l text-black">
                                            Pre-Approval Form Check
                                        </span>
                                    </div>
                                    <div className="p-4 bg-amber-100 rounded-lg">
                                        <span className="text-l text-black">
                                            7 November 2022
                                        </span>
                                        <br />
                                        <span className="text-l text-black">
                                            Pre-Approval Form Upload
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="col-span-4 p-6 border border-black rounded-lg">
                                <div className="text-black pb-4">
                                    Waiting Preapproval Forms
                                </div>

                                <div class="grid  gap-4">
                                    <div className="flex p-4 bg-orange-100 rounded-lg">
                                        <button className="text-l text-black">
                                            Tugberk Dikmen
                                        </button>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#000000"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            className="ml-auto"
                                        >
                                            <path d="M5 12h13M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                    <div className="flex p-4 bg-orange-100 rounded-lg">
                                        <button className="text-l text-black">
                                            Arda Tavusbay
                                        </button>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#000000"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            className="ml-auto"
                                        >
                                            <path d="M5 12h13M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                    <div className="flex p-4 bg-orange-100 rounded-lg">
                                        <button className="text-l text-black">
                                            Emrehan Ho??ver
                                        </button>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#000000"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            className="ml-auto"
                                        >
                                            <path d="M5 12h13M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                    <div className="flex p-4 bg-orange-100 rounded-lg">
                                        <button className="text-l text-black">
                                            Emre Ta??
                                        </button>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#000000"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            className="ml-auto"
                                        >
                                            <path d="M5 12h13M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div class="col-span-4 p-6 border border-black rounded-lg">
                                <div className="text-black pb-4">
                                    Coordinator Actions
                                </div>
                                <div className="grid grid-cols-5">
                                    <div class="col-span-5 grid grid-rows-5 gap-4">
                                        <div className="flex items-center text-center p-4 bg-red-200 rounded-lg">
                                            <button
                                                className="text-center text-xl text-black"
                                                onClick={() => {
                                                    navigate(
                                                        "/coordinator/waitingList"
                                                    );
                                                }}
                                            >
                                                View Waiting List
                                            </button>
                                        </div>
                                        <div className="flex items-center text-center p-4 bg-red-200 rounded-lg">
                                            <button
                                                className="text-center text-xl text-black"
                                                onClick={() => {
                                                    navigate(
                                                        "/coordinator/waitingList"
                                                    );
                                                }}
                                            >
                                                View Placed Students List
                                            </button>
                                        </div>
                                        <div className="flex items-center text-center p-4 bg-red-200 rounded-lg">
                                            <button
                                                className="text-center text-xl text-black"
                                                onClick={() => {
                                                    navigate(
                                                        "/coordinator/waitingAgreements"
                                                    );
                                                }}
                                            >
                                                View Waiting Learning Agreements
                                            </button>
                                        </div>
                                        <div className="flex items-center text-center p-4 bg-red-200 rounded-lg">
                                            <button
                                                className="text-center text-xl text-black"
                                                onClick={() => {
                                                    navigate(
                                                        "/coordinator/waitingPreapprovals"
                                                    );
                                                }}
                                            >
                                                View Waiting Pre-Approval Forms
                                            </button>
                                        </div>
                                        <div className="flex items-center text-center p-4 bg-red-200 rounded-lg">
                                            <button
                                                className="text-center text-xl text-black"
                                                onClick={() => {
                                                    navigate(
                                                        "/coordinator/fctfUpload"
                                                    );
                                                }}
                                            >
                                                Upload Final Course Transfer
                                                Form
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
