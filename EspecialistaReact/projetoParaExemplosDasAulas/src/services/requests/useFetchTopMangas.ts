import { useQuery } from 'react-query'
import axiosInstance from '../api'
import { TopMangaApiResponse } from './type'

async function getTopMangas() {
    const { data } = await axiosInstance.get<TopMangaApiResponse>('top/manga')
    
    return data
}   

export default function useFetchTopMangas() {
    return useQuery('topMangas', getTopMangas)
}