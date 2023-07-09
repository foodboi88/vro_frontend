import { Space, Modal, Button } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { motion } from 'framer-motion';
import React, { useState } from 'react'
import Utils from '../../../common/utils';
import CTable from '../../../components/CTable/CTable';
import { useSelectorRoot, useDispatchRoot } from '../../../redux/store';
import { IGetWithdrawRequest } from '../../../common/user.interface';
import { QUERY_PARAM } from '../../../constants/get-api.constants';
import { getWithdrawRequests } from '../../../redux/controller';
import './seller-withdraw.styles.scss'

const SellerWithdraw = () => {
  const {
    withdrawRequestList,
    totalWithdrawRequestRecord,
  } = useSelectorRoot((state) => state.sketch);

  const [textSearch, setTextSearch] = useState('');
  const [beginDate, setBeginDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [openModalApprove, setOpenModalApprove] = useState(false);
  const [bankId, setBankId] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [amount,setAmount] = useState(0);
  const [receiverName, setReceiverName] = useState('');
  const [withdrawId,setWithdrawId] = useState('');
  const [currentSearchValue, setCurrentSearchValue] = useState<IGetWithdrawRequest>(
    {
      size: QUERY_PARAM.size,
      offset: 0
    }
  )



  const columns: ColumnType<any>[] = [
    // {
    //     title: 'Tình trạng',
    //     dataIndex: 'status',
    //     key: 'status'
    //   },
      {
        title: 'Tình trạng xử lý',
        dataIndex: 'isProcessed',
        key: 'isProcessed',
        render: (_, record) => {
          if(record.isProcessed){
            return (<span>Đã xử lý</span>)
          }
          else{
            return (<span>Chưa xử lý</span>)
          }
        }
      },
      {
        title: 'Lượng tiền',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: 'Thời gian tạo yêu cầu',
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
      {
        title: 'Ngân hàng',
        dataIndex: 'bankName',
        key: 'bankName',
      },
      {
        title: 'Chi nhánh ngân hàng',
        dataIndex: 'bankBranch',
        key: 'bankBranch',
      },
      {
        title: 'Tạo lúc',
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
      //   {
      //     title: 'updatedAt',
      //     dataIndex: 'updatedAt',
      //     key: 'updatedAt',
      // },
     
      {
        title: 'Tên',
        dataIndex: 'name',
        key: 'name',
      },
      {
          title: 'Địa chỉ',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Loại tài khoản',
          dataIndex: 'sellerType',
          key: 'sellerType',
          render: (_, record) => {
            if(record.sellerType === "ARCHITECT"){
              return (<span>Kiến trúc sư</span>)
            }
            else{
              return (<span>Công ty</span>)
            }
          }
        },
        {
          title: 'Địa chỉ',
          dataIndex: 'address',
          key: 'address',
        },
      //   {
      //     title: 'dob',
      //     dataIndex: 'dob',
      //     key: 'dob',
      //   },
      // {
      //   title: 'Tags',
      //   key: 'tags',
      //   dataIndex: 'tags',
      //   render: (_, { tags }) => (
      //     <>
      //       {tags.map((tag) => {
      //         let color = tag.length > 5 ? 'geekblue' : 'green';
      //         if (tag === 'loser') {
      //           color = 'volcano';
      //         }
      //         return (
      //           <Tag color={color} key={tag}>
      //             {tag.toUpperCase()}
      //           </Tag>
      //         );
      //       })}
      //     </>
      //   ),
      // },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <a onClick={(event) => handleOpenApprove(record)}>Chấp nhận</a>
          </Space>
        ),
      },
  ];

  // let statisticalUser = [
  //   {
  //       title: "Tổng số bản vẽ toàn sàn",
  //       number: sketchStatistic?.totalSketch ? sketchStatistic?.totalSketch : 0,
  //       icon: UserIcon,
  //   },
 
  //   {
  //       title: "Tổng số bản vẽ mới",
  //       number: sketchStatistic?.totalNewSketch ? sketchStatistic?.totalNewSketch : 0,
  //       icon: UserMinus,
  //   },
  // ]

  const dispatch = useDispatchRoot()

  const handleOpenApprove = (record: any) => {
    setOpenModalApprove(true);
    setBankId(record.bankName);
    setAccountNo(record.bankAccountNumber);
    setAmount(record.amount);
    setReceiverName(record.name);
    setWithdrawId(record.id)
    
  }

  // const handleApprove = () => {
    
  //   const bodyrequest = {
  //     id: withdrawId,
  //     status: "PENDING",
  //   processedComment: "string",
  //   processedAmount: 0,
  //     currentSearchValue: currentSearchValue
  //   }
  //   dispatch(approveWithdrawRequest(bodyrequest));
  // }

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
    const body: IGetWithdrawRequest = {
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
    dispatch(getWithdrawRequests(finalBody))
  }

  const onChangePagination = (event: any) => {
    currentSearchValue.offset = (event - 1) * QUERY_PARAM.size;
    setCurrentSearchValue(currentSearchValue);
    dispatch(getWithdrawRequests(currentSearchValue))
  }

  return (
    <motion.div className='withdraw-main'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>
      {/* {
        bankId && receiverName && accountNo && amount && 
        <div className='approve-request-modal'>
            <Modal
                open={openModalApprove}
                onOk={handleApprove}
                okText={'Đã chuyển tiền'}
                cancelText={'Hủy'}
                closable={true}
                onCancel={()=>setOpenModalApprove(false)}
            >
                <img src={`https://img.vietqr.io/image/${bankId}-${accountNo}-compact2.png?amount=${amount}&addInfo=thanh%toan%tien&accountName=${receiverName}`}/>
            </Modal>
        </div>
      } */}
      <div className='create-request'>
        <Button>
          Tạo yêu cầu rút tiền
        </Button>
      </div>
      <div className='table-area'>
        <CTable
          tableMainTitle='Danh sách yêu cầu rút tiền'
          allowDateRangeSearch={true}
          allowTextSearch={true}
          onChangeInput={onChangeInput}
          onChangeRangePicker={onChangeRangePicker}
          onSearch={onSearch}
          data={withdrawRequestList}
          titleOfColumnList={columns}
          totalRecord={totalWithdrawRequestRecord}
          onChangePagination={onChangePagination}
        />
      </div>
    </motion.div>
  )
}

export default SellerWithdraw