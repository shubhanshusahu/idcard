import React from 'react'

const Card = ({file}:any) => {
  return (
    <div className="head-text">
    <div className="head-image">
    <img className = "idcardPreview" src={file}/>
    </div>
    <div className='text-on-image'>
        <p className="field">Shubhanshu Sahu </p>
        <p className="field">7th A </p>
        <p className="field">13/02/1999 </p>
        <p aria-multiline className="field">9827614367 </p>
        <p className="field">Sant nagar, pp colony </p>
    </div>
</div>
  )
}

export default Card
