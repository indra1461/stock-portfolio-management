//import api from "@/services/api";
import axios from "axios";



const API_KEY = process.env.NEXT_PUBLIC_TWELVE_DATA_API_KEY;

export const getQuote  = async (symbol:string)=>{
    const response = await axios.get("https://api.twelvedata.com/quote",{
        params:{
            symbol,
            apikey:API_KEY,
        }
    })
    return response.data;
}
// export const getMarketData= async ()=>{
//     return [];
// }   