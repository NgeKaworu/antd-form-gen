import React, { Component } from 'react';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Switch,
  Icon,
  Row,
  Col,
  Upload,
  message,
  Modal,
  DatePicker,
} from 'antd';

const FormItem = Form.Item;

class FormGen extends Component {
  state = {
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
    ],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleSubmit(values);
      }
    });
  };

  handleUploadChange = e => {
    // console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    const { fileList } = e;
    // console.log("fileList \n", fileList);
    if (fileList.some(i => i.status === 'error')) message.error('上传失败 请重试');
    const newFileList = fileList.filter(i => i.status !== 'error');

    // console.log("before \n", this.state.fileList);
    this.setState({ fileList: newFileList });
    // console.log("after \n", this.state.fileList);
    return e && newFileList;
    // return e && e.fileList;
  };

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handlePreviewCancel = () =>
    this.setState({
      previewVisible: false,
    });

  // getImgURL = (img, cb) => {
  //   const reader = new FileReader();
  //   reader.addEventListener("load", () => cb(reader.result));
  //   reader.readAsDataURL(img);
  // };

  beforeUpload = file => {
    const isImg = file.type === 'image/jpeg' || 'image/png' || 'image/gif';
    if (!isImg) message.error('你只能上传图片');

    const isLt2M = file.size / 2048 > 2;
    if (!isLt2M) message.error('照片超过2MB!');
    return isImg && isLt2M;
  };

  renderUploadBtn = () => (
    <div>
      <Icon type="plus" />
    </div>
  );

  renderComponent = k => {
    const type = k.type && k.type.toLowerCase();
    switch (type) {
      case 'input':
        return <Input />;
      case 'radio':
        return <Radio />;
      case 'select': {
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
      case 'switch':
        return (
          <Switch
            checkedChildren={<Icon type="check" />}
            unCheckedChildren={<Icon type="cross" />}
          />
        );
      case 'upload': {
        const { fileList } = this.state;
        return (
          <Upload
            name="logo"
            action="//jsonplaceholder.typicode.com/posts/"
            listType="picture-card"
            accept="image/*"
            beforeUpload={this.beforeUpload}
            onPreview={this.handlePreview}
          >
            {fileList.length >= 3 ? null : this.renderUploadBtn()}
          </Upload>
        );
      }
      case 'datepicker':
        return <DatePicker format={'YYYY-MM-DD' + (!!k.showTime === true ? ' HH:mm' : '')} showTime={k.showTime} />;
      case 'textarea':
        return <Input.TextArea rows={6} />;
      default:
        return <div>未收录该组件,请自行扩展</div>;
    }
  };

  render() {
    const { data } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { previewVisible, previewImage } = this.state;
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: data });
    const keys = getFieldValue('keys');
    const formItems = keys.map(k => {
      const layout = k.layout || {};
      const lableLayout = 96 / (layout.sm || 24);
      const warpLayout = 24 - lableLayout;
      const formItemLayout = {
        labelCol: { sm: lableLayout },
        wrapperCol: { sm: warpLayout },
      };
      let fieldObj = {
        rules: [
          {
            required: k.isrequired,
            message: '不能为空',
          },
        ],
      };

      const type = k.type && k.type.toLowerCase();
      if (type === 'upload') {
        fieldObj = {
          ...fieldObj,
          valuePropName: 'fileList',
          getValueFromEvent: this.handleUploadChange,
          initialValue: this.state.fileList,
        };
      }
      return (
        <Col key={k.id} {...k.layout}>
          <FormItem label={k.title} {...formItemLayout}>
            {getFieldDecorator(k.id, fieldObj)(this.renderComponent(k))}
          </FormItem>
        </Col>
      );
    });
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Row>{formItems}</Row>
          <FormItem {...formItemLayoutWithOutLabel}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </FormItem>
        </Form>
        <Modal visible={previewVisible} footer={null} onCancel={this.handlePreviewCancel}>
          <img alt="preview" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default Form.create()(FormGen);
