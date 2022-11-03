import { useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Table, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import {
  FilterTags,
  CustomSearch2Select,
  CustomSearch3Select,
  CustomSearchYearRange,
  ClearAllFilter,
  CustomColumn,
  FilterDropdownText,
  FilterDropdownSelect,
  FilterDropdownRange,
} from "components";
import { fetchCandidates } from "features/candidatesSlice";
import { fetchLanguages } from "features/languageSlice";
import { fetchUserPage } from "features/userPageSlice";
import { fetchCities, fetchLocations } from "features/locationSlice";
import { fetchIndustries, fetchSectors } from "features/categorySlice";
import { formatDate, formatCity, deleteKeyNull } from "ultis/func";
import {
  candidate_priority_status,
  candidate_flow_status,
  defaultColor,
  key_of_keys,
} from "ultis/const";

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    candidates: { count, data, loading },
    location: { countries, cities },
    category: { industries, sectors, categories },
    language: { languages },
  } = useSelector(state => state);

  const [searchParams, setSearchParams] = useSearchParams();
  const paramsRouter = Object.fromEntries([...searchParams]);
  const [currentPage, setCurrentPage] = useState(+paramsRouter.page || 1);

  const resetPage = () => {
    delete paramsRouter.page;
    setCurrentPage(1);
  };

  const filterTags = { ...paramsRouter };

  // Filter Location
  const filterCountry =
    filterTags.country &&
    countries.find(({ key }) => key === +filterTags.country)?.label;

  const filterCity =
    filterTags.city &&
    cities.find(({ key }) => key === +filterTags.city)?.label;

  filterTags.location = formatCity(filterCountry, filterCity);

  // Filter YOB
  const filterYearFrom = filterTags.yob_from
    ? `from ${filterTags.yob_from} `
    : "";
  const filterYearTo = filterTags.yob_to ? `to ${filterTags.yob_to}` : "";
  filterTags.yob = filterYearFrom + filterYearTo;

  // Filter Year of service
  const filterIndustryYearFrom = filterTags.industry_years_from
    ? `from ${filterTags.industry_years_from} `
    : "";
  const filterIndustryYearTo = filterTags.industry_years_to
    ? `to ${filterTags.industry_years_to}`
    : "";
  filterTags.industry_years = filterIndustryYearFrom + filterIndustryYearTo;

  // Filter Year of management
  const filterManagementYearFrom = filterTags.management_years_from
    ? `from ${filterTags.management_years_from} `
    : "";
  const filterManagementYearTo = filterTags.management_years_to
    ? `to ${filterTags.management_years_to}`
    : "";
  filterTags.management_years =
    filterManagementYearFrom + filterManagementYearTo;

  const columns = [
    // ID
    {
      title: "ID",
      dataIndex: "candidate_id",
      key: "candidate_id",
      filterResetToDefaultFilteredValue: true,
      filterDropdown: (
        <FilterDropdownText
          placeholder="Search Candidate ID"
          keySearch="candidate_id"
          paramsRouter={paramsRouter}
          resetPage={resetPage}
          setSearchParams={setSearchParams}
        />
      ),
      filtered: true,
      filterIcon: <SearchOutlined style={{ color: "inherit" }} />,
      filterSearch: false,
      render: text => <span style={defaultColor}>{text}</span>,
    },
    // Name
    {
      title: "Name",
      dataIndex: "full_name",
      key: "full_name",
      filterResetToDefaultFilteredValue: true,
      filterDropdown: (
        <FilterDropdownText
          placeholder="Search Fullname"
          keySearch="full_name"
          paramsRouter={paramsRouter}
          resetPage={resetPage}
          setSearchParams={setSearchParams}
        />
      ),
      filtered: true,
      filterIcon: <SearchOutlined />,
      filterSearch: false,
      render: text => (
        <span
          style={{
            textTransform: "capitalize",
            ...defaultColor,
          }}
        >
          {text}
        </span>
      ),
    },
    // Primary Status
    {
      title: "Primary Status",
      dataIndex: "priority_status",
      key: "priority_status",
      filterDropdown: (
        <FilterDropdownSelect
          paramsRouter={paramsRouter}
          keySearch="priority_status"
          placeholder="Select Primary Status"
          resetPage={resetPage}
          setSearchParams={setSearchParams}
          options={candidate_priority_status}
        />
      ),
      filtered: true,
      filterIcon: <SearchOutlined />,
      filterSearch: false,
      render: text => {
        const status = candidate_priority_status.find(({ id }) => id === text);
        return <span color={status.color}>{status.label}</span>;
      },
    },
    // Languages
    {
      title: "Languages",
      dataIndex: "language",
      key: "language",
      filterDropdown: (
        <FilterDropdownSelect
          paramsRouter={paramsRouter}
          keySearch="language"
          placeholder="Select Languages"
          resetPage={resetPage}
          setSearchParams={setSearchParams}
          options={languages}
          isMutiple
        />
      ),
      filtered: true,
      filterIcon: <SearchOutlined />,
      filterSearch: true,
      render: (_, record) => {
        return record.languages.map(({ key, label }) => (
          <p key={key}>- {label}</p>
        ));
      },
    },
    // Highest degree
    {
      title: "Highest degree",
      dataIndex: "highest_education",
      key: "highest_education",
    },
    // City
    {
      title: "City",
      dataIndex: "location",
      key: "location",
      filterDropdown: () => {
        const [country, setCountry] = useState(
          parseInt(paramsRouter.country) || null
        );
        const [city, setCity] = useState(parseInt(paramsRouter.city) || null);

        const onChangeCountry = value => {
          setCountry(value);
          if (!value) setCity(null);
          dispatch(
            fetchCities({
              parent_id: value,
            })
          );
        };

        const onSearch = () => {
          resetPage();
          const params = {
            country,
            city,
          };
          deleteKeyNull(params);
          setSearchParams(
            createSearchParams({
              ...paramsRouter,
              ...params,
            })
          );
        };
        const onReset = () => {
          resetPage();
          setCountry(null);
          setCity(null);
          delete paramsRouter.country;
          delete paramsRouter.city;
          setSearchParams(createSearchParams(paramsRouter));
        };

        useEffect(() => {
          setCountry(parseInt(paramsRouter.country) || null);
          setCity(parseInt(paramsRouter.city) || null);
        }, [paramsRouter.country, paramsRouter.city]);

        return (
          <CustomSearch2Select
            placeholder1="country"
            placeholder2="city"
            value1={country}
            value2={city}
            onSearch={onSearch}
            onChange1={onChangeCountry}
            onChange2={val => setCity(val)}
            onReset={onReset}
            options1={countries}
            options2={cities}
          />
        );
      },
      filtered: true,
      filterIcon: <SearchOutlined />,
      filterSearch: false,
      render: text => {
        return <p>{text}</p>;
      },
    },
    // Industry
    {
      title: "Industry",
      dataIndex: "industry",
      key: "industry",
      filterDropdown: () => {
        const [industry, setIndustry] = useState(paramsRouter.industry || null);
        const [sector, setSector] = useState(paramsRouter.sector || null);
        const [category, setCategory] = useState(paramsRouter.category || null);

        const onChangeIndustry = value => {
          setIndustry(value);
          if (!value) setSector(null);
          dispatch(
            fetchSectors({
              parent_id: value,
              type: 2,
            })
          );
        };

        const onChangeSector = value => {
          setSector(value);
          if (!value) setCategory(null);
          dispatch(
            fetchSectors({
              parent_id: value,
              type: 3,
            })
          );
        };

        const onSearch = () => {
          resetPage();
          let params = {};
          if (industry && sector && category)
            params = {
              industry_id: category,
              type: 3,
            };
          else if (industry && sector)
            params = {
              industry_id: sector,
              type: 2,
            };
          else if (industry)
            params = {
              industry_id: industry,
              type: 1,
            };

          setSearchParams(
            createSearchParams({
              ...paramsRouter,
              ...params,
            })
          );
        };
        const onReset = () => {
          resetPage();
          setIndustry(null);
          setSector(null);
          setCategory(null);
          delete paramsRouter.industry_id;
          delete paramsRouter.type;
          setSearchParams(createSearchParams(paramsRouter));
        };

        // useEffect(() => {
        //   filterTags.industry = industry;
        // }, [searchParams]);

        return (
          <CustomSearch3Select
            placeholder1="industry"
            placeholder2="sector"
            placeholder3="category"
            value1={industry}
            value2={sector}
            value3={category}
            onSearch={onSearch}
            onChange1={onChangeIndustry}
            onChange2={onChangeSector}
            onReset={onReset}
            options1={industries}
            options2={sectors}
            options3={categories}
          />
        );
      },
      filtered: true,
      filterIcon: <SearchOutlined />,
      filterSearch: false,
    },
    // YOB
    {
      title: "YOB",
      dataIndex: "yob",
      key: "yob",
      filterDropdown: (
        <FilterDropdownRange
          paramsRouter={paramsRouter}
          setSearchParams={setSearchParams}
          keySearchFrom="yob_from"
          keySearchTo="yob_to"
          resetPage={resetPage}
        />
      ),
      filtered: true,
      filterIcon: <SearchOutlined />,
      filterSearch: false,
    },
    // Activity
    {
      title: "Activity",
      dataIndex: "flow_status",
      key: "flow_status",
      filterDropdown: (
        <FilterDropdownSelect
          paramsRouter={paramsRouter}
          keySearch="flow_status"
          placeholder="Select Activity"
          resetPage={resetPage}
          setSearchParams={setSearchParams}
          options={candidate_flow_status}
          isMutiple
        />
      ),
      filtered: true,
      filterIcon: <SearchOutlined />,
      filterSearch: true,
      render: text => {
        return candidate_flow_status.find(({ id }) => id === text)?.label;
      },
    },
    // Recent companies
    {
      title: "Recent companies",
      dataIndex: "current_company_text",
      key: "current_company_text",
      filterResetToDefaultFilteredValue: true,
      filterDropdown: (
        <FilterDropdownText
          placeholder="Search Recent Company"
          keySearch="current_company_text"
          paramsRouter={paramsRouter}
          resetPage={resetPage}
          setSearchParams={setSearchParams}
        />
      ),

      filtered: true,
      filterIcon: <SearchOutlined style={{ color: "inherit" }} />,
      filterSearch: false,
      render: (_, record) => {
        return record.current_company?.map(({ organization }) => (
          <p key={organization.key}>- {organization.label}</p>
        ));
      },
    },
    // Recent positions
    {
      title: "Recent positions",
      dataIndex: "current_position_text",
      key: "current_position_text",
      filterResetToDefaultFilteredValue: true,
      filterDropdown: (
        <FilterDropdownText
          placeholder="Search Current Position"
          keySearch="current_position_text"
          paramsRouter={paramsRouter}
          resetPage={resetPage}
          setSearchParams={setSearchParams}
        />
      ),
      filtered: true,
      filterIcon: <SearchOutlined style={{ color: "inherit" }} />,
      filterSearch: false,
      render: (_, record) => {
        return record.current_company?.map(({ title }) => (
          <p key={title.key}>- {title.label}</p>
        ));
      },
    },
    // Year of services
    {
      title: "Year of services",
      dataIndex: "industry_years",
      key: "industry_years",
      filterDropdown: () => {
        const [industryYearFrom, setIndustryYearFrom] = useState();
        const [industryYearTo, setIndustryYearTo] = useState();

        const onSearch = () => {
          resetPage();
          const params = {
            industry_years_from: industryYearFrom,
            industry_years_to: industryYearTo,
          };
          deleteKeyNull(params);
          setSearchParams(
            createSearchParams({
              ...paramsRouter,
              ...params,
            })
          );
        };

        const onReset = () => {
          resetPage();
          setIndustryYearFrom();
          setIndustryYearTo();
          delete paramsRouter.industry_years_from;
          delete paramsRouter.industry_years_to;
          setSearchParams(createSearchParams(paramsRouter));
        };

        return (
          <CustomSearchYearRange
            yearFrom={industryYearFrom}
            onChangeFrom={value => setIndustryYearFrom(value)}
            yearTo={industryYearTo}
            onChangeTo={value => setIndustryYearTo(value)}
            onSearch={onSearch}
            onReset={onReset}
          />
        );
      },
      filtered: true,
      filterIcon: <SearchOutlined />,
      filterSearch: false,
    },
    // Year of management
    {
      title: "Year of management",
      dataIndex: "management_years",
      key: "management_years",
      filterDropdown: () => {
        const [managementYearFrom, setManagementYearFrom] = useState();
        const [managementYearTo, setManagementYearTo] = useState();

        const onSearch = () => {
          resetPage();
          const params = {
            management_years_from: managementYearFrom,
            management_years_to: managementYearTo,
          };
          deleteKeyNull(params);
          setSearchParams(
            createSearchParams({
              ...paramsRouter,
              ...params,
            })
          );
        };

        const onReset = () => {
          resetPage();
          setManagementYearFrom();
          setManagementYearTo();
          delete paramsRouter.management_years_from;
          delete paramsRouter.management_years_to;
          setSearchParams(createSearchParams(paramsRouter));
        };

        return (
          <CustomSearchYearRange
            yearFrom={managementYearFrom}
            onChangeFrom={value => setManagementYearFrom(value)}
            yearTo={managementYearTo}
            onChangeTo={value => setManagementYearTo(value)}
            onSearch={onSearch}
            onReset={onReset}
          />
        );
      },
      filtered: true,
      filterIcon: <SearchOutlined />,
      filterSearch: false,
    },
  ];

  const dataSource = data.map(item => ({
    key: item.id,
    candidate_id: item.candidate_id,
    full_name: item.full_name,
    priority_status: item.priority_status,
    languages: item.languages,
    highest_education: item.highest_education.label,
    location: formatCity(
      item.addresses[0]?.country?.label,
      item.addresses[0]?.city?.label
    ),
    industry_id: item.industry_id,
    // industry
    yob: formatDate(item.dob).year,
    flow_status: item.flow_status,
    current_company: item.current_employments,
    industry_years: item.industry_years,
    management_years: item.management_years,
    // action
  }));

  const onCloseFilterTag = key => {
    if (key_of_keys[key]) {
      key_of_keys[key].forEach(item => delete paramsRouter[item]);
    } else delete paramsRouter[key];
    setSearchParams(createSearchParams(paramsRouter));
  };

  const onClearAllFilter = () => {
    setSearchParams({});
  };

  useEffect(() => {
    if (filterTags.country) {
      dispatch(
        fetchCities({
          parent_id: filterTags.country,
        })
      );
    }
    dispatch(
      fetchUserPage({
        key_page: "candidates",
      })
    );
    dispatch(fetchLanguages());
    dispatch(
      fetchLocations({
        type: 4,
      })
    );
    dispatch(
      fetchIndustries({
        type: 1,
      })
    );
  }, []);

  useEffect(() => {
    dispatch(fetchCandidates(paramsRouter));
  }, [searchParams]);

  return (
    <div>
      {/* <Link to="/user/list">Go to User page</Link> */}
      <Row align="middle" justify="space-between">
        <Typography.Title type="secondary" level={4} style={{ margin: 0 }}>
          Candidate Lists ({count})
        </Typography.Title>
        <ClearAllFilter onClick={onClearAllFilter} />
      </Row>
      <CustomColumn />
      <FilterTags
        data={filterTags}
        onClose={onCloseFilterTag}
        languages={filterTags.language ? languages : undefined}
        activities={filterTags.flow_status ? candidate_flow_status : undefined}
      />
      <Table
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pagination={{
          showSizeChanger: false,
          pageSize: 10,
          total: count,
          showQuickJumper: true,
          current: currentPage,
          onChange: page => {
            setCurrentPage(page);
            setSearchParams(
              createSearchParams({
                ...paramsRouter,
                page,
              })
            );
          },
        }}
      />
    </div>
  );
};

export default Dashboard;
