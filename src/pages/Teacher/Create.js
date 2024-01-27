import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { data } from '../../fixedData';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { BigInputdesign, Boxhtml } from '../../components/Boxhtml';
import { GetReq, PostReq } from '../../components/HttpReqs';
import { useDispatch } from 'react-redux';

function SmallInputdesign(props) {
    return (
        <div className='col-sm-6'>
            <div className="form-group">
                {props.children}
            </div>
        </div>
    )
}
// import { useNavigate } from "react-router-dom";
export default function CreateSchool(props) {
    const { schoolList, currentSchool } = useSelector((state) => state.RootRed)
    const { register, handleSubmit, watch, setValue, getValues, formState: { errors } } = useForm({
        defaultValues: {
            "username": "",
            "usermail": "",
            "userphone": "",
            "userpass": "",
            "schoolid": 0,
        }
    });
    const dispatch= useDispatch()

    const location = useLocation();
    const baseUrl = data.baseUrl
    let navigate = useNavigate();
    const onSubmit = (data) => {
        console.log(data)
        PostReq('teacher',data, { headers: { 'accept': 'application/json', 'Content-Type': 'application/json' } })
        .then(res=>{
            console.log(res)
            if(res?.status==200){
            //    let schoolListtemp =;
            //    schoolListtemp.push(res.data)
               dispatch({
                type: 'getTeachers',
                payload: []
            })
            alert( data.username+ "'s account created!")
            }
        })

    };
    const getSchools=async()=>{
        if(schoolList.length==0){
            
         let scls = await GetReq('schools')
        dispatch({
            type:'getSchools',
            payload:scls.data
            });   
            console.log(schoolList)
        }
        else{
            console.log(schoolList,'teacher fetching school')

        }
        
    }


useEffect(() => {
    getSchools()
}, [])


    return (
        <Boxhtml>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row gutters">


                    <SmallInputdesign>
                        <label>  Teacher / Admin Name</label>
                        <input className="form-control" id="education" placeholder="Name"
                            {...register("username", { required: true })} />
                        {errors.username && <span className='errormsg'>This field is required</span>}
                    </SmallInputdesign>

                    <SmallInputdesign>
                        <label>Email</label>
                        <input className="form-control" id="education" placeholder="email"
                            {...register("usermail", { required: true })} />
                        {errors.usermail && <span className='errormsg'>This field is required</span>}
                    </SmallInputdesign>
                    
                    <SmallInputdesign>
                        <label>Phone</label>
                        <input className="form-control" id="education" placeholder="Phone"
                            {...register("userphone", { required: true })} />
                        {errors.userphone && <span className='errormsg'>This field is required</span>}
                    </SmallInputdesign>

                    <SmallInputdesign>
                        <label>Password</label>
                        <input className="form-control" id="education" placeholder="Password for teacher"
                            {...register("userpass", { required: true })} />
                        {errors.userpass && <span className='errormsg'>This field is required</span>}
                    </SmallInputdesign>

                    <BigInputdesign>
                        <label> Select your School</label>
                        <select className="form-control"
                            {...register("schoolid", { required: true })}
                        >
                            <option value="">Select</option>
                            {schoolList.map(schl => <option value={schl.idSchool}>{schl.SchoolnName} -{schl.SchoolAddress}</option>)}
                        </select>
                        {errors.schoolid && <span className='errormsg'>This field is required</span>}
                    </BigInputdesign>



                </div>
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12" style={{ float: 'right', textAlign: 'right' }}>
                    <input type ="submit" className="btn btn-primary btnsx" />
                    {/* <button onClick={()=>navigate('/Companies')} className="btn btn-primary btnsx">Back</button> */}
                </div>
            </form>

        </Boxhtml>
    )
}
