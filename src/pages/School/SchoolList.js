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
        selector: row => row.idSchool,
        sortable: true,
        width: '70px'
    },
    {
        name: 'Schools Name',
        selector: row => row.SchoolnName,
        sortable: true,
    },
    {
        name: 'Registeration No.',
        selector: row => row.SchoolRedgNo,
        sortable: true,
    },
    {
        name: 'Address',
        selector: row => row.SchoolAddress,
        sortable: true,
    },
    {
        name: 'Action',
        selector: row =><><BiSolidMessageSquareEdit style={{cursor:'pointer'}} color={colors.primary} size={25} />
        <RiDeleteBin6Fill style={{marginLeft:'5px',cursor:'pointer'}} color={colors.danger} size={25} /></>,
        sortable: true,
    },
];

export default function SchoolList(props) {
    const [loading, setloading] = useState("Loading please wait..")
    const { schoolList,students } = useSelector((state) => state.RootRed)
    const dispatch= useDispatch()

    const [filtered, setfiltered] = useState([])
    const [Initialdata, setInitialdata] = useState([])
    const getdata = async () => {
        try {
            let response = await GetReq('schools')
            setfiltered(response.data)
            setInitialdata(response.data)
            console.log(response.data,'schoolsList')
            if (!response.data) {
                setloading("No data found..")
            }
            else
            dispatch({
                type: 'getSchools',
                payload: response.data
            })
        }
        catch (e) {
            setloading("No data found..")
            console.log(e)
        }
    }
    useEffect(() => {
        console.log(schoolList,'schoolist')
        if(schoolList?.length>0){
            setfiltered(schoolList)
            setInitialdata(schoolList)
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