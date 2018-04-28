# antd-form-gen | antd 表单生成器

基于 antd 的表单生成器其实就是简单的对`getFieldDecorator`的封装,  
可以根据 json 对象渲染一个完整的表单很多东西准备在以后慢慢完善

---

# install | 安装

> npm i -S antd-form-gen

---

# Usage | 用法  

源码很短, 可以自己扩展

/index.js

```jsx
import react from 'react';
import { connect } from 'dva';
import FormGen from 'antd-form-gen';
import data from './data.json'


const MyForm = () => <FormGen data={data}/> ;

export default MyForm;
```
/data.json  

```json
[
        {
          id: 'input',
          title: '输入框',
          type: 'Input',
          isrequired: true,
          layout: {
            xs: 24,
            sm: 24,
          },
        },
        {
          id: 'select',
          title: '选择栏',
          type: 'Select',
          datasource: ['a', 'b', 'c'],
          isrequired: false,
          layout: {
            xs: 24,
            sm: 12,
          },
        },
        {
          id: 'Radio',
          title: '单选按钮',
          type: 'Radio',
          datasource: ['a', 'b', 'c'],
          isrequired: false,
          layout: {
            xs: 24,
            sm: 12,
          },
        },
        {
          id: 'datepicker',
          title: '时间选择器',
          type: 'datepicker',
          isrequired: true,
          layout: {
            xs: 24,
            sm: 8,
          },
          showTime: {
            format: 'HH:mm',
          },
        },
        {
          id: 'switch',
          title: '开关',
          type: 'switch',
          isrequired: false,
          layout: {
            xs: 24,
            sm: 8,
          },
        },
        {
          id: 'inputnumber',
          title: '数字输入',
          type: 'inputnumber',
          isrequired: false,
          layout: {
            xs: 24,
            sm: 8,
          },
        },
        {
          id: 'TextArea',
          title: '文本域',
          type: 'TextArea',
          isrequired: true,
          layout: {
            xs: 24,
            sm: 24,
          },
        },
        {
          id: 'upload',
          title: '上传',
          type: 'upload',
          isrequired: true,
          layout: {
            xs: 24,
            sm: 24,
          },
        },
      ]
```

![效果]()
