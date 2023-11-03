import { useEffect, useState } from "react"
import { makeRequest } from "./makeRequest"

const useFetch = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await makeRequest.get(url, {
                    headers: {Authorization: 'Bearer ' + import.meta.env.VITE_MONGO_API_KEY}
                })
                setData(res.data)            
            } catch(error) {
                setError(true)
            }
            setLoading(false)
        }
        fetchData()
    }, [url])
    return {data, loading, error}
}

export default useFetch;


    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const res = await makeRequest.get(url, {
    //                 headers: {Authorization: 'Bearer ' + import.meta.env.VITE_API_TOKEN}
    //             })
    //             setData(res.data.data)              
    //         } catch(error) {
    //             setError(true)
    //         }
    //         setLoading(false)
    //     }
    //     fetchData()
    // }, [url])
    // return {data, loading, error}