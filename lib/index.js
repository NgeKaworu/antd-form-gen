'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormItem = _antd.Form.Item;

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
      })) _antd.message.error('上传失败 请重试');
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
      if (!isImg) _antd.message.error('你只能上传图片');

      var isLt2M = file.size / 2048 > 2;
      if (!isLt2M) _antd.message.error('照片超过2MB!');
      return isImg && isLt2M;
    }, _this.renderUploadBtn = function () {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_antd.Icon, { type: 'plus' })
      );
    }, _this.renderComponent = function (k) {
      var type = k.type && k.type.toLowerCase();
      switch (type) {
        case 'input':
          return _react2.default.createElement(_antd.Input, null);
        case 'select':
          {
            return _react2.default.createElement(
              _antd.Select,
              null,
              k.datasource.map(function (v) {
                return _react2.default.createElement(
                  _antd.Select.Option,
                  { key: k.id + v, value: v },
                  v
                );
              })
            );
          }
        case 'radio':
          {
            return _react2.default.createElement(
              _antd.Radio.Group,
              null,
              k.datasource.map(function (v) {
                return _react2.default.createElement(
                  _antd.Radio.Button,
                  { key: k.id + v, value: v },
                  v
                );
              })
            );
          }
        case 'switch':
          return _react2.default.createElement(_antd.Switch, {
            checkedChildren: _react2.default.createElement(_antd.Icon, { type: 'check' }),
            unCheckedChildren: _react2.default.createElement(_antd.Icon, { type: 'cross' })
          });
        case 'upload':
          {
            var fileList = _this.state.fileList;

            return _react2.default.createElement(
              _antd.Upload,
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
          return _react2.default.createElement(_antd.DatePicker, {
            format: 'YYYY-MM-DD' + (!!k.showTime === true ? ' HH:mm' : ''),
            showTime: k.showTime
          });
        case 'textarea':
          return _react2.default.createElement(_antd.Input.TextArea, { rows: 6 });

        case 'inputnumber':
          return _react2.default.createElement(_antd.InputNumber, { min: 1 });
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
          _antd.Col,
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
          _antd.Form,
          { onSubmit: this.handleSubmit },
          _react2.default.createElement(
            _antd.Row,
            null,
            formItems
          ),
          _react2.default.createElement(
            FormItem,
            formItemLayoutWithOutLabel,
            _react2.default.createElement(
              _antd.Button,
              { type: 'primary', htmlType: 'submit' },
              '\u63D0\u4EA4'
            )
          )
        ),
        _react2.default.createElement(
          _antd.Modal,
          { visible: previewVisible, footer: null, onCancel: this.handlePreviewCancel },
          _react2.default.createElement('img', { alt: 'preview', style: { width: '100%' }, src: previewImage })
        )
      );
    }
  }]);

  return FormGen;
}(_react.Component);

exports.default = _antd.Form.create()(FormGen);