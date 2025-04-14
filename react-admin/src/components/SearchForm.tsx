import React, { createElement, useEffect, useImperativeHandle, useState } from 'react'
import { Form, Input, Select, DatePicker, Button } from 'antd';
import '@/style/Search.scss'
import { useTranslation } from 'react-i18next'

const FormItem = Form.Item, { Password } = Input, { Option } = Select, h = createElement;

const SearchForm = ({ columns, data, cRef, defaultFoldNum = 4, labelWidth, defaultFoldState = true, handleSearch }) => {
    const { t } = useTranslation()

    const [foldState, setFoldState] = useState()
    const [form] = Form.useForm();
    useImperativeHandle(cRef, () => ({
        getForm: () => form,
        // getParams: getParams(),
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
    useEffect(() => {
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
        <Form id="form" form={form} layout="inline" style={{ '--numbers': defaultFoldNum }} labelCol={{ flex: labelWidth }} labelAlign="left" onFinish={onFinish}>
          {columns.map((n, i) => {
            const { type = 'input' } = n,
              C = components[type]
            return (
              <FormItem label={n.label} name={n.name} rules={n.rules} key={n.name} className={i + 1 > defaultFoldNum && foldState ? 'unfold' : 'fold'}>
                {C(n)}
              </FormItem>
            )
          })}
          {columns.length < defaultFoldNum ? (
            <FormItem>
              <section className="inline-opts">
                <Button type="primary" htmlType="submit">
                  {t('Query')}
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  {t('Reset')}
                </Button>
              </section>
            </FormItem>
          ) : null}
        </Form>
        {columns.length >= defaultFoldNum ? (
          <section className="opts">
            <Button type="primary" form="form" htmlType="submit">
              {t('Query')}
            </Button>
            <Button htmlType="button" onClick={onReset}>
              {t('Reset')}
            </Button>
            {columns.length <= defaultFoldNum ? null : foldState ? <Button onClick={handleFold}>展开</Button> : <Button onClick={handleUnFold}>折叠</Button>}
          </section>
        ) : null}
      </>
    )
}

export default SearchForm
