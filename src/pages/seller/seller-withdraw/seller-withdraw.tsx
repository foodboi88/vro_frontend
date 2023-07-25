import { Space, Modal, Button, Input } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import Utils from '../../../common/utils';
import CTable from '../../../components/CTable/CTable';
import { useSelectorRoot, useDispatchRoot } from '../../../redux/store';
import { IGetWithdrawRequest } from '../../../common/user.interface';
import { QUERY_PARAM } from '../../../constants/get-api.constants';
import { createWithdrawRequest, getSellerProfileRequest, getWithdrawRequests } from '../../../redux/controller';
import CoinIcon from '../../../images/coin.png'
import { AiFillCreditCard } from "react-icons/ai";


import './seller-withdraw.styles.scss'
import TotalBox from '../../../components/TotalBox/TotalBox';

const SellerWithdraw = () => {
  const {
    withdrawRequestList,
    totalWithdrawRequestRecord,
    sellerInformation
  } = useSelectorRoot((state) => state.sketch);

  const dispatch = useDispatchRoot()
  const [textSearch, setTextSearch] = useState('');
  const [beginDate, setBeginDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [detailWithdraw, setDetailWithdraw] = useState();
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const [currentSearchValue, setCurrentSearchValue] = useState<IGetWithdrawRequest>(
    {
      size: QUERY_PARAM.size,
      offset: 0
    }
  )

  useEffect(() => {
    dispatch(getWithdrawRequests(currentSearchValue))
    dispatch(getSellerProfileRequest())
  }, [])

  const columns: ColumnType<any>[] = [
    // {
    //     title: 'Tình trạng',
    //     dataIndex: 'status',
    //     key: 'status'
    //   },
    {
      title: 'Số thứ tự',
      render: (_, __, rowIndex) => (
          <span className='span-table'>{rowIndex + 1}</span>
      )
  },
  {
    title: 'Mã yêu cầu',
    dataIndex: 'id',
    key: 'id',
  },
    {
      title: 'Tình trạng xử lý',
      dataIndex: 'isProcessed',
      key: 'isProcessed',
      render: (_, record) => {
        if (record.isProcessed) {
          return (<span>Đã chuyển</span>)
        }
        else {
          return (<span>Chưa chuyển</span>)
        }
      }
    },
    {
      title: 'Lượng tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (_, record) => (
        <span>{Utils.formatMoney(record.amount)} đ</span>
      )
    },
    {
      title: 'Thời gian tạo yêu cầu',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, record) => (
        <span>{new Date(record.createdAt).toLocaleDateString('en-GB')}</span>
      )
    },
 
    //   {
    //     title: 'updatedAt',
    //     dataIndex: 'updatedAt',
    //     key: 'updatedAt',
    // },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={(event) => {
            handleOpenDetail(record)
            setDetailWithdraw(record)
          }}>Xem chi tiết</a>
          <a onClick={(event) => handleOpenDelete(record)}>Xóa</a>
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

  const handleOpenDetail = (record: any) => {

  }


  const handleOpenDelete = (record: any) => {
    setOpenModalDelete(true);
  }

  const handleCreate = () => {

    const bodyrequest = {

      amount: withdrawAmount,
      additionalProp1: {},
      currentSearchValue: currentSearchValue
    }
    dispatch(createWithdrawRequest(bodyrequest));
    setOpenModalCreate(false);
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
      {
        openModalCreate &&
        <div className='approve-request-modal'>
          <Modal
            open={openModalCreate}
            onOk={handleCreate}
            okText={'Xác nhận'}
            title={"Nhập lượng tiền muốn rút"}
            cancelText={'Hủy'}
            closable={true}
            onCancel={() => setOpenModalCreate(false)}
          >
            <Input onChange={(event) => {
              setWithdrawAmount(event.target.value)
            }} />
          </Modal>
        </div>
      }
      {
        openModalDelete &&
        <div className='approve-request-modal'>
          <Modal
            open={openModalDelete}
            // onOk={() => setOpenModalDelete(false)}
            okText={'Xác nhận'}
            cancelText={'Hủy'}
            closable={true}
            onCancel={() => setOpenModalDelete(false)}
          >
            <span>Bạn có chắc chắn muốn xóa yêu cầu này không?</span>
          </Modal>
        </div>
      }
      <div className='create-request'>
        <div className='infor-cards'>
          <TotalBox
            key={1}
            title={`Tài khoản nhận: ${sellerInformation?.bankName}`}
            number={`${sellerInformation?.bankAccountNumber ? sellerInformation?.bankAccountNumber : ''}`}
            icon={CoinIcon}
          />
          <TotalBox
            key={2}
            title={`Chi nhánh`}
            number={`${sellerInformation?.bankBranch ? Utils.formatMoney(sellerInformation?.bankBranch) : ''}`}
            icon={CoinIcon}
          />
          <TotalBox
            key={3}
            title={`Số dư hiện tại`}
            number={`${sellerInformation?.currentBalance ? Utils.formatMoney(sellerInformation?.currentBalance) : 0}Đ`}
            icon={CoinIcon}
          />

        
          
        </div>
        
      </div>
      <Button
          onClick={
            () => {
              setOpenModalCreate(true)
            }
          }
          style={{
            marginTop: "30px"
          }}
        >
          Tạo yêu cầu rút tiền
        </Button>
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