/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { createSearchParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Table, Tag, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import {
  FilterTags,
  CustomSearch,
  CustomSearchSelect,
  CustomSearch2Select,
  CustomSearch3Select,
  CustomSearchYob,
  ClearAllFilter,
  CustomColumn,
} from "components";
import { fetchCandidates } from "features/candidatesSlice";
import { fetchLanguages } from "features/languageSlice";
import { fetchUserPage } from "features/userPageSlice";
import { fetchCities, fetchLocations } from "features/locationSlice";
import { fetchIndustries, fetchSectors } from "features/categorySlice";
import { formatDate, formatCity, deleleKeyNull } from "ultis/func";
import { candidate_priority_status, defaultColor } from "ultis/const";

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    auth,
    candidates: { count, data },
    location: { countries, cities },
    category: { industries, sectors, categories },
    language: { languages },
  } = useSelector(state => state);

  // const { data: keysData } = useSelector(state => state.userPage);
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

  const columns = [
    // ID
    {
      title: "ID",
      dataIndex: "candidate_id",
      key: "candidate_id",
      filterResetToDefaultFilteredValue: true,
      filterDropdown: () => {
        const [value, setValue] = useState(paramsRouter.candidate_id || "");
        const onChange = e => {
          setValue(e.target.value);
        };
        const onSearch = () => {
          resetPage();
          setSearchParams(
            createSearchParams({
              ...paramsRouter,
              candidate_id: value,
            })
          );
        };
        const onReset = () => {
          resetPage();
          setValue("");
          delete paramsRouter.candidate_id;
          setSearchParams(createSearchParams(paramsRouter));
        };

        useEffect(() => {
          setValue(paramsRouter.candidate_id || null);
        }, [paramsRouter.candidate_id]);

        return (
          <CustomSearch
            value={value}
            onSearch={onSearch}
            onChange={onChange}
            onReset={onReset}
          />
        );
      },
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
      filterDropdown: () => {
        const [value, setValue] = useState(paramsRouter.full_name || "");
        const onChange = e => {
          setValue(e.target.value);
        };
        const onSearch = () => {
          resetPage();
          setSearchParams(
            createSearchParams({
              ...paramsRouter,
              full_name: value,
            })
          );
        };
        const onReset = () => {
          resetPage();
          setValue("");
          delete paramsRouter.full_name;
          setSearchParams(createSearchParams(paramsRouter));
        };

        useEffect(() => {
          setValue(paramsRouter.full_name || null);
        }, [paramsRouter.full_name]);

        return (
          <CustomSearch
            value={value}
            onSearch={onSearch}
            onChange={onChange}
            onReset={onReset}
          />
        );
      },
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
      filterDropdown: () => {
        const [value, setValue] = useState(
          paramsRouter.priority_status || null
        );
        const onChange = val => {
          setValue(val);
        };
        const onSearch = () => {
          resetPage();
          setSearchParams(
            createSearchParams({
              ...paramsRouter,
              priority_status: value,
            })
          );
        };
        const onReset = () => {
          resetPage();
          setValue(null);
          delete paramsRouter.priority_status;
          setSearchParams(createSearchParams(paramsRouter));
        };

        useEffect(() => {
          setValue(paramsRouter.priority_status || null);
        }, [paramsRouter.priority_status]);

        return (
          <CustomSearchSelect
            placeholder="Priority_status"
            onSearch={onSearch}
            onChange={onChange}
            onReset={onReset}
            options={candidate_priority_status}
            value={value}
          />
        );
      },
      filtered: true,
      filterIcon: <SearchOutlined />,
      filterSearch: false,
      render: text => {
        const status = candidate_priority_status.find(({ id }) => id === text);
        return <Tag color={status.color}>{status.label}</Tag>;
      },
    },
    // Languages
    {
      title: "Languages",
      dataIndex: "language",
      key: "language",
      filterDropdown: () => {
        const [value, setValue] = useState(
          paramsRouter.language
            ? JSON.parse("[" + paramsRouter.language + "]")
            : []
        );
        const onChange = val => {
          setValue(val);
        };
        const onSearch = () => {
          resetPage();
          setSearchParams(
            createSearchParams({
              ...paramsRouter,
              language: value + "",
            })
          );
        };
        const onReset = () => {
          resetPage();
          setValue([]);
          delete paramsRouter.language;
          setSearchParams(createSearchParams(paramsRouter));
        };

        useEffect(() => {
          setValue(
            paramsRouter.language
              ? JSON.parse("[" + paramsRouter.language + "]")
              : []
          );
        }, [paramsRouter.language]);

        return (
          <CustomSearchSelect
            placeholder="Languages"
            onSearch={onSearch}
            onChange={onChange}
            onReset={onReset}
            value={value}
            options={languages}
            mode="multiple"
          />
        );
      },
      filtered: true,
      filterIcon: <SearchOutlined />,
      filterSearch: true,
      render: (_, record) => {
        return record.languages.map(({ key, label }) => (
          <p key={key} style={{ margin: 0 }}>
            - {label}
          </p>
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
          deleleKeyNull(params);
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
      render: (text, record) => {
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
      filterDropdown: () => {
        const [yobFrom, setYobFrom] = useState();
        const [yobTo, setYobTo] = useState();

        const onSearch = () => {
          resetPage();
          const params = {
            yob_from: yobFrom,
            yob_to: yobTo,
          };
          deleleKeyNull(params);
          setSearchParams(
            createSearchParams({
              ...paramsRouter,
              ...params,
            })
          );
        };

        const onReset = () => {
          resetPage();
          setYobFrom();
          setYobTo();
          delete paramsRouter.yob_from;
          delete paramsRouter.yob_to;
          setSearchParams(createSearchParams(paramsRouter));
        };

        return (
          <CustomSearchYob
            yobFrom={yobFrom}
            onChangeFrom={value => setYobFrom(value)}
            yobTo={yobTo}
            onChangeTo={value => setYobTo(value)}
            onSearch={onSearch}
            onReset={onReset}
          />
        );
      },
      filtered: true,
      filterIcon: <SearchOutlined />,
      filterSearch: false,
    },
    // Activity
    // Recent companies
    {
      title: "Recent companies",
      dataIndex: "current_company_text",
      key: "current_company_text",
      filterResetToDefaultFilteredValue: true,
      filterDropdown: () => {
        const [value, setValue] = useState(
          paramsRouter.current_company_text || ""
        );
        const onChange = e => {
          setValue(e.target.value);
        };
        const onSearch = () => {
          resetPage();
          setSearchParams(
            createSearchParams({
              ...paramsRouter,
              current_company_text: value,
            })
          );
        };
        const onReset = () => {
          resetPage();
          setValue("");
          delete paramsRouter.current_company_text;
          setSearchParams(createSearchParams(paramsRouter));
        };

        useEffect(() => {
          setValue(paramsRouter.current_company_text || null);
        }, [paramsRouter.current_company_text]);

        return (
          <CustomSearch
            value={value}
            onSearch={onSearch}
            onChange={onChange}
            onReset={onReset}
          />
        );
      },
      filtered: true,
      filterIcon: <SearchOutlined style={{ color: "inherit" }} />,
      filterSearch: false,
      render: (_, record) => {
        return record.current_company?.map(({ organization }) => (
          <p key={organization.key}>- {organization.label}</p>
        ));
      },
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
    // flow_status
    current_company: item.current_employments,
    // action
  }));

  const onCloseFilterTag = key => {
    if (key === "location") {
      delete paramsRouter.country;
      delete paramsRouter.city;
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
        languages={languages}
      />
      <Table
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
