import axios from "axios"

export const getFoodData = async ({ payload }) => {
    try {
      const isSearch = Boolean(payload?.search);
  
      const url = isSearch
        ? "https://dummyjson.com/recipes/search"
        : "https://dummyjson.com/recipes";
  
      const response = await axios.get(url, {
        params: {
          ...(isSearch && { q: payload.search }),
          limit: payload?.limit ?? 10,
          skip: payload?.skip ?? 0,
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("Error fetching food data:", error);
      throw error;
    }
  };

export const getFoodDataById= async(id)=>{
    try {
        const response = await axios.get(`https://dummyjson.com/recipes/${id}`)
        return response?.data
    } catch (err) {
        console.log('Erro while getting data',err)
    }
}
export const deleteFoodDataById= async(id)=>{
    try {
        const response = await axios.delete(`https://dummyjson.com/recipes/${id}`)
        return response?.data
    } catch (err) {
        console.log('Erro while getting data',err)
    }
}
