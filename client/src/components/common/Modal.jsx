import { useAppStore } from "~/store/useAppStore";

const Modal = () => {
  const { contentModal, setModal } = useAppStore();
  return (
    <div
      onClick={() => setModal(false, null)}
      className="absolute z-[1000] top-0 left-0 h-screen flex items-center justify-center w-screen bg-overlay-50"
    >
      {contentModal}
    </div>
  );
};

export default Modal;
