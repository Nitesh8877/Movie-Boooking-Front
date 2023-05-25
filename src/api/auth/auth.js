import {AxiosInstance} from '../../utils/AxiosInstance'

export const SignUp=async(data)=>{

     const URL="/mba/api/auth/singup"

    try {
        let result=await AxiosInstance.post(URL,data)
        console.log(result);
        return result;
    } catch (error) {
        console.log(error)
        throw error
    }
        
}

export const SignIn=async(data)=>{
    const URL="/mba/api/auth/singin"

    try {
        let result=await AxiosInstance.post(URL,data)
        const {name, userId, email, userType, userStatus, token} =result.data

        localStorage.setItem('username',name);
        localStorage.setItem('userId',userId);
        localStorage.setItem('email',email);
        localStorage.setItem('userType',userType);
        localStorage.setItem('userStatus',userStatus);
        localStorage.setItem('token',token);
        console.log(localStorage['userType']);
        return result;
    } catch (error) {
        console.log(error)
        throw error
        
    }
}

export const getAllUsers=async()=>{
    let URL='/mba/api/users'
    try {
        let result=await AxiosInstance.get(URL)
        console.log(result)
        return result;
    } catch (error) {
        console.log(error.message)
        throw error
    }
}

export const logout=async()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
}