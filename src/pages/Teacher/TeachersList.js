import DataTable from 'react-data-table-component';
import { data } from '../../fixedData';
import { GetReq } from '../../components/HttpReqs';
import { useEffect, useState } from 'react';
import { Boxhtml } from '../../components/Boxhtml';
import '../../style/main.css'
import { useDispatch,useSelector } from 'react-redux';

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
        selector: row =><><button className='btn btn-primary'>Edit</button><button className='btn btn-danger'>Delete</button></>,
        sortable: true,
    },
    
];

export default function TeachersList(props) {
    const [loading, setloading] = useState("Loading please wait..")
    const { teacherList,students } = useSelector((state) => state.RootRed)
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
            columns={columns}
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