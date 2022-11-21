/* eslint-disable no-unused-vars */
// import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchClients } from "features/clientSlice";
import { Link, useSearchParams } from "react-router-dom";
import {
  FilterDropdown2Select,
  FilterDropdown3Select,
  FilterDropdownSelect,
  FilterDropdownText,
} from "components";
import { defaultColor } from "ultis/const";
import { SearchOutlined } from "@ant-design/icons";
import { Table, Tag } from "antd";
import styled from "styled-components";
import { fetchUsers } from "features/userSlice";
import { fetchCities, fetchLocations } from "features/locationSlice";
import {
  fetchCategory,
  fetchIndustries,
  fetchSectors,
} from "features/categorySlice";
import { getLabelIndustry } from "ultis/func";

const Clients = () => {
  const dispatch = useDispatch();
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
    dispatch(fetchClients());
    dispatch(fetchUsers());
    dispatch(
      fetchIndustries({
        type: 1,
      })
    );
  }, []);

  const resetPage = () => {
    delete paramsRouter.page;
    setCurrentPage(1);
  };

  const columns = [
    // ID
    {
      title: "ID",
      dataIndex: "client_id",
      key: "client_id",
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
      key: "name",
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
          to={`/candidate/${record.client_id}`}
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
      key: "location",
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
      key: "lead_consultants",
      filterDropdown: (
        <FilterDropdownSelect
          paramsRouter={paramsRouter}
          keySearch="lead_consultants"
          placeholder="Select Lead Consultants"
          resetPage={resetPage}
          setSearchParams={setSearchParams}
          options={users.map(({ user_id, full_name }) => ({
            key: user_id,
            label: full_name,
          }))}
          isMutiple
        />
      ),
      filterIcon: <SearchOutlined />,
      filtered: !!paramsRouter.lead_consultants,
      render: text => {
        console.log(text);
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
      key: "tax_code",
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
      key: "industry",
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

        // priority_status: item.priority_status,
        // languages: item.languages,
        // highest_education: item.highest_education.label,
        // location: formatCity(
        //   item.addresses[0]?.country?.label,
        //   item.addresses[0]?.city?.label
        // ),
        // industry: item.business_line,
        // yob: formatDate(item.dob).year,
        // flow_status: item.flow_status,
        // current_company: item.current_employments,
        // industry_years: item.industry_years,
        // management_years: item.management_years,
      })),
    [data]
  );

  return (
    <div style={{ marginTop: 100 }}>
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
            // onChange: onChangePage,
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
