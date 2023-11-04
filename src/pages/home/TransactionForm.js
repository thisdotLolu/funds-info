import React from 'react'
import { useState } from 'react'
import { useFireStore } from '../../hooks/useFireStore'
import { useEffect } from 'react'


const TransactionForm = ({uid}) => {
    const [name,setName ] = useState('')
    const [amount, setAmount] = useState('')
    const {addDocument,response} = useFireStore('transactions')

    const handleSubmit = (e) => {
        e.preventDefault()
        addDocument({
            uid,
            name,
            amount
        })
    }

    useEffect(()=>{
        if(response?.success){
            setName('')
            setAmount('')
        }
    },[response?.success])

  return (
    <>
    <h3>Add a Transaction</h3>
    <form onSubmit={handleSubmit}>
        <label>
            <span>Transaction Name:</span>
            <input
            type='text'
            required
            value={name}
            onChange={(e)=> setName(e.target.value)}
            />
        </label>
        <label>
            <span>Amount ($):</span>
            <input
            type='text'
            required
            onChange={(e)=>setAmount(e.target.value)}
            value={amount}
            />
        </label>
        <button>Add Transaction</button>
    </form>
    </>
  )
}

export default TransactionForm