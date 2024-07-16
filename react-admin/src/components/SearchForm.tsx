import React, { createElement, useEffect, useImperativeHandle, useState } from 'react'
import { Form, Input, Select, DatePicker, Button } from 'antd';
import '@/style/Search.scss'

const FormItem = Form.Item, { Password } = Input, { Option } = Select, h = createElement;

const SearchForm = ({ columns, data, cRef, defaultFoldNum = 4, defaultFoldState = true, handleSearch }) => {
    const [foldState, setFoldState] = useState()
    const [form] = Form.useForm();
    useImperativeHandle(cRef, () => ({
        getForm: () => form,
        getParams: getParams(),
        init: onFinish
    }));

    const handleFold = () => {
        setFoldState(false)
    }
    const handleUnFold = () => {
        setFoldState(true)
    }

    const onFinish = async (values: any) => {
        const data = await form.getFieldsValue()
        handleSearch(data)
    };

    const onReset = () => {
        form.resetFields();
    };
    const getParams = () => {
        const data = form.getFieldsValue()
        console.log('sssss', new Date().getTime())
        return data
    }
    useEffect(() => {
        console.log('sadasd', new Date().getTime())
        setFoldState(defaultFoldState)
        form.setFieldsValue(data)
    }, [])

    const components = {
        select: ({ label, list = [], callback = () => { } }) => h(Select, { placeholder: label, onChange: v => callback(v) }, list.map(c => h(Option, { key: c.value, value: c.value }, c.label))),
        input: ({ label }) => <Input placeholder={label} />,
        password: ({ label }) => h(Password, { placeholder: label }),
        datePicker: ({ label }) => <DatePicker placeholder={label} format="YYYY-MM-DD" />,
    }

    return (
        <>
            <Form id="form" form={form} layout="inline" style={{ '--numbers': defaultFoldNum }} onFinish={onFinish}>
                {
                    columns.map((n, i) => {
                        const { type = 'input' } = n, C = components[type]
                        return <FormItem label={n.label} name={n.name} rules={n.rules} key={n.name} className={i + 1 > defaultFoldNum && foldState ? 'unfold' : 'fold'}>
                            {C(n)}
                        </FormItem>
                    })
                }
                {columns.length < defaultFoldNum ? (
          <FormItem>
            <section className="inline-opts">
              <Button type="primary" htmlType="submit">提交</Button>
              <Button htmlType="button" onClick={onReset}>重置</Button>
            </section>
          </FormItem>
        ) : null}
            </Form>
            {columns.length >= defaultFoldNum ? (
                <section className="opts">
                        <Button type="primary" form="form" htmlType="submit">提交</Button>
                    <Button htmlType="button" onClick={onReset}>重置</Button>
                    {columns.length <= defaultFoldNum ? null : foldState ? <Button onClick={handleFold}>展开</Button> : <Button onClick={handleUnFold}>折叠</Button>}
                     </section>
        ) : null}
            
        </>
    )
}

export default SearchForm
