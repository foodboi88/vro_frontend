import React, { useState } from 'react'
import { useDispatchRoot, useSelectorRoot } from '../../../redux/store';
import { createWithdrawRequest, deleteSketchRequest, getSketchByArchitectRequest } from '../../../redux/controller';
import { Space, Modal, Input, Button } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { motion } from 'framer-motion';
import { IGetWithdrawRequest } from '../../../common/user.interface';
import Utils from '../../../common/utils';
import CTable from '../../../components/CTable/CTable';
import { QUERY_PARAM } from '../../../constants/get-api.constants';
import { IFilteredSketch, ISketch } from '../../../common/sketch.interface';

const SellerSketchs = () => {
  const {
    sketchsOfArchitect,
    totalSketchRecords,
  } = useSelectorRoot((state) => state.sketch);

  const [textSearch, setTextSearch] = useState('');
  const [beginDate, setBeginDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [idSketch, setIdSketch] = useState('');

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
      title: 'Tên',
      dataIndex: 'title',
      key: 'title',

    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Tạo lúc',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Phong cách',
      dataIndex: 'designStyle',
      key: 'designStyle',
      render: (_, record) => (
        <span>{record.designStyle.name}</span>
      )
    },
    {
      title: 'Lượng bán được',
      dataIndex: 'typeOfArchitecture',
      key: 'typeOfArchitecture',

      render: (_, record) => (
        <span>{record.typeOfArchitecture.name}</span>
      )
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (_, record) => (
        <img src={record.image} style={{ width: "150px" }} />
      )
    },
    //   {
    //     title: 'updatedAt',
    //     dataIndex: 'updatedAt',
    //     key: 'updatedAt',
    // },


    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
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

  const dispatch = useDispatchRoot()

  const handleOpenDelete = (record: any) => {
    console.log(record);

    // setOpenModalDelete(true);
    // setIdSketch(record.id)
  }

  const handleDelete = () => {

    const bodyrequest = {

      productId: idSketch,
      currentSearchValue: currentSearchValue
    }
    dispatch(deleteSketchRequest(bodyrequest));
    setOpenModalDelete(false);
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
    dispatch(getSketchByArchitectRequest(finalBody))
  }

  const onChangePagination = (event: any) => {
    currentSearchValue.offset = (event - 1) * QUERY_PARAM.size;
    setCurrentSearchValue(currentSearchValue);
    dispatch(getSketchByArchitectRequest(currentSearchValue))
  }

  return (
    <motion.div className='withdraw-main'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}>

      {
        openModalDelete &&
        <div className='approve-request-modal'>
          <Modal
            open={openModalDelete}
            onOk={handleDelete}
            okText={'Xác nhận'}
            cancelText={'Hủy'}
            closable={true}
            onCancel={() => setOpenModalDelete(false)}
          >
            <span>Bạn có chắc chắn muốn xóa bản vẽ này không?</span>
          </Modal>
        </div>
      }

      <div className='table-area'>
        <CTable
          tableMainTitle='Danh sách bản vẽ '
          allowDateRangeSearch={true}
          allowTextSearch={true}
          onChangeInput={onChangeInput}
          onChangeRangePicker={onChangeRangePicker}
          onSearch={onSearch}
          data={sketchsOfArchitect}
          titleOfColumnList={columns}
          totalRecord={totalSketchRecords}
          onChangePagination={onChangePagination}
        />
      </div>
    </motion.div>
  )
}

export default SellerSketchs