import { Card, CircularProgress, TextField } from "@mui/material";
import { DeleteModel, Layout } from "../components";
import { DataGrid, renderActionsCell } from "@mui/x-data-grid";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteFoodDataById, getFoodData } from "../services";
import { useDebounce } from "../hooks";
import toast from "react-hot-toast";
const obj = {
  limit: 10,
  skip: 0,
  search: "",
};
const FoodList = () => {
  const [deleteData, setDeleteData] = useState(false);
  const [foodData, setFoodData] = useState([]);
  const [pagination, setPagination] = useState(obj);
  const [loading, setLoading] = useState(false);
  const sreachValue = useDebounce(pagination?.search);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [sreachValue,pagination?.limit,pagination?.skip]);

  const getData = async () => {
    setLoading(true);
    getFoodData({ payload: pagination })
      .then((res) => {
        console.log("resss", res);
        setFoodData(res);
      })
      .catch((err) => {
        console.log("Error:", err);
      })
      .finally(() => setTimeout(()=>setLoading(false),1000));
  };

  const onInputChange = (name, value) =>
    setPagination((prev) => ({
      ...prev,
      [name]: value,
    }));

  const column = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.4,
      minWidth: 70,
    },

    {
      field: "image",
      headerName: "Image",
      flex: 0.7,
      minWidth: 100,
      sortable: false,
      filterable: false,

      renderCell: ({ value }) => (
        <div className="flex h-full items-center">
          <img
            src={value}
            alt="food-img"
            className="h-10 w-10 rounded-lg object-cover"
          />
        </div>
      ),
    },

    {
      field: "name",
      headerName: "Name",
      flex: 2,
      minWidth: 180,
    },

    {
      field: "cuisine",
      headerName: "Cuisine",
      flex: 1,
      minWidth: 120,
    },

    {
      field: "rating",
      headerName: "Rating",
      flex: 0.8,
      minWidth: 100,

      renderCell: ({ value }) => (
        <div className="flex h-full items-center gap-1">
          <Icon name="star" color="#F59E0B" className="text-lg" />

          <span className="font-medium text-gray-700">{value}</span>
        </div>
      ),
    },

    {
      field: "action",
      headerName: "Action",
      flex: 1,
      minWidth: 130,
      sortable: false,
      filterable: false,

      renderCell: ({ row }) => (
        <div className="flex h-full items-center gap-2">
          {/* Edit */}
          <button
            type="button"
            onClick={() => onView(row?.id)}
            title="View"
            className="
                  flex h-8 w-8 items-center justify-center
                  rounded-md
                  border border-orange-200
                  bg-orange-50
                  text-orange-500
                  transition-all
                  hover:border-orange-300
                  hover:bg-orange-100
                  active:scale-95
                  cursor-pointer
                "
          >
            <Icon
              icon="lets-icons:view-duotone"
              color="#F97316"
              className="text-lg"
            />
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={() => onDeleteAction(row)}
            title="Delete"
            className="
                  flex h-8 w-8 items-center justify-center
                  rounded-md
                  border border-red-200
                  bg-red-50
                  text-red-500
                  transition-all
                  hover:border-red-300
                  hover:bg-red-100
                  active:scale-95
                  cursor-pointer
                "
          >
            <Icon
              icon="material-symbols:delete-rounded"
              color="#EF4444"
              className="text-lg"
            />
          </button>
        </div>
      ),
    },
  ];

  const onView = (id) => {
    navigate(`/details/${id}`);
  };
  /** Action to perform whene we delete the record  */
  const onDeleteConfirm = () => {
    deleteFoodDataById(deleteData)
      .then((res) => {
        getData();
        toast.success('Data deleted Successfully');
        onDeleteModelClose()
      })
      .catch((err) => {
        console.log("error", err);
        toast.error('Error while deleting')
      });
  };
  /** Action to perform whene we we click on the delete button to open the mpdel and store the record in the state */
  const onDeleteAction = (record) => {
    setDeleteData(record?.id);
  };
  const onDeleteModelClose = () => {
    setDeleteData(false);
  };

  const handleAddNew=()=>{
    navigate('/food/add')
  }

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        {" "}
        <CircularProgress
          enableTrackSlot
          aria-label="Loading…"
          color="warning"
        />{" "}
      </div>
    );
  return (
    <Layout heading="Food list">
      <Card className="p-4 h-full">
        <div className="flex justify-end gap-3">
          <input
            type="text"
            className="border rounded p-1 border-orange-500 focus:border-amber-300 w-[300px] placeholder:text-grey-600 px-2"
            placeholder="Search Food Item..."
            name="search"
            value={pagination?.search}
            onChange={(e) => onInputChange(e?.target?.name, e?.target?.value)}
          />
          <button
                  type="button"
                  onClick={handleAddNew}
                  className="
                    flex items-center gap-2
                    rounded-lg
                    bg-orange-600
                    px-4 py-2
                    text-sm font-medium text-white
                    
                    hover:bg-orange-700
                    cursor-pointer
                  "
                >
                  <Icon icon="mdi:food" color="white" />
                  Add new Food
                </button>
        </div>
        <div className="mt-5">
          <DataGrid
            columns={column}
            rows={foodData?.recipes || []}
            paginationModel={{page:pagination?.skip,pageSize:pagination?.limit}}
            onPaginationModelChange={(newPage)=>{
               setPagination((prev)=>({
                ...prev,
                limit:newPage?.pageSize,
                skip:newPage?.page
               }))
                
            }}
            pageSizeOptions={[5, 10, 20, 50]}
          />
        </div>
      </Card>
      <DeleteModel
        open={deleteData}
        onClose={onDeleteModelClose}
        onDelete={onDeleteConfirm}
      />
    </Layout>
  );
};

export default FoodList;
