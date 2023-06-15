import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ type,message }) => {
  console.log('type',type);
  console.log('message',message);  
  return (
    <Alert variant={type}>{message}</Alert>
  )
}
Message.defaultProps = {
    type:'success'
}

export default Message