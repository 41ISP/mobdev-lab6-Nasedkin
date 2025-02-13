import { ICityRDO } from "@/entities/city"
import { IForecast } from "@/entities/forecast"
import { ITemperature } from "@/entities/temperature"
import axios from "axios"

const axiosWeatherInstance = axios.create({
    baseURL: "https://dataservice.accuweather.com/"
})

const weatherRequest = {
        cityReq: async(cityName: string) =>{
            const response = await axiosWeatherInstance.get<ICityRDO[]>("locations/v1/cities/search", {
                withCredentials: false,
                params:{
                    apikey: "UWJ38WTrCqzQ1YM3cakTy9tTY9TInnIG",
                    q: cityName,
                    language: "ru-ru"
                }
            })
            return response.data
        },
        weatherReq: async(cityKey: string) =>{
            const response = await axiosWeatherInstance.get<ITemperature[]>("currentconditions/v1/"+cityKey,{
                withCredentials: false,
                params:{
                    apikey: "UWJ38WTrCqzQ1YM3cakTy9tTY9TInnIG",
                    language: "ru-ru",
                    details: true
                }
            })
            console.log(response.data)
            return response.data
        },
        forecastReq: async(cityKey: string) =>{
            const response = await axiosWeatherInstance.get<IForecast>("forecasts/v1/daily/5day/"+cityKey,{
                withCredentials: false,
                params:{
                    apikey: "UWJ38WTrCqzQ1YM3cakTy9tTY9TInnIG",
                    metric: true,
                    language: "ru-ru"
                }
            })
            console.log(response.data)
            return response.data
        }
    }


export default weatherRequest