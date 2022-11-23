/* eslint-disable no-unused-vars */
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Upload as StyleUpload,
} from "antd";
import { CancelSave, FormSelect } from "components";
import FormSelectDepend from "components/form/form-select-depend";
import {
  fetchDetailClientNotLoading,
  putDetailClientNotLoading,
  putDetailClientTaxCode,
} from "features/clientSlice";
import { fetchFiles, fetchPostFile } from "features/fileSlice";
import {
  fetchCities,
  fetchDistricts,
  fetchLocations,
} from "features/locationSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { imgPath } from "ultis/const";
import { deleteKeyNull, format_address_obj_to_text } from "ultis/func";
import { beforeUploadImage } from "ultis/uploadFile";
import validator from "ultis/validate";

const ClientInfo = ({ data, form }) => {
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);

  const countries = useSelector(state => state.location.countries);
  const cities = useSelector(state => state.location.cities);
  const districts = useSelector(state => state.location.districts);

  const file = useSelector(state => state.file.file);

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

  const onDropdownCountry = open => {
    open &&
      countries.length === 0 &&
      dispatch(
        fetchLocations({
          type: 4,
        })
      );
  };

  const onChangeCountry = (_, option) => {
    form.setFieldsValue({
      address: {
        country: option,
        city: null,
        district: null,
      },
    });
  };

  const onDropdownCity = open => {
    if (open) {
      const country = form.getFieldValue(["address", "country"]);
      dispatch(
        fetchCities({
          parent_id: country.key,
        })
      );
    }
  };

  const onChangeCity = (_, option) => {
    form.setFieldsValue({
      address: {
        city: option,
        district: null,
      },
    });
  };

  const onDropdownDistrict = open => {
    if (open) {
      const city = form.getFieldValue(["address", "city"]);
      dispatch(
        fetchDistricts({
          parent_id: city.key,
        })
      );
    }
  };

  const onChangeDistrict = (_, option) => {
    form.setFieldsValue({
      address: {
        district: option,
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

  return (
    <Card>
      <Row>
        <Col span={14}>
          {isEdit === "name" ? (
            <>
              <Form.Item name="name" className="m-0">
                <Input className="w-full" />
              </Form.Item>
              <CancelSave onCancel={onCancelName} onSave={onSaveName} />
            </>
          ) : (
            <h3 onDoubleClick={() => setIsEdit("name")}>{data.name}</h3>
          )}
          <Row>
            <Col span={6}>
              <span>Address</span>
            </Col>
            <Col span={18}>
              {isEdit === "address" ? (
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <FormSelect
                      name={["address", "country"]}
                      allowClear
                      placeholder="Country"
                      options={countries}
                      optionFilterProp="label"
                      onDropdownVisibleChange={onDropdownCountry}
                      onChange={onChangeCountry}
                    />
                  </Col>
                  <Col span={8}>
                    <FormSelectDepend
                      allowClear
                      placeholder="City"
                      name={["address", "city"]}
                      name_parent={["address", "country"]}
                      optionFilterProp="label"
                      options={cities}
                      onDropdownVisibleChange={onDropdownCity}
                      onChange={onChangeCity}
                    />
                  </Col>
                  <Col span={8}>
                    <FormSelectDepend
                      allowClear
                      placeholder="District"
                      name={["address", "district"]}
                      name_parent={["address", "city"]}
                      optionFilterProp="label"
                      options={districts}
                      onDropdownVisibleChange={onDropdownDistrict}
                      onChange={onChangeDistrict}
                    />
                  </Col>
                  <Col span={24}>
                    <Form.Item name={["address", "address"]} className="m-0">
                      <Input
                        className="w-full"
                        placeholder="ex: 2 Hai Trieu, Bitexco Financial Tower"
                      />
                    </Form.Item>
                  </Col>
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
              <span>Phone number</span>
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
              <span>Fax</span>
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
              <span>Email</span>
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
              <span>Tax Code</span>
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
