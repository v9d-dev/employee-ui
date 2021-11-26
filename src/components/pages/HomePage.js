import { useContext } from "react"
import jwt_decode from "jwt-decode";
import { AuthContext } from "../store/auth-context";


const HomePage = (props) => {

    const authCtx = useContext(AuthContext);

    let userData = jwt_decode(authCtx.token);

    return(
        <p>{JSON.stringify(userData)}</p>
    );

}

export default HomePage;