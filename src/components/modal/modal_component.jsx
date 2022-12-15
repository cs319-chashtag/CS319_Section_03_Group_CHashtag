const Modal = ({ setModalOn, setChoice }) => {
    const handleOKClick = () => {
        setChoice(true);
        setModalOn(false);
    };
    const handleCancelClick = () => {
        setChoice(false);
        setModalOn(false);
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full   ">
            <div className="flex w-full h-full justify-center items-center ">
                <div className="flex-col justify-center bg-white py-12 px-24 border-4 border-sky-500 rounded-xl ">
                    <div
                        id="content"
                        class="border border-black bg-white/10 col-span-8 rounded-lg p-6"
                    >
                        <div className="flex">
                            <div id="title">
                                <h1 class="font-bold text-black text-3xl py-4 uppercase">
                                    Add Course - Host University
                                </h1>
                            </div>
                        </div>

                        <div id="container">
                            <div class="">
                                <div class="relative p-6 border border-black rounded-lg">
                                    <div className="text-black pb-4">
                                        Courses - Host University
                                    </div>
                                    <div class="relative grid grid-rows gap-2">
                                        <form>
                                            <div class="mb-6">
                                                <label
                                                    for="email"
                                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Course Name
                                                </label>
                                                <input
                                                    type=""
                                                    id=""
                                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                    placeholder="Course Name"
                                                    required
                                                />
                                            </div>
                                            <div class="mb-6">
                                                <label
                                                    for=""
                                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    Course Code
                                                </label>
                                                <input
                                                    type=""
                                                    id=""
                                                    placeholder="Course Code"
                                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                />
                                            </div>
                                            <div class="mb-6">
                                                <label
                                                    for=""
                                                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                >
                                                    ECTS Credits
                                                </label>
                                                <input
                                                    type=""
                                                    id=""
                                                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                                                    placeholder="ECTS Credits"
                                                    required
                                                />
                                            </div>
                                            <label
                                                for=""
                                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Syllabus
                                            </label>
                                            <textarea
                                                id=""
                                                rows="4"
                                                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Course syllabus"
                                            ></textarea>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end ">
                        <div className="mr-3">
                            <button
                                onClick={handleCancelClick}
                                className="p-2 border border-black rounded-lg m-auto mt-6"
                            >
                                Cancel
                            </button>
                        </div>
                        <div>
                            <button
                                onClick={handleOKClick}
                                className="p-2 border border-black rounded-lg m-auto mt-6"
                            >
                                Add Course
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
