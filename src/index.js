import React, { Component } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Switch,
  Icon,
  Col,
  message,
  Modal,
  DatePicker,
  InputNumber
} from "antd";

const FormItem = Form.Item;

const _layout = { span: 24 };
const _rules = [{ required: true, mssage: "此项不能为空" }];

class FormGen extends Component {
  renderComponent = k => {
    const type = k.type && k.type.toLowerCase();
    switch (type) {
      case "input":
        return <Input />;
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
      case "radio": {
        return (
          <Radio.Group>
            {k.datasource.map(v => (
              <Radio.Button key={k.id + v} value={v}>
                {v}
              </Radio.Button>
            ))}
          </Radio.Group>
        );
      }
      case "switch":
        return (
          <Switch
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="cross" />}
          />
        );
      case "datepicker":
        return (
          <DatePicker
            format={"YYYY-MM-DD" + (!!k.showTime === true ? " HH:mm" : "")}
            showTime={k.showTime}
          />
        );
      case "textarea":
        return <Input.TextArea rows={6} />;

      case "inputnumber":
        return <InputNumber min={1} />;
      default:
        return <div>未收录该组件,请自行扩展</div>;
    }
  };

  render() {
    const { data } = this.props;
    const { getFieldDecorator } = this.props;
    const formItems = data.map(k => {
      const layout = k.layout || _layout;
      const formItemLayout = _layoutTransform(layout);
      let fieldObj = {
        rules: [{ required: k.isrequired, message: "不能为空" }]
      };
      return (
        <Col key={k.id} {...k.layout}>
          <FormItem label={k.title} {...formItemLayout}>
            {getFieldDecorator(k.id, fieldObj)(this.renderComponent(k))}
            {k.type === "inputnumber" && <span> {k.unit}</span>}
          </FormItem>
        </Col>
      );
    });
    return <>{formItems}</>;
  }
}

export default FormGen;

/**
 * layout transform fn
 *
 * @param	 obj	a basic Col layout obj
 * @return	obj	a transformed formItem layout obj
 *
 */

const _layoutTransform = layout => {
  const layouts = Object.keys(layout);

  let formItemLayout = { labelCol: {}, wrapperCol: {} },
    labelTemp = 0,
    wrapperTemp = 0;

  if (layouts.length > 0) {
    layouts.forEach(i => {
      if (typeof layout[i] === "number") {
        labelTemp = 96 / layout[i];
      } else {
        labelTemp = 96 / (layout[i].span || 24);
      }
      wrapperTemp = 24 - labelTemp;
      formItemLayout.labelCol[i] = labelTemp;
      formItemLayout.wrapperCol[i] = wrapperTemp;
    });
  } else {
    formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 20 } };
  }

  return formItemLayout;
};
