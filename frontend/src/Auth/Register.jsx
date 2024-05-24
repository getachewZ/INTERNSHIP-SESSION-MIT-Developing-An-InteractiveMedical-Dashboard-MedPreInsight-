import React from 'react'
import {Card, Flex, Spin, Typography, Form, Input, Button, Alert} from "antd"
import { Link } from 'react-router-dom';
import DoctorImage from "../imgs/register.jpeg"
import useSignup from '../hooks/useSignup';
const Register = () => {
  const {loading, error, registerUser} = useSignup()
  const handleRegister=(values)=>{
    registerUser(values)
  }
  return (
    <Card className='form-container'>
      <Flex gap='large' align='center'>
      <Flex vertical flex={1}>
        <Typography.Title level={3} strong className='title'>
          Create an account
        </Typography.Title>
        <Typography.Text type='secondary' strong className='slogan'>
          join for exclusive access!
        </Typography.Text>
        <Form layout='horizontal' 
        onFinish={handleRegister} 
        autoComplete='off'>
          <Form.Item label="First name" name='First_name' rules={[{
            required: true,
            message:'please input your First name!'
          }]}>
            <Input size='large' placeholder='Enter First name'/>
          </Form.Item>
          <Form.Item label="Last name" name='Last_name' rules={[{
            required: true,
            message:'please input your Last name!'
          }]}>
            <Input size='large' placeholder='Enter Last name'/>
          </Form.Item>
          <Form.Item
           label="Email" name='email' rules={[{
            required: true,
            message:'please input your Email!'
          },
          {
            type: 'email',
            message:'the input is not valid Email!'
          },
          ]}>
            <Input size='large' placeholder='Enter Email'/>
          </Form.Item>
          <Form.Item label="Password" name='password' rules={[{
            required: true,
            message:'please input your Password!'
          }]}>
            <Input.Password size='large' placeholder='Enter Password'/>
          </Form.Item>
          <Form.Item label="Password" name='passwordConfirm' rules={[{
            required: true,
            message:'please Re-input your Password!'
          }]}>
            <Input.Password size='large' placeholder='Confirm Password'/>
          </Form.Item>
          {error && <Alert description={error} type='error' showIcon closable className='alert'/>}
          <Form.Item>
            <Button 
            type={`${loading ? '':'primary' }`}
            htmlType='submit' 
            size='large'
            className='btn'
            >
             {loading ? <Spin/> :  "Create Account"}
              </Button>
          </Form.Item>
          <Form.Item>
            <Link to='login'>
            <Button size='large' className='btn'>Sign In</Button>
            </Link>
          </Form.Item>
        </Form>
      </Flex>
      <Flex flex={1}>
        <img src={DoctorImage} width='100%' />
      </Flex>
      </Flex>
    </Card>
  )
}

export default Register
