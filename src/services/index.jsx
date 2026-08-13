import axios from "axios";

const FOOD_STORAGE_KEY = "foodData";

const initializeFoodData = async () => {
  const existingData = localStorage.getItem(FOOD_STORAGE_KEY);

  if (existingData) {
    return JSON.parse(existingData);
  }

  try {
    const response = await axios.get(
      "https://dummyjson.com/recipes?limit=0"
    );

    const recipes = response?.data?.recipes || [];

    localStorage.setItem(
      FOOD_STORAGE_KEY,
      JSON.stringify(recipes)
    );

    return recipes;
  } catch (error) {
    console.error("Error initializing food data:", error);
    throw error;
  }
};


export const getLocalFoodData = async() => {
  const data = await localStorage.getItem(FOOD_STORAGE_KEY);

  return data ? JSON.parse(data) : [];
};


const saveLocalFoodData = (data) => {
  localStorage.setItem(
    FOOD_STORAGE_KEY,
    JSON.stringify(data)
  );
};


export const getFoodData = async ({ payload } = {}) => {
  try {
    let foodData = await getLocalFoodData();

    if (!foodData.length) {
      foodData = await initializeFoodData();
    }

    const search = payload?.search?.trim()?.toLowerCase();

    const limit = payload?.limit ?? 10;
    const skip = payload?.skip ?? 0;

    /*
      Search
    */
    if (search) {
      foodData = foodData.filter((food) =>
        food?.name?.toLowerCase().includes(search) 
      );
    }

    /*
      Total records after search
    */
    const total = foodData.length;

    /*
      Pagination
    */
    const paginatedData = foodData.slice(
      skip,
      skip + limit
    );

    return {
      recipes: paginatedData,
      total,
      skip,
      limit,
    };

  } catch (error) {
    console.error("Error fetching food data:", error);
    throw error;
  }
};


export const getFoodDataById = async (id) => {
  try {
    let foodData = await getLocalFoodData();

    if (!foodData.length) {
      foodData = await initializeFoodData();
    }

    const food = foodData.find(
      (item) => Number(item.id) === Number(id)
    );

    if (!food) {
      throw new Error("Food not found");
    }

    return food;

  } catch (error) {
    console.error("Error while getting food data:", error);
    throw error;
  }
};


export const addFoodData = async ({ payload }) => {
  try {
    const foodData = await getLocalFoodData();

    const newId =
      foodData.length > 0
        ? Math.max(...foodData.map((item) => Number(item.id))) + 1
        : 1;

    const newFood = {
      ...payload,
      id: newId,
    };

    const updatedData = [
      ...foodData,
      newFood,
    ];

    saveLocalFoodData(updatedData);

    return newFood;

  } catch (error) {
    console.error("Error while adding food:", error);
    throw error;
  }
};


export const updateFoodDataById = async (
  {id,payload}
) => {
  try {
    
    const foodData = await getLocalFoodData();
    

    const index = foodData.findIndex(
      (item) => Number(item.id) === Number(id)
    );

    if (index === -1) {
      throw new Error("Food not found");
    }

    const updatedFood = {
      ...foodData[index],
      ...payload,
      id: foodData[index].id,
    };

    foodData[index] = updatedFood;

    saveLocalFoodData(foodData);

    return updatedFood;

  } catch (error) {
    console.error("Error while updating food:", error);
    throw error;
  }
};


export const deleteFoodDataById = async (id) => {
  try {
    const foodData = await getLocalFoodData();

    const foodExists = foodData.some(
      (item) => Number(item.id) === Number(id)
    );

    if (!foodExists) {
      throw new Error("Food not found");
    }

    const updatedData = foodData.filter(
      (item) => Number(item.id) !== Number(id)
    );

    saveLocalFoodData(updatedData);

    return {
      success: true,
      id,
    };

  } catch (error) {
    console.error("Error while deleting food:", error);
    throw error;
  }
};