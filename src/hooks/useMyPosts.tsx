import { useEffect, useState } from 'react'
import axiosInstance from '../helpers/axios';

function useMyPosts() {
    const [myPosts, setMyPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axiosInstance.get('/post/mine')
        .then((response) => {
            console.log(response.data);
            setMyPosts(response.data?.data);
            setLoading(false);
        })
        .catch((error) => {
            setError(error?.response?.data?.message);
        })
    }, []);

    return { myPosts, loading, error };
}

export default useMyPosts