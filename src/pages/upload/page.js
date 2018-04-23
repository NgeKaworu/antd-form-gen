import React from "react";
import { Form, Button, Upload, Icon, Modal, message } from "antd";
const FormItem = Form.Item;

class Demo extends React.Component {
  state = {
    previewImage: "",
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
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
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
    if (fileList.some(i => i.status === "error"))
      message.error("上传失败 请重试");
    const newFileList = fileList.filter(i => i.status !== "error");

    // console.log("before \n", this.state.fileList);
    this.setState({ fileList: newFileList });
    // console.log("after \n", this.state.fileList);
    return e && newFileList;
    // return e && e.fileList;
  };

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  handlePreviewCancel = () => this.setState({
    previewVisible: false
  })

  // getImgURL = (img, cb) => {
  //   const reader = new FileReader();
  //   reader.addEventListener("load", () => cb(reader.result));
  //   reader.readAsDataURL(img);
  // };

  beforeUpload = file => {
    const isImg = file.type === "image/jpeg" || "image/png" || "image/gif";
    if (!isImg) message.error("你只能上传图片");

    const isLt2M = file.size / 2048 > 2;
    if (!isLt2M) message.error("照片超过2MB!");
    return isImg && isLt2M;
  };

  renderUploadBtn = () => (
    <div>
      <Icon type="plus" />
    </div>
  );

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      previewVisible,
      previewImage,
      fileList
    } = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };
    const fieldObj = { valuePropName: "fileList", getValueFromEvent: this.handleUploadChange, initialValue: this.state.fileList, rules: [{ required: true }] };
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="Upload">
            {getFieldDecorator("upload", fieldObj)(
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
            )}
          </FormItem>

          <FormItem wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </FormItem>
        </Form>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handlePreviewCancel}
        >
          <img alt="preview" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

const WrappedDemo = Form.create()(Demo);

const page = () => <WrappedDemo />;
export default page;
