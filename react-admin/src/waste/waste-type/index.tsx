import Tabular from '@/components/Tabular.tsx';
import { getWasteTypeLists } from '@/api/setting';
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
      key: '3',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    },
    {
      key: '4',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    },
    {
      key: '5',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    },
    {
      key: '6',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    },
    {
      key: '7',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    },
    {
      key: '8',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    },
    {
      key: '9',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    },
    {
      key: '10',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    },
    {
      key: '11',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    },
    {
      key: '12',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    },
    {
      key: '13',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    },
    {
      key: '14',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    },
    {
      key: '15',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    },
    {
      key: '16',
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
   const searchOptions = [
      {name: 'keyword', label: '搜索', rules: [{ required: true, message: '请输入用户名' }]},
      // {name: 'password', label: '密码', type: 'password', rules: [{ required: true, message: '请输入密码' }]},
      // {name: 'confirmPwd', label: '确认密码', type: 'password', rules: [
      //   { required: true, message: '请再一次输入密码' },
      //   ({ getFieldValue }) => ({
      //     validator(rule, value) {
      //       //如果value为空，!value为true则直接返回Promise.resolve()就会提示“请再一次输入密码”
      //       if (!value || getFieldValue('password') === value) {
      //         return Promise.resolve();
      //       }
      //       return Promise.reject('两次密码输入不一致');
      //     },
      //   }),
      // ]},
      // {name: 'email', label: '邮箱', rules: [
      //   { required: true, message: '请输入邮箱' },
      //   {
      //     validator:(_, value) => {
      //       const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      //       if(!value || reg.test(value)){
      //         return Promise.resolve();
      //       }
  
      //       return Promise.reject('邮箱格式不正确');
      //     }
      //   }
      // ]},
      // {name: 'gender', label: '性别', type: 'select', rules: [{ required: true, message: '请选择性别' }], list: [{value: 'male', label: '男'}, {value: 'female', label: '女'}], callback: res => onGenderChange(res)},
      // {name: 'highHeeled', label: '高跟鞋', rules: [{ required: true, message: '请输入喜欢的高跟鞋' }]},
      // {name: 'exercise', label: '运动', rules: [{ required: true, message: '请输入喜欢的运动' }]},
      // {name: 'date', label: '日期', type: 'datePicker', rules: [{ required: true, message: '请输入日期' }]},
    ]
  const queryData = {
    keyword: 'sadas',
    type: 1,
  }
  const pager = {
    total: 500,
    pageNo: 1,
    pageSize: 30,
  }
  const handleSearch = async (values:object) => {
    console.log('chauxn参数', values)
    const params = {...values,...queryData }
    const { data } = await getWasteTypeLists(params)
    console.log('data', data)
  }
  return <Tabular dataSource={dataSource} total={pager.total} pageNo={pager.pageNo} pageSize={pager.pageSize} columns={columns} data={ queryData } searchOptions={searchOptions} handleSearch={handleSearch} />
}
