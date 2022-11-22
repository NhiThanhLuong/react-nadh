import { useEffect, useState, useMemo } from "react";
import {
  Link,
  useNavigate,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Row, Table, Typography, Button, Tag } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";

import {
  FilterTags,
  ClearAllFilter,
  FilterDropdownText,
  FilterDropdownSelect,
  FilterDropdownRange,
  FilterDropdown2Select,
  FilterDropdown3Select,
} from "components";
import { fetchCandidates } from "features/candidatesSlice";
import { fetchLanguages } from "features/languageSlice";
import { fetchUserPage } from "features/userPageSlice";
import { fetchCities, fetchLocations } from "features/locationSlice";
import {
  fetchCategory,
  fetchIndustries,
  fetchSectors,
} from "features/categorySlice";
import {
  formatDate,
  formatCity,
  formatFilterTagRange,
  getLabelIndustry,
  formatIndustry,
} from "ultis/func";
import {
  candidate_priority_status,
  candidate_flow_status,
  defaultColor,
  key_of_keys,
} from "ultis/const";

const Candidates = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const count = useSelector(state => state.candidates.count);
  const data = useSelector(state => state.candidates.data);
  const loading = useSelector(state => state.candidates.loading);

  const industries = useSelector(state => state.category.industries);
  const sectors = useSelector(state => state.category.sectors);
  const categories = useSelector(state => state.category.categories);

  const countries = useSelector(state => state.location.countries);
  const cities = useSelector(state => state.location.cities);

  const languages = useSelector(state => state.language.languages);

  const [searchParams, setSearchParams] = useSearchParams();
  const paramsRouter = Object.fromEntries([...searchParams]);
  const [currentPage, setCurrentPage] = useState(+paramsRouter.page || 1);

  useEffect(() => {
    if (filterTags.country) {
      dispatch(
        fetchCities({
          parent_id: filterTags.country,
        })
      );
    }
    if (filterTags.industry)
      dispatch(
        fetchSectors({
          parent_id: filterTags.industry,
          type: 2,
        })
      );
    if (filterTags.sector)
      dispatch(
        fetchCategory({
          parent_id: filterTags.sector,
          type: 3,
        })
      );
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
    const newParamsRouter = { ...paramsRouter };
    delete newParamsRouter.industry;
    delete newParamsRouter.sector;
    delete newParamsRouter.category;
    dispatch(fetchCandidates(newParamsRouter));
    setCurrentPage(+paramsRouter.page || 1);
  }, [searchParams]);

  const resetPage = () => {
    delete paramsRouter.page;
    setCurrentPage(1);
  };

  // Filter Industry
  useEffect(() => {
    filterTags.industry_text = formatIndustry(
      filterTags,
      industries,
      sectors,
      categories
    );
  }, [searchParams, countries]);

  const filterTags = useMemo(() => ({ ...paramsRouter }), [searchParams]);

  // Filter Priority status
  filterTags.priority_status = useMemo(() => {
    const itemMatch = candidate_priority_status.find(
      item => item.key === paramsRouter.priority_status
    );
    return itemMatch ? itemMatch.label : paramsRouter.priority_status;
  }, [paramsRouter.priority_status]);

  // Filter Activity
  filterTags.flow_status = useMemo(() => {
    if (paramsRouter.flow_status)
      return paramsRouter.flow_status
        .split(",")
        .map(val => candidate_flow_status.find(item => item.id === +val)?.label)
        .join(", ");
  }, [paramsRouter.flow_status]);

  // Filter Languages
  filterTags.language = useMemo(() => {
    if (paramsRouter.language)
      return paramsRouter.language
        ?.split(",")
        .map(val => languages.find(item => item.key === +val)?.label)
        .join(", ");
  }, [paramsRouter.language, languages]);

  // Filter Location
  filterTags.location = useMemo(() => {
    const filterCountry =
      filterTags.country &&
      countries.find(({ key }) => key === +filterTags.country)?.label;

    const filterCity =
      filterTags.city &&
      cities.find(({ key }) => key === +filterTags.city)?.label;

    return formatCity(filterCountry, filterCity);
  }, [paramsRouter.country, paramsRouter.city]);

  // Filter YOB
  useMemo(
    () => formatFilterTagRange("yob", filterTags, "yob_from", "yob_to"),
    [paramsRouter.yob_from, paramsRouter.yob_to]
  );

  // Filter Year of service
  useMemo(
    () =>
      formatFilterTagRange(
        "industry_years",
        filterTags,
        "industry_years_from",
        "industry_years_to"
      ),
    [paramsRouter.industry_years_from, paramsRouter.industry_years_to]
  );

  // Filter Year of management
  useMemo(
    () =>
      formatFilterTagRange(
        "management_years",
        filterTags,
        "management_years_from",
        "management_years_to"
      ),
    [paramsRouter.management_years_from, paramsRouter.management_years_to]
  );

  const columns = useMemo(
    () => [
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
        filtered: !!paramsRouter.candidate_id,
        filterIcon: <SearchOutlined style={{ color: "inherit" }} />,
        render: text => (
          <Link to={`/candidate/${text}`} style={defaultColor}>
            {text}
          </Link>
        ),
        width: 150,
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
        filterIcon: <SearchOutlined />,
        filtered: !!paramsRouter.full_name,
        render: (text, record) => (
          <Link
            to={`/candidate/${record.candidate_id}`}
            style={{
              textTransform: "capitalize",
              ...defaultColor,
            }}
          >
            {text}
          </Link>
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
        filterIcon: <SearchOutlined />,
        filtered: !!paramsRouter.priority_status,
        render: text => {
          const status = candidate_priority_status.find(
            ({ id }) => id === text
          );
          return <Tag color={status.color}>{status.label}</Tag>;
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
        filterIcon: <SearchOutlined />,
        filtered: !!paramsRouter.language,
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
        filterIcon: <SearchOutlined />,
        filtered: !!paramsRouter.yob_from || !!paramsRouter.yob_to,
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
        filterIcon: <SearchOutlined />,
        filtered: !!paramsRouter.flow_status,
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
        filterIcon: <SearchOutlined style={{ color: "inherit" }} />,
        filtered: !!paramsRouter.current_company_text,
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
        filterIcon: <SearchOutlined style={{ color: "inherit" }} />,
        filtered: !!paramsRouter.current_position_text,

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
        filterDropdown: (
          <FilterDropdownRange
            paramsRouter={paramsRouter}
            setSearchParams={setSearchParams}
            keySearchFrom="industry_years_from"
            keySearchTo="industry_years_to"
            resetPage={resetPage}
          />
        ),
        filterIcon: <SearchOutlined />,
        filtered:
          !!paramsRouter.industry_years_from ||
          !!paramsRouter.industry_years_to,
      },
      // Year of management
      {
        title: "Year of management",
        dataIndex: "management_years",
        key: "management_years",
        filterDropdown: (
          <FilterDropdownRange
            paramsRouter={paramsRouter}
            setSearchParams={setSearchParams}
            keySearchFrom="management_years_from"
            keySearchTo="management_years_to"
            resetPage={resetPage}
          />
        ),
        filterIcon: <SearchOutlined />,
        filtered:
          !!paramsRouter.management_years_from ||
          !!paramsRouter.management_years_to,
      },
    ],
    [
      searchParams,
      countries,
      cities,
      industries,
      sectors,
      categories,
      languages,
      paramsRouter?.candidate_id,
    ]
  );

  const dataSource = useMemo(
    () =>
      data.map(item => ({
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
        industry: item.business_line,
        yob: formatDate(item.dob).year,
        flow_status: item.flow_status,
        current_company: item.current_employments,
        industry_years: item.industry_years,
        management_years: item.management_years,
        // action
      })),
    [data]
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
          Candidate Lists ({count})
        </Typography.Title>
        <div>
          <ClearAllFilter onClick={onClearAllFilter} />
          <Button
            onClick={() => navigate("/candidate-add", { replace: true })}
            icon={<PlusOutlined />}
            style={{ marginLeft: 8 }}
            type="primary"
          >
            Create Candidate
          </Button>
        </div>
      </Row>
      <FilterTags
        data={{
          candidate_id: filterTags.candidate_id,
          full_name: filterTags.full_name,
          priority_status: filterTags.priority_status,
          language: filterTags.language,
          highest_education: filterTags.highest_education,
          location: filterTags.location,
          industry_text: filterTags.industry_text,
          yob: filterTags.yob,
          flow_status: filterTags.flow_status,
          current_company_text: filterTags.current_company_text,
          current_position_text: filterTags.current_position_text,
          industry_years: filterTags.industry_years,
          management_years: filterTags.management_years,
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

export default Candidates;
