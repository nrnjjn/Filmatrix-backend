import React, { useEffect, useRef,useState } from 'react'
import {FaEye,FaEyeSlash} from "react-icons/fa"
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Userreg = () => {
  
  const fileUploadPhoto = useRef(null);
  const fileUploadIdProof = useRef(null);

  const handleUploadFile = (type) => {
    if (type === 'photo') {
      fileUploadPhoto.current.click();
    } else if (type === 'idproof') {
      fileUploadIdProof.current.click();
    }
  };

  const navigate=useNavigate()
  const[data,setdata]=useState('')
  const[showpassword,setshowpassword]=useState('password')
  let handlechange=(event)=>{
    setdata({...data,[event.target.name]:event.target.value})
    console.log(data);
  }

  let handlefile=(event)=>{
    console.log(event.target.files);
    setdata({...data,[event.target.name]:event.target.files[0]})
    console.log(data);
  }
  
  let handlesubmit=async (event)=>{
    event.preventDefault()
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('photo', data.photo);
    formData.append('age', data.age);
    formData.append('dob', data.dob);
    formData.append('gender', data.gender);
    formData.append('idproof', data.idproof);
    formData.append('wardNumber', data.wardNumber);
    formData.append('wardName', data.wardName);
    formData.append('email', data.email);
    formData.append('houseNumber', data.houseNumber);
    formData.append('houseName', data.houseName);
    formData.append('street', data.street);
    formData.append('district', data.district);
    formData.append('pincode', data.pincode);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('password', data.password);
    formData.append('usertype', 'user');
    let response=await axios.post('http://localhost:4000/User/register',formData,{
      headers: {
        'Content-Type': 'multipart/form-data'  // Set the content type for FormData
      }
    })

    console.log(response)
    const requiredFields = ['name','photo','age','dob','gender','idproof','wardNumber','wardName','email','houseNumber','houseName','street','district','pincode','phoneNumber','password'];
    navigate('/Login')
    for (const field of requiredFields) {
        if (!data[field]) {
            return toast.error(`${field} is required`);
        }
    }
    // let mobileNumberPattern = /^[6-9]\d{9}$/
    // if(!mobileNumberPattern.test(data.phonenumber)){
    //  return toast.error('mobile number not matched')
    // }
    // let passwordPattern =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
    // console.log(passwordPattern.test(data.password));
    // if(!passwordPattern.test(data.password)){
    //   return toast.error('password is not matched')
    // }
    setdata(data)
    toast.success("successfully registered")
    console.log(data);

  }

  return (
    <form onSubmit={handlesubmit}>
    <div className=' w-screen h-screen bg-[#CCDAF6] pt-14'>
      <div className='font-bold font-serif text-[20px] m-auto text-center '>REGISTRATION FORM</div>
      <div className="flex flex-wrap justify-center gap-8 " >
        <div className=' h-[400px] w-[450px] '>


          <div className='text h-9   text-white mt-4 flex'>
            <span className='bg-[#0F3053] w-56 rounded-l-lg pl-5'>
              NAME:

            </span>
            <input required onChange={handlechange} pattern="^[a-zA-Z ]*$" title="Only alphabets are allowed" className='text-black h-9 w-56 bg-white rounded-r-lg pl-3' name='name' type='text'></input></div>
            <div className='text h-9   text-white mt-4 flex' onClick={() => handleUploadFile('photo')}>
            <span  className='bg-[#0F3053] w-56  rounded-l-lg pl-5'>
              Photo:

            </span>
            <input required onChange={handlefile} ref={fileUploadPhoto} type="file" className='hidden h-9 w-56 bg-white rounded-r-lg text-black ' name='photo' />
            <div className="">  
              <p className=' text-slate-500 h-9 w-56 bg-white rounded-r-lg pl-3'>upload</p>
            </div>
            </div>
          <div className='text h-9   text-white mt-4 flex'>
            <span className='bg-[#0F3053] w-56  rounded-l-lg pl-5'>
              AGE:

            </span>
            <input required onChange={handlechange} className='text-black h-9 w-56 bg-white rounded-r-lg pl-3' name='age' type='number' />
            
            </div>
          <div className='text h-9   text-white mt-4 flex'>
            <span className='bg-[#0F3053] w-56  rounded-l-lg pl-5'>
              DATE OF BIRTH:

            </span>
            <input required onChange={handlechange} className='text-black h-9 w-56 bg-white rounded-r-lg pl-3' name='dob' type='text' pattern="\d{2}/\d{2}/\d{4}" title="Please enter a date in the format MM/DD/YYYY"></input></div>
            <div className='text h-9   text-white mt-4 flex'>
            <span className='bg-[#0F3053] w-56  rounded-l-lg pl-5'>
              GENDER:

            </span>
            <select required onChange={handlechange} className='placeholder:select h-9 w-56 bg-white rounded-r-lg text-black pl-3' name='gender'>
              <option value='female'>Female</option>
              <option value='male'>Male</option>
              <option value='others'>Others</option>
              </select></div>
            <div className='text h-9   text-white mt-4 flex' onClick={() => handleUploadFile('idproof')}>
            <span  className='bg-[#0F3053] w-56  rounded-l-lg pl-5'>
              ID PROOF:

            </span>
            <input required onChange={handlefile} ref={fileUploadIdProof} type="file" className='hidden h-9 w-56 bg-white rounded-r-lg text-black ' name='idproof' />
            <div className="">
              <p className=' text-slate-500 h-9 w-56 bg-white rounded-r-lg pl-3'>upload</p>
            </div>
            </div>
            <div className='text h-9   text-white mt-4 flex'>
            <span className='bg-[#0F3053] w-56  rounded-l-lg pl-5'>
              WARD NUMBER:

            </span>
            <input required onChange={handlechange}  type='number' className='text-black h-9 w-56 bg-white rounded-r-lg pl-3' name='wardNumber' maxLength={2}></input></div>
            <div className='text h-9   text-white mt-4 flex'>
            <span className='bg-[#0F3053] w-56  rounded-l-lg pl-5'>
              WARD NAME:

            </span>
            <input required onChange={handlechange} pattern="[A-Za-z]+" title="Only alphabets are allowed" type='text' className='text-black h-9 w-56 bg-white rounded-r-lg pl-3' name='wardName' ></input></div>




        </div>
        <div className=' h-[360px] w-[450px]  '>
        <div className='text h-9   text-white mt-4 flex'>
            <span className='bg-[#0F3053] w-56  rounded-l-lg pl-5'>
              EMAIL ID:

            </span>
            <input required onChange={handlechange} className='h-9 w-56 bg-white rounded-r-lg text-black pl-3' name='email' type='email'></input></div>
            <div className='text h-9   text-white mt-4 flex'>
            <span className='bg-[#0F3053] w-56  rounded-l-lg pl-5'>
              HOUSE NUMBER:

            </span>
            <input required onChange={handlechange} className='h-9 w-56 bg-white rounded-r-lg text-black pl-3' name='houseNumber' type='number' pattern='{3}'></input></div>
            <div className='text h-9   text-white mt-4 flex'>
            <span className='bg-[#0F3053] w-56  rounded-l-lg pl-5'>
              HOUSE NAME:

            </span>
            <input required onChange={handlechange} pattern="[A-Za-z]+" title="Only alphabets are allowed" className='h-9 w-56 bg-white rounded-r-lg text-black pl-3' name='houseName' type='text'></input></div>
            <div className='text h-9   text-white mt-4 flex'>
            <span className='bg-[#0F3053] w-56  rounded-l-lg pl-5'>
              STREET:

            </span>
            <input required onChange={handlechange} className='h-9 w-56 bg-white rounded-r-lg text-black pl-3' name='street' type='text'></input></div>

            <div className='text h-9   text-white mt-4 flex'>
            <span className='bg-[#0F3053] w-56  rounded-l-lg pl-5'>
              POST OFFICE:

            </span>
            <input required onChange={handlechange} pattern="[A-Za-z]+" title="Only alphabets are allowed" className='h-9 w-56 bg-white rounded-r-lg text-black pl-3' name='district' type='text'></input></div>
            <div className='text h-9   text-white mt-4 flex'>
            <span className='bg-[#0F3053] w-56  rounded-l-lg pl-5'>
              PINCODE:

            </span>
            <input required onChange={handlechange} type='text' name='pincode' className='h-9 w-56 bg-white rounded-r-lg text-black pl-3' pattern="[0-9]{6}" title="Please enter a valid 6-digit PIN code"></input></div>

            <div className='text h-9   text-white mt-4 flex'>
            <span className='bg-[#0F3053] w-56  rounded-l-lg pl-5'>
              PASSWORD:

            </span>
            <div className="flex text-black  h-9 w-56 bg-white rounded-r-lg justify-center items-center pl-3">
            <input required onChange={handlechange} className='outline-none' pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$" name='password' type={showpassword} title='Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be 8 to 30 characters long.'></input>
           { showpassword === 'text' ?  <FaEye onClick={()=> setshowpassword('password') } color='black' className='ms-2'/> :
           
           <FaEyeSlash  onClick={()=> setshowpassword('text') } color='black' className='ms-2'/>
           }
            </div>
            </div>
            <div className='text h-9   text-white mt-4 flex'>
            <span className='bg-[#0F3053] w-56  rounded-l-lg pl-5'>
              PHONE NUMBER:

            </span>
            <input required onChange={handlechange} type='text' name='phoneNumber' pattern="[0-9]{10}" title="Please enter a valid phone number" className='h-9 w-56 bg-white rounded-r-lg text-black pl-3' maxLength={10}></input></div>
            
            
            

        </div>
      </div>
      <div className='text-center'>
        <button className='button text-white font-semibold bg-[#0F3053] w-48 h-9 rounded mt-20  m-auto'>SUBMIT</button></div>
    </div>
    </form>
  )
}
