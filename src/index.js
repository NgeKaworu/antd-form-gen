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
  DatePicker,
  InputNumber
} from "antd";

const FormItem = Form.Item;

const _layout = { span: 24 };
const _rules = [{ required: true, message: "此项不能为空" }];

export default class FormGen extends Component {
  renderComponent = k => {
    const type = k.type && k.type.toLowerCase();
    switch (type) {
      case "input":
        return <Input />;
      case "select": {
        return (
          <Select>
            {k.dataSource.map(v => (
              <Select.Option key={k.id + " - " + v} value={v}>
                {v}
              </Select.Option>
            ))}
          </Select>
        );
      }
      case "radio": {
        return (
          <Radio.Group>
            {k.dataSource.map(v => (
              <Radio.Button key={k.id + " - " + v} value={v}>
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
        return <DatePicker />;
      case "textarea":
        return <Input.TextArea />;
      case "inputnumber":
        return <InputNumber />;
      default:
        return <div>未收录该组件,请自行扩展</div>;
    }
  };

  render() {
    const { data, getFieldDecorator } = this.props;
    const formItems = data.map(k => {
      const layout = k.layout || _layout;
      const rules = k.rules || _rules;
      const initialValue = k.initialValue || null;
      const props = k.props || null;
      const options = k.options || null;
      const formItemLayout = _layoutTransform(layout);
      const fieldOption = {
        ...options,
        initialValue,
        rules
      };

      const RenderComponent = this.renderComponent(k);
      return (
        <Col key={k.id} {...k.layout}>
          <FormItem label={k.title} {...formItemLayout}>
            {getFieldDecorator(k.id, fieldOption)(
              !props
                ? RenderComponent
                : React.cloneElement(
                    RenderComponent,
                    props,
                    RenderComponent.props.children
                  )
            )}
            {k.suffix && <span> {k.suffix}</span>}
          </FormItem>
        </Col>
      );
    });
    return <React.Fragment>{formItems}</React.Fragment>;
  }
}

/**
 * layout transform fn
 *
 * @param	 obj	a basic Col layout obj
 * @return	obj	a transformed formItem layout obj
 *
 */

export const _layoutTransform = layout => {
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
