const Modal = ({ setModalOn, setChoice }) => {
    const handleOKClick = () => {
        setChoice(true);
        setModalOn(false);
    };
    const handleRejectClick = () => {
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
                                    Pre-Approval Form
                                </h1>
                            </div>
                        </div>

                        <div id="container">
                            <div class="">
                                <div class="relative p-6 border border-black rounded-lg">
                                <div className="border border-black">
                                    <embed
                                        src={require("../../assets/dummy_pdf.pdf#page=1&zoom=500")}
                                        className="max-w-none"
                                        height="500"
                                        width= "1000"
                                    />
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
                        <div>
                            <button
                                onClick={handleRejectClick}
                                className="p-2 border border-black rounded-lg m-auto mt-6"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;