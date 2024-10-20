export default function ListItem() {
    return (
        <li
            key={i}
            className="relative border-2 hover:bg-slate-200"
        >
            <p className="flex justify-evenly gap-2 ">
                {stack.name}, {`ID: ${stack._id.slice(stack._id.length - 3)}`}
                <MdOutlineDeleteOutline
                    className="cursor-pointer"
                    onClick={e => {
                        handleAskDeleteStack(stack);
                        e.stopPropagation();
                    }}
                />
                <BsThreeDotsVertical
                    className=""
                    onClick={e => handleShowModalEditStack(e, stack)}
                />
            </p>
            {/* MODAL: Really delete this stack with all cards? */}
            {showAskDelete === stack._id && (
                <div className="flex-col bg-red-300">
                    <span>
                        Are you sure? <br />{" "}
                        <span className="text-xs">(Stack incl. all its cards will be deleted.)</span>
                    </span>
                    <div className="flex gap-1 justify-center">
                        <button
                            className="border"
                            onClick={e => {
                                handleConfirmDelete(stack);
                                e.stopPropagation();
                            }}
                        >
                            yes
                        </button>
                        <button
                            className="border"
                            onClick={e => {
                                setShowAskDelete("");
                                e.stopPropagation();
                            }}
                        >
                            no
                        </button>
                    </div>
                </div>
            )}
            {editTargetStack === stack._id && (
                <>
                    <div
                        className={`absolute z-30 left-0 flex gap-2
                                      h-12 w-max px-3
                                      rounded-xl text-white bg-slate-400`}
                    >
                        <button
                            className="w-1/2 grid place-items-center"
                            onClick={handleEditStack}
                        >
                            edit
                        </button>
                        <button
                            className="w-1/2 grid place-items-center text-slate-300"
                            disabled
                        >
                            delete
                        </button>
                        {showInputModal && (
                            <form
                                onSubmit={e => handleNewCollectionNameSubmit(e, stack)}
                                action="patch"
                                className="absolute z-30 top-full left-0 bg-slate-300 text-black"
                            >
                                <label htmlFor="renameCollection">Pick Collection-Name</label>
                                <input
                                    id="renameCollection"
                                    type="text"
                                    name="name"
                                    value={newCollectionName}
                                    onChange={e => inputFieldHandler(e)}
                                    autoComplete="off"
                                    className="px-2 py-1 bg-slate-300 text-slate-800"
                                />
                                <button
                                    type="submit"
                                    className="bg-slate-400 rounded-xl"
                                >
                                    Send
                                </button>
                            </form>
                        )}
                    </div>
                </>
            )}
            {/* showInputModal */}

            <p>{`Total Cards: ${stack.flashcards.length}`}</p>
        </li>
    );
}
