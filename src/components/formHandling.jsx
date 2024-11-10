import React, { useState } from 'react';
import "../App.css";
import axios from 'axios';

const FormHandling = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    age: "",
    phoneNumber:"",
    gender: "",
    interests: [],
    birthdate: ""
  });

  const [errors, setErrors] = useState({});

  const isValidEmail=(email)=>{
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email)
}

const isValidPhoneNumber = (phoneNumber)=>{
    const phoneNumberRegex = /^\d{11}$/;
    return phoneNumberRegex.test(phoneNumber)
}

const isValidPassword =(password)=>{
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/; // Matches any special character/symbol
    const numberRegex = /\d/; // Matches any digit (0-9)
    const upperCaseRegex = /[A-Z]/; // Matches any uppercase letter
    const lowerCaseRegex = /[a-z]/; // Matches any lowercase letter
        return(
            password.length >= 8 &&
            symbolRegex.test(password) &&
            numberRegex.test(password) &&
            upperCaseRegex.test(password) &&
            lowerCaseRegex.test(password) 
        );    

};

const isValidAge =(age)=>{
    return parseInt(age) >=18 && parseInt(age) <= 100;
}
  const validations=()=>{

    let newErrors = {};

    if (!formData.firstname){
        newErrors.firstname = "First name is Required";

    }
    if (!formData.lastname){
        newErrors.lastname = "Last name is Required";
    }

    if (!formData.email){
        newErrors.email = "Email is Required"
    }else if (!isValidEmail(formData.email)){
        newErrors.email = `Invalid Email Format`;
    }

    if(!formData.phoneNumber){
        newErrors.phoneNumber = "Phone Number is Required"
    }else if(!isValidPhoneNumber(formData.phoneNumber)){
        newErrors.phoneNumber = "Invalid Phone Number"
    }

    if (!formData.password) {
        newErrors.password = "Password is Required"

    }else if (!isValidPassword (formData.password)){
        newErrors.password = "Password must be at least 8 characters long and contain at least one symbol, one Number, one lowercase an one upper case"
    }

    if (!formData.confirmpassword) {
        newErrors.confirmpassword = "Comfirm Password is Required"
    }else if(formData.confirmpassword !== formData.password){
        newErrors.confirmpassword = "Password Must Match!"
    }

    if(!formData.age){
        newErrors.age = "Age is Required"
    }else if (!isValidAge(formData.age)){
        newErrors.age = "You must be at least 18 years old and not older than 100 years";
    }
    if (!formData.gender){
        newErrors.gender = "Gender is Required";
      }

      if (!formData.interests.length === 0){
        newErrors.interests = "Select at least one interest";
      }

      if(!formData.birthdate){
        newErrors.birthdate = "Date of Birth is Required";
      }

      setErrors(newErrors)

      return Object.keys(newErrors).length === 0;
  };


  

 
  const handleForm = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    setErrors((prevError) => ({
      ...prevError,
      [e.target.name]: ""
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validations();
    if(isValid){
        console.log("Form submitted:", formData);

        setFormData({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmpassword: "",
            age: "",
            phoneNumber: "",
            gender: "",
            interests: [],
            birthdate: ""
          });
    }
    else{
        console.log("Form Validation Failed");
        
    }
    

  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    let updatedInterests = [...formData.interests];
    if (checked) {
      updatedInterests.push(name);
    } else {
      updatedInterests = updatedInterests.filter(
        (interest) => interest !== name
      );
    }
    setFormData({
      ...formData,
      interests: updatedInterests
    });
  };

  return (
    <div>
      <form className='form' onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstname"
            placeholder='Enter your First Name'
            onChange={handleForm}
            value={formData.firstname}
          />
          {errors.firstname && <div className='error'>{errors.firstname}</div>}
        </div>

        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastname"
            placeholder='Enter your Last Name'
            onChange={handleForm}
            value={formData.lastname}
          />
          {errors.lastname && <div className='error'>{errors.lastname}</div>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder='Enter your Email'
            onChange={handleForm}
            value={formData.email}
          />
          {errors.email && <div className='error'>{errors.email}</div>}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder='Enter your Password'
            onChange={handleForm}
            value={formData.password}
          />
          {errors.password && <div className='error'>{errors.password}</div>}
        </div>

        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmpassword"
            placeholder='Confirm Password'
            onChange={handleForm}
            value={formData.confirmpassword}
          />
          {errors.confirmpassword && <div className='error'>{errors.confirmpassword}</div>}
        </div>

        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            placeholder='Enter your Age'
            onChange={handleForm}
            value={formData.age}
          />
          {errors.age && <div className='error'>{errors.age}</div>}
        </div>

        <div>
        <label>Phone Number:</label>
          <input
            type="number"
            name="phoneNumber"
            placeholder='Enter your Phone Number'
            onChange={handleForm}
            value={formData.phoneNumber}
          />
          {errors.phoneNumber && <div className='error'>{errors.phoneNumber}</div>}
        </div>

        <div>
          <label>Select Gender:</label>
          <select
            name="gender"
            onChange={handleForm}
            value={formData.gender}
          >
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <div className='error'>{errors.gender}</div>}
        </div>

        <div>
          <label>Interests:</label>
          <label>
            <input
              type="checkbox"
              name="coding"
              checked={formData.interests.includes("coding")}
              onChange={handleCheckboxChange}
            />
            Coding
          </label>
          {errors.interests && <div className='error'>{errors.interests}</div>}
          </div>
          <div>
          <label>
            <input
              type="checkbox"
              name="praying"
              checked={formData.interests.includes("praying")}
              onChange={handleCheckboxChange}
            />
            Praying
          </label>
          {errors.interests && <div className='error'>{errors.interests}</div>}
          </div>
          <div>
          <label>
            <input
              type="checkbox"
              name="singing"
              checked={formData.interests.includes("singing")}
              onChange={handleCheckboxChange}
            />
            Singing
          </label>
          {errors.interests && <div className='error'>{errors.interests}</div>}
        </div>

        <div>
          <label>Birthdate:</label>
          <input
            type="date"
            name="birthdate"
            onChange={handleForm}
            value={formData.birthdate}
          />
          {errors.birthdate && <div className='error'>{errors.birthdate}</div>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormHandling;
