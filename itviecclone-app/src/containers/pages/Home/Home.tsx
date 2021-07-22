import React from "react";
import { Container, Row } from "react-bootstrap";
import jobAPI from "../../../services/jobAPI";
import Category from "../../../types/Category";
import Job from "../../../types/Job";
import JobList from "./components/JobList/JobList";
import SideBarCategories from "./components/SideBarCategories/SideBarCategories";

const Home = () => {
  const [jobList, setJobList] = React.useState<Job[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [loadingJobs, setLoadingJobs] = React.useState<boolean>(true);
  const [loadingCategories, setLoadingCategories] =
    React.useState<boolean>(true);
  React.useEffect(() => {
    (async () => {
      try {
        const params = {
          limit: 100,
        };

        const { data } = await jobAPI.getAll(params);

        setJobList(data.jobs);
      } catch (error) {
        console.log("Failed to fetch jobs: ", error);
      }
      setLoadingJobs(false);
    })();
  }, []);
  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await jobAPI.getCategories();
        setCategories(data.jobs);
      } catch (error) {
        console.log("Failed to fetch categories: ", error);
      }
      setLoadingCategories(false);
    })();
  }, []);
  return (
    <Container>
      <Row>
        <SideBarCategories list={categories} loading={loadingCategories} />
        <JobList list={jobList} loading={loadingJobs} />
      </Row>
    </Container>
  );
};

export default Home;
