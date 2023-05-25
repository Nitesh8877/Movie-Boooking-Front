import { AxiosInstance } from "../../utils/AxiosInstance";

export const createBooking=async(booking)=>{
    const URL='/mba/api/movie/booking'
    try {
        const response=await AxiosInstance.post(URL,booking,{
            headers:{
                'x-access-token':localStorage.getItem('token')
            }
        })
        return response
        
    } catch (error) {
        throw error
    }
}