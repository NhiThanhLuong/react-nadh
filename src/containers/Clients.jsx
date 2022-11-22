/* eslint-disable no-unused-vars */
// import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchClients } from "features/clientSlice";
import {
  createSearchParams,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  ClearAllFilter,
  FilterDropdown2Select,
  FilterDropdown3Select,
  FilterDropdownRange,
  FilterDropdownRangeDate,
  FilterDropdownSelect,
  FilterDropdownText,
  FilterTags,
} from "components";
import {
  defaultColor,
  key_of_keys,
  STATUS_CLIENT,
  TYPE_CLIENT,
} from "ultis/const";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Row, Table, Tag, Typography } from "antd";
import styled from "styled-components";
import { fetchUsers } from "features/userSlice";
import { fetchCities, fetchLocations } from "features/locationSlice";
import {
  fetchCategory,
  fetchIndustries,
  fetchSectors,
} from "features/categorySlice";
import {
  formatFilterTagRange,
  getLabelIndustry,
  get_obj_key_label_from_key,
} from "ultis/func";

const Clients = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const paramsRouter = Object.fromEntries([...searchParams]);
  const [currentPage, setCurrentPage] = useState(+paramsRouter.page || 1);

  const data = useSelector(state => state.client.data);
  const count = useSelector(state => state.client.count);
  const loading = useSelector(state => state.client.loading);

  const countries = useSelector(state => state.location.countries);
  const cities = useSelector(state => state.location.cities);

  const industries = useSelector(state => state.category.industries);
  const sectors = useSelector(state => state.category.sectors);
  const categories = useSelector(state => state.category.categories);

  const users = useSelector(state => state.user.users);

  const filterTags = useMemo(() => ({ ...paramsRouter }), [searchParams]);

  // console.log(users);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(
      fetchIndustries({
        type: 1,
      })
    );
  }, []);

  useEffect(() => {
    // const newParamsRouter = { ...paramsRouter };
    // delete newParamsRouter.industry;
    // delete newParamsRouter.sector;
    // delete newParamsRouter.category;
    dispatch(fetchClients(paramsRouter));
    // setCurrentPage(+paramsRouter.page || 1);
  }, [searchParams]);

  const resetPage = () => {
    delete paramsRouter.page;
    setCurrentPage(1);
  };

  const columns = [
    // ID
    {
      title: "ID",
      dataIndex: "client_id",
      filterResetToDefaultFilteredValue: true,
      filterDropdown: (
        <FilterDropdownText
          placeholder="Search Client ID"
          keySearch="client_id"
          paramsRouter={paramsRouter}
          resetPage={resetPage}
          setSearchParams={setSearchParams}
        />
      ),
      filtered: !!paramsRouter.client_id,
      filterIcon: <SearchOutlined style={{ color: "inherit" }} />,
      render: text => (
        <Link to={`/clients/${text}`} style={defaultColor}>
          {text}
        </Link>
      ),
      width: 150,
    },
    // Trade Name
    {
      title: "Trade Name",
      dataIndex: "name",
      filterResetToDefaultFilteredValue: true,
      filterDropdown: (
        <FilterDropdownText
          placeholder="Search trade name"
          keySearch="name"
          paramsRouter={paramsRouter}
          resetPage={resetPage}
          setSearchParams={setSearchParams}
        />
      ),
      filterIcon: <SearchOutlined />,
      filtered: !!paramsRouter.name,
      render: (text, record) => (
        <Link
          to={`/client/${record.client_id}`}
          style={{
            textTransform: "capitalize",
            ...defaultColor,
          }}
        >
          {text}
        </Link>
      ),
    },
    // City
    {
      title: "City",
      dataIndex: "location",
      filterDropdown: (
        <FilterDropdown2Select
          keySearch1="country"
          keySearch2="city"
          placeholder1="Select Country"
          placeholder2="Select City"
          paramsRouter={paramsRouter}
          setSearchParams={setSearchParams}
          resetPage={resetPage}
          options1={countries}
          options2={cities}
          getOptions2={async value =>
            await dispatch(
              fetchCities({
                parent_id: value,
              })
            )
          }
        />
      ),
      filtered: !!paramsRouter.country,
      filterIcon: <SearchOutlined />,
      render: text => {
        return <p>{text}</p>;
      },
    },
    // Lead Consultant
    {
      title: "Lead Consultants",
      dataIndex: "lead_consultants",
      filterDropdown: (
        <FilterDropdownSelect
          paramsRouter={paramsRouter}
          keySearch="lead_consultants"
          placeholder="Select Lead Consultants"
          resetPage={resetPage}
          setSearchParams={setSearchParams}
          options={users.map(({ id, full_name }) => ({
            key: id,
            label: full_name,
          }))}
          isMutiple
        />
      ),
      filterIcon: <SearchOutlined />,
      filtered: !!paramsRouter.lead_consultants,
      render: text => {
        return (
          <Tag color="geekblue" className="capitalize">
            {text[0].full_name}
          </Tag>
        );
      },
    },
    // Activity
    // Tax code
    {
      title: "Tax Code",
      dataIndex: "tax_code",
      filterResetToDefaultFilteredValue: true,
      filterDropdown: (
        <FilterDropdownText
          placeholder="Search Tax Code"
          keySearch="tax_code"
          paramsRouter={paramsRouter}
          resetPage={resetPage}
          setSearchParams={setSearchParams}
        />
      ),
      filtered: !!paramsRouter.tax_code,
      filterIcon: <SearchOutlined style={{ color: "inherit" }} />,
    },
    // CPA
    // Industry
    {
      title: "Industry",
      dataIndex: "industry",
      filterDropdown: (
        <FilterDropdown3Select
          keyIdFilter="industry_id"
          keyTypeFilter="industry_type"
          keySearch1="industry"
          keySearch2="sector"
          keySearch3="category"
          placeholder1="Select industry"
          placeholder2="Select sector"
          placeholder3="Select category"
          paramsRouter={paramsRouter}
          setSearchParams={setSearchParams}
          resetPage={resetPage}
          options1={industries}
          options2={sectors}
          options3={categories}
          getOptions2={val => dispatch(fetchSectors(val))}
          getOptions3={val => dispatch(fetchCategory(val))}
        />
      ),
      filtered: !!paramsRouter.industry_id,
      filterIcon: <SearchOutlined />,
      render: text => {
        return text?.map(item => (
          <p key={item.key}>* {getLabelIndustry(item)}</p>
        ));
      },
    },
    // Job(s)
    {
      title: "Job(s)",
      dataIndex: "client_jobs",
      filterDropdown: (
        <FilterDropdownRange
          paramsRouter={paramsRouter}
          setSearchParams={setSearchParams}
          keySearchFrom="client_jobs_from"
          keySearchTo="client_jobs_to"
          resetPage={resetPage}
        />
      ),
      filterIcon: <SearchOutlined />,
      filtered:
        !!paramsRouter.client_jobs_from || !!paramsRouter.client_jobs_to,
    },
    // Type
    {
      title: "Type",
      dataIndex: "type",
      filterDropdown: (
        <FilterDropdownSelect
          paramsRouter={paramsRouter}
          keySearch="type"
          placeholder="Select Types"
          resetPage={resetPage}
          setSearchParams={setSearchParams}
          options={TYPE_CLIENT}
          isMutiple
        />
      ),
      filterIcon: <SearchOutlined />,
      filtered: !!paramsRouter.type,
      render: text => {
        return (
          <span>{get_obj_key_label_from_key(TYPE_CLIENT, text)?.label}</span>
        );
      },
    },
    // Status
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filterDropdown: (
        <FilterDropdownSelect
          paramsRouter={paramsRouter}
          keySearch="status"
          placeholder="Select Primary Status"
          resetPage={resetPage}
          setSearchParams={setSearchParams}
          options={STATUS_CLIENT}
          isMutiple
        />
      ),
      filterIcon: <SearchOutlined />,
      filtered: !!paramsRouter.status,
      render: text => {
        const status = get_obj_key_label_from_key(STATUS_CLIENT, text);
        return <Tag color={status.color}>{status.label}</Tag>;
      },
    },
    // Contact person name
    {
      title: "Contact Person's Name",
      dataIndex: "contact_person_name",
      key: "contact_person_name",
      filterResetToDefaultFilteredValue: true,
      filterDropdown: (
        <FilterDropdownText
          placeholder="Search Contact Person's Name"
          keySearch="contact_person_name"
          paramsRouter={paramsRouter}
          resetPage={resetPage}
          setSearchParams={setSearchParams}
        />
      ),
      filterIcon: <SearchOutlined style={{ color: "inherit" }} />,
      filtered: !!paramsRouter.contact_person_name,
      render: text => {
        return text?.map(({ full_name }, index) => (
          <p key={index} className="capitalize">
            - {full_name}
          </p>
        ));
      },
    },
    // Contact person title
    {
      title: "Contact Person's Title",
      dataIndex: "contact_person_title",
      key: "contact_person_title",
      filterResetToDefaultFilteredValue: true,
      filterDropdown: (
        <FilterDropdownText
          placeholder="Search Contact Person's Title"
          keySearch="contact_person_title"
          paramsRouter={paramsRouter}
          resetPage={resetPage}
          setSearchParams={setSearchParams}
        />
      ),
      filterIcon: <SearchOutlined style={{ color: "inherit" }} />,
      filtered: !!paramsRouter.contact_person_title,
      render: text => {
        return text?.map(({ extra }, index) => (
          <p key={index} className="capitalize">
            - {extra.contact_info.title}
          </p>
        ));
      },
    },
    // Lead Consultant
    {
      title: "Updated by",
      dataIndex: "update_last_by",
      filterDropdown: (
        <FilterDropdownSelect
          paramsRouter={paramsRouter}
          keySearch="update_last_by"
          placeholder="Select Updated by"
          resetPage={resetPage}
          setSearchParams={setSearchParams}
          options={users.map(({ id, full_name }) => ({
            key: id,
            label: full_name,
          }))}
          isMutiple
        />
      ),
      filterIcon: <SearchOutlined />,
      filtered: !!paramsRouter.update_last_by,
      render: text => {
        return (
          <Tag color="geekblue" className="capitalize">
            {text}
          </Tag>
        );
      },
    },
    // Updated on
    {
      title: "Updated on",
      dataIndex: "updated_on",
      filterDropdown: (
        <FilterDropdownRangeDate
          paramsRouter={paramsRouter}
          resetPage={resetPage}
          setSearchParams={setSearchParams}
          keySearchFrom="updated_on_from"
          keySearchTo="updated_on_to"
        />
      ),
      filterIcon: <SearchOutlined />,
      filtered: !!paramsRouter.updated_on,
      render: text => {
        const date = new Date(text);
        return <span>{date.toLocaleString()}</span>;
      },
    },
  ];

  const dataSource = useMemo(
    () =>
      data.map(item => ({
        key: item.id,
        client_id: item.client_id,
        name: item.name,
        //
        lead_consultants: item.lead_consultants,
        tax_code: item.tax_code,
        //
        industry: item.industry,
        client_jobs: item.jobs_count,
        type: item.type,
        status: item.status,
        contact_person_name: item.contact_person_current,
        contact_person_title: item.contact_person_current,
        update_last_by: item.meta.lastUpdated?.user.full_name,
        updated_on: item.createdAt,
      })),
    [data]
  );

  // Filter Job(s)
  useMemo(
    () =>
      formatFilterTagRange(
        "client_jobs",
        filterTags,
        "client_jobs_from",
        "client_jobs_to"
      ),
    [paramsRouter.client_jobs_from, paramsRouter.client_jobs_to]
  );

  // Filter Type
  filterTags.type = useMemo(() => {
    if (filterTags.type)
      return get_obj_key_label_from_key(TYPE_CLIENT, +filterTags.type)?.label;
  }, [paramsRouter.type]);

  // Filter Updated on
  useMemo(
    () =>
      formatFilterTagRange(
        "updated_on",
        filterTags,
        "updated_on_from",
        "updated_on_to"
      ),
    [paramsRouter.updated_on_from, paramsRouter.updated_on_to]
  );

  const onCloseFilterTag = key => {
    resetPage();
    if (key_of_keys[key]) {
      key_of_keys[key].forEach(item => delete paramsRouter[item]);
    } else delete paramsRouter[key];
    setSearchParams(createSearchParams(paramsRouter));
  };

  const onClearAllFilter = () => {
    setSearchParams({});
  };

  const onChangePage = page => {
    setCurrentPage(page);
    setSearchParams(
      createSearchParams({
        ...paramsRouter,
        page,
      })
    );
  };

  return (
    <div style={{ marginTop: 100 }}>
      <Row align="middle" justify="space-between">
        <Typography.Title type="secondary" level={4} style={{ margin: 0 }}>
          Client Lists ({count})
        </Typography.Title>
        <div>
          <ClearAllFilter onClick={onClearAllFilter} />
          <Button
            onClick={() => navigate("/client-add", { replace: true })}
            icon={<PlusOutlined />}
            style={{ marginLeft: 8 }}
            type="primary"
          >
            Create Client
          </Button>
        </div>
      </Row>
      <FilterTags
        data={{
          client_id: filterTags.client_id,
          name: filterTags.name,
          //
          lead_consultants: filterTags.lead_consultants,
          tax_code: filterTags.tax_code,
          //
          industry: filterTags.industry,
          client_jobs: filterTags.client_jobs,
          type: filterTags.type,
          status: filterTags.status,
          contact_person_name: filterTags.contact_person_name,
          contact_person_title: filterTags.contact_person_title,
          update_last_by: filterTags.update_last_by,
          updated_on: filterTags.updated_on,
          ...filterTags,
        }}
        onClose={onCloseFilterTag}
      />
      {loading ? (
        <Table loading={loading} columns={columns} />
      ) : (
        <StyledTable
          columns={columns}
          dataSource={dataSource}
          pagination={{
            showSizeChanger: false,
            pageSize: 10,
            total: count,
            showQuickJumper: true,
            current: currentPage,
            onChange: onChangePage,
          }}
        />
      )}
    </div>
  );
};

const StyledTable = styled(props => <Table {...props} />)`
  && tbody > tr:hover > td {
    background-color: ${defaultColor.hover};
  }
`;

Clients.propTypes = {};

export default Clients;
