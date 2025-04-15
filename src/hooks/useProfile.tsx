import { useEffect, useState } from 'react'
import axiosInstance from '../helpers/axios';

function useProfile() {
    const[profile, setProfile] = useState(null);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axiosInstance.get('/profile')
        .then((response) => {
            console.log(response.data);
            setProfile(response.data?.data?.user);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setError(error?.response?.data?.message);
        })
    }, []);
  
    return {profile, loading, error}
}

export default useProfile