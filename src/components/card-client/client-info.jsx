/* eslint-disable no-unused-vars */
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
import { CancelSave, FormAddress, FormSelect } from "components";
import {
  putDetailClientNotLoading,
  putDetailClientTaxCode,
} from "features/clientSlice";
import { fetchPostFile } from "features/fileSlice";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { imgPath, STATUS_CLIENT } from "ultis/const";
import {
  deleteKeyNull,
  format_address_obj_to_text,
  get_obj_key_label_from_key,
} from "ultis/func";
import { beforeUploadImage } from "ultis/uploadFile";
import validator from "ultis/validate";

const ClientInfo = ({ data, form }) => {
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);

  const file = useSelector(state => state.file.file);

  const clients = useSelector(state => state.client.data);

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

  const onSaveAddress = async () => {
    const address = deleteKeyNull(form.getFieldValue("address"));
    await dispatch(
      putDetailClientNotLoading({
        id: data.id,
        params: {
          address,
        },
      })
    );
    setIsEdit(false);
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
                  <FormAddress form={form} />
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
            <Col span={8}>
              <Typography.Paragraph strong>Client ID</Typography.Paragraph>
            </Col>
            <Col span={16}>
              <Typography.Text disabled style={{ color: "rgba(0,0,0,0.65)" }}>
                {data.client_id}
              </Typography.Text>
            </Col>
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
              <Row gutter={[16, 16]}>
                <FormAddress form={form} name={["factory_site", 0]} />
                <Col span={24}>
                  <CancelSave
                  // onCancel={onCancelFactory1}
                  // onSave={onSaveFactory1}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Typography.Paragraph strong>Factory Site 2</Typography.Paragraph>
            </Col>
            <Col span={16}>
              <Row gutter={[16, 16]}>
                <FormAddress form={form} name={["factory_site", 1]} />
                <Col span={24}>
                  <CancelSave
                  // onCancel={onCancelFactory2}
                  // onSave={onSaveFactory2}
                  />
                </Col>
              </Row>
            </Col>
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
