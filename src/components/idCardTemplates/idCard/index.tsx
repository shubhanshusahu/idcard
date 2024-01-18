import React from 'react'
import { data } from '../../../fixedData'

const Card = ({file,stud}:any) => {
  const baseUrl = data.baseUrl
  let d=new Date(stud?.dob)
  return (
    <div className="head-text">
    <div className="head-image">
    <img className = "idcardPreview" src={file}/>
    </div>
    <img className='dp' src ={baseUrl+'uploads/'+stud?.pic}/>
    <p className=" idname">{stud?.studname} </p>
    <div  className='text-on-image'>
      
        <p className="field">{stud?.father_name} </p>
        <p className="field">{stud?.class} {stud?.section} </p>
        <p className="field">{d.getDate()}-{d.getMonth()}-{d.getFullYear()}</p>
        <p aria-multiline className="field">{stud?.contactno} </p>
        <p className="field">{stud?.address}</p>
    </div>
</div>
  )
}

export default Card
