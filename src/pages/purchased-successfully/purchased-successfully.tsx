import React from 'react'
import './purchased-successfully.styles.scss'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const PurchaseSuccessfully = () => {
    const navigate = useNavigate()
  return (
    <div
        className='main-container'
    >
        <div className='content-area'>
				<div className='container'>

					<div className='title'>Thanh toán thành công</div>
					<div className='button'>
                        <Button
                            onClick={()=>{
                                navigate("/")
                            }}
                        >
                            Quay về trang chủ
                        </Button>
                    </div>
				</div>
			</div>
    </div>
  )
}

export default PurchaseSuccessfully