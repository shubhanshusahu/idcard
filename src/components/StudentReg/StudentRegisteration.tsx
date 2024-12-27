import { useEffect } from "react";
import { useState } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../style/main.css'
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from "react-hook-form";
import './student.css'

import { useLocation, useNavigate } from "react-router-dom";
import { data, UploadStudentImg } from '../../fixedData';

import * as Aiicons from 'react-icons/ai';

import { DeleteReq, GetReq, Putreq } from "../HttpReqs";
import { useDispatch, useSelector } from "react-redux";
import ConfirmDialog from "../ConfirmDialog";
import { useMemo } from 'react'
import { BigInputdesign, Boxhtml, SmallInputdesign } from "../Boxhtml";
import { Button } from "@mui/material";
// import countryList from 'react-select-country-list'

// import { data } from '../fixedData'


export default function StudentReg(props: any) {
    const baseUrl = data.baseUrl
    const dispatch = useDispatch()
    const [img, setimg] = useState(null)
    const [file, setFile] = useState('');
    const [houseColor, sethouseColor] = useState('')
    const [stream, setstream] = useState('')

    const [loading, setloading] = useState(false)
    const { schoolList, currentPatient, currentStudentDetails } = useSelector((state: any) => state.RootRed)
    const defaultdata = {
        "instituteid": 1,
        "studname": "",
        "rollno": "",
        "enrollno": "",
        "class": 0,
        "section": "",
        "father_name": "",
        "mother_name": "",
        "blood_group": "",
        "dob": "",
        "address": "",
        "pincode": "",
        "gender": "",
        "contactno": "",
        "pic": "",
        "housecolor" : "",
        "stream": ""

    }
    const { register, handleSubmit, watch, setValue, getValues, reset, formState: { errors } } = useForm({
        defaultValues: defaultdata
    });
    // console.log(getValues('patient_id'))
    const [currStudent, setcurrStudent] = useState(defaultdata)
    const [address2, setaddress2] = useState("")

    let navigate = useNavigate();
    const location = useLocation();
    const [studentImg, setStudentImg] = useState('')
    const [schools, setschools] = useState([{
        SchoolAddress: "",
        SchoolRedgNo: "",
        SchoolnName: "",
        idSchool: 0
    }])
    //   const options = useMemo(() => countryList().getData(), [])
    const getSchools = async () => {
        let scls = await GetReq('schools')
        setschools(scls.data)
        dispatch({
            type: 'getSchools',
            payload: scls.data
        });
    }
    const setStudentinForm = (currentStudentDetails: any) => {
        // let dobrecd=new Date((currentStudentDetails.dob).toString())
        // dobrecd.getFullYear()+'-'+dobrecd.getMonth()+'-'+dobrecd.getDate()
        // console.log(dobrecd.getFullYear()+'-'+dobrecd.getMonth()+'-'+dobrecd.getDate(),'date')
        console.log(currentStudentDetails.dob, 'dob')
        setValue("instituteid", currentStudentDetails.instituteid)
        setValue("studname", currentStudentDetails.studname)
        setValue("rollno", currentStudentDetails.rollno)
        setValue("enrollno", currentStudentDetails.enrollno)
        setValue("class", currentStudentDetails.class)
        setValue("section", currentStudentDetails.section)
        // setValue("housecolor", currentStudentDetails.housecolor)
        setValue("father_name", currentStudentDetails.father_name)
        setValue("mother_name", currentStudentDetails.mother_name)
        setValue("blood_group", currentStudentDetails.blood_group)
        setValue("dob", currentStudentDetails.dob)
        setValue("address", currentStudentDetails.address)
        setValue("pincode", currentStudentDetails.pincode)
        setValue("gender", currentStudentDetails.gender)
        setValue("contactno", currentStudentDetails.contactno)
        setFile( currentStudentDetails?.pic)
        setValue("stream",currentStudentDetails.stream)
        setValue("housecolor",currentStudentDetails.housecolor)
    }
    useEffect(() => {
        if (schoolList.length == 0) {
            getSchools()
        }
        else {
            setschools(schoolList)
        }
        console.log(currentStudentDetails, 'current student id')
        if (props.idstudent != 0) {
            GetReq('student?idstudent=' + props.idstudent)
                .then(res => {
                    console.log('getting student details', res)
                    if (res.data.length)
                        setStudentinForm(res.data[0])
                    setcurrStudent(res.data[0])
                    dispatch({
                        type: 'setStudentDetails',
                        action: res.data[0]
                    })
                })
            console.log(props.idstudent, 'current student selected to edit')

        }


    }, [])


    const filehandle = (e: any) => {
        setimg(e.target.files[0])
    }
    const resetForm = () => {
        // dispatch({
        //     type: 'changeCurrentPatient',
        //     payload: null
        // });
        if (props?.idstudent) {
            props.idstudent = 0
        }
        setStudentImg('')
        reset()
    }

    const UpdatePhoto = async () => {
        setloading(true)
        if(studentImg === ''){
            alert('Please select any image to Upload!')
            setloading(false)
            return;
        }
        let picUrl = await UploadStudentImg(studentImg)
        setValue("pic", picUrl)
        let data = { idstudent: props.idstudent , pic : picUrl }
        try {          
            Putreq('studentPhoto', data)
                .then(res => {
                    console.log(res)
                    alert(res.data.message)
                    setloading(false)

                })
                .catch(err => { console.log(err); setloading(false) })
        }
        catch (e) {
            console.log(e)
            setloading(false)
        }
    }
    const update = () => {
        setloading(true)
        console.log(getValues(), 'get vlaues')
        Putreq('student?idstudent=' + props.idstudent, getValues())
            .then(function (response: any) {
                if (response.status == 201) {
                    alert('Student Updated!')
                    reset()
                    setloading(false)
                    // props?.setValue(0)
                }
                console.log(response, "this one");
            })

            .catch(function (error: any) {
                console.log(error);
                alert(error.response)
                reset()
                setloading(false)
            });
    }
    const createStudent = async (data: any) => {
        setloading(true)
        const myRenamedFile = new File([studentImg], `${data.studname}${data.class}${data.father_name}.jpg`);
        console.log(studentImg)
        try {
            if(studentImg !=''){
                let picUrl = await UploadStudentImg(studentImg)
                data.pic =picUrl;
                setValue("pic", picUrl)
            }
            else{
                data.pic = ''
            }
            
            console.log(data, 'data to be sent')
            axios.post(baseUrl + 'student', data
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
                    if (response.status == 201) {
                        alert('Student Registered!');
                        setStudentImg('')
                        reset()
                        setloading(false)
                    }
                    console.log(response, "this one");
                })

                .catch(function (error: any) {
                    console.log(error);
                    setloading(false)
                    alert("Account not created!" + JSON.stringify(error))
                });
        }
        catch (e) {
            alert("Account not created!" + 'Please try again')
        }
    };

    const getPatient = (patient_id: string, urn: string) => {
        try {
            axios.get(baseUrl + `/rpatient/qwe123?patient_id=${patient_id}&urn=${urn}`)
                .then(function (response: any) {
                    if (response.data) {
                        console.log(response.data.dob, 'dOb')
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
                    alert("Patient not found!  " + error.response.data.detail)
                })

        }
        catch (e: any) {
            console.log("Something went wrong!", "Please try again or contact us")
        }

    };


    const fileHandle = (e: any) => {
        console.log(e.target.files[0])
        setStudentImg(e.target.files[0])
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    return (
        <Boxhtml>
            <form onSubmit={handleSubmit(createStudent)}>
                <h3 className="heading">Student Form</h3>
                <div className="row gutters">
                    <BigInputdesign>
                        <label> Select your School</label>
                        <select className="form-control"
                            {...register("instituteid", { required: true })}
                        >
                            <option value="">Select</option>
                            {schools.map(schl => <option value={schl.idSchool}>{schl.SchoolnName} -{schl.SchoolAddress}-{schl.idSchool}</option>)}
                        </select>
                        {errors.instituteid && <span className='errormsg'>This field is required</span>}
                    </BigInputdesign>
                    <SmallInputdesign>
                        <label>Upload Image</label>
                        <input type="file" accept="image/*" className="form-control" id="education" placeholder="Select Image..."
                            onChange={fileHandle}
                        />
                    </SmallInputdesign>

                    {file && <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                        <div className="form-group acenter text-center">
                            <img className="imgPreview" src={file} />
                        </div>
                    </div>}


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
                            {...register("rollno")} />
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
                            {data.class.map(cls => <option value={cls}>{cls}</option>)}

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
                        <label >Subject/Stream</label>
                        <input className="form-control" placeholder="Subject/Stream"
                               {...register("stream")} />
                    </SmallInputdesign>
                    <SmallInputdesign>
                        <label >House Name/Color</label>
                        <input className="form-control" placeholder="House name/color"
                            {...register("housecolor")} />
                    </SmallInputdesign>
                    {/* <SmallInputdesign>
                        <label >Date of Birth</label>

                        <input type="date" className="form-control" placeholder="Date Of Birth"
                            {...register("dob", {
                                required: true,
                                validate: value => {
                                    let mydate = new Date(value + "T00:00:00");
                                    return mydate <= new Date();
                                }
                            })} />
                        {errors.dob && <span className='errormsg'>This field is required</span>}
                    </SmallInputdesign> */}
                    <SmallInputdesign>
                        <label>Date of Birth</label>
                        <input className="form-control" id="education" placeholder="00/00/0000 or 00-00-0000"
                            {...register("dob", { required: true })} />
                        {errors.dob && <span className='errormsg'>Date of birth is required</span>}
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
                            {...register("blood_group")}
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
                            {...register("contactno", { required: true, maxLength: 10, minLength: 10 })} />
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
                            {...register("pincode")} />
                        {errors.pincode && <span className='errormsg'>This field is required</span>}
                    </SmallInputdesign>

                    <div className="">
                        <div className="col-sm-12 col-md-12 col-xs-12 text-right">
                            <div className="text-right classrgsetting" style={{ float: 'right', textAlign: 'right' }}>

                                {props.idstudent != 0 && props.idstudent != undefined ?
                                    <>
                                        <button type="button" disabled = {loading} className="btn btn-warning btnsubmitdetails" onClick={() => UpdatePhoto()}>{loading ? <CircularProgress  size='14px' color="inherit" /> : 'Update/Upload Photo'}  </button>
                                        <button type="button" disabled={loading} className="btn btn-warning btnsubmitdetails" onClick={() => update()}> {loading ? <CircularProgress size='14px' color="inherit" /> : 'Update'} </button></> :
                                    <Button variant="contained" type="submit" disabled={loading} className="btn btn-primary btnsubmitdetails"> {loading ? <CircularProgress size='14px' color="inherit" /> : 'Submit'} </Button>

                                }
                                <Button variant="outlined" color="warning" type="button" onClick={() => resetForm()} className="btn btn-success btnsx">  Reset </Button>
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
