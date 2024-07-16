import Tabular from '@/components/Tabular.tsx';
import { getContractorsLists, deleteContractors } from '@/api/setting'
import React, { useState, useEffect } from 'react';
import AddDialog from './add-dialog';
import { Button, message } from 'antd'
export default function Contractor() {
  const [lists, setLists] = useState()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [target, setTarget] = useState({})
  const [pager, setPager] = useState(
    {
    total: 0,
    pageNo: 1,
    pageSize: 10
  }
  )
  const columns = [
    {
      title: '承包商',
      dataIndex: 'companyName',
      key: 'companyName'
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
    },
  ]
  const searchOptions = [
    { name: 'keyword', label: '搜索' }
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
  const TableRef = React.createRef();
  const queryData = {
    keyword: '1212'
  }
  
  const handleSearch = async (values: object) => {
    const params = { ...values,type: 1 }
    const { data } = await getContractorsLists(params)
    setLists(data.lists)
    const datas = {
      pageSize: data.pageSize,
      total: data.total,
      pageNo: data.pageNo
    }
    setPager(datas)
  }
  const handleNew = () => {
    setTarget({})
    setDialogOpen(true)
  }
  const handleClose = () => {
    setDialogOpen(false)
  }
  const handleEdit = (value: any) => {
    setTarget(value)
    setDialogOpen(true)
  }
  const handleDelete = async (values: any) => {
    const { uuid } = values
    await deleteContractors(uuid)
    message.destroy()
    message.success('操作成功')
    handleFlush()
  }

  
  const handleOk = () => {
    setDialogOpen(false)
    handleFlush()
  }
  const handleFlush = () => {
    TableRef.current.flush()
  }
  useEffect(() => {
    handleFlush()
  }, [])
  
  return (
    <>
      <Tabular
        onRef={TableRef}
        dataSource={lists}
        total={pager.total}
        pageNo={pager.pageNo}
        pageSize={pager.pageSize}
        columns={columns}
        data={queryData}
        searchOptions={searchOptions}
        handleSearch={handleSearch}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        left={
          <Button type="primary" onClick={handleNew}>
            新增
          </Button>
        }
      ></Tabular>
      {dialogOpen ? <AddDialog open={dialogOpen} target={ target } handleClose={handleClose} handleOk={handleOk}  /> :null}
    </>
  )
}
