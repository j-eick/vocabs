import CreateNewVocab from "../form/CreateNewVocab";

type ModalProps = {
  show: boolean;
  onClickOutside: () => void;
};

export default function FormModal_blurredBg({ onClickOutside, show }: ModalProps) {
  return (
    show && (
      <div
        className={`absolute inset-0 
                  backdrop-blur-md backdrop-brightness-80`}
      >
        <div
          className={`absolute w-4/5 min-h-44 mx-auto my-0 left-1/2 -translate-x-1/2 top-2/3 -translate-y-1/2 
                    flex items-center justify-center 
                    rounded-xl bg-zinc-200`}
        >
          <div className="pb-5">
            <CreateNewVocab onClickOutside={onClickOutside} />
          </div>
        </div>
      </div>
    )
  );
}
