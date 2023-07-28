import React, { useState } from "react";
import "./JobCard.css";

function JobCard({ jobs, selectedJobType, selectedJobCategories }) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalJobs = jobs.data.length;
  const totalPages = Math.ceil(totalJobs / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const getPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return jobs.data.slice(startIndex, endIndex);
  };

  const filterJob = () => {
    if (!selectedJobCategories.length && !selectedJobType) return jobs.data;

    const filteredByType = selectedJobType
      ? jobs.data.filter((job) => job.type.name === selectedJobType.value)
      : jobs.data;

    const filteredByCategories = selectedJobCategories.length
      ? filteredByType.filter((job) =>
          selectedJobCategories.some(
            (category) => category.value === job.category?.categoryId
          )
        )
      : filteredByType;

    return filteredByCategories;
  };

  const filteredJobs = filterJob();

  return (
    <div>
      { filteredJobs.length === 0 ? <div className="not-find">No jobs match the selected criteria.</div> :
        <div className="job-card-container">
        {filteredJobs.slice(0, itemsPerPage).map((item) => (
          <JobContent key={item.jobId} item={item} />
        ))}
      </div>}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1} className="btns prev">
          Back
        </button>
        <p>
          <span className="page">
            <strong>{currentPage}</strong>/{totalPages}
          </span>
        </p>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btns next">
          Next
        </button>
      </div>
    </div>
  );
}

function JobContent({ item }) {
  return (
    <div className="job-card">
      <p className="location">
        {item.companyName === null ? "Not Available" : item.companyName}
      </p>
      <div className="job-card-details">
        <p>
          <strong>Location :</strong> {item.location}
        </p>
        <p className="position">
          <strong>Position :</strong> {item.position}{" "}
        </p>
        <p className="category">
          <strong>Tags :</strong>{" "}
          <span>{item.type.name}</span>{" "}
          {item.category === null ? "" : <span>{item.category.name}</span>}
        </p>
      </div>
      <a href={item.link} className="link">
        Apply Now
      </a>
    </div>
  );
}

export default JobCard;
