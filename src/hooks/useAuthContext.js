import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuthContext = () =>{
    const context = useContext(AuthContext);

    if(!context){
        throw Error('useAuthcontext must be inside an authcontext provider')
    }

    return context
}

