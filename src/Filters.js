import React, { useState } from "react";
import Select from "react-select";

const Filters = ({ jobs, categories, types ,   
selectedJobType,
selectedJobCategories,
handleJobTypeChange,
handleJobCategoryChange }) => {   
 

const sampleJobTypes = Object.values(types.data).map((jobType) => ({
    value: jobType.name,
    label: jobType.name,
}));


  const selectStyles = {
  control: (provided, state) => ({
            ...provided,
    borderRadius: '4px',
    borderColor: state.isFocused ? '#007BFF' : '#CED4DA',
            boxShadow: state.isFocused ? 'rgba(0, 0, 0, 0.16) 0px 1px 6px' : null,
  
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#007BFF' : 'white',
    color: state.isSelected ? 'white' : 'black',
    ':hover': {
      backgroundColor: state.isSelected ? '#007BFF' : '#F0F0F0',
      },
       
  }),
  multiValue: (provided) => ({
      ...provided,
     
    backgroundColor: '#364fc7',
      color: '#34383b',
  }),
        multiValueLabel: (provided) => ({
      
    ...provided,
      color: 'white',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: 'white',
    ':hover': {
      backgroundColor: '#364fc7',
      color: 'white',
    },
  }),
};
 
  
const sampleJobCategories = Object.values(categories.data).map((jobType) => ({
    value: jobType.categoryId,
    label: jobType.name,
}));
  

  return (

    <div className="filter">
        <h2 className="header">Filter Jobs</h2>
        <div className="job-type">
          <label htmlFor="job-type-select" className="label">Job Type:</label>
          <Select
            id="job-type-select"
            options={sampleJobTypes}
            value={selectedJobType}
            onChange={handleJobTypeChange}
                  isClearable
                  styles={selectStyles}
          />
        </div>
        <div >
          <label htmlFor="job-type-select" className="label">Job Category:</label>
            <Select
            className="category-option"
            options={sampleJobCategories}
            value={selectedJobCategories}
            onChange={handleJobCategoryChange}
            isMulti
                  isClearable
                   styles={selectStyles}
          />
        </div>

    </div>
  );
};

export default Filters;
