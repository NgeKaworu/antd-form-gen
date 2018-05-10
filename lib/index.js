"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._layoutTransform = undefined;

var _col = require("antd/lib/col");

var _col2 = _interopRequireDefault(_col);

var _inputNumber = require("antd/lib/input-number");

var _inputNumber2 = _interopRequireDefault(_inputNumber);

var _datePicker = require("antd/lib/date-picker");

var _datePicker2 = _interopRequireDefault(_datePicker);

var _switch = require("antd/lib/switch");

var _switch2 = _interopRequireDefault(_switch);

var _icon = require("antd/lib/icon");

var _icon2 = _interopRequireDefault(_icon);

var _radio = require("antd/lib/radio");

var _radio2 = _interopRequireDefault(_radio);

var _select = require("antd/lib/select");

var _select2 = _interopRequireDefault(_select);

var _input = require("antd/lib/input");

var _input2 = _interopRequireDefault(_input);

var _form = require("antd/lib/form");

var _form2 = _interopRequireDefault(_form);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require("antd/lib/col/style/css");

require("antd/lib/input-number/style/css");

require("antd/lib/date-picker/style/css");

require("antd/lib/switch/style/css");

require("antd/lib/icon/style/css");

require("antd/lib/radio/style/css");

require("antd/lib/select/style/css");

require("antd/lib/input/style/css");

require("antd/lib/form/style/css");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormItem = _form2.default.Item;

var _layout = { span: 24 };
var _rules = [{ required: true, message: "此项不能为空" }];

var FormGen = function (_Component) {
  _inherits(FormGen, _Component);

  function FormGen() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FormGen);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FormGen.__proto__ || Object.getPrototypeOf(FormGen)).call.apply(_ref, [this].concat(args))), _this), _this.renderComponent = function (k) {
      var type = k.type && k.type.toLowerCase();
      switch (type) {
        case "input":
          return _react2.default.createElement(_input2.default, null);
        case "select":
          {
            return _react2.default.createElement(
              _select2.default,
              null,
              k.dataSource.map(function (v) {
                return _react2.default.createElement(
                  _select2.default.Option,
                  { key: k.id + v, value: v },
                  v
                );
              })
            );
          }
        case "radio":
          {
            return _react2.default.createElement(
              _radio2.default.Group,
              null,
              k.dataSource.map(function (v) {
                return _react2.default.createElement(
                  _radio2.default.Button,
                  { key: k.id + v, value: v },
                  v
                );
              })
            );
          }
        case "switch":
          return _react2.default.createElement(_switch2.default, {
            checkedChildren: _react2.default.createElement(_icon2.default, { type: "check" }),
            unCheckedChildren: _react2.default.createElement(_icon2.default, { type: "cross" })
          });
        case "datepicker":
          return _react2.default.createElement(_datePicker2.default, null);
        case "textarea":
          return _react2.default.createElement(_input2.default.TextArea, null);
        case "inputnumber":
          return _react2.default.createElement(_inputNumber2.default, null);
        default:
          return _react2.default.createElement(
            "div",
            null,
            "\u672A\u6536\u5F55\u8BE5\u7EC4\u4EF6,\u8BF7\u81EA\u884C\u6269\u5C55"
          );
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FormGen, [{
    key: "render",
    value: function render() {
      var _this2 = this;

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

        return _react2.default.createElement(
          _col2.default,
          _extends({ key: k.id }, k.layout),
          _react2.default.createElement(
            FormItem,
            _extends({ label: k.title }, formItemLayout),
            getFieldDecorator(k.id, fieldOption)(!props ? _this2.renderComponent(k) : _react2.default.cloneElement(_this2.renderComponent(k), props, null)),
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