import React, { useEffect } from 'react'
import './purchased-successfully.styles.scss'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatchRoot, useSelectorRoot } from '../../redux/store'
import { confirmPurchasedRequest } from '../../redux/controller'

const PurchaseSuccessfully = () => {
    const {
        userRole
      } = useSelectorRoot((state) => state.login);
    const navigate = useNavigate()
    // const dispatch = useDispatchRoot()
    // const searchParams = new URLSearchParams(document.location.search)

    useEffect(()=>{
        handleConfirmPurchased()
        
    },[])


    const handleConfirmPurchased = () => {
        setInterval(()=>{
            if(userRole === "user") navigate('/buyer/purchased-sketchs')
            else if(userRole === "seller") 	navigate('/seller/purchased-sketchs')
            else navigate('/')
        },5000)


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
                            // onClick={()=>{
                            //     handleConfirmPurchased()
                            // }}
                            disabled={true}
                        >
                            Đang quay lại trang sản phẩm đã mua của bạn
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PurchaseSuccessfully