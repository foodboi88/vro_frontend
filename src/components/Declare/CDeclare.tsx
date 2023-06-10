import React from 'react'
import './styles.declare.scss'

interface MyProps{
    content: string
}

const CDeclare = (props: MyProps) => {
  return (
    <div className='container'>
        <div className='content'>{props.content}</div>
    </div>
  )
}

export default CDeclare