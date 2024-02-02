import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { data } from '../../fixedData';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { BigInputdesign, Boxhtml } from '../../components/Boxhtml';
import { GetReq, PostReq } from '../../components/HttpReqs';
import { useDispatch } from 'react-redux';
import StudentReg from '../../components/StudentReg/StudentRegisteration'
export default function CreateStudent(props) {
 

    return (
        <Boxhtml>
            <StudentReg/>    
        </Boxhtml>
    )
}
