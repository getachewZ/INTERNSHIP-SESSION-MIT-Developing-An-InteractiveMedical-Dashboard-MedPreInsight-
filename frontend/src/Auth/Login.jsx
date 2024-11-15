import React from 'react'
import {Card, Flex, Spin, Typography, Form, Input, Button, Alert} from "antd"
import { Link } from 'react-router-dom';
import DoctorImage from "../imgs/login.jpeg"
import useLogin from '../hooks/useLogin';
const Login = () => {
  const {error, loading, loginUser} = useLogin()
  const handleLogin = async(values)=>{
    await loginUser(values)
  }
  return (
    <Card className='form-container'>
      <Flex gap='large' align='center'>
      <Flex flex={1}>
        <img src={DoctorImage} width='100%' />
      </Flex>
      <Flex vertical flex={1}>
        <Typography.Title level={3} strong className='title'>
          Sign In
        </Typography.Title>
        <Typography.Text type='secondary' strong className='slogan'>
          welcome to this site
        </Typography.Text>
        <Form layout='vertical' 
        onFinish={handleLogin} 
        autoComplete='off'>
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
          {error && <Alert description={error} type='error' showIcon closable className='alert'/>}
          <Form.Item>
            <Button 
            type={`${loading ? '':'primary' }`}
            htmlType='submit' 
            size='large' className='btn'>
            {loading ? <Spin/> :  "Sign In"}
            </Button>
          </Form.Item>
          <Form.Item>
            <Link to='/'>
            <Button 
            size='large'
            className='btn'
            >
              Create an account
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </Flex>
      </Flex>
    </Card>
  )
}

export default Login
