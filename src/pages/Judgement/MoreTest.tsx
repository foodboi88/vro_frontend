import { ArrowLeftOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, List } from 'antd';
import { useEffect, useState } from 'react';
import OtherTestIcon from '../../images/other-test-icon.png';
interface MyProps {
    tranferFromMoreTestToTests: () => void;
}

const fakeOtherTestLst = [
    {
        id: "1",
        title: "Lorem ipsum dolor sit amet consectetur. Ut morbi pellentesque vitae imperdiet. ",
        content: "Lorem ipsum dolor sit amet consectetur. Sit lorem non nullam id aliquam aliquam. Tellus integer porttitor mi blandit lobortis diam integer cursus. At id porttitor arcu eu cursus est. Arcu convallis quis lacus semper enim pretium cras. At nisi turp ..."
    },
    {
        id: "2",
        title: "Lorem ipsum dolor sit amet consectetur. Ut morbi pellentesque vitae imperdiet. ",
        content: "Lorem ipsum dolor sit amet consectetur. Sit lorem non nullam id aliquam aliquam. Tellus integer porttitor mi blandit lobortis diam integer cursus. At id porttitor arcu eu cursus est. Arcu convallis quis lacus semper enim pretium cras. At nisi turp ..."
    },
    {
        id: "3",
        title: "Lorem ipsum dolor sit amet consectetur. Ut morbi pellentesque vitae imperdiet. ",
        content: "Lorem ipsum dolor sit amet consectetur. Sit lorem non nullam id aliquam aliquam. Tellus integer porttitor mi blandit lobortis diam integer cursus. At id porttitor arcu eu cursus est. Arcu convallis quis lacus semper enim pretium cras. At nisi turp ..."
    },
    {
        id: "4",
        title: "Lorem ipsum dolor sit amet consectetur. Ut morbi pellentesque vitae imperdiet. ",
        content: "Lorem ipsum dolor sit amet consectetur. Sit lorem non nullam id aliquam aliquam. Tellus integer porttitor mi blandit lobortis diam integer cursus. At id porttitor arcu eu cursus est. Arcu convallis quis lacus semper enim pretium cras. At nisi turp ..."
    },
    {
        id: "5",
        title: "Lorem ipsum dolor sit amet consectetur. Ut morbi pellentesque vitae imperdiet. ",
        content: "Lorem ipsum dolor sit amet consectetur. Sit lorem non nullam id aliquam aliquam. Tellus integer porttitor mi blandit lobortis diam integer cursus. At id porttitor arcu eu cursus est. Arcu convallis quis lacus semper enim pretium cras. At nisi turp ..."
    },
    {
        id: "6",
        title: "Lorem ipsum dolor sit amet consectetur. Ut morbi pellentesque vitae imperdiet. ",
        content: "Lorem ipsum dolor sit amet consectetur. Sit lorem non nullam id aliquam aliquam. Tellus integer porttitor mi blandit lobortis diam integer cursus. At id porttitor arcu eu cursus est. Arcu convallis quis lacus semper enim pretium cras. At nisi turp ..."
    },
    {
        id: "7",
        title: "Lorem ipsum dolor sit amet consectetur. Ut morbi pellentesque vitae imperdiet. ",
        content: "Lorem ipsum dolor sit amet consectetur. Sit lorem non nullam id aliquam aliquam. Tellus integer porttitor mi blandit lobortis diam integer cursus. At id porttitor arcu eu cursus est. Arcu convallis quis lacus semper enim pretium cras. At nisi turp ..."
    },
    {
        id: "8",
        title: "Lorem ipsum dolor sit amet consectetur. Ut morbi pellentesque vitae imperdiet. ",
        content: "Lorem ipsum dolor sit amet consectetur. Sit lorem non nullam id aliquam aliquam. Tellus integer porttitor mi blandit lobortis diam integer cursus. At id porttitor arcu eu cursus est. Arcu convallis quis lacus semper enim pretium cras. At nisi turp ..."
    },
    {
        id: "9",
        title: "Lorem ipsum dolor sit amet consectetur. Ut morbi pellentesque vitae imperdiet. ",
        content: "Lorem ipsum dolor sit amet consectetur. Sit lorem non nullam id aliquam aliquam. Tellus integer porttitor mi blandit lobortis diam integer cursus. At id porttitor arcu eu cursus est. Arcu convallis quis lacus semper enim pretium cras. At nisi turp ..."
    },

]
const MoreTest = (props: MyProps) => {
    const [numberColumn, setNumberColumn] = useState<number>(3);

    useEffect(() => {
        const handleWindowResize = () => {
            if (window.innerWidth <= 900)
                setNumberColumn(2)
            if (window.innerWidth <= 600)
                setNumberColumn(1)
            else
                setNumberColumn(3)
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });

    return (
        <div className='more-test'>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <div className='back-test' onClick={() => props.tranferFromMoreTestToTests()}>
                        <div className="icon"><ArrowLeftOutlined /></div>
                        <div className="text">Quay lại</div>
                    </div>
                </Breadcrumb.Item>
            </Breadcrumb>
            <div className='test-body'>
                <div className='other-tests'>
                    <List
                        grid={{ gutter: 30, column: numberColumn }}
                        dataSource={fakeOtherTestLst}
                        renderItem={(item) => (
                            <List.Item className='baka'>
                                <div className='test'>
                                    <div className='title'>{item.title}</div>
                                    <div className='content'>{item.content}</div>
                                    <div className='btn-and-icon' style={{ display: 'flex', justifyContent: 'space-between', margin: '15px' }}>
                                        <div>
                                            <img src={OtherTestIcon} />
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <Button className='button'>TẢI VỀ</Button>
                                            <Button className='button'>XEM THÊM</Button>
                                        </div>
                                    </div>
                                </div>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

export default MoreTest