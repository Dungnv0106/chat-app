import React from 'react'
import { Row, Col } from 'antd'
import ChatWindow from './ChatWindow'
import Sidebar from './Sidebar'
const ChatRoom = () => {
  return (
    <div>
      <Row style={{margin: '0'}}>
        <Col span={6}> <Sidebar /></Col>
        <Col span={18}> <ChatWindow /></Col>
      </Row>
    </div>
  )
}

export default ChatRoom