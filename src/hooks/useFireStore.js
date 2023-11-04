import { useEffect } from "react";
import { useState } from "react";
import { useReducer } from "react";
import { projectFirestore, timeStamp } from "../firebase/config";

let initialState ={
    document:null,
    isPending:false,
    error:null,
    success:null
}

const firestoreReducer = (state, action) =>{
    switch (action.type) {
        case 'IS_PENDING':
            return {isPending:true,document:null,error:null,success:false}
        case 'ADDED_DOCUMENT':
            return {isPending:false, document:action.payload, success:true, error:null}
        case 'ERROR':
            return {isPending:false, document:null, success:false, error:action.payload}
        default:
            return state;
    }
} 

export const useFireStore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer ,initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    // COLLECTIOn ref
    const ref = projectFirestore.collection(collection)

    //only disptach if not cancelled

    const dispatchIfNotCancelled = (action)=>{
        if(!isCancelled){
            dispatch(action)
        }
    }

    //add document
    const addDocument = async(doc) =>{
        dispatch({type:"IS_PENDING"})

        try{
            const createdAt = timeStamp.fromDate(new Date())
            const addedDocument = await ref.add({...doc, createdAt})
            dispatchIfNotCancelled({type:'ADDED_DOCUMENT',payload:addedDocument})
        }
        catch(err){
            dispatchIfNotCancelled({type:'ERROR',payload:err})
        }
    }

    //delete document
    const deleteDocument =async (id) =>{

    }

    useEffect(()=>{
        return ()=> setIsCancelled(true)
    },[])

    return {addDocument,deleteDocument, response}
}