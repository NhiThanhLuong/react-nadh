import { JobCandidateList } from "components";
import { fetchDetailJob } from "features/jobSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const DetailJob = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchDetailJob(id));
  }, []);

  return (
    <DivMt100>
      <JobCandidateList />
    </DivMt100>
  );
};

const DivMt100 = styled.div`
  margin-top: 100px;
`;

export default DetailJob;
