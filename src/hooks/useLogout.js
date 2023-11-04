import { useState } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"
import { useEffect } from "react"

export const useLogout = () =>{
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()
    const [isCancelled, setIsCancelled] = useState(false)

    const logout = async ()=>{
        setError(null)
        setIsPending(true)

        try {
            await projectAuth.signOut()
            dispatch({type:"LOGOUT"})

            if(!isCancelled){
                setIsPending(false)
            setError(null)
            }
        } catch (error) {
            if(!isCancelled){
            console.log(error)
            setError(error.message)
            setIsPending(false)
            }
        }
    }

    useEffect(()=>{
        return () => setIsCancelled(true)
    },[])

    return {logout,error, isPending}
}