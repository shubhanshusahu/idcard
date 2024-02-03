import axios from "axios";
// import { errorNoti } from "../Alert";
import { data } from "../../fixedData";

const base = data.baseUrl

export function PostReq(paramQuery: string, data: any) {
    const config = { headers: {} }
    const res = axios.post(`${base}${paramQuery}`, data, config)
    res.then(res => res)
        .catch(e => {
            alert('Something went wrong ' + e.message)
            console.log(e)
        }
        )

    return res;
}

export function GetReq(paramQuery: string) {
    const res = axios.get(`${base}${paramQuery}`)
    res.then(res => console.log(res))
        .catch(e => alert('Something went wrong ' + e.message))

    return res;
}

export function DeleteReq(paramQuery: string) {
    const res = axios.delete(`${base}${paramQuery}`)
    res.then(res => console.log(res))
        .catch(e => alert('Something went wrong ' + e.message))

    return res;
}