'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

var _button = require('antd/lib/button');

var _button2 = _interopRequireDefault(_button);

var _row = require('antd/lib/row');

var _row2 = _interopRequireDefault(_row);

var _col = require('antd/lib/col');

var _col2 = _interopRequireDefault(_col);

var _inputNumber = require('antd/lib/input-number');

var _inputNumber2 = _interopRequireDefault(_inputNumber);

var _datePicker = require('antd/lib/date-picker');

var _datePicker2 = _interopRequireDefault(_datePicker);

var _upload = require('antd/lib/upload');

var _upload2 = _interopRequireDefault(_upload);

var _switch = require('antd/lib/switch');

var _switch2 = _interopRequireDefault(_switch);

var _radio = require('antd/lib/radio');

var _radio2 = _interopRequireDefault(_radio);

var _select = require('antd/lib/select');

var _select2 = _interopRequireDefault(_select);

var _input = require('antd/lib/input');

var _input2 = _interopRequireDefault(_input);

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _message2 = require('antd/lib/message');

var _message3 = _interopRequireDefault(_message2);

var _form = require('antd/lib/form');

var _form2 = _interopRequireDefault(_form);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('antd/lib/modal/style/css');

require('antd/lib/button/style/css');

require('antd/lib/row/style/css');

require('antd/lib/col/style/css');

require('antd/lib/input-number/style/css');

require('antd/lib/date-picker/style/css');

require('antd/lib/upload/style/css');

require('antd/lib/switch/style/css');

require('antd/lib/radio/style/css');

require('antd/lib/select/style/css');

require('antd/lib/input/style/css');

require('antd/lib/icon/style/css');

require('antd/lib/message/style/css');

require('antd/lib/form/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormItem = _form2.default.Item;

var FormGen = function (_Component) {
  _inherits(FormGen, _Component);

  function FormGen() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FormGen);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FormGen.__proto__ || Object.getPrototypeOf(FormGen)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      previewImage: '',
      previewVisible: false,
      fileList: [
        // {
        //   uid: -1,
        //   name: "xxx.png",
        //   status: "done",
        //   url:
        //     "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        // }
      ]
    }, _this.handleSubmit = function (e) {
      e.preventDefault();
      _this.props.form.validateFields(function (err, values) {
        if (!err) {
          _this.props.handleSubmit(values);
        }
      });
    }, _this.handleUploadChange = function (e) {
      // console.log("Upload event:", e);
      if (Array.isArray(e)) {
        return e;
      }
      var fileList = e.fileList;
      // console.log("fileList \n", fileList);

      if (fileList.some(function (i) {
        return i.status === 'error';
      })) _message3.default.error('上传失败 请重试');
      var newFileList = fileList.filter(function (i) {
        return i.status !== 'error';
      });

      // console.log("before \n", this.state.fileList);
      _this.setState({ fileList: newFileList });
      // console.log("after \n", this.state.fileList);
      return e && newFileList;
      // return e && e.fileList;
    }, _this.handlePreview = function (file) {
      _this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true
      });
    }, _this.handlePreviewCancel = function () {
      return _this.setState({
        previewVisible: false
      });
    }, _this.beforeUpload = function (file) {
      var isImg = file.type === 'image/jpeg' || 'image/png' || 'image/gif';
      if (!isImg) _message3.default.error('你只能上传图片');

      var isLt2M = file.size / 2048 > 2;
      if (!isLt2M) _message3.default.error('照片超过2MB!');
      return isImg && isLt2M;
    }, _this.renderUploadBtn = function () {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_icon2.default, { type: 'plus' })
      );
    }, _this.renderComponent = function (k) {
      var type = k.type && k.type.toLowerCase();
      switch (type) {
        case 'input':
          return _react2.default.createElement(_input2.default, null);
        case 'select':
          {
            return _react2.default.createElement(
              _select2.default,
              null,
              k.datasource.map(function (v) {
                return _react2.default.createElement(
                  _select2.default.Option,
                  { key: k.id + v, value: v },
                  v
                );
              })
            );
          }
        case 'radio':
          {
            return _react2.default.createElement(
              _radio2.default.Group,
              null,
              k.datasource.map(function (v) {
                return _react2.default.createElement(
                  _radio2.default.Button,
                  { key: k.id + v, value: v },
                  v
                );
              })
            );
          }
        case 'switch':
          return _react2.default.createElement(_switch2.default, {
            checkedChildren: _react2.default.createElement(_icon2.default, { type: 'check' }),
            unCheckedChildren: _react2.default.createElement(_icon2.default, { type: 'cross' })
          });
        case 'upload':
          {
            var fileList = _this.state.fileList;

            return _react2.default.createElement(
              _upload2.default,
              {
                name: 'logo',
                action: '//jsonplaceholder.typicode.com/posts/',
                listType: 'picture-card',
                accept: 'image/*',
                beforeUpload: _this.beforeUpload,
                onPreview: _this.handlePreview
              },
              fileList.length >= 3 ? null : _this.renderUploadBtn()
            );
          }
        case 'datepicker':
          return _react2.default.createElement(_datePicker2.default, {
            format: 'YYYY-MM-DD' + (!!k.showTime === true ? ' HH:mm' : ''),
            showTime: k.showTime
          });
        case 'textarea':
          return _react2.default.createElement(_input2.default.TextArea, { rows: 6 });

        case 'inputnumber':
          return _react2.default.createElement(_inputNumber2.default, { min: 1 });
        default:
          return _react2.default.createElement(
            'div',
            null,
            '\u672A\u6536\u5F55\u8BE5\u7EC4\u4EF6,\u8BF7\u81EA\u884C\u6269\u5C55'
          );
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // getImgURL = (img, cb) => {
  //   const reader = new FileReader();
  //   reader.addEventListener("load", () => cb(reader.result));
  //   reader.readAsDataURL(img);
  // };

  _createClass(FormGen, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var data = this.props.data;
      var _props$form = this.props.form,
          getFieldDecorator = _props$form.getFieldDecorator,
          getFieldValue = _props$form.getFieldValue;
      var _state = this.state,
          previewVisible = _state.previewVisible,
          previewImage = _state.previewImage;

      var formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 20, offset: 4 }
        }
      };
      getFieldDecorator('keys', { initialValue: data });
      var keys = getFieldValue('keys');
      var formItems = keys.map(function (k) {
        var layout = k.layout || {};
        var lableLayout = 96 / (layout.sm || 24);
        var warpLayout = 24 - lableLayout;
        var formItemLayout = {
          labelCol: { sm: lableLayout },
          wrapperCol: { sm: warpLayout }
        };
        var fieldObj = {
          rules: [{
            required: k.isrequired,
            message: '不能为空'
          }]
        };

        var type = k.type && k.type.toLowerCase();
        if (type === 'upload') {
          fieldObj = _extends({}, fieldObj, {
            valuePropName: 'fileList',
            getValueFromEvent: _this2.handleUploadChange,
            initialValue: _this2.state.fileList
          });
        }
        return _react2.default.createElement(
          _col2.default,
          _extends({ key: k.id }, k.layout),
          _react2.default.createElement(
            FormItem,
            _extends({ label: k.title }, formItemLayout),
            getFieldDecorator(k.id, fieldObj)(_this2.renderComponent(k)),
            type === 'inputnumber' && _react2.default.createElement(
              'span',
              null,
              ' ',
              k.unit
            )
          )
        );
      });
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _form2.default,
          { onSubmit: this.handleSubmit },
          _react2.default.createElement(
            _row2.default,
            null,
            formItems
          ),
          _react2.default.createElement(
            FormItem,
            formItemLayoutWithOutLabel,
            _react2.default.createElement(
              _button2.default,
              { type: 'primary', htmlType: 'submit' },
              '\u63D0\u4EA4'
            )
          )
        ),
        _react2.default.createElement(
          _modal2.default,
          { visible: previewVisible, footer: null, onCancel: this.handlePreviewCancel },
          _react2.default.createElement('img', { alt: 'preview', style: { width: '100%' }, src: previewImage })
        )
      );
    }
  }]);

  return FormGen;
}(_react.Component);

exports.default = _form2.default.create()(FormGen);