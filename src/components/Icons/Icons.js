import React from 'react'
import patient from "../../assets/patinett.svg"
import doctor from "../../assets/doctor.svg"
export const Patient = (props) => {
    return (
      <img src={patient} style={{height:"100px"}}  />
    );
  };
  
  export const Doctor = (props) => {
    return (
      <img src={doctor} style={{height:"100px"}}  />
    
    );
  };
