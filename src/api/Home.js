import request from "@/utils/request"



export const userLogin =()=>request({
    url:'/login/cellphone?phone=18582584396&password=linquan0422',
}) 

export const recommendMusic = params=> request({
    url:"/personalized",
    params
})

export const newMusic = params => request({
    url:"/personalized/newsong",
    params
})

