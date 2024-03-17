import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation } from 'react-router-dom';
import { datas } from '../firebase';
import { updateDoc,doc } from 'firebase/firestore';


function View() {

  const location = useLocation()
  const data = location.state
  const [displayValue,setDisplayValue] = useState(data.discription)

  const handleChange =(e)=>{
    setDisplayValue(e)
  }

  console.log(displayValue);
  
  const editDiscription = async()=>{
    const oneDoc = doc(datas,'documents',data.id)
    console.log(oneDoc);
    updateDoc(oneDoc,{
      discription:displayValue
    })
  }

  useEffect(()=>{
    editDiscription()
  },[displayValue])

  return (
    <>
      <div className="container">
        <h2 className='mt-2'>{data.title}</h2>
        <ReactQuill className='mt-3' style={{height:'100px'}} placeholder='Type Here' theme="snow" value={displayValue} onChange={(e)=>handleChange(e)} />
      </div>
    </>
  )
}

export default View