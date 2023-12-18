import React, { useEffect, useState } from 'react'
import { BigInputdesign, Boxhtml, SmallInputdesign } from '../../components/Boxhtml'
import { useDispatch, useSelector } from 'react-redux'
import { GetReq } from '../../components/HttpReqs'
import './print.css'
import Card from '../../components/idCard'
const Print = () => {

    const dispatch = useDispatch()
    const [file, setFile] = useState('');
    const { schoolList } = useSelector((state: any) => state.RootRed)
    const getSchools = async () => {
        let scls = await GetReq('schools')
        dispatch({
            type: 'getSchools',
            payload: scls.data
        });
    }
    useEffect(() => {
        if (schoolList.length == 0) {
            getSchools();
        }
        else {
            console.log(schoolList, 'schoollist')
        }
    }, [])

    function handleChange(e: any) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    return (<>
        <Boxhtml>
            <h3 className="heading">ID Card Printing</h3>
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
            <label>Preview</label>
               <Card file ={file}/>
           </SmallInputdesign>
            </div>
        </Boxhtml>
        <Boxhtml>

       
        <BigInputdesign>
        <Card file ={file}/><Card file ={file}/><Card file ={file}/>
        <Card file ={file}/><Card file ={file}/><Card file ={file}/><Card file ={file}/><Card file ={file}/><Card file ={file}/><Card file ={file}/>
        </BigInputdesign>
         </Boxhtml>
        
        </>
    )
}

export default Print
