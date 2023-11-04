import { useState } from "react"
import { useEffect } from "react"
import { projectFirestore } from "../firebase/config"
import { useRef } from "react"

export const useCollection=(collection,_query)=>{
    const [documents, setDocuments] = useState(null)
    const [error,setError] = useState(null)

    //preventing infinte loops when adding a reference type to an array dependency
    const query = useRef(_query).current

    useEffect(()=>{
        let ref = projectFirestore.collection(collection)

        if(query){
            ref = ref.where(...query)
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
    },[collection,query])
    
    return {documents,error}
}