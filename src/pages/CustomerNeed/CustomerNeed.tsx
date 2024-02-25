import { Breadcrumb, Modal, Pagination } from 'antd'
import React, { useEffect } from 'react'
import './style.customerneed.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getCustomerNeedRequest } from '../../redux/controller'
import { useSelectorRoot } from '../../redux/store'
import { FaRegClock } from 'react-icons/fa'
import UserIcon from "../../images/user_icon.png";
import moment from 'moment'
const CustomerNeed = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { customerNeedLst, totalCustomerNeedRecord } = useSelectorRoot((state) => state.sketch);
    const [currentCustomerNeedIndex, setCurrentCustomerNeedIndex] = React.useState(0)
    const [isOpenPopupCustomerNeed, setIsOpenPopupCustomerNeed] = React.useState(false)
    const [itemPopupCustomerNeed, setItemPopupCustomerNeed] = React.useState<any>(null)
    useEffect(() => {
        getCustomerNeedList()
    }, [])

    useEffect(() => {
        console.log(customerNeedLst)
    }, [customerNeedLst])

    const getCustomerNeedList = () => {
        const req = {
            size: 10,
            offset: 0
        }
        dispatch(getCustomerNeedRequest(req))
    }




    return (
        <div className="main-customer-need">
            <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item onClick={() => navigate('/')}>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item className='bread-crumb-active'>Nhu cầu khách hàng</Breadcrumb.Item>
            </Breadcrumb>

            <div className="customer-requirement-lst">
                <div className="customer-requirement-lst-left">
                    {(customerNeedLst && customerNeedLst.length > 0) && customerNeedLst.slice(0, 5).map((item, index) => (
                        <div className="customer-requirement"
                            onClick={() => {
                                setIsOpenPopupCustomerNeed(true)
                                setItemPopupCustomerNeed(item)
                            }}
                        >
                            <div className="customer-requirement-header">
                                <div className="avatar">
                                    <div className="customer-requirement-avatar">
                                        <img src={item.avatar || UserIcon} />
                                    </div>
                                    <div className="customer-requirement-info">
                                        <div className="customer-requirement-name">{item.userName}</div>
                                        <div className="customer-requirement-time"><FaRegClock />{moment(item.createdAt).format('HH:mm - DD/MM/YYYY')}</div>
                                    </div>
                                </div>

                                <div className="info">
                                    Liên hệ
                                </div>
                            </div>
                            <div className="customer-requirement-title">{item.title}</div>
                            <div className="customer-requirement-content">{item.description}</div>
                            <div className="line-break"></div>
                        </div>
                    ))}
                </div>
                <div className="customer-requirement-lst-left">
                    {(customerNeedLst && customerNeedLst.length > 0) && customerNeedLst.slice(5, 10).map((item, index) => (
                        <>

                            <div className="customer-requirement"
                                onClick={() => {
                                    setIsOpenPopupCustomerNeed(true)
                                    setItemPopupCustomerNeed(item)
                                }}
                            >
                                <div className="customer-requirement-header">
                                    <div className="avatar">
                                        <div className="customer-requirement-avatar">
                                            <img src={item.avatar || UserIcon} />
                                        </div>
                                        <div className="customer-requirement-info">
                                            <div className="customer-requirement-name">{item.userName}</div>
                                            <div className="customer-requirement-time"><FaRegClock />{moment(item.createdAt).format('HH:mm - DD/MM/YYYY')}</div>
                                        </div>
                                    </div>

                                    <div className="info">
                                        Liên hệ
                                    </div>
                                </div>
                                <div className="customer-requirement-title">{item.title}</div>
                                <div className="customer-requirement-content">{item.description}</div>
                                <div className="line-break"></div>
                            </div>
                        </>
                    ))}
                </div>
            </div>

            {/* Thêm pagi cho lst */}

            <Pagination
                total={totalCustomerNeedRecord}
                onChange={(page, pageSize) => {
                    console.log(page, pageSize);
                    const req = {
                        size: 10,
                        offset: (page - 1) * 10
                    }
                    dispatch(getCustomerNeedRequest(req))
                    setCurrentCustomerNeedIndex(page - 1)
                }}
                current={currentCustomerNeedIndex + 1}
                className="pagination"
            />


            {/* Tạo modal antd cho customer need */}
            <Modal
                title="Yêu cầu của khách hàng"
                visible={isOpenPopupCustomerNeed}
                onCancel={() => setIsOpenPopupCustomerNeed(false)}
                footer={null}
                className="customer-requirement-modal"
            >
                <div className="customer-requirement-popup">
                    <div className="customer-requirement-header">
                        <div className="avatar">
                            <div className="customer-requirement-avatar">
                                <img src={itemPopupCustomerNeed?.avatar || UserIcon} />
                            </div>
                            <div className="customer-requirement-info">
                                <div className="customer-requirement-name">{itemPopupCustomerNeed?.userName}</div>
                                <div className="customer-requirement-time"><FaRegClock />{moment(itemPopupCustomerNeed?.createdAt).format('HH:mm - DD/MM/YYYY')}</div>
                            </div>
                        </div>

                        <div className="info">
                            Liên hệ
                        </div>
                    </div>
                    <div className="customer-requirement-title">{itemPopupCustomerNeed?.title}</div>
                    <div className="customer-requirement-content">{itemPopupCustomerNeed?.description}</div>
                </div>
            </Modal>

        </div>
    )
}

export default CustomerNeed