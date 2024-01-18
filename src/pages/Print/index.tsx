import React, { useEffect, useRef, useState } from 'react'
import { BigInputdesign, Boxhtml, SmallInputdesign } from '../../components/Boxhtml'
import { useDispatch, useSelector } from 'react-redux'
import { GetReq } from '../../components/HttpReqs'
import './print.css'
import Card from '../../components/idCardTemplates/idCard'
import ReactToPrint, { useReactToPrint } from 'react-to-print'
const Print = () => {
    const componentRef = useRef(null);
    const dispatch = useDispatch()
    const [file, setFile] = useState('');
    const [DevelopPrint, setDevelopPrint] = useState(false);

    const { schoolList,students } = useSelector((state: any) => state.RootRed)
    const getStudents = async () => {
        let stdnts = await GetReq('students')
        console.log(stdnts, 'stdnts')
        dispatch({
            type: 'getStudents',
            payload: stdnts.data
        })
    }

    const getSchools = async () => {
        let scls = await GetReq('schools')
        dispatch({
            type: 'getSchools',
            payload: scls.data
        });
    }
    useEffect(() => {
        if (students.length == 0) {
            getStudents();
        }
        else{
            console.log(students, 'students')
        }
        if (schoolList.length == 0) {
            getSchools();
            
        }
        else {
            console.log(schoolList, 'schoollist')
         

        }
    }, [])
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
    function handleChange(e: any) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    return (<>
        <Boxhtml>
            <h3 className="heading">ID Card Printing</h3>
            <hr></hr>
            <div className="row gutters">
            <BigInputdesign>
                <label> Select your School</label>
                <select className="form-control"
                >
                    <option value="">Select</option>
                    {schoolList.map((schl: { idSchool: string | number | readonly string[] | undefined; SchoolnName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; SchoolAddress: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined }): any =>
                        <option value={schl.idSchool}>{schl.SchoolnName} -{schl.SchoolAddress}-{schl.idSchool}</option>)}
                </select>
            </BigInputdesign>
            <SmallInputdesign>
            <BigInputdesign>
                <label> Add ID card background Image</label>
                <input type="file" className="form-control" onChange={handleChange} />

            </BigInputdesign>
            
            

            </SmallInputdesign>
            <SmallInputdesign>
            {file && 
            <> <label>Preview</label>
           { students.length > 0 &&  <Card file ={file} stud ={students[0]}/>}</>}
           </SmallInputdesign>
            </div>
        </Boxhtml>
        <button className='btn btn-primary' onClick={()=>setDevelopPrint(true)}>Generate ID Cards</button>
        <button className='btn btn-success'  onClick={handlePrint}>Print this out!</button>
        {file && DevelopPrint &&  <div  ref={componentRef}> 
         <div  className='printPage'> 
            {
               
                students.length > 0 && students.map((stud: any,i: number)=>  <Card key ={i} file ={file} stud={stud}/>)
                
            }</div>
         {/* <div  className='printPage'>      <Card file ={file}/> <Card file ={file}/>  <Card file ={file}/> <Card file ={file}/>  <Card file ={file}/> <Card file ={file}/>  <Card file ={file}/> <Card file ={file}/>   <Card file ={file}/> <Card file ={file}/> <Card file ={file}/> <Card file ={file}/> <Card file ={file}/><Card file ={file}/> <Card file ={file}/>  <Card file ={file}/> <Card file ={file}/><Card file ={file}/> <Card file ={file}/><Card file ={file}/><Card file ={file}/><Card file ={file}/><Card file ={file}/><Card file ={file}/><Card file ={file}/></div>
         <div  className='printPage'>      <Card file ={file}/> <Card file ={file}/>  <Card file ={file}/> <Card file ={file}/>  <Card file ={file}/> <Card file ={file}/>  <Card file ={file}/> <Card file ={file}/>   <Card file ={file}/> <Card file ={file}/> <Card file ={file}/> <Card file ={file}/> <Card file ={file}/><Card file ={file}/> <Card file ={file}/>  <Card file ={file}/> <Card file ={file}/><Card file ={file}/> <Card file ={file}/><Card file ={file}/><Card file ={file}/><Card file ={file}/><Card file ={file}/><Card file ={file}/><Card file ={file}/></div> */}
       </div>}
        <BigInputdesign>
        {/* <Card file ={file}/><Card file ={file}/><Card file ={file}/> */}
        {/* <Card file ={file}/><Card file ={file}/><Card file ={file}/><Card file ={file}/><Card file ={file}/><Card file ={file}/><Card file ={file}/> */}
        </BigInputdesign>
         
                
        </>
    )
}

export default Print
