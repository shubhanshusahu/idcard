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
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Button from '@mui/material/Button';
import { IosShare, UpgradeOutlined } from '@mui/icons-material';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import JSZip from 'jszip';
import FileSaver from 'file-saver';

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
    const { teacherList, students, user, schoolList } = useSelector((state) => state.RootRed)
    const [currentSchoolId, setcurrentSchoolId] = useState(user.schoolid)
    const dispatch = useDispatch()
    const columns = [
        {
            name: 'Photo',
            selector: row => row.pic == "" ? '' : <img className='photo' src={baseUrl + 'uploads/' + row?.pic} alt="NA" />,
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
                <RiDeleteBin6Fill onClick={() => { DeleteStudent(row.idstudent); getdata(row.class) }} style={{ marginLeft: '5px', cursor: 'pointer' }} color={colors.danger} size={25} /></>,
            sortable: true,
        },

    ];
    const [filtered, setfiltered] = useState([])
    const [Initialdata, setInitialdata] = useState([])
    const [classSelected, setclassSelected] = useState('1st')
    const [images, setImages] = useState([]);
    const getdata = async (clas = '1st',schoolId = currentSchoolId ) => {
        console.log(user)
        try {
            setclassSelected(clas)
            let response = await GetReq(`studentsbyschoolid?schoolid=${schoolId}&clas=${clas}`)
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
        else { getdata('1st', user.schoolid) }
    }, [])
    const GetAllStudents = async (schoolId = user.schoolid ) => {
        let response = await GetReq(`students?schoolid=${schoolId}`)
        // setfiltered(response.data)
        exportToExcel('school', response.data)
        // fetchImages(response.data)
    }
    const getSchools = async () => {
        let scls = await GetReq('schools')

        dispatch({
            type: 'getSchools',
            payload: scls.data
        });
    }
    useEffect(() => {
        if (schoolList.length == 0) {
            getSchools()
        }

    }, [])
    const changeSchool = (schoolId)=>{
        setcurrentSchoolId(schoolId)
        // dispatch({
        //     type: 'userlogin',
        //     action: {...user,'schoolid' : schoolId}
        // })
        getdata('1st',schoolId)
    }
    const exportToExcel = (datahint = 'school', dat = Initialdata) => {
        let worksheet;
        worksheet = XLSX.utils.json_to_sheet(dat);

        fetchImages(dat)
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // Buffer to store the generated Excel file
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

        saveAs(blob, "Schooldata-" + new Date() + ".xlsx");
    };
    const EditStudent = async (idstudent) => {
        console.log(idstudent, 'id student')
        let res = await dispatch({
            type: 'setStudentDetails',
            action: idstudent
        })
        props.setValue(1)
        props.setidstudent(idstudent)


    }

    const [imageUrls, setImageUrls] = useState([]);

    const fetchImages = async (data) => {
        setloading(true);
        try {
            // Array of image URLs to fetch
            const urls = data.map(r => r.pic)

            const promises = urls.map(url =>
                fetch(baseUrl + 'uploads/' + url)
                    .then(response => response.blob())
                    .catch(error => console.error('Error fetching image:', error))
            );

            const blobs = await Promise.all(promises);

            setImageUrls(blobs);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
        setloading(false);
        setTimeout(() => {
            console.log(imageUrls, 'images')
            downloadImages(data)
        }, 7000);
    };

    const downloadImages = (data) => {
        const zip = new JSZip();
        console.log(data)
        imageUrls.forEach((blob, index) => {
            const fileName = `${data[index]?.pic || 'image'}`;
            zip.file(fileName, blob);
        });

        zip.generateAsync({ type: 'blob' }).then(content => {
            FileSaver.saveAs(content, 'images.zip');
        });
    };

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
                subHeaderComponent={<div style={{ display: 'flex', alignItems: 'center', justifyContent :'space-around' }} className='col-md-12'>

                {user.userrole === 'admin' &&  <Select className=" col-md-3" value ={currentSchoolId} onChange={(e) => changeSchool(e.target.value)} 
                    >
                        {/* <MenuItem value="">Select</MenuItem> */}
                        {schoolList.map(schl => <MenuItem value={schl.idSchool}>{schl.SchoolnName} -{schl.SchoolAddress}-{schl.idSchool}</MenuItem>)}
                    </Select>
                }
                    {/* <div className='col-md-2' style={{  fontWeight: 'bold' }}>Select Class */}

                    <Select className='col-md-2' style={{ height: '40px', textAlign: 'center' }}
                    
                        onChange={e => getdata(e.target.value)}
                        value={classSelected}
                    >
                        <MenuItem selected default value="1st">1st</MenuItem>
                        {data.class.map(cls => <MenuItem value={cls}>Class : {cls}</MenuItem>
                        )}

                    </Select>

                    <Button type='file' className='col-md-3' variant="contained" color="success"
                        endIcon={< IosShare />}
                        style={{marginLeft: '5px', fontSize: 'small' }}
                        onClick={() => GetAllStudents(currentSchoolId)}
                    >Export School Data</Button>
                    <Button type='file' className='col-md-3' style={{ fontSize: 'small', marginLeft: '5px' }} variant="contained" color="secondary"
                        endIcon={< UpgradeOutlined />}
                        onClick={() => exportToExcel('class')}
                    >Export Class Data</Button>


                </div>}
            />
        </Boxhtml>
    );
};