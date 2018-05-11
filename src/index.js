import React, { Component } from 'react';

require('antd/dist/antd.css'); 

const _antd = require('antd');

const _interopRequireWildcard = obj => {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }
    newObj.default = obj;
    return newObj;
  }
};
const Antd = _interopRequireWildcard(_antd);

const FormItem = Antd.Form.Item;

const _layout = { span: 24 };
const _rules = [{ required: true, message: '此项不能为空' }];

export default class FormGen extends Component {
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
        rules,
      };

      const RenderComponent = _recursionRender(k);
      return <Antd.Col key={k.id} {...k.layout}>
          <FormItem label={k.title} {...formItemLayout}>
            {getFieldDecorator(k.id, fieldOption)(RenderComponent)}
            {k.suffix && <span> {k.suffix}</span>}
          </FormItem>
        </Antd.Col>;
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
      if (typeof layout[i] === 'number') {
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

/**
 * layout transform fn
 *
 * @param	( obj || string || number || string )	a obj you wanna render
 * @return	( react_element )	a createElement can render obj
 *
 */

export const _recursionRender = (ds, key) => {
  if (Array.isArray(ds)) {
    return ds.map((v, i) => _recursionRender(v, i));
  } else if (typeof ds === "number" || typeof ds === "string" || ds === null) {
    return ds;
  } else if (typeof ds === "object") {
    const typeArr = ds.type.split(".");
    const AntdComp =
      typeArr.length > 1 ? Antd[typeArr[0]][typeArr[1]] : Antd[ds.type];
    const props = ds.props || null;

    const children =
      typeof ds.children !== "undefined" && ds.children !== null
        ? _recursionRender(ds.children)
        : null;

    const propsWithKey =
      typeof key !== "undefined" && key !== null
        ? { key: `${ds.type} - ${key}`, ...props }
        : props;

    return React.createElement(AntdComp, propsWithKey, children);
  }
};