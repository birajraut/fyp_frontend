import {authApi} from "./axios"


export const userDetails = async  ()=>{
  return authApi.get(`/user`)
}

export const listUsers = async () => {
  return authApi.get('/admin/users');
}
