import React, { useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../store/auth-context';
const useHttps = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const authCtx = useContext(AuthContext);

  
        const params = {
            username: authCtx.employeeID,
            password: authCtx.token
        }
    

    const SendingRequest = useCallback(async (type, url, userdata,  checkemployeeData = false) => {
        setIsLoading(true);
        setError(false);
        try{
            const user = !!checkemployeeData? null : !!userdata ? [userdata, {params}]: [{params}];
            const URL = `http://localhost:4000/${url}`;
            let response;

            switch (type) {
                case 'get':
                    response = await axios.get(URL, ...user);
                  break;
                case 'post':
                    response = await axios.post(URL, ...user)
                    console.log('response  https:', response);
                    break;
                case 'patch':
                    response = await axios.patch(URL, ...user);
                  break;
                case 'delete':
                    response = await axios.delete(URL, ...user);
                  break;
              }
            setIsLoading(false);
            if(response.status !== 200 && response.status !==201){
                throw new Error('Request Faild')
            }   
            return response;

        } catch(error) {
            setError(error.message || 'API is Not working');
        };
        setIsLoading(false);
    }, []);

    return {
     isLoading,
     error,
     SendingRequest
    }

}




export default useHttps;