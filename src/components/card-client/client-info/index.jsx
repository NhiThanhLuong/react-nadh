import {
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Tag,
  Typography,
  Upload as StyleUpload,
} from "antd";
import {
  CancelSave,
  FormAddress,
  FormSelect,
  InfoItemDisabled,
  InfoItemSelect,
} from "components";
import {
  putDetailClientNotLoading,
  putDetailClientTaxCode,
} from "features/clientSlice";
import { fetchPostFile } from "features/fileSlice";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { CPA, imgPath, STATUS_CLIENT, TYPE_CLIENT } from "ultis/const";
import {
  deleteKeyNull,
  format_address_obj_to_text,
  getPropertyKeyLabelObj,
  get_obj_key_label_from_key,
} from "ultis/func";
import { beforeUploadImage } from "ultis/uploadFile";
import validator from "ultis/validate";

const ClientInfo = ({ data, form }) => {
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);

  const file = useSelector(state => state.file.file);

  const clients = useSelector(state => state.client.data);

  const users = useSelector(state => state.user.users);

  const usersKeylabel = users.map(({ id, full_name }) => ({
    key: id,
    label: full_name,
  }));

  useEffect(() => {
    if (file.id) {
      dispatch(
        putDetailClientNotLoading({
          id: data.id,
          params: {
            mediafiles: {
              logo: file.id,
            },
          },
        })
      );
    }
  }, [file.id]);

  const onCancelName = () => {
    setIsEdit(false);
    form.resetFields(["name"]);
  };

  const onSaveName = async () => {
    const name = form.getFieldValue("name");
    await dispatch(
      putDetailClientNotLoading({
        id: data.id,
        params: {
          name,
        },
      })
    );
    setIsEdit(false);
  };

  const onCancelAddress = () => {
    setIsEdit(false);
    form.resetFields(["address"]);
  };

  const onSaveAddress = () => {
    const address = deleteKeyNull(form.getFieldValue("address"));
    dispatch(
      putDetailClientNotLoading({
        id: data.id,
        params: {
          address,
        },
      })
    );
    setIsEdit(false);
  };

  const onChangeCountry = (_, option) => {
    form.setFieldsValue({
      address: {
        country: _ ? getPropertyKeyLabelObj(option) : null,
        city: null,
        district: null,
      },
    });
  };

  const onChangeCity = (_, option) => {
    form.setFieldsValue({
      address: {
        city: _ ? getPropertyKeyLabelObj(option) : null,
        district: null,
      },
    });
  };

  const onChangeDistrict = (_, option) => {
    form.setFieldsValue({
      address: {
        district: _ ? getPropertyKeyLabelObj(option) : null,
      },
    });
  };

  const onCancelPhone = () => {
    setIsEdit(false);
    form.resetFields(["phone_number"]);
  };

  const onSavePhone = async () => {
    const phone_number = form.getFieldValue("phone_number");
    await dispatch(
      putDetailClientNotLoading({
        id: data.id,
        params: {
          phone: {
            number: phone_number,
            phone_code: { key: "1280" },
          },
        },
      })
    );
    setIsEdit(false);
  };

  const onCancelFax = () => {
    setIsEdit(false);
    form.resetFields(["fax"]);
  };

  const onSaveFax = async () => {
    const fax = form.getFieldValue("fax");
    await dispatch(
      putDetailClientNotLoading({
        id: data.id,
        params: {
          fax: {
            number: fax,
            phone_code: { key: "1280" },
          },
        },
      })
    );
    setIsEdit(false);
  };

  const onCancelEmail = () => {
    setIsEdit(false);
    form.resetFields(["email"]);
  };

  const onSaveEmail = async () => {
    const email = form.getFieldValue("email");
    await dispatch(
      putDetailClientNotLoading({
        id: data.id,
        params: {
          email,
        },
      })
    );
    setIsEdit(false);
  };

  const onCancelTax = () => {
    setIsEdit(false);
    form.resetFields(["tax_code"]);
  };

  const onSaveTax = async () => {
    const tax_code = form.getFieldValue("tax_code");
    await dispatch(
      putDetailClientTaxCode({
        id: data.id,
        tax_code,
      })
    );
    setIsEdit(false);
  };

  const customRequest = async () => {};

  const handleChangeUpload = async info => {
    const { status } = info.file;
    if (status === "uploading") {
      let formData = new FormData();
      formData.append("file", info.file.originFileObj);
      formData.append("type", "avatar");
      formData.append("uploadedByUserId", 12);
      await dispatch(fetchPostFile(formData));
    }
  };

  const StatusTag = () => {
    const onCancelStatus = () => {
      setIsEdit(false);
      form.resetFields(["status"]);
    };

    const onSaveStatus = () => {
      const status = form.getFieldValue("status");
      dispatch(
        putDetailClientNotLoading({
          id: data.id,
          params: {
            status,
          },
        })
      );
      setIsEdit(false);
    };

    if (isEdit === "status") {
      return (
        <>
          <FormSelect
            name="status"
            optionFilterProp="label"
            options={STATUS_CLIENT}
          />
          <CancelSave onCancel={onCancelStatus} onSave={onSaveStatus} />
        </>
      );
    }

    if (data.status) {
      const status_obj = get_obj_key_label_from_key(STATUS_CLIENT, data.status);
      return (
        <Tag color={status_obj.color} onDoubleClick={() => setIsEdit("status")}>
          {status_obj.label}
        </Tag>
      );
    }
    return null;
  };

  const CodeValue = () => {
    const onCancel = () => {
      setIsEdit(false);
      form.resetFields(["code"]);
    };

    const onSave = () => {
      const code = form.getFieldValue("code");
      dispatch(
        putDetailClientNotLoading({
          id: data.id,
          params: {
            code,
          },
        })
      );
      setIsEdit(false);
    };

    return isEdit === "code" ? (
      <>
        <Form.Item name="code">
          <Input className="w-full" />
        </Form.Item>
        <CancelSave onCancel={onCancel} onSave={onSave} />
      </>
    ) : (
      <span onDoubleClick={() => setIsEdit("code")}>{data.code || "-"}</span>
    );
  };

  const ParentCompanyValue = () => {
    const onCancel = () => {
      setIsEdit(false);
      form.resetFields(["parent_id"]);
    };

    const onSave = () => {
      const parent_id = form.getFieldValue("parent_id") || null;
      dispatch(
        putDetailClientNotLoading({
          id: data.id,
          params: {
            parent_id,
          },
        })
      );
      setIsEdit(false);
    };

    return isEdit === "parent_id" ? (
      <>
        <Form.Item name="parent_id" optionFilterProp="label">
          <Select
            allowClear
            showSearch
            style={{
              width: "100%",
            }}
          >
            {clients.map(({ id, name }) => (
              <Select.Option key={id} value={id} label={name}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <CancelSave onCancel={onCancel} onSave={onSave} />
      </>
    ) : (
      <span onDoubleClick={() => setIsEdit("parent_id")}>
        {data.parent_id
          ? clients.find(({ id }) => id === data.parent_id)?.name
          : "-"}
      </span>
    );
  };

  const onCancelFactory = () => {
    setIsEdit(false);
    form.resetFields(["factory_site"]);
  };

  const onSaveFactory = () => {
    const factory_site = form
      .getFieldValue("factory_site")
      .map(item => deleteKeyNull(item))
      .filter(item => Object.keys(item).length !== 0);
    dispatch(
      putDetailClientNotLoading({
        id: data.id,
        params: {
          factory_site,
        },
      })
    );
    setIsEdit(false);
  };

  const onChangeCountryFactory = (_, option, index) => {
    form.setFieldValue(
      ["factory_site", index, "country"],
      _ ? getPropertyKeyLabelObj(option) : null
    );
    form.setFieldValue(["factory_site", index, "city"], null);
    form.setFieldValue(["factory_site", index, "district"], null);
  };

  const onChangeCityFactory = (_, option, index) => {
    form.setFieldValue(
      ["factory_site", index, "city"],
      _ ? getPropertyKeyLabelObj(option) : null
    );
    form.setFieldValue(["factory_site", index, "district"], null);
  };

  const onChangeDistrictFactory = (_, option, index) => {
    form.setFieldValue(
      ["factory_site", index, "district"],
      _ ? getPropertyKeyLabelObj(option) : null
    );
  };

  const onSaveType = setState => {
    const type = form.getFieldValue("type") || null;
    dispatch(
      putDetailClientNotLoading({
        id: data.id,
        params: {
          type,
        },
      })
    );
    setState(false);
  };

  const onSaveCpa = setState => {
    const cpa = form.getFieldValue("cpa") || null;
    dispatch(
      putDetailClientNotLoading({
        id: data.id,
        params: {
          cpa,
        },
      })
    );
    setState(false);
  };

  const onSaveLeadConsultant = setState => {
    const lead_consultants = form.getFieldValue("lead_consultants");
    dispatch(
      putDetailClientNotLoading({
        id: data.id,
        params: {
          lead_consultants: [lead_consultants],
        },
      })
    );
    setState(false);
  };

  return (
    <Card>
      <Row gutter={16}>
        <Col span={14}>
          {isEdit === "name" ? (
            <>
              <Form.Item name="name" className="m-0">
                <Input className="w-full" />
              </Form.Item>
              <CancelSave onCancel={onCancelName} onSave={onSaveName} />
            </>
          ) : (
            <Typography.Title level={3} onDoubleClick={() => setIsEdit("name")}>
              {data.name}
            </Typography.Title>
          )}
          <Row>
            <Col span={6}>
              <Typography.Paragraph strong>Address</Typography.Paragraph>
            </Col>
            <Col span={18}>
              {isEdit === "address" ? (
                <Row gutter={[16, 16]}>
                  <FormAddress
                    form={form}
                    onChangeCountry={onChangeCountry}
                    onChangeCity={onChangeCity}
                    onChangeDistrict={onChangeDistrict}
                  />
                  <Col span={24}>
                    <CancelSave
                      onCancel={onCancelAddress}
                      onSave={onSaveAddress}
                    />
                  </Col>
                </Row>
              ) : (
                <span onDoubleClick={() => setIsEdit("address")}>
                  {format_address_obj_to_text(data.address) || "-"}
                </span>
              )}
            </Col>
            <Col span={6}>
              <Typography.Paragraph strong>Phone number</Typography.Paragraph>
            </Col>
            <Col span={18}>
              {isEdit === "phone number" ? (
                <>
                  <Form.Item name="phone_number" rules={validator("number")}>
                    <Input
                      className="w-full"
                      placeholder="Please enter phone number"
                    />
                  </Form.Item>
                  <CancelSave onCancel={onCancelPhone} onSave={onSavePhone} />
                </>
              ) : (
                <span onDoubleClick={() => setIsEdit("phone number")}>
                  {data.phone.number}
                </span>
              )}
            </Col>
            <Col span={6}>
              <Typography.Paragraph strong>Fax</Typography.Paragraph>
            </Col>
            <Col span={18}>
              {isEdit === "fax" ? (
                <>
                  <Form.Item name="fax" rules={validator("number")}>
                    <Input className="w-full" placeholder="Please enter fax" />
                  </Form.Item>
                  <CancelSave onCancel={onCancelFax} onSave={onSaveFax} />
                </>
              ) : (
                <span onDoubleClick={() => setIsEdit("fax")}>
                  {data.fax?.number || "-"}
                </span>
              )}
            </Col>
            <Col span={6}>
              <Typography.Paragraph strong>Email</Typography.Paragraph>
            </Col>
            <Col span={18}>
              {isEdit === "email" ? (
                <>
                  <Form.Item name="email" rules={validator("email")}>
                    <Input className="w-full" />
                  </Form.Item>
                  <CancelSave onCancel={onCancelEmail} onSave={onSaveEmail} />
                </>
              ) : (
                <span onDoubleClick={() => setIsEdit("email")}>
                  {data.email}
                </span>
              )}
            </Col>
            <Col span={6}>
              <Typography.Paragraph strong>Tax Code</Typography.Paragraph>
            </Col>
            <Col span={18}>
              {isEdit === "tax_code" ? (
                <>
                  <Form.Item name="tax_code">
                    <Input className="w-full" />
                  </Form.Item>
                  <CancelSave onCancel={onCancelTax} onSave={onSaveTax} />
                </>
              ) : (
                <span onDoubleClick={() => setIsEdit("tax_code")}>
                  {data.tax_code}
                </span>
              )}
            </Col>
          </Row>
        </Col>
        <Col span={10}>
          <Upload
            // accept="image/png, image/jpeg"
            showUploadList={false}
            name="file"
            onChange={handleChangeUpload}
            beforeUpload={beforeUploadImage}
            customRequest={customRequest}
            listType="picture-card"
          >
            {data.mediafiles.logo ? (
              <img
                alt=""
                src={imgPath(data.mediafiles?.logo)}
                style={{
                  display: "block",
                  width: "98%",
                  height: "100%",
                }}
              />
            ) : (
              "Upload"
            )}
          </Upload>
        </Col>
        <Col span={24}>
          <Typography.Title level={5}>Client Information</Typography.Title>
        </Col>
        <Col span={12}>
          <Row gutter={8}>
            <InfoItemDisabled title="Client ID">
              {data.client_id}
            </InfoItemDisabled>
            <Col span={8}>
              <Typography.Paragraph strong>Status</Typography.Paragraph>
            </Col>
            <Col span={16}>
              <StatusTag />
            </Col>
            <Col span={8}>
              <Typography.Paragraph strong>
                {"Client's shortened name"}
              </Typography.Paragraph>
            </Col>
            <Col span={16}>
              <CodeValue />
            </Col>
            <Col span={8}>
              <Typography.Paragraph strong>Parent Company</Typography.Paragraph>
            </Col>
            <Col span={16}>
              <ParentCompanyValue />
            </Col>
            <Col span={8}>
              <Typography.Paragraph strong>Factory Site 1</Typography.Paragraph>
            </Col>
            <Col span={16}>
              {isEdit === "factory_site0" ? (
                <Row gutter={[16, 16]}>
                  <FormAddress
                    form={form}
                    name={["factory_site", 0]}
                    onChangeCountry={(_, __) =>
                      onChangeCountryFactory(_, __, 0)
                    }
                    onChangeCity={(_, __) => onChangeCityFactory(_, __, 0)}
                    onChangeDistrict={(_, __) =>
                      onChangeDistrictFactory(_, __, 0)
                    }
                  />
                  <Col span={24}>
                    <CancelSave
                      onCancel={onCancelFactory}
                      onSave={onSaveFactory}
                    />
                  </Col>
                </Row>
              ) : (
                <span onDoubleClick={() => setIsEdit("factory_site0")}>
                  {data.factory_site[0]
                    ? format_address_obj_to_text(data.factory_site[0])
                    : "-"}
                </span>
              )}
            </Col>
            <Col span={8}>
              <Typography.Paragraph strong>Factory Site 2</Typography.Paragraph>
            </Col>
            <Col span={16}>
              {isEdit === "factory_site1" ? (
                <Row gutter={[16, 16]}>
                  <FormAddress
                    form={form}
                    name={["factory_site", 1]}
                    onChangeCountry={(_, __) =>
                      onChangeCountryFactory(_, __, 1)
                    }
                    onChangeCity={(_, __) => onChangeCityFactory(_, __, 1)}
                    onChangeDistrict={(_, __) =>
                      onChangeDistrictFactory(_, __, 1)
                    }
                  />
                  <Col span={24}>
                    <CancelSave
                      onCancel={onCancelFactory}
                      onSave={onSaveFactory}
                    />
                  </Col>
                </Row>
              ) : (
                <span onDoubleClick={() => setIsEdit("factory_site1")}>
                  {data.factory_site[1]
                    ? format_address_obj_to_text(data.factory_site[1])
                    : "-"}
                </span>
              )}
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row gutter={8}>
            <InfoItemSelect
              title="Client Type"
              name="type"
              optionFilterProp="label"
              options={TYPE_CLIENT}
              onCancel={setState => {
                setState(false);
                form.resetFields(["type"]);
              }}
              onSave={onSaveType}
            >
              {data.type
                ? get_obj_key_label_from_key(TYPE_CLIENT, data.type).label
                : "-"}
            </InfoItemSelect>
            <InfoItemSelect
              title="CPA"
              name="cpa"
              optionFilterProp="label"
              options={CPA}
              onCancel={setState => {
                setState(false);
                form.resetFields(["cpa"]);
              }}
              onSave={onSaveCpa}
            >
              {data.cpa ? get_obj_key_label_from_key(CPA, data.cpa).label : "-"}
            </InfoItemSelect>
            <InfoItemSelect
              title="Lead Consultant"
              name="lead_consultants"
              optionFilterProp="label"
              options={usersKeylabel}
              onCancel={setState => {
                setState(false);
                form.resetFields(["lead_consultants"]);
              }}
              onSave={onSaveLeadConsultant}
              className="capitalize"
              classNameOption="capitalize"
            >
              <span className="capitalize">
                {data.lead_consultants[0]?.full_name || "-"}
              </span>
            </InfoItemSelect>
            <InfoItemDisabled title="Search Consultant">
              <span className="capitalize">
                {data.relate_consultants.reduce(
                  (str, { full_name }) =>
                    str ? `${str}, ${full_name}` : full_name,
                  ""
                )}
              </span>
            </InfoItemDisabled>
            <InfoItemDisabled title="Updated By">
              <span className="capitalize">
                {data.meta?.lastUpdated?.user?.full_name || "-"}
              </span>
            </InfoItemDisabled>
            <InfoItemDisabled title="Updated On">
              {data.updatedAt ? new Date(data.updatedAt).toLocaleString() : "-"}
            </InfoItemDisabled>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

const Upload = styled(StyleUpload)`
  .ant-upload {
    min-width: 300px;
    max-width: 100%;
    height: 200px;
  }
`;

export default ClientInfo;
