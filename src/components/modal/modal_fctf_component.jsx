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
                                    Learning Agreement Form
                                </h1>
                            </div>
                        </div>

                        <div id="container">
                            <div class="">
                                <div class="relative p-6 border border-black rounded-lg">
                                    <input type="file" multiple class="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"/>
                                    <div class="text-center p-10 absolute top-0 right-0 left-0 m-auto">
                                        <h4>
                                            Drop files anywhere to upload
                                            <br/>or
                                        </h4>
                                        <p class="">Select Files</p>
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
                        <div className="mr-3">
                            <button
                                onClick={handleOKClick}
                                className="p-2 border border-black rounded-lg m-auto mt-6"
                            >
                                Approve
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;