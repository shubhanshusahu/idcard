import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { data } from '../../fixedData';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Boxhtml } from '../../components/Boxhtml';
import { PostReq } from '../../components/HttpReqs';

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
            "idSchool": "",
            "SchoolnName": "",
            "SchoolRedgNo": "",
            "SchoolAddress": "",
        }
    });
    const location = useLocation();
    const baseUrl = data.baseUrl
    let navigate = useNavigate();
    const onSubmit = (data) => {
        console.log(data)
        PostReq('school',data, { headers: { 'accept': 'application/json', 'Content-Type': 'application/json' } })
        .then(res=>{
            console.log(res)
        })

    };
    const getCompany = () => {

    };





    return (
        <Boxhtml>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row gutters">


                    <SmallInputdesign>
                        <label>  Registration No.</label>
                        <input className="form-control" id="education" placeholder="Institute Registration no."
                            {...register("SchoolRedgNo", { required: true })} />
                        {errors.SchoolRedgNo && <span className='errormsg'>This field is required</span>}
                    </SmallInputdesign>

                    <SmallInputdesign>
                        <label>  Schools Name</label>
                        <input className="form-control" id="education" placeholder="Institute Name."
                            {...register("SchoolnName", { required: true })} />
                        {errors.SchoolnName && <span className='errormsg'>This field is required</span>}
                    </SmallInputdesign>

                    <SmallInputdesign>
                        <label>  Registration No.</label>
                        <input className="form-control" id="education" placeholder="Address."
                            {...register("SchoolAddress", { required: true })} />
                        {errors.SchoolAddress && <span className='errormsg'>This field is required</span>}
                    </SmallInputdesign>


                </div>
                <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12" style={{ float: 'right', textAlign: 'right' }}>
                    <input type ="submit" className="btn btn-primary btnsx" />
                    {/* <button onClick={()=>navigate('/Companies')} className="btn btn-primary btnsx">Back</button> */}
                </div>
            </form>

        </Boxhtml>
    )
}
