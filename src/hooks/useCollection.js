import { useState } from "react"
import { useEffect } from "react"
import { projectFirestore } from "../firebase/config"
import { useRef } from "react"

export const useCollection=(collection,_query,_orderBy)=>{
    const [documents, setDocuments] = useState(null)
    const [error,setError] = useState(null)

    //preventing infinte loops when adding a reference type to an array dependency
    const query = useRef(_query).current
    const orderBy = useRef(_orderBy).current

    useEffect(()=>{
        let ref = projectFirestore.collection(collection)

        if(query){
            ref = ref.where(...query)
        }
        if(orderBy){
            ref = ref.orderBy(...orderBy)
        }

    const unsubscribe = ref.onSnapshot((snapshot)=>{
        let results = []
        snapshot.docs.forEach((doc)=>{
            results.push({...doc.data(), id:doc.id})
        })

        //update state
        setDocuments(results)
        setError(null)
    },(error)=>{
        console.log(error)
        setError('could not fetch data')
    })
    //usnsubscribe on unmount
    return ()=>unsubscribe()
    },[collection,query,orderBy])
    
    return {documents,error}
}