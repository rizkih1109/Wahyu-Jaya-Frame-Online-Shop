export default function Modal({title, content, onConfirm, onCancel} : ModalProps) {

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center">
      <div className="bg-white rounded-lg w-[420px] h-[200px] shadow-lg relative mt-5">
        <div className="flex justify-between items-start border-b px-5 py-3">
          <h4 className="text-lg font-semibold">{title}</h4>
          <span className="absolute right-3 top-2 text-xl cursor-pointer" onClick={onCancel}>
            &#10005;
          </span>
        </div>

        <div className="px-5 py-6 text-sm">
          <p>{content}</p>
        </div>

        <div className="flex justify-end border-t px-5 py-3 space-x-2">
          <button className="bg-[#ad793e] text-white px-4 py-2 rounded hover:bg-[#966638] transition" onClick={onCancel}>
            No
          </button>
          <button className="bg-[#ad793e] text-white px-4 py-2 rounded hover:bg-[#966638] transition" onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
