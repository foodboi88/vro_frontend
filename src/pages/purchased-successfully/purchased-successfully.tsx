import React, { useEffect } from 'react'
import './purchased-successfully.styles.scss'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatchRoot } from '../../redux/store'
import { confirmPurchasedRequest } from '../../redux/controller'

const PurchaseSuccessfully = () => {
    const navigate = useNavigate()
    const dispatch = useDispatchRoot()
    const searchParams = new URLSearchParams(document.location.search)

    useEffect(()=>{
        console.log(searchParams.get('vnp_Amount'))
        console.log(searchParams.get('vnp_BankCode'))
        console.log(searchParams.get('vnp_BankTranNo'))
        console.log(searchParams.get('vnp_CardType'))
        console.log(searchParams.get('vnp_OrderInfo'))
        console.log(searchParams.get('vnp_PayDate'))
        console.log(searchParams.get('vnp_ResponseCode'))
        console.log(searchParams.get('vnp_TmnCode'))
        console.log(searchParams.get('vnp_TransactionNo'))
        console.log(searchParams.get('vnp_TransactionStatus'))
        console.log(searchParams.get('vnp_TxnRef'))
        console.log(searchParams.get('vnp_SecureHash'))
        
    },[])


    const handleConfirmPurchased = () => {
        const bodyrequest = {
            vnp_Amount: searchParams.get('vnp_Amount'),
            vnp_BankCode: searchParams.get('vnp_BankCode'),
            vnp_BankTranNo: searchParams.get('vnp_BankTranNo'),
            vnp_CardType: searchParams.get('vnp_CardType'),
            vnp_OrderInfo: searchParams.get('vnp_OrderInfo'),
            vnp_PayDate: searchParams.get('vnp_PayDate'),
            vnp_ResponseCode: searchParams.get('vnp_ResponseCode'),
            vnp_TmnCode: searchParams.get('vnp_TmnCode'),
            vnp_TransactionNo: searchParams.get('vnp_TransactionNo'),
            vnp_TransactionStatus: searchParams.get('vnp_TransactionStatus'),
            vnp_TxnRef: searchParams.get('vnp_TxnRef'),
            vnp_SecureHash: searchParams.get('vnp_SecureHash')
        }
        
        dispatch(confirmPurchasedRequest(bodyrequest))
        navigate('/')
    }


  return (
    <div
        className='main-container'
    >
        <div className='content-area'>
				<div className='container'>

					<div className='title'>Vui lòng xác nhận để hoàn tất thanh toán</div>
					<div className='button'>
                        <Button
                            onClick={()=>{
                                handleConfirmPurchased()
                            }}
                        >
                            Xác nhận
                        </Button>
                    </div>
				</div>
			</div>
    </div>
  )
}

export default PurchaseSuccessfully