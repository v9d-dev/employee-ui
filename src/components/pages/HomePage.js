import { useEffect, useState } from "react";
import axios from "axios";


const HomePage = (props) => {

    const [userData, setUserData] = useState(null);


    useEffect(() => {
        axios.get(`http://localhost:4000/employee/${props.authCtx.employeeID}`,
        {
          params: {
            username: props.authCtx.employeeID,
            password: props.authCtx.token
          }
        })
        .then(res => {
          setUserData(res.data);
        }).catch( (err) => {
          console.log('employee ERROR===========', err)
        })

      }, [props.authCtx]);

    return(
        userData ? <p>{JSON.stringify(userData)}</p> : null
    );

}

export default HomePage;