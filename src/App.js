import { useEffect, useState } from "react"
import Filters from "./Filters"
import JobCard from "./JobCard"
import Loader from "./Loader";


function App() {
  
  const [{ types, categories, jobs }, setList] = useState({});

    const [selectedJobType, setSelectedJobType] = useState([]);
   const [selectedJobCategories, setSelectedJobCategories] = useState([]);

  console.log(selectedJobCategories);
  console.log(selectedJobType)

  const handleJobTypeChange = (selectedOption) => {
    setSelectedJobType(selectedOption);
  };

  const handleJobCategoryChange = (selectedOptions) => {
    setSelectedJobCategories(selectedOptions);
  };

  useEffect(function () {
    async function FetchData() {
      const res1 = await fetch("https://entryleveljobs.me/api/jobs/type");
      const types = await res1.json();
      const res2 = await fetch("https://entryleveljobs.me/api/jobs/category");
      const categories = await res2.json();
      const res3 = await fetch("https://entryleveljobs.me/api/jobs");
      const jobs = await res3.json();
      setList({types , categories , jobs})
    }
    FetchData();
  }, []) 
  
  return (
    <div>
      {types && categories && jobs ?
        <div className="filter-box">
          
          <Filters jobs={jobs} types={types} categories={categories}
          selectedJobType = {  selectedJobType}
          selectedJobCategories ={selectedJobCategories}
          handleJobTypeChange ={handleJobTypeChange}
            handleJobCategoryChange={handleJobCategoryChange} />
          
          <JobCard jobs={jobs} types={types} categories={categories} selectedJobType={selectedJobType} selectedJobCategories={selectedJobCategories} />

        </div> : <Loader />}
      </div>
    )
}

export default App
