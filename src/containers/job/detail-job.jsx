import { Row, Spin } from "antd";
import { JobCandidateList } from "components";
import { fetchDetailJob } from "features/jobSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const DetailJob = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const detailData = useSelector(state => state.job.detailData);
  const loading = useSelector(state => state.job.loading);
  const loadingDetail = useSelector(state => state.job.loadingDetail);

  useEffect(() => {
    dispatch(fetchDetailJob(id));
  }, []);

  return (
    <DivMt100>
      {!loading && detailData?.job_id === id ? (
        <StyledSpin spinning={loadingDetail} tip="Loading...">
          <JobCandidateList data={detailData} />
        </StyledSpin>
      ) : (
        <StyledRow align="middle" justify="center">
          <Spin tip="Loading..." />
        </StyledRow>
      )}
    </DivMt100>
  );
};

const DivMt100 = styled.div`
  margin-top: 100px;
`;

const StyledSpin = styled(Spin)`
  position: fixed !important;
  max-height: 100vh !important;
`;

const StyledRow = styled(Row)`
  height: 100vh;
`;

export default DetailJob;
