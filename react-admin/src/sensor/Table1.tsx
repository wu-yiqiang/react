import React from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: '传感器名',
    dataIndex: 'sensor_name',
    key: 'sensor_name'
  },
  {
    title: '创建时间',
    dataIndex: 'created',
    key: 'created'
  },
  {
    title: '更新时间',
    dataIndex: 'modified',
    key: 'modified'
  }
]

const data: DataType[] = [
];

export default function Table1() {
  return <Table columns={columns} dataSource={data} />
}
