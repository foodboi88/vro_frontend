import React, { useEffect } from 'react'
import './style.statisticalproduct.scss'
import CTable from '../CTable/CTable'
import { useDispatchRoot, useSelectorRoot } from '../../redux/store'
import { getHotProductRequest } from '../../redux/controller'
import { IHotProducts } from '../../common/user.interface'
import { ColumnType } from 'antd/lib/table'
import { Tooltip } from 'antd'
const StatisticalProduct = () => {

    const columns: ColumnType<any>[] = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Đã bán',
            dataIndex: 'quantityPurchased',
            key: 'quantityPurchased',
        },
        {
            title: 'Doanh thu',
            dataIndex: 'revenue',
            key: 'revenue',
        }

    ];
    const [numberProduct, setNumberProduct] = React.useState<number>(6)
    const [dataHotProducts, setDataHotProducts] = React.useState<any>([])
    const { hotProducts } = useSelectorRoot((state) => state.sketch); // lấy ra state từ store
    const dispatch = useDispatchRoot() // dispatch action       

    useEffect(() => {
        const req = {
            size: 6,
            offset: 0,
        }
        dispatch(getHotProductRequest(req));
    }, [])

    useEffect(() => {
        setNumberProduct(hotProducts.length)
        // setDataHotProducts(hotProducts)
        if (hotProducts.length > 0) {
            // Gán dữ liệu lấy được vào biến data
            const data = hotProducts.map((item: IHotProducts, index: number) => {
                // Chuyển đổi dữ liệu lấy được thành dạng dữ liệu của bảng
                return {
                    title:
                        <div className='title-table'>
                            <img src={item.image} alt="" width={50} />
                            <Tooltip title={item.title}>
                                <span className='span-title-table' >{item.title}</span>
                            </Tooltip>
                        </div>,
                    price: item.price.toLocaleString().replace(/,/g, '.') + 'đ',
                    quantityPurchased: item.quantityPurchased,
                    revenue: item.revenue.toLocaleString().replace(/,/g, '.') + 'đ',

                }
            });
            // Gán dữ liệu vào biến dataTagPigs
            setDataHotProducts(data);
        }
    }, [hotProducts])

    const onChangeInput = (event: any) => {
        console.log(event.target.value)
    }

    const onChangeRangePicker = (event: any) => {
        console.log(event)
    }

    const onSearch = () => {
        console.log('hehee')
    }

    const onChangePagination = (event: any) => {
        console.log(event)
        document.body.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <div className='main-static-product'>
            <div className="static-product-title">
                Top {numberProduct} sản phẩm bán chạy
            </div>
            <div className="static-product-content">
                <CTable
                    tableMainTitle=''
                    allowDateRangeSearch={false}
                    allowTextSearch={false}
                    onChangeInput={onChangeInput}
                    onChangeRangePicker={onChangeRangePicker}
                    onSearch={onSearch}
                    data={dataHotProducts}
                    titleOfColumnList={columns}
                    totalRecord={hotProducts.length}
                    onChangePagination={onChangePagination}
                />
            </div>
        </div>
    )
}

export default StatisticalProduct
