import React from "react";
import PHForm from "../../../components/form/PHForm";
import { FieldValue, SubmitHandler } from "react-hook-form";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Row } from "antd";

export default function CreateStudent() {
  const onSubmit: SubmitHandler<FieldValue> = (data) => {
    console.log(data);

    // const formData = new FormData();
    // formData.append("file", "ss");

    // console.log(Object.fromEntries(formData));
    // console.log([...formData.entries()]);
  };

  // module continue after 32-2

  return (
    <Row>
      <Col span={24}>
        <PHForm onSubmit={onSubmit}>
          <Divider>Personal Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.firstName" label="First Name" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.middleName" label="Middle Name" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="name.lastName" label="Last Name" />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
}
