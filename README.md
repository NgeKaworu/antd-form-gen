# antd-form-gen | antd 表单生成器
v2.0.0  

请不要吐槽我为什么一次一个X版本=- =, 因为萌新表示本萌大局观有待提高.

支持了更多的控件, 理论上是全部=- =, 但是但是不支持cb及event回调.

文档周一再来写了 再见  


v1.0.0
不在支持生成较为复杂的组件, 但是可以和较复杂的组件组合使用

考虑到扩展性, 和易用性, 进行了改写, 可以加载非 cb 型的 initailValue, props, option, rules.

并且用 react16.2 新特性<></>, 使之把提交事件交由父元素管理.

v0.0.3
基于 antd 的表单生成器其实就是简单的对`getFieldDecorator`的封装,

可以根据 json 对象渲染一个完整的表单很多东西准备在以后慢慢完善

---

# install | 安装

> npm i -S antd-form-gen

---

# Usage | 用法

> 源码在`src`下, 非常短.
> 满足不了就自己扩展

/index.js

```jsx
import { Component } from "react";
import { Form } from "antd";
import FormGen from "antd-form-gen";
import data from "./data.json";

export default class MyForm extends  {
  render(){
    const { getFieldDecorator } = this.props.form;
    return
    <Form>
      <FormGen
        getFieldDecorator={getFieldDecorator}  //需要父元素传递getFieldDecorator创建表单域
        data={data}  //数据源 @parma Array
      />;
    </Form>

  }
}

Form.create()(MyForm)
```

/data.json

```js
[
  {
    id: "select", //组件id
    title: "选择栏", //label名
    type: "Select", //类型
    dataSource: ["a1", "b2", "c3"], //需要一些特殊组件的自组件
    initialValue: "b2", // 初始值
    layout: {
      // 布局, 三列以内 第一列会自动对齐, 与antd layout规则一致
      xs: 24,
      sm: 8
    },
    props: {
      // 与对应组件支持的props一致 不支持event 和 cb
      size: "large"
    },
    options: {
      // 与getFieldDecorator.option一致 不支持event 和 cb
      validateTrigger: ["onChange", "onBlur"]
    }
  }
];
```

然后就生成了一个`<Select />`
![usage](https://raw.githubusercontent.com/NgeKaworu/antd-form-gen/master/usage.png)

---

# Example | 例子

/index.js

```jsx
import { Component } from "react";
import { Form, Button } from "antd";
import FormGen from "antd-form-gen";
import data from "./data.json";
import OtherComponent from './OtherComponent.

export default class MyForm extends  {
  render(){
    const { getFieldDecorator } = this.props.form;
    return
    <Form>
      <FormGen
        getFieldDecorator={getFieldDecorator}  //需要父元素传递getFieldDecorator创建表单域
        data={data}  //数据源 @parma Array
      />;
      <OtherComponent/>  //其他组件
      <Button type="primary" htmlType="submit">提交</Button>
    </Form>
  }
}

Form.create()(MyForm)
```

/data.json

```js
const _col_1 = {
  xs: 24,
  sm: 24
};

const _col_2 = {
  xs: 24,
  sm: 12
};

const _col_3 = {
  xs: 24,
  sm: 8
};

const data = [
        {
          id: 'input',
          title: '输入框',
          type: 'Input',
          props: {
            placeholder: 'lalal',
          },
          layout: _col_1,
          options: { validateTrigger: ['onChange', 'onBlur'] },
        },
        {
          id: 'select',
          title: '选择栏',
          type: 'Select',
          dataSource: ['a', 'b', 'c'],
          layout: _col_2,
        },
        {
          id: 'Radio',
          title: '单选按钮',
          type: 'Radio',
          dataSource: ['a', 'b', 'c'],
          layout: _col_2,
        },
        {
          id: 'datepicker',
          title: '时间选择器',
          type: 'datepicker',
          props: {
            format: 'YYYY-MM-DD HH:mm',
            showTime: { format: 'HH:mm' },
          },

          layout: _col_3,
        },
        {
          id: 'switch',
          title: '开关',
          type: 'switch',
          layout: _col_3,
          rules: [
            {
              required: false,
            },
          ],
        },
        {
          id: 'inputnumber',
          title: '数字输入',
          type: 'inputnumber',
          suffix: '分',
          props: { min: 0, max: 20 },
          layout: _col_3,
        },
        {
          id: 'TextArea',
          title: '内容摘要',
          type: 'TextArea',
          props: { rows: 6 },
          layout: _col_1,
          rules: [
            {
              required: false,
            },
          ],
          initialValue: '内容摘要, 不少于50字',
        },
      ],
    },
  ];
```

然后大概就是这个样子

![example](https://raw.githubusercontent.com/NgeKaworu/antd-form-gen/master/example.png)

---
