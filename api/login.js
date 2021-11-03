import  request  from "./request.js";

export const loginIn = (data) => {
  return request({
    url:'/api/users/login',
    method: 'post',
    data
  })
}