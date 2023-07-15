import React, { useEffect } from 'react'
import './purchased-successfully.styles.scss'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatchRoot, useSelectorRoot } from '../../redux/store'
import { confirmPurchasedRequest } from '../../redux/controller'

const PurchaseSuccessfully = () => {
    const navigate = useNavigate()
    const dispatch = useDispatchRoot()
    const { tokenLogin, accesstokenExpỉred, userName, userRole } = useSelectorRoot((state) => state.login);

    const searchParams = new URLSearchParams(document.location.search)

    useEffect(() => {
        document.body.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [navigate]);


    useEffect(() => {
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

    }, [])


    const handleConfirmPurchased = () => {
        if(userRole === "user") navigate('/profile/purchased-sketchs')
        else if(userRole === "seller") 	navigate('/seller/purchased-sketchs')
        else navigate('/')


    }


    return (
        <div
            className='main-container'
        >
            <div className='content-area'>
                <div className='container'>

                    <div className='title'>Đã thanh toán thành công</div>
                    <div className='button'>
                        <Button
                            onClick={() => {
                                handleConfirmPurchased()
                            }}
                        >
                            Quay lại trang danh sách sản phẩm đã mua của bạn
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PurchaseSuccessfully