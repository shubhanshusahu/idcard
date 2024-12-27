import axios from "axios"
export const data = {
    // "baseUrl": "http://localhost:3003/",
    // "baseUrl":"https://idcardapi.alfaxsolution.in/",
    // "baseUrl" : "https://idcardbackend.onrender.com/",
    "baseUrl" : "https://idcardbackend.vercel.app/",

    class: [
        "Play School",
        "Nursery",
        "KG1",
        "KG2",
        "1st",
        "2nd",
        "3rd",
        "4th",
        "5th",
        "6th",
        "7th",
        "8th",
        "9th",
        "10th",
        "11th",
        "12th",
        "1st Year",
        "2nd Year",
        "3rd Year",
        "I CIE",
        "II CIE",
        "V CIE",
        "VI CIE",
        "VII CIE",
        "VIII CIE",
        "IGCSE L1",

    ]
}
export const colors = {
    logoBg: '#243A6C',
    primary: '#243A6C',
    danger: 'red'
}
export const studentFields = [
    'instituteid', 'studname', 'rollno', 'enrollno', 'class', 'section', 'father_name',
    'mother_name', 'blood_group', 'dob', 'address', 'pincode', 'gender', 'contactno', 'pic', 'housecolor', 'stream'
]
export const UploadStudentImg = async (img) => {
    console.log(img)
    let data = new FormData()
    data.append("file", img)
    data.append("upload_preset", "alfaxstudents")
    data.append("cloud_name", "dh5rvoicb")
    let API_URL = 'https://api.cloudinary.com./v1_1/dh5rvoicb/image/upload';
    try {
        let res = await axios.post(API_URL, data)
        console.log(res, 'photo saved to cloudinary');
        if (res.status == 200) {
            return res.data.url
        }
        else {
            console.log('Error in uploading image')
            return ''
        }
    }
    catch (e) {
        console.log(e, 'error in uploading image to cloudinary');
    }
}
export const shortenPicUrl = (pic_url)=>{
    if(pic_url){
        return pic_url.split('/').pop()
    }
    else{
        return ""
    }

}