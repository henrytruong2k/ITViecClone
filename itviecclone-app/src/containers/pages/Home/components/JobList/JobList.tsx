import React from "react";
import Job from "../../../../../types/Job";
import JobItem from "../JobItem/JobItem";
import Pagination from "../Pagination/Pagination";
import { Col } from "react-bootstrap";
import LoadingJobItem from "../Loading/LoadingJobItem/LoadingJobItem";

const JobList = (props: { list: Job[]; loading: boolean }) => {
  const { list, loading } = props;
  const [currentPage, setCurrentPage] = React.useState(1);
  const jobsPerPage = 10;

  //pagination
  const indexOfLastPost = currentPage * jobsPerPage;
  const indexOfFirstPost = indexOfLastPost - jobsPerPage;
  const currentPosts = list?.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  return (
    <Col sm={9}>
      <h3>List jobs</h3>

      {loading ? (
        <LoadingJobItem />
      ) : (
        currentPosts.map((item) => {
          return <JobItem key={item.id} item={item} />;
        })
      )}
      <Pagination
        currentPage={currentPage}
        jobsPerPage={jobsPerPage}
        totalJobs={list?.length}
        paginate={paginate}
      />
    </Col>
  );
};

export default JobList;
