import { useEffect, useState } from "react";
import axiosInstance from "../helpers/axios";

//custom hook to fetch the feed of a user
function useFeed() {
    const [feeds, setFeeds] = useState([]);
    const[error, setError] = useState(null);
    const[loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        axiosInstance.get("/post/feeds")
        .then((response) => {
            console.log(response.data);
            setFeeds(response.data?.data);
            setLoading(false);
        })
        .catch((error) => {
            setError(error?.response?.data?.message);
        })
    }, []);
    
    return { feeds, error, loading };
}

export default useFeed