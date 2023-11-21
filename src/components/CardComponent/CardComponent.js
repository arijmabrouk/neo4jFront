import React, { useContext } from 'react'
import GlobalContext from '../../context/GlobalContext';

const CardComponent = (props) => {
    const { image, name } = props;
    const {form,handleCardClick,selectedType}=useContext(GlobalContext)
  
    return (
        <div
        onClick={() => {
          form.setFieldsValue({
            ...form.getFieldsValue(),
            typeLogin: name,
          });
          handleCardClick(name);
        }}
        style={{

          backgroundColor:
            selectedType === name
              ? "#0EBE7F"
              : "transparent",
          border:
            selectedType === name
              ? `1px solid #0EBE7F`
              : " 1px solid lightgray",
          borderRadius: "1rem",
          height: "8rem",
          width: "20rem",
          marginBottom: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          
        }}
      >
        {image}
      </div>
    );
}

export default CardComponent