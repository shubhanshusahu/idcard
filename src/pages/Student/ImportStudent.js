import { useState } from "react";
import * as XLSX from "xlsx";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import '../../App.css';
import { Boxhtml } from "../../components/Boxhtml";

function ImportStudents() {

    const [data, setData] = useState([]);

    const handleFileUpload = (e) => {
        const reader = new FileReader();
        reader.readAsBinaryString(e.target.files[0]);
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);
            setData(parsedData);
            console.log(parsedData, 'data Imported')
        };
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
                <Button type='file' variant="contained" color="success"
                 endIcon={< CloudUploadIcon/>}
                >Upload Student's data</Button>
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