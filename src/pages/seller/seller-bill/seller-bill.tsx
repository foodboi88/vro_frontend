import { Divider, Space, Tooltip } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { ColumnType } from 'antd/lib/table';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatchRoot, useSelectorRoot } from '../../../redux/store';
import { QUERY_PARAM } from '../../../constants/get-api.constants';
import { IGetSketchRequest } from '../../../common/sketch.interface';
import { getBillListRequests, getDetailBillRequests } from '../../../redux/controller';
import { IGetUsersRequest } from '../../../common/user.interface';
import Utils from '../../../common/utils';
import CTable from '../../../components/CTable/CTable';
const moment = require('moment');

const SellerBill = () => {
    const {
        totalBillRecord,
        billList,
        detailBill
    } = useSelectorRoot((state) => state.sketch);
    const [openModal, setOpenModal] = useState(false);
    const [textSearch, setTextSearch] = useState('');
    const [beginDate, setBeginDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dataBillLst, setDataBillLst] = useState<any[]>([]);
    const [currentSearchValue, setCurrentSearchValue] = useState<IGetSketchRequest>(
        {
            size: QUERY_PARAM.size,
            offset: 0
        }
    )



    const columns: ColumnType<any>[] = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: 'Tài khoản mua',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Thời gian',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Giá (VNĐ)',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={(event) => handleDetail(record)}>Chi tiết</a>
                </Space>
            ),
        },
    ];

    //   useEffect(()=>{
    //     setOpenModal(true)
    //   },[detailBill])

    const dispatch = useDispatchRoot()

    const handleDetail = (record: any) => {
        console.log('record', record);

        const bodyrequest = {
            id: record.id,
            //   currentSearchValue: currentSearchValue
        }
        dispatch(getDetailBillRequests(bodyrequest));
        setOpenModal(true)
    }

    const onChangeInput = (event: any) => {
        setTextSearch(event.target.value);
    }

    const onChangeRangePicker = (event: any) => {
        if (event) {
            setBeginDate(event[0].format('YYYY-MM-DD'))
            setEndDate(event[1].format('YYYY-MM-DD'))
        }
    }

    const onSearch = () => {
        console.log('hehee')
        const body: IGetUsersRequest = {
            size: QUERY_PARAM.size,
            offset: 0,
            search: textSearch,
            startTime: beginDate,
            endTime: endDate,
            status: '',
            sortBy: '',
            sortOrder: '',
        };
        const finalBody = Utils.getRidOfUnusedProperties(body)
        setCurrentSearchValue(finalBody);
        dispatch(getBillListRequests(finalBody))
    }

    const onChangePagination = (event: any) => {
        currentSearchValue.offset = (event - 1) * QUERY_PARAM.size;
        setCurrentSearchValue(currentSearchValue);
        dispatch(getBillListRequests(currentSearchValue))
    }

    useEffect(() => {
        if (billList.length > 0) {
            const data = billList.map((item: any, index: number) => {
                const date = moment(item.createdAt).format('DD/MM/YYYY');
                return {
                    index: index + 1,
                    userName: item.userName,
                    product:
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                            <img src={item.product.image} alt="" width={50} />
                            <Tooltip title={item.title}>
                                <span className='span-title-table' >{item.product.title}</span>
                            </Tooltip>
                        </div>,
                    createdAt: new Date(date).toLocaleDateString('en-GB'),
                    price: item.price.toLocaleString().replace(/,/g, '.') + 'đ'
                }
            })
            setDataBillLst(data)
        }
    }, [billList])

    return (
        <motion.div className='sketch-main'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            {
                detailBill && openModal &&
                <Modal
                    open={openModal}
                    onOk={() => setOpenModal(false)}
                    okText={'Xác nhận'}
                    cancelText={'Đóng'}
                    closable={true}
                    onCancel={() => setOpenModal(false)}
                    title={'Chi tiết đơn hàng'}
                >
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>Tổng tiền:</div>
                            <div>{detailBill.total}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>Tạo lúc: </div>
                            <div>{detailBill.createdAt}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>Id đơn hàng:</div>
                            <div>{detailBill.orderId}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>Hình thức thanh toán:</div>
                            <div>{detailBill.paymentMethods}</div>
                        </div>
                        <Divider>Thông tin người mua</Divider>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Email:</div>
                                <div>{detailBill.user.email}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Tên:</div>
                                <div>{detailBill.user.name}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Địa chỉ:</div>
                                <div>{detailBill.user.address}</div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>Số điện thoại:</div>
                                <div>{detailBill.user.phone}</div>
                            </div>
                        </div>
                        <Divider>Danh sách sản phẩm</Divider>
                        <div style={{ padding: '10px' }}>
                            {detailBill.products.map((item: any, index: number) => {
                                return (
                                    <div>
                                        <div>Sản phẩm {index + 1}:

                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>{item.title}</div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>{item.price}</div>
                                            <div>
                                                <img style={{ width: "200px" }} src={item.image} />
                                            </div>
                                        </div>
                                        <div>Người bán:
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>Email:</div>
                                                <div>{item.seller.email}</div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>Tên:</div>
                                                <div>{item.seller.name}</div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>Địa chỉ:</div>
                                                <div>{item.seller.address}</div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>Số điện thoại:</div>
                                                <div>{item.seller.phone}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </Modal>
            }
            <div className='table-area'>
                <CTable
                    tableMainTitle='Danh sách đơn hàng'
                    allowDateRangeSearch={true}
                    allowTextSearch={true}
                    onChangeInput={onChangeInput}
                    onChangeRangePicker={onChangeRangePicker}
                    onSearch={onSearch}
                    data={dataBillLst}
                    titleOfColumnList={columns}
                    totalRecord={totalBillRecord}
                    onChangePagination={onChangePagination}
                />
            </div>
        </motion.div>
    )
}

export default SellerBill