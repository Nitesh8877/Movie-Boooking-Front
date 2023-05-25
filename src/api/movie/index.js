import { AxiosInstance } from "../../utils/AxiosInstance";

export const getAllMovies=async()=>{
    const URL='/mba/api/movies'
    try {
        const response=await AxiosInstance.get(URL);
        return response;
        
    } catch (error) {
        throw error
    }
}

export const getMoviesById=async(id)=>{
    const URL=`/mba/api/movies/${id}`
    try {
        const response=await AxiosInstance.get(URL);
        return response;
    } catch (error) {
        throw error
    }
}