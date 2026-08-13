import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Icon } from "@iconify/react";
import { Layout } from "../components";
import { Card, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { addFoodData, getFoodDataById, updateFoodDataById } from "../services";
import toast from "react-hot-toast";

const schema = yup.object({
  name: yup.string().trim().required("Food name is required"),
  cuisine: yup.string().trim().required("Cuisine is required"),
  prepTimeMinutes: yup
    .number()
    .typeError("Prep time must be a number")
    .required("Prep time is required"),
  difficulty: yup.string().required("Please select difficulty"),
  caloriesPerServing: yup
    .number()
    .typeError("Calories must be a number")
    .required("Calories are required"),
});

const FoodForm = () => {
  const { id } = useParams();
  const [initialData, setinitialData] = useState(null);
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [image, setImage] = useState(initialData?.image || null);

  useEffect(() => {
    getDataById();
  }, [id]);

  const getDataById = () => {
    getFoodDataById(id)
      .then((res) => {
        setinitialData(res);
        setImage(res?.image);
      })
      .catch((err) => {
        console.log("Error while getting the data", err);
      });
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),

    defaultValues: {
      name: "",
      cuisine: "",
      prepTimeMinutes: "",
      difficulty: "",
      caloriesPerServing: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || "",
        cuisine: initialData.cuisine || "",
        prepTimeMinutes: initialData.prepTimeMinutes || "",
        difficulty: initialData.difficulty || "",
        caloriesPerServing: initialData.caloriesPerServing || "",
      });
    }
  }, [initialData, reset]);

  const submitHandler = (data) => {
    if (!image) return toast.error("Please upload the image");
    let payload = {
      ...data,
      image: image,
      ...(!id && { createdAt: new Date().toISOString() }),
    };
    id ? updateFoodItem({ id, payload }) : addNewFood({ payload: payload });
  };

  const addNewFood = (data) => {
    addFoodData(data)
      .then(() => {
        toast.success("New item added successfully");
        reset();
        setImage(null);
      })
      .catch((err) => {
        toast.error("Something went wrong. Please try again later");
      });
  };

  const updateFoodItem = (data) => {
    updateFoodDataById(data)
      .then(() => {
        toast.success("Item has been updated successfully");
      })
      .catch((err) => {
        toast.error("Something went wrong. Please try again later");
        console.log("err", err);
      });
  };
  const handleGoBack = () => navigate(-1);

  return (
    <Layout>
      <div
        className=" cursor-pointer h-10 w-10 mb-5 rounded-full border border-orange-500 flex justify-center items-center"
        onClick={handleGoBack}
      >
        <Icon icon="weui:back-filled" color="orange" />
      </div>
      <Card className="p-5 h-screen">
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Basic Information
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Add the basic details of the food item.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <ImagePicker image={image} setImage={setImage} />
            <FormInput
              label="Food Name"
              required
              placeholder="Classic Margherita Pizza"
              error={errors.name?.message}
              {...register("name")}
            />

            <FormInput
              label="Cuisine"
              required
              placeholder="Italian"
              error={errors.cuisine?.message}
              {...register("cuisine")}
            />

            <FormInput
              label="Prep Time"
              required
              type="number"
              placeholder="20"
              suffix="minutes"
              error={errors.prepTimeMinutes?.message}
              {...register("prepTimeMinutes")}
            />

            <FormInput
              label="Calories per Serving"
              required
              type="number"
              placeholder="300"
              suffix="kcal"
              error={errors.caloriesPerServing?.message}
              {...register("caloriesPerServing")}
            />

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Difficulty <span className="text-red-500">*</span>
              </label>

              <select
                {...register("difficulty")}
                className={`
              w-full rounded-lg border bg-white px-3 py-2.5
              text-sm text-gray-700 outline-none
              focus:border-blue-500 focus:ring-2
              focus:ring-blue-100
              ${errors.difficulty ? "border-red-500" : "border-gray-300"}
            `}
              >
                <option value="">Select difficulty</option>

                <option value="Easy">Easy</option>

                <option value="Medium">Medium</option>

                <option value="Hard">Hard</option>
              </select>

              {errors.difficulty && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.difficulty.message}
                </p>
              )}
            </div>
          </div>

          {/* ================= FOOTER ================= */}

          <div
            className="
        flex justify-end gap-3
        border-t border-gray-200
        pt-5
      "
          >
            <button
              type="button"
                onClick={handleGoBack}
              className="
            rounded-lg border border-orange-300
            px-5 py-2.5
            text-sm font-medium text-gray-700
            hover:bg-orange-50
          "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center gap-2
            rounded-lg bg-orange-600
            px-5 py-2.5
            text-sm font-medium text-white
            hover:bg-orange-700
            disabled:cursor-not-allowed
            disabled:opacity-60
            ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"}
          `}
            >
              <Icon
                icon={
                  isEdit
                    ? "material-symbols:edit-outline-rounded"
                    : "material-symbols:add"
                }
                color="white"
              />

              {isSubmitting ? (
                <CircularProgress
                  size="20px"
                  enableTrackSlot
                  aria-label="Loading…"
                  color="white"
                />
              ) : isEdit ? (
                "Update Food"
              ) : (
                "Add Food"
              )}
            </button>
          </div>
        </form>
      </Card>
    </Layout>
  );
};

const FormInput = ({ label, required, error, suffix, ...props }) => {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}

        {required && <span className="text-red-500"> *</span>}
      </label>

      <div className="relative">
        <input
          {...props}
          className={`
            w-full rounded-lg border
            px-3 py-2.5 text-sm outline-none
            focus:border-blue-500
            focus:ring-2 focus:ring-blue-100
            ${error ? "border-red-500" : "border-gray-300"}
            ${suffix ? "pr-20" : ""}
          `}
        />

        {suffix && (
          <span
            className="
            absolute right-3 top-1/2
            -translate-y-1/2
            text-xs text-gray-400
          "
          >
            {suffix}
          </span>
        )}
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

function ImagePicker({ image, setImage }) {
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="relative flex items-center justify-center w-48 h-48 border-2 border-dashed border-orange-300 rounded-lg overflow-hidden bg-orange-50 hover:bg-orange-100 transition-colors">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
      />

      {image ? (
        <img
          src={image}
          alt="Food preview"
          className="w-full h-full object-conatin absolute inset-0"
        />
      ) : (
        <span className="text-orange-400 text-sm font-medium text-center px-2">
          Click to upload image
        </span>
      )}
    </div>
  );
}
export default FoodForm;
