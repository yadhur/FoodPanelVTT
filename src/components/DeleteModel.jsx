import { Icon } from "@iconify/react";
import { Modal } from "@mui/material";

const DeleteModel = ({open,onClose,onDelete}) => {
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <div className="absolute w-[500px] h-[300px] bg-white rounded flex justify-between  flex-col p-5 top-52 left-[40%] outline-0 ">
        <div>
        <h2 className="font-bold text-2xl border-b-1 border-orange-500 pb-2">Delete Food</h2>
        
        <div className="mt-10 text-center font-medium">Are you sure you want to delete it ?</div>
        </div>
        <div className="flex justify-end items-center gap-2">
          <button
            className="flex justify-between items-center bg-red-300 gap-2 p-2 rounded text-red-700 cursor-pointer"
            onClick={()=>onDelete()}
          >
            <Icon icon={"material-symbols:delete-rounded"} color="red" /> Delete
          </button>
          <button
            className="flex justify-between items-center rounded p-2 bg-orange-500 text-white cursor-pointer"
            onClick={()=>onClose()}
          >
            Cancel
          </button>
        </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteModel
