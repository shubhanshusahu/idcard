import { useEffect } from "react";
import { useState } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/main.css'

// import successNoti, { errorNoti, infoNoti } from "../Alert";
import { useForm } from "react-hook-form";
import './student.css'

import { useLocation, useNavigate } from "react-router-dom";
import { data } from '../../fixedData';

import * as Aiicons from 'react-icons/ai';

import { DeleteReq } from "../HttpReqs";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../ConfirmDialog";
import { useMemo } from 'react'
// import countryList from 'react-select-country-list'

// import { data } from '../fixedData'
export function SmallInputdesign(props: any) {
    return (
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
            <div className="form-group">
                {props.children}
            </div>
        </div>
    )

}
export function Boxhtml(props: any) {
    return (<div className="container addScrollpatient" style={{ marginTop: '13px', marginBottom: '13px' }}>
        <div className="container-fluid p-0">
            <div className="main-container">
                <div className="content-wrapper ">
                    <div className="row gutters">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-10">
                            <div className="mincon">
                                <div className="card-body">
                                    {props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Row end --> */}

                </div>
                {/* <!-- Content wrapper end --> */}

            </div>
            {/* <!-- *************
    ************ Main container end *************
************* --> */}
            {/* <footer className="main-footer">© Footer</footer> */}
        </div>
        {/* <Notifications position='bottom-right' /> */}

    </div>);
}


export default function PatientRegisteration(props: any) {
    const baseUrl = data.baseUrl
    const dispatch = useDispatch()
    const [img, setimg] = useState(null)
    const { companyID,currentPatient,mobileForPtReg} = useSelector((state: any) => state.RootRed)
    const defaultdata = {
        "instituteid":1,
        "studname":"",
        "rollno":"",
        "enrollno":"",
        "class":0,
        "section":"",
        "father_name":"",
        "mother_name":"",
        "blood_group":"",
        "dob":"",
        "address":"",
        "pincode":"",
        "gender":"",
        "contactno":"",
        
    }
    const { register, handleSubmit, watch, setValue, getValues, reset, formState: { errors } } = useForm({
        defaultValues: defaultdata
    });
    // console.log(getValues('patient_id'))
    const [lastName, setlastName] = useState("")
    const [address2, setaddress2] = useState("")

    let navigate = useNavigate();
    const location = useLocation();
    const [studentImg,setStudentImg ] = useState('')
//   const options = useMemo(() => countryList().getData(), [])
    // useEffect(() => {
    //     if (currentPatient != null) {
    //         getPatient(currentPatient.patient_id, currentPatient.urn)
    //     }
    //     if(mobileForPtReg!==null)
    //     {
    //         setValue("contact_details.phone_number",mobileForPtReg)
    //     }
    // }, [])
    const filehandle = (e: any) => {
        setimg(e.target.files[0])
    }
    const resetForm=()=>{
        dispatch({
            type:'changeCurrentPatient',
            payload:null
            });
            reset()
    }
    const createStudent = async (data: any) => {
        const myRenamedFile = new File([studentImg], `${data.studname}${data.class}${data.father_name}.jpg`);
        console.log(studentImg)
        try {
            var formData = new FormData();
            
            formData.append("photo",myRenamedFile)
            formData.append("data",JSON.stringify(Object.values(data)));
            console.log(formData,'formData')
            const config = { headers: {  "Content-Type": "multipart/form-data", } }
            axios.post(baseUrl + 'student',formData,config
                // {
                //     "instituteid":data.instituteid,
                //     "studname":data.studname,
                //     "rollno":data.rollno,
                //     "enrollno":data.enrollno,
                //     "class":data.class,
                //     "section":data.section,
                //     "father_name":data.father_name,
                //     "mother_name":data.mother_name,
                //     "blood_group":data.blood_group,
                //     "dob":data.dob,
                //     "address":data.address,
                //     "pincode":data.pincode,
                //     "pic":studentImg,
                //     "gender":data.gender,
                //     "contactno":data.contactno,

                // },
                )
                .then(function (response: any) {
                    
                    console.log(response, "this one");
                })

                .catch(function (error: any) {
                    console.log(error);
                    alert("Account not created!"+ error.response)
                });
        }
        catch (e) {
            alert("Account not created!"+ 'Please try again')
        }
    };

    const getPatient = (patient_id: string, urn: string) => {
        try {
            axios.get(baseUrl + `/rpatient/qwe123?patient_id=${patient_id}&urn=${urn}`)
                .then(function (response: any) {
                    if (response.data) {
                        setValue("studname", response.data.name)
                        setValue("address", response.data.patient_id)
                        setValue("blood_group", response.data.date_of_birth)
                        setValue("gender", response.data.gender)
                        setValue("class", response.data.class)
                        setValue("dob", response.data.dob)
                        setValue("enrollno", response.data.enrollno)
                        setValue("father_name", response.data.father_name)
                        setValue("mother_name", response.data.address.postal_code)
                        setValue("instituteid", response.data.instituteid)
                        // setValue("pic", response.data.pic)
                        setValue("rollno", response.data.rollno)
                        setValue("section", response.data.section)
                        setValue("pincode", response.data.pincode)
                    }
                    console.log(response);
                })
                .catch(function (error: any) {
                    //   infoNoti("Account not created!",error.response.data.detail)
                    console.log(error);
                    alert("Patient not found!  "+ error.response.data.detail)
                })

        }
        catch (e: any) {
            console.log("Something went wrong!", "Please try again or contact us")
        }

    };


const fileHandle = (e:any)=>{
console.log(e.target.files[0])
setStudentImg(e.target.files[0])
}
    return (
        <Boxhtml>
            <form onSubmit={handleSubmit(createStudent)}>
                <div className="row gutters">
                    <SmallInputdesign>
                        <label>Upload Image</label>
                        <input type="file" className="form-control" id="education" placeholder="Select Image..."
                        onChange={fileHandle}
                            />
                        {/* {errors. && <span className='errormsg'>Image is required</span>} */}
                    </SmallInputdesign>
                    <SmallInputdesign>
                        <label>First Name</label>
                        <input className="form-control" id="education" placeholder="Name..."
                            {...register("studname", { required: true })} />
                        {errors.studname && <span className='errormsg'>This field is required</span>}
                    </SmallInputdesign>
                    <SmallInputdesign>
                        <label>Father's Name</label>
                        <input className="form-control" id="education" placeholder="Father's Name..."
                            {...register("father_name", { required: true })} />
                        {errors.father_name && <span className='errormsg'>This field is required</span>}
                    </SmallInputdesign>
                    <SmallInputdesign>
                        <label>Mother's Name</label>
                        <input className="form-control" id="education" placeholder="Mother's Name..."
                            {...register("mother_name")} />
                        {errors.mother_name && <span className='errormsg'>This field is required</span>}
                    </SmallInputdesign>
                    <SmallInputdesign>
                        <label>Roll Number</label>
                        <input className="form-control" id="education" placeholder="Roll no..."
                            {...register("rollno", { required: true })} />
                        {errors.rollno && <span className='errormsg'>This field is required</span>}
                    </SmallInputdesign>
                    <SmallInputdesign>
                        <label>Enrollment Number</label>
                        <input className="form-control" id="education" placeholder="Enrollment no..."
                            {...register("enrollno")} />
                        {errors.enrollno && <span className='errormsg'>This field is required</span>}
                    </SmallInputdesign>
                    <SmallInputdesign>
                        <label> Class</label>
                        <select className="form-control"
                            {...register("class", { required: true })}
                        >
                            <option value="">Select Class</option>
                            {data.class.map(cls=> <option value={cls}>{cls}</option>)}

                        </select>
                        {errors.class && <span className='errormsg'>This field is required</span>}
                    </SmallInputdesign>
                    <SmallInputdesign>
                        <label> Section.</label>
                        <select className="form-control"
                            {...register("section", { required: true })}
                        >
                            <option value="">Select Section</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                            <option value="F">F</option>

                        </select>
                        {errors.section && <span className='errormsg'>This field is required</span>}
                    </SmallInputdesign>
                    <SmallInputdesign>
                        <label >Date of Birth</label>

                        {/* <input  className="form-control"  placeholder="dateof birth..." pattern="[0-9]*" value={formDetail.age} onChange={(num) => setformDetail({ ...formDetail, "age": num.target.value.replace(/\D/, '') })} /> */}
                        <input type="date" className="form-control" placeholder="Date Of Birth"
                            {...register("dob", {
                                required: true,
                                validate: value => {
                                    let mydate = new Date(value + "T00:00:00");
                                    return mydate <= new Date();
                                }
                            })} />
                        {errors.dob && <span className='errormsg'>This field is required</span>}
                    </SmallInputdesign>
                    <SmallInputdesign>
                        <label> Gender.</label>
                        <select className="form-control"
                            {...register("gender", { required: true })}
                        >
                            <option value="">Select Gender</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                        {errors.gender && <span className='errormsg'>This field is required</span>}
                    </SmallInputdesign>
                    <SmallInputdesign>
                        <label> Blood Group.</label>
                        <select className="form-control"
                            {...register("blood_group", { required: true })}
                        >
                            <option value="">Select Blood group</option>
                            <option value="O+">O+</option>
                            <option value="A+">A+</option>
                            <option value="B+">B+</option>
                            <option value="A-">A-</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select>
                        {errors.blood_group && <span className='errormsg'>This field is required</span>}
                    </SmallInputdesign>


                    <SmallInputdesign>
                        <label >Mobile Number</label>
                        <input className="form-control" placeholder="Mobile Number" type="number"
                            {...register("contactno", { required: true, maxLength: 40, minLength: 6 })} />
                        {errors.contactno && <span className='errormsg'>This field is invalid</span>}
                    </SmallInputdesign>
                    <div className="col-sm-12">
                        <label >Address</label>
                        <input className="form-control minadd" placeholder="Address line 1..."
                            {...register("address", {
                                required: true, minLength: 3, maxLength: 100,
                                pattern: /[A-Za-zÀ-ÚÄ-Ü]/, //letters mandatory(can have numbers)
                            })} />
            
                        {errors.address && <span className='errormsg'>Address is Invalid</span>}
                    {/* </SmallInputdesign> */}
                    </div>



                    <SmallInputdesign>
                        <label >Postal code</label>
                        <input type="number" className="form-control" placeholder="Postal code"
                            {...register("pincode", { required: true, minLength: 3, maxLength: 20 })} />
                        {errors.pincode && <span className='errormsg'>This field is required</span>}
                    </SmallInputdesign>

                    <div className="">
                        <div className="col-sm-12 col-md-12 col-xs-12 text-right">
                            <div className="text-right classrgsetting" style={{ float: 'right', textAlign: 'right' }}>

                                <button type="submit" className="btn btn-primary btnsubmitdetails">  Submit </button>
                                <button type="button" onClick={()=>resetForm()} className="btn btn-success btnsx">  Reset </button>
                               {/* {location.pathname!=='/RegisterYourself/form' && <button type='button' className="btn btn-danger " onClick={() => deletePatient()} value="delete">  Delete</button>} */}
                               {/* <button type='button' onClick={() => navigate(-1)} className="btn btn-success btnbackresult">Back</button> */}
                                {/* <button type="submit" className="btn btn-primary btn-lg btn-block">Submit </button> */}
                            </div>
                          
                        </div>

                    </div>


                </div>
            </form>
        </Boxhtml>
    );
}
