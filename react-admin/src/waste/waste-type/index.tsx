import Tabular from '@/components/Tabular.tsx';

export default function WasteType() {
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号'
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }
  ]
  const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
  ];
  const searchOptions = [{
    prop: "conditionType",
    label: "垃圾类型",
      type: "select",
      default: 0,
      attrs: {
          placeholder: '请选择'
      },
      opts: [
          { value: 0, label: "#SR" },
          { value: 1, label: '垃圾类型' },
          { value: 2, label: '垃圾位置' },
          { value: 3, label: '处理位置' },
          { value: 4, label: '处理方法' },
      ],
  },
  {
      prop: "keyword",
      label: "查找1",
      type: "input",
      default: "",
      attrs: {
          placeholder: '快速查找'
      },
    },
    {
      prop: "keyword2",
      label: "查找2",
      type: "input",
      default: "",
      attrs: {
          placeholder: '快速查找'
      },
    },
    {
      prop: "keyword3",
      label: "查找3",
      type: "input",
      default: "",
      attrs: {
          placeholder: '快速查找'
      },
    },
      {
      prop: "keyword4",
      label: "查找4",
      type: "input",
      default: "sss",
      attrs: {
          placeholder: '快速查找'
      },
    },
    //   {
    //   prop: "keyword",
    //   label: "查找",
    //   type: "input",
    //   default: "",
    //   attrs: {
    //       placeholder: '快速查找'
    //   },
    // },
    //    {
    //   prop: "keyword",
    //   label: "查找",
    //   type: "input",
    //   default: "",
    //   attrs: {
    //       placeholder: '快速查找'
    //   },
    // },
    //    {
    //   prop: "keyword",
    //   label: "查找",
    //   type: "input",
    //   default: "",
    //   attrs: {
    //       placeholder: '快速查找'
    //   },
    // },
    //    {
    //   prop: "keyword",
    //   label: "查找",
    //   type: "input",
    //   default: "",
    //   attrs: {
    //       placeholder: '快速查找'
    //   },
    // },
    //    {
    //   prop: "keyword",
    //   label: "查找",
    //   type: "input",
    //   default: "",
    //   attrs: {
    //       placeholder: '快速查找'
    //   },
    // },
    //    {
    //   prop: "keyword",
    //   label: "查找",
    //   type: "input",
    //   default: "",
    //   attrs: {
    //       placeholder: '快速查找'
    //   },
    // },
  ]
  const handleSearch = (data:object) => {
    console.log('sdsds萨达', data)
  }
  return <Tabular dataSource={dataSource} columns={columns} searchOptions={searchOptions} handleSearch={handleSearch} />
}
