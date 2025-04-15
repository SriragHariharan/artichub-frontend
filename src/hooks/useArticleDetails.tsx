import { useEffect, useState } from 'react'
import axiosInstance from '../helpers/axios';

function useArticleDetails({id}) {
    const [articleDetails, setArticleDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axiosInstance.get(`/post/${id}`)
        .then((response) => {
            console.log(response.data);
            setArticleDetails(response.data?.data);
            setLoading(false);
        })
        .catch((error) => {
            setError(error?.response?.data?.message);
        })
    }, [id]);

    return {articleDetails, loading, error};
}

export default useArticleDetails