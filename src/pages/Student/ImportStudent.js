import { useState } from "react";
import * as XLSX from "xlsx";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import '../../App.css';
import { Boxhtml } from "../../components/Boxhtml";
import { PostReq } from "../../components/HttpReqs";
import { studentFields } from "../../fixedData";

function ImportStudents() {

    const [data, setData] = useState([]);
    const [uploadbtn, setuploadbtn] = useState(false);


    const handleFileUpload = (e) => {
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);
            console.log(parsedData, 'data Imported')
            let FieldsFromExcel = Object.keys(parsedData[0])
            let flag =0
            FieldsFromExcel.forEach(colname => {
                if(studentFields.indexOf(colname)>=0){
                        console.log(colname)
                }
                else{
                    alert(colname+' column not found in Database, please remove from excel or correct the column name!')
                    flag =1;
                }
            });

            if(flag ==1){
                
            }
            else{
            setData(parsedData);
            setuploadbtn(true)
            }
        };
    }
    const UploadExcelData =()=>{
        let res =window.confirm('Are you sure to Upload this data?')
        if(res){
            PostReq('importexcel',data)
            .then(res=>{console.log(res)
            alert('Excel Data Uploaded Successfully')
            })
            .catch(err=>console.log)
        }
    }

    return (

        <Boxhtml>
            <Stack spacing={2} direction="row">
                <input
                    className="btn btn-primary"
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                />
                { uploadbtn && <Button type='file' variant="contained" color="success"
                 endIcon={< CloudUploadIcon/>}
                 onClick={()=>UploadExcelData()}
                >Upload Student's data</Button>}
            </Stack>


            {data.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            {Object.keys(data[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                {Object.values(row).map((value, index) => (
                                    <td key={index}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </Boxhtml>
    );
}

export default ImportStudents;