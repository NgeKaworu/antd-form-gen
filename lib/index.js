"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._recursionRender = exports._layoutTransform = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("antd/dist/antd.css");

var _antd = require("antd");

var _interopRequireWildcard = function _interopRequireWildcard(obj) {
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
var Antd = _interopRequireWildcard(_antd);

var FormItem = Antd.Form.Item;

var _layout = { span: 24 };
var _rules = [{ required: true, message: "此项不能为空" }];

var FormGen = function (_Component) {
  _inherits(FormGen, _Component);

  function FormGen() {
    _classCallCheck(this, FormGen);

    return _possibleConstructorReturn(this, (FormGen.__proto__ || Object.getPrototypeOf(FormGen)).apply(this, arguments));
  }

  _createClass(FormGen, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          data = _props.data,
          getFieldDecorator = _props.getFieldDecorator;

      var formItems = data.map(function (k) {
        var layout = k.layout || _layout;
        var rules = k.rules || _rules;
        var initialValue = k.initialValue || null;
        var props = k.props || null;
        var options = k.options || null;
        var formItemLayout = _layoutTransform(layout);
        var fieldOption = _extends({}, options, {
          initialValue: initialValue,
          rules: rules
        });

        var RenderComponent = _recursionRender(k);
        return _react2.default.createElement(
          Antd.Col,
          _extends({ key: k.id }, k.layout),
          _react2.default.createElement(
            FormItem,
            _extends({ label: k.title }, formItemLayout),
            getFieldDecorator(k.id, fieldOption)(RenderComponent),
            k.suffix && _react2.default.createElement(
              "span",
              null,
              " ",
              k.suffix
            )
          )
        );
      });
      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        formItems
      );
    }
  }]);

  return FormGen;
}(_react.Component);

/**
 * layout transform fn
 *
 * @param	 obj	a basic Col layout obj
 * @return	obj	a transformed formItem layout obj
 *
 */

exports.default = FormGen;
var _layoutTransform = exports._layoutTransform = function _layoutTransform(layout) {
  var layouts = Object.keys(layout);

  var formItemLayout = { labelCol: {}, wrapperCol: {} },
      labelTemp = 0,
      wrapperTemp = 0;

  if (layouts.length > 0) {
    layouts.forEach(function (i) {
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

/**
 * layout transform fn
 *
 * @param	( obj || string || number || string )	a obj you wanna render
 * @return	( react_element )	a createElement can render obj
 *
 */

var _recursionRender = exports._recursionRender = function _recursionRender(ds, key) {
  if (Array.isArray(ds)) {
    return ds.map(function (v, i) {
      return _recursionRender(v, i);
    });
  } else if (typeof ds === "number" || typeof ds === "string" || ds === null) {
    return ds;
  } else if ((typeof ds === "undefined" ? "undefined" : _typeof(ds)) === "object") {
    if (typeof ds.type === "undefined") return ds;
    var typeArr = ds.type.split(".");
    var AntdComp = typeArr.length > 1 ? Antd[typeArr[0]][typeArr[1]] : Antd[ds.type];

    var props = ds.props || null;

    var transProps = _extends({}, props);

    for (var i in transProps) {
      transProps[i] = _recursionRender(transProps[i]);
    }

    var children = typeof ds.children !== "undefined" && ds.children !== null ? _recursionRender(ds.children) : null;

    var propsWithKey = typeof key !== "undefined" && key !== null ? _extends({ key: ds.type + " - " + key }, transProps) : transProps;

    return _react2.default.createElement(AntdComp, propsWithKey, children);
  }
};