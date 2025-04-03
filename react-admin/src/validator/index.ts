import { Rule } from 'antd/es/form';
export const emailRules = <Rule>{ type: 'email', message: '请输入合法的邮箱' }
export const requiredRules = [{ required: true, message: '请输入' }]

export const emailRequiredRules: Rule[] = [
    emailRules,
    ...requiredRules,
]