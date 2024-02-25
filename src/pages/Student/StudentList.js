import DataTable from 'react-data-table-component';
import { colors, data } from '../../fixedData';
import { DeleteReq, GetReq } from '../../components/HttpReqs';
import { useEffect, useState } from 'react';
import { Boxhtml, SmallInputdesign } from '../../components/Boxhtml';
import '../../style/main.css'
import './student.css'
import { useDispatch, useSelector } from 'react-redux';
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";


export function DeleteStudent(idstudent) {
    let result = window.confirm('Are you sure you want to Delete this Student Record?')
    if (result) {
        console.log(idstudent, 'idstudent')
        DeleteReq(`student?idstudent=${idstudent}`)
            .then(res => {
                alert('Student Deleted!')
            })
            .catch(e => console.log)
    }
}
export default function StudentList(props) {
    const [loading, setloading] = useState("Loading please wait..")
  const baseUrl = data.baseUrl

    const { teacherList, students, user } = useSelector((state) => state.RootRed)
    const dispatch = useDispatch()
    const columns = [
        {
            name: 'Photo',
            selector: row =>  row.pic==""?'':<img className='photo' src ={baseUrl+'uploads/'+row?.pic} alt="NA"/> ,
            sortable: true,
            width: '120px'
        },
        {
            name: 'Student Name',
            selector: row => row.studname,
            sortable: true,
        },
        {
            name: 'Class',
            selector: row => row.class,
            sortable: true,
        },
        {
            name: 'father_name',
            selector: row => row.father_name,
            sortable: true,
        },
        {
            name: 'Phone',
            selector: row => row.contactno,
            sortable: true,
        },
        {
            name: 'dob',
            selector: row => new Date(row.dob).getDate() + '/' + new Date(row.dob).getUTCMonth() + '/' + new Date(row.dob).getFullYear(),
            sortable: true,

        },
        {
            name: 'Action',
            selector: row => <><BiSolidMessageSquareEdit onClick={() => EditStudent(row.idstudent)} style={{ cursor: 'pointer' }} color={colors.primary} size={25} />
                <RiDeleteBin6Fill onClick={() =>{ DeleteStudent(row.idstudent);getdata(row.class)} } style={{ marginLeft: '5px', cursor: 'pointer' }} color={colors.danger} size={25} /></>,
            sortable: true,
        },

    ];
    const [filtered, setfiltered] = useState([])
    const [Initialdata, setInitialdata] = useState([])
    const getdata = async (clas = '1st') => {
        try {
            let response = await GetReq(`studentsbyschoolid?schoolid=${user.schoolid}&clas=${clas}`)
            setfiltered(response.data)
            setInitialdata(response.data)
            console.log(response.data, 'student list')
            if (response.data.length == 0) {
                setloading("No data found!")
            }
            else
                dispatch({
                    type: 'getStudents',
                    payload: response.data
                })
        }
        catch (e) {
            setloading("No data found..")
            console.log(e)
        }
    }
    useEffect(() => {
        console.log(students, 'student list')
        if (students?.length > 0) {
            setfiltered(students)
            setInitialdata(students)
        }
        else { getdata() }
    }, [])
    const EditStudent = async (idstudent) => {
        console.log(idstudent, 'id student')
        let res = await dispatch({
            type: 'setStudentDetails',
            action: idstudent
        })
        props.setValue(1)
        props.setidstudent(idstudent)


    }


    return (
        <Boxhtml>
            <DataTable
                noDataComponent={loading}
                columns={columns}
                data={filtered}
                // onRowDoubleClicked={onRowClicked}
                selectableRows
                selectableRowsHighlight
                highlightOnHover
                pagination
                customStyles={{}}
                fixedHeader
                noHeader={false}
                subHeader
                subHeaderComponent={<div style={{ display: 'flex' }}>
                    <label className='lable' style={{ width: '150px' }}>Select Class</label>
                    <select className="form-control"
                        onChange={e => getdata(e.target.value)}
                    >
                        <option value="1st">1st</option>
                        {data.class.map(cls => <option value={cls}>{cls}</option>)}

                    </select>

                </div>}
            />
        </Boxhtml>
    );
};