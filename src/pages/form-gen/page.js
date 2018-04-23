import React, { Component } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Switch,
  Icon,
  Row,
  Col
} from "antd";
import data from "./data.json";

const FormItem = Form.Item;

class FormCore extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  renderComponent = k => {
    const type = k.type && k.type.toLowerCase();
    switch (type) {
      case "input":
        return <Input />;
      case "radio":
        return <Radio />;
      case "select": {
        return (
          <Select>
            {k.datasource.map(v => (
              <Select.Option key={k.id + v} value={v}>
                {v}
              </Select.Option>
            ))}
          </Select>
        );
      }
      case "switch":
        return (
          <Switch
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="cross" />}
          />
        );
      default:
        return null;
    }
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 }
      }
    };
    getFieldDecorator("keys", { initialValue: data });
    const keys = getFieldValue("keys");
    const formItems = keys.map(k => {
      const layout = k.layout || {};
      const lableLayout = 96 / (layout.sm || 24);
      const warpLayout = 24 - lableLayout;
      const formItemLayout = { labelCol: { sm: lableLayout }, wrapperCol: { sm: warpLayout } };
      return <Col key={k.id} {...k.layout} >
          <FormItem label={k.title} {...formItemLayout}>
            {getFieldDecorator(k.id, {
              validateTrigger: ["onChange", "onBlur"],
              rules: [
                {
                  required: k.isrequired,
                  message: "不能为空"
                }
              ]
            })(this.renderComponent(k))}
          </FormItem>
        </Col>;
    });
    return <Form onSubmit={this.handleSubmit}>
        <Row gutter={16} >
          {formItems}
        </Row>
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      </Form>;
  }
}

const page = Form.create()(FormCore);

export default page;
