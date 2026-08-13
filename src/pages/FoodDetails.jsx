import { Icon } from "@iconify/react";
import { Layout } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFoodDataById } from "../services";
import { CircularProgress } from "@mui/material";
import toast from "react-hot-toast";

const FoodDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getDataById();
  }, []);

  const getDataById = () => {
    setLoading(true);
    getFoodDataById(id)
      .then((res) => setFood(res))
      .catch((err) => {
        toast.error("Something went wrong. Please try again later");
      })
      .finally(() => setLoading(false));
  };

  const handleEdit = () => {
    navigate(`/food/update/${id}`);
  };

  const handleGoBack = () => navigate(-1);

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
    <Layout heading="Food Details">
      {!food && (
        <div className="h-screen flex justify-center items-center flex-col">
          <Icon icon={"tabler:mood-empty-filled"} color="orange" width={50} />{" "}
          No data found
        </div>
      )}
      {food && (
        <>
          <div
            className=" cursor-pointer h-10 w-10 mb-5 rounded-full border border-orange-500 flex justify-center items-center"
            onClick={handleGoBack}
          >
            <Icon icon="weui:back-filled" color="orange" />
          </div>
          <div className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-6 lg:flex-row">
                <div className="">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="
                  h-64 w-full rounded-xl
                  object-cover
                  lg:h-64 lg:w-72
                "
                  />
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h1 className="text-2xl font-semibold text-gray-900">
                        {food.name}
                      </h1>

                      <div className="mt-2 flex items-center gap-2">
                        <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-medium text-orange-600">
                          {food.cuisine}
                        </span>

                        {food?.mealType?.map((meal) => (
                          <span
                            key={meal}
                            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
                          >
                            {meal}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleEdit}
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
                      <Icon
                        icon="material-symbols:edit-outline-rounded"
                        color="white"
                      />
                      Edit
                    </button>
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Icon name="star" color="#F59E0B" />

                      <span className="font-semibold text-gray-900">
                        {food.rating}
                      </span>
                    </div>

                    <span className="text-sm text-gray-500">
                      ({food.reviewCount} reviews)
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <InfoItem
                      label="Prep Time"
                      value={`${food.prepTimeMinutes} min`}
                      icon="schedule"
                    />

                    <InfoItem
                      label="Cook Time"
                      value={`${food.cookTimeMinutes} min`}
                      icon="schedule"
                    />

                    <InfoItem
                      label="Servings"
                      value={food.servings}
                      icon="group"
                    />

                    <InfoItem
                      label="Difficulty"
                      value={food.difficulty}
                      icon="bar-chart"
                    />
                  </div>

                  <div className="mt-5">
                    <p className="text-sm text-gray-500">
                      Calories per serving
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                      {food.caloriesPerServing} kcal
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {food?.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="
                      rounded-full
                      border border-gray-200
                      bg-gray-50
                      px-3 py-1
                      text-xs font-medium
                      text-gray-600
                    "
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50">
                  <Icon icon="fluent:food-16-filled" color="orange" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Ingredients
                  </h2>

                  <p className="text-sm text-gray-500">
                    Ingredients required for this recipe
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {food?.ingredients?.map((ingredient, index) => (
                  <div
                    key={ingredient}
                    className="
                  flex items-center gap-3
                  rounded-lg
                  border border-gray-100
                  bg-gray-50
                  px-4 py-3
                "
                  >
                    <div
                      className="
                  flex h-7 w-7 shrink-0
                  items-center justify-center
                  rounded-full
                  bg-orange-100
                  text-sm font-semibold
                  text-orange-600
                "
                    >
                      {index + 1}
                    </div>

                    <span className="text-sm text-gray-700">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                  <Icon icon="ic:twotone-info" color="blue" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Instructions
                  </h2>

                  <p className="text-sm text-gray-500">
                    Step-by-step preparation instructions
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {food?.instructions?.map((instruction, index) => (
                  <div key={instruction} className="flex gap-4">
                    <div
                      className="
                  flex h-8 w-8 shrink-0
                  items-center justify-center
                  rounded-full
                  bg-blue-600
                  text-sm font-semibold
                  text-white
                "
                    >
                      {index + 1}
                    </div>

                    <div className="flex-1 rounded-lg bg-gray-50 px-4 py-3">
                      <p className="text-sm leading-6 text-gray-700">
                        {instruction}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

const InfoItem = ({ label, value, icon }) => {
  return (
    <div className="rounded-lg bg-gray-50 p-3">
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">{label}</span>
      </div>

      <p className="mt-2 font-semibold text-gray-800">{value}</p>
    </div>
  );
};

export default FoodDetails;
