import { Avatar, Typography } from 'antd'
import React from 'react'
import { styled } from 'styled-components'

const WrapperStyled = styled.div`
    margin-bottom: 10px;
    .username {
        margin-left: 5px;
        font-weight: bold;

    }
    .time {
        margin-left: 10px;
        font-size: 12px; 
        color: #a7a7a7
    }
    .content {
        margin-left: 30px;
    }
`
const Message = ({displayName, photoURL, text, createdAt,    }) => {
  return (
    <WrapperStyled>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <Avatar src={photoURL}>A</Avatar>
            <Typography.Text className='username'>{displayName}</Typography.Text>
            <Typography.Text className='time'>{createdAt}</Typography.Text>
        </div>
        <div>
            <Typography.Text className='content'>{text}</Typography.Text>
        </div>
    </WrapperStyled>
  )
}

export default Message