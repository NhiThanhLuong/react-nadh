/* eslint-disable no-unused-vars */
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, Row, Table, Tag, Typography } from "antd";
import {
  ClearAllFilter,
  CustomColumn,
  FilterDropdownRange,
  FilterDropdownRangeDate,
  FilterDropdownSelect,
  FilterDropdownText,
  FilterTags,
} from "components";
import { fetchClients } from "features/clientSlice";
import { fetchJobs } from "features/jobSlice";
import { fetchUserPage, putUserPageSlice } from "features/userPageSlice";
import { fetchUsers } from "features/userSlice";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSearchParams,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";
import {
  candidate_flow_status,
  CUSTOM_COLUMNS,
  defaultColor,
  key_of_keys,
} from "ultis/const";
import {
  deleteKeyNull,
  formatFilterTagRange,
  format_arr_to_obj_key_the_same_value,
  get_obj_key_label_from_key,
} from "ultis/func";

const Jobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const data = useSelector(state => state.job.data);
  const count = useSelector(state => state.job.count);
  const loading = useSelector(state => state.job.loading);

  const userPages = useSelector(state => state.userPage.data);

  const users = useSelector(state => state.user.users).map(
    ({ id, full_name }) => ({
      key: id,
      label: full_name,
    })
  );

  const clients = useSelector(state => state.client.data).map(
    ({ id, name }) => ({
      key: id,
      label: name,
    })
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const paramsRouter = Object.fromEntries([...searchParams]);
  const [currentPage, setCurrentPage] = useState(+paramsRouter.page || 1);

  const filterTags = useMemo(() => ({ ...paramsRouter }), [searchParams]);

  const resetPage = () => {
    delete paramsRouter.page;
    setCurrentPage(1);
  };

  const columns = [
    // ID
    {
      title: "ID",
      dataIndex: "job_id",
      filterResetToDefaultFilteredValue: true,
      filterDropdown: (
        <FilterDropdownText
          placeholder="Search Job ID"
          keySearch="job_id"
          paramsRouter={paramsRouter}
          resetPage={resetPage}
          setSearchParams={setSearchParams}
        />
      ),
      filtered: !!paramsRouter.job_id,
      filterIcon: <SearchOutlined style={{ color: "inherit" }} />,
      render: text => (
        <Link to={`/job-detail/${text}`} style={defaultColor}>
          {text}
        </Link>
      ),
      width: 150,
    },
    // Title
    {
      title: "Title",
      dataIndex: "title",
      filterResetToDefaultFilteredValue: true,
      filterDropdown: (
        <FilterDropdownText
          placeholder="Search title"
          keySearch="title"
          paramsRouter={paramsRouter}
          resetPage={resetPage}
          setSearchParams={setSearchParams}
        />
      ),
      filterIcon: <SearchOutlined />,
      filtered: !!paramsRouter.title,
      render: (text, record) => (
        <Link
          to={`/job-detail/${record.job_id}`}
          style={{
            textTransform: "capitalize",
            ...defaultColor,
          }}
        >
          {text}
        </Link>
      ),
    },
    // Quantity
    {
      title: "Quantity",
      dataIndex: "quantity",
      filterDropdown: (
        <FilterDropdownRange
          paramsRouter={paramsRouter}
          setSearchParams={setSearchParams}
          keySearchFrom="quantity_from"
          keySearchTo="quantity_to"
          resetPage={resetPage}
        />
      ),
      filterIcon: <SearchOutlined />,
      filtered: !!paramsRouter.quantity_from || !!paramsRouter.quantity_to,
    },
    // Open Date
    {
      title: "Open Date",
      dataIndex: "target_date",
      filterDropdown: (
        <FilterDropdownRangeDate
          paramsRouter={paramsRouter}
          resetPage={resetPage}
          setSearchParams={setSearchParams}
          keySearchFrom="target_date_from"
          keySearchTo="target_date_to"
        />
      ),
      filterIcon: <SearchOutlined />,
      filtered: !!paramsRouter.target_date,
      render: text => {
        const date = moment(text).format("DD/MM/YYYY");
        return <span>{date}</span>;
      },
    },
    // Expire Date
    {
      title: "Expire Date",
      dataIndex: "end_date",
      filterDropdown: (
        <FilterDropdownRangeDate
          paramsRouter={paramsRouter}
          resetPage={resetPage}
          setSearchParams={setSearchParams}
          keySearchFrom="end_date_from"
          keySearchTo="end_date_to"
        />
      ),
      filterIcon: <SearchOutlined />,
      filtered: !!paramsRouter.end_date,
      render: text => {
        const date = moment(text).format("DD/MM/YYYY");
        return <span>{date}</span>;
      },
    },
    // Client
    {
      title: "Client",
      dataIndex: "client",
      filterDropdown: (
        <FilterDropdownSelect
          paramsRouter={paramsRouter}
          keySearch="client"
          placeholder="Select Clients"
          resetPage={resetPage}
          setSearchParams={setSearchParams}
          options={clients}
          isMutiple
        />
      ),
      filterIcon: <SearchOutlined />,
      filtered: !!paramsRouter.type,
      render: text => {
        return <span>{text.name}</span>;
      },
    },
    // Search Consultant
    {
      title: "Search Consultant",
      dataIndex: "search_consultants",
      filterDropdown: (
        <FilterDropdownSelect
          paramsRouter={paramsRouter}
          keySearch="search_consultants"
          placeholder="Select Consultants"
          resetPage={resetPage}
          setSearchParams={setSearchParams}
          options={users}
          isMutiple
        />
      ),
      filterIcon: <SearchOutlined />,
      filtered: !!paramsRouter.search_consultants,
      render: text => {
        return text?.full_name ? (
          <Tag color="geekblue" className="capitalize">
            {text.full_name}
          </Tag>
        ) : (
          ""
        );
      },
    },
    // Activity
    {
      title: "Activity",
      dataIndex: "candidate_flows_status",
      filterDropdown: (
        <FilterDropdownSelect
          paramsRouter={paramsRouter}
          keySearch="candidate_flows_status"
          placeholder="Select Activity"
          resetPage={resetPage}
          setSearchParams={setSearchParams}
          options={candidate_flow_status}
          isMutiple
        />
      ),
      filterIcon: <SearchOutlined />,
      filtered: !!paramsRouter.candidate_flows_status,
      render: text => {
        return candidate_flow_status.find(({ id }) => id === text)?.label;
      },
    },
    // Mapping by
    {
      title: "Mapping by",
      dataIndex: "mapping_by",
      filterDropdown: (
        <FilterDropdownSelect
          paramsRouter={paramsRouter}
          keySearch="mapping_by"
          placeholder="Select Mapping by"
          resetPage={resetPage}
          setSearchParams={setSearchParams}
          options={users}
          isMutiple
        />
      ),
      filterIcon: <SearchOutlined />,
      filtered: !!paramsRouter.mapping_by,
      render: text => {
        if (text.length === 0) return;
        return (
          <>
            {text.map(({ id, full_name }) => (
              <Tag key={id} color="geekblue" className="capitalize">
                {full_name}
              </Tag>
            ))}
          </>
        );
      },
    },
  ];

  const customColumns = useMemo(
    () => columns.filter(({ dataIndex }) => userPages.includes(dataIndex)),

    [columns, userPages]
  );

  const initValuesColumn = format_arr_to_obj_key_the_same_value(
    userPages,
    true
  );

  useEffect(() => {
    form.setFieldsValue({
      ...format_arr_to_obj_key_the_same_value(
        CUSTOM_COLUMNS.jobs.map(({ title }) => title),
        false
      ),
      ...initValuesColumn,
    });
  }, [initValuesColumn]);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(
      fetchClients({
        page: null,
        perPage: null,
      })
    );
    dispatch(
      fetchUserPage({
        key_page: "jobs",
      })
    );
  }, []);

  useEffect(() => {
    dispatch(fetchJobs(paramsRouter));
    setCurrentPage(+paramsRouter.page || 1);
  }, [searchParams]);

  const onCloseFilterTag = key => {
    resetPage();
    if (key_of_keys[key]) {
      key_of_keys[key].forEach(item => delete paramsRouter[item]);
    } else delete paramsRouter[key];
    setSearchParams(createSearchParams(paramsRouter));
  };

  const dataSource = useMemo(
    () =>
      data.map(item => ({
        key: item.id,
        job_id: item.job_id,
        title: item.title.label,
        quantity: item.quantity,
        target_date: item.target_date,
        end_date: item.end_date,
        client: item.client,
        search_consultants: item.recruiters[0],
        candidate_flows_status: item.recent_flow?.status,
        mapping_by: item.related_users,
      })),
    [data]
  );

  // Filter Quantity
  useMemo(
    () =>
      formatFilterTagRange(
        "quantity",
        filterTags,
        "quantity_from",
        "quantity_to"
      ),
    [paramsRouter.quantity_from, paramsRouter.quantity_to]
  );

  // Filter Open date
  useMemo(
    () =>
      formatFilterTagRange(
        "target_date",
        filterTags,
        "target_date_from",
        "target_date_to"
      ),
    [paramsRouter.target_date_from, paramsRouter.target_date_to]
  );

  // Filter Expire date
  useMemo(
    () =>
      formatFilterTagRange(
        "end_date",
        filterTags,
        "end_date_from",
        "end_date_to"
      ),
    [paramsRouter.end_date_from, paramsRouter.end_date_to]
  );

  // Filter search consultant
  filterTags.search_consultants = useMemo(() => {
    if (paramsRouter.search_consultants)
      return paramsRouter.search_consultants
        ?.split(",")
        .map(val => get_obj_key_label_from_key(users, val)?.label)
        .join(", ");
  }, [paramsRouter.search_consultants, users]);

  // Filter Activity
  filterTags.candidate_flows_status = useMemo(() => {
    if (paramsRouter.candidate_flows_status)
      return paramsRouter.candidate_flows_status
        .split(",")
        .map(
          val => get_obj_key_label_from_key(candidate_flow_status, val)?.label
        )
        .join(", ");
  }, [paramsRouter.candidate_flows_status]);

  return (
    <StyledDiv>
      <Row align="middle" justify="space-between">
        <Typography.Title type="secondary" level={4} style={{ margin: 0 }}>
          Client Lists ({count})
        </Typography.Title>
        <div>
          <ClearAllFilter onClick={() => setSearchParams({})} />
          <Button
            onClick={() => navigate("/client-add", { replace: true })}
            icon={<PlusOutlined />}
            type="primary"
            className="ml-1"
          >
            Create Client
          </Button>
        </div>
      </Row>
      <Row justify="end" className="my-1">
        <Form
          form={form}
          onValuesChange={(_, allValues) => {
            const data = [...Object.keys(deleteKeyNull(allValues))];
            dispatch(
              putUserPageSlice({
                key_page: "jobs",
                data,
              })
            );
          }}
        >
          <CustomColumn form={form} initValues={initValuesColumn} />
        </Form>
      </Row>
      <FilterTags
        data={{
          job_id: filterTags.job_id,
          title: filterTags.title,
          quantity: filterTags.quantity,
          target_date: filterTags.target_date,
          end_date: filterTags.end_date,
          client: filterTags.client,
          search_consultants: filterTags.search_consultants,
          candidate_flows_status: filterTags.candidate_flows_status,
          mapping_by: filterTags.mapping_by,
          ...filterTags,
        }}
        onClose={onCloseFilterTag}
      />
      {loading ? (
        <Table loading={loading} columns={customColumns} />
      ) : (
        <StyledTable
          columns={customColumns}
          dataSource={dataSource}
          pagination={{
            showSizeChanger: false,
            pageSize: 10,
            total: count,
            showQuickJumper: true,
            current: currentPage,
            // onChange: onChangePage,
          }}
          scroll={{
            x: 1000,
          }}
        />
      )}
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  margin-top: 100px;
`;

const StyledTable = styled(props => <Table {...props} />)`
  && tbody > tr:hover > td {
    background-color: ${defaultColor.hover};
  }
`;

export default Jobs;
