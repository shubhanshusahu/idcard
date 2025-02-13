import DataTable from 'react-data-table-component';
import { colors, data } from '../../fixedData';
import { GetReq } from '../../components/HttpReqs';
import { useEffect, useState } from 'react';
import { Boxhtml } from '../../components/Boxhtml';
import '../../style/main.css'
import { useDispatch,useSelector } from 'react-redux';
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
const columns = [
    {
        name: 'ID',
        selector: row => row.userid,
        sortable: true,
        width: '70px'
    },
    {
        name: 'Teacher/ Admin Name',
        selector: row => row.username,
        sortable: true,
    },
    {
        name: 'Email',
        selector: row => row.usermail,
        sortable: true,
        minWidth : '220px'
    },
    {
        name: 'Phone',
        selector: row => row.userphone,
        sortable: true,
    },
    {
        name: 'School/Institute ID',
        selector: row => row.schoolid,
        sortable: true,
    },
    {
        name: 'Action',
        selector: row =><><BiSolidMessageSquareEdit style={{cursor:'pointer'}} color={colors.primary} size={25} />
        <RiDeleteBin6Fill style={{marginLeft:'5px',cursor:'pointer'}} color={colors.danger} size={25} /></>,
        sortable: true,
    },
    
];
const columnsForAdmin = [
    {
        name: 'ID',
        selector: row => row.userid,
        sortable: true,
        width: '70px'
    },
    {
        name: 'Teacher/ Admin Name',
        selector: row => row.username,
        sortable: true,
    },
    {
        name: 'Email',
        selector: row => row.usermail,
        sortable: true,
        minWidth :'250px'
    },
    {
        name: 'Password',
        selector: row => row.userpass,
        sortable: true,
    },
    {
        name: 'Phone',
        selector: row => row.userphone,
        sortable: true,
    },
    {
        name: 'School/Institute ID',
        selector: row => row.schoolid,
        sortable: true,
    },
    {
        name: 'Action',
        selector: row =><><BiSolidMessageSquareEdit style={{cursor:'pointer'}} color={colors.primary} size={25} />
        <RiDeleteBin6Fill style={{marginLeft:'5px',cursor:'pointer'}} color={colors.danger} size={25} /></>,
        sortable: true,
    },
    
];
export default function TeachersList(props) {
    const [loading, setloading] = useState("Loading please wait..")
    const { teacherList,students,user } = useSelector((state) => state.RootRed)
    const dispatch= useDispatch()

    const [filtered, setfiltered] = useState([])
    const [Initialdata, setInitialdata] = useState([])
    const getdata = async () => {
        try {
            let response = await GetReq('teachers')
            setfiltered(response.data)
            setInitialdata(response.data)
            console.log(response.data,'schoolsList')
            if (!response.data) {
                setloading("No data found..")
            }
            else
            dispatch({
                type: 'getTeachers',
                payload: response.data
            })
        }
        catch (e) {
            setloading("No data found..")
            console.log(e)
        }
    }
    useEffect(() => {
        dispatch({
            type: 'userlogin',
            payload: JSON.parse(localStorage.getItem('user'))
        })

        console.log(teacherList,'schoolist')
        if(teacherList?.length>0){
            setfiltered(teacherList)
            setInitialdata(teacherList)
        }
        else {getdata()}
    }, [])
    const onRowClicked = () => {
        props.setValue(1)
    }

    return (
        <Boxhtml>
        <DataTable
            noDataComponent={loading}
            columns={user.userrole == 'admin'? columnsForAdmin:columns}
            data={filtered}
            onRowDoubleClicked={onRowClicked}
            selectableRows
            selectableRowsHighlight
            highlightOnHover
            pagination  
            customStyles={{}}
            fixedHeader
        />
        </Boxhtml>
    );
};