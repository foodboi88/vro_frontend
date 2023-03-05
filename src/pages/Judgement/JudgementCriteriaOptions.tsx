import { Avatar, Breadcrumb, Button, List } from 'antd'
import React, { useEffect, useState } from 'react'
import { ICriteria } from '../../common/u-innovate/define-criteria'
import Criteria1 from '../../images/criteria1.png'
import Criteria2 from '../../images/criteria2.png'
import Criteria3 from '../../images/criteria3.png'
import Criteria4 from '../../images/criteria4.png'
import Criteria5 from '../../images/criteria5.png'
import Criteria6 from '../../images/criteria6.png'
import Criteria7 from '../../images/criteria7.png'
import Criteria8 from '../../images/criteria8.png'
import { motion } from 'framer-motion'


interface MyProps {
    tranferFromCriteriaToTest: (criteria: ICriteria) => void;
    revertToIntro: () => void;
    criteriaLst: ICriteria[];
}

const TemporaryCriteriaLst = [
    {
        // id: "1",
        // title: 'LÃNH ĐẠO QUẢN TRỊ',
        // content: "Khả năng lãnh đạo và quản trị tốt là yếu tố quan trọng để phát triển khởi nghiệp và đổi mới văn hoá trong một tổ chức giáo dục đại học. Nhiều tổ chức bao hàm các từ 'doanh nghiệp' và 'tinh thần kinh doanh' trong tuyên bố sứ mệnh của họ, nhưng đối với các tổ chức kinh doanh, đây không chỉ là một tài liệu tham khảo. Phần này nhấn mạnh một số yếu tố quan trọng mà các tổ chức giáo dục đại học có thể xem xét để tăng cường chương trình của họ ",
        urlImage: Criteria1
    },
    {
        // id: "2",
        // title: "NĂNG LỰC TỔ CHỨC",
        urlImage: Criteria2,
        // content: "Năng lực tổ chức của một cơ sở giáo dục đại học thúc đẩy khả năng thực hiện chiến lược của nó. Nếu một tổ chức giáo dục đại học cam kết thực hiện các hoạt động khởi nghiệp để hỗ trợ các mục tiêu chiến lược của mình, thì các nguồn lực chính như tài trợ và đầu tư, con người, chuyên môn và kiến ​​thức, và các hệ thống khuyến khích cần phải được áp dụng để duy trì và phát triển năng lực khởi nghiệp"
    },
    {
        // id: "3",
        // title: "DẠY HỌC VÀ KHỞI NGHIỆP",
        urlImage: Criteria3,
        // content: "Dạy và học khởi nghiệp liên quan đến việc khám phá các phương pháp giảng dạy sáng tạo và tìm cách kích thích tư duy khởi nghiệp. Nó không chỉ là học về kinh doanh, mà còn là tiếp xúc với kinh nghiệm kinh doanh và có được các kỹ năng và năng lực để phát triển tư duy kinh doanh"
    },
    {
        // id: "4",
        // title: "ƯƠM TẠO KHỞI NGHIỆP",
        urlImage: Criteria4,
        // content: "Các tổ chức giáo dục đại học có thể giúp học sinh, sinh viên tốt nghiệp và nhân lực cân nhắc việc khởi nghiệp như một lựa chọn nghề nghiệp. Ngay từ những bước đầu, điều quan trọng là phải giúp các cá nhân định hướng về các mục tiêu thương mại, xã hội, môi trường hoặc lối sống liên quan đến nguyện vọng và ý định kinh doanh của họ"
    },
    {
        // id: "5",
        // title: "CHUYỂN ĐỔI NĂNG LỰC SỐ",
        urlImage: Criteria5,
        // content: "Các cơ sở giáo dục đại học đã và đang triển khai các công nghệ kỹ thuật số, tuy nhiên việc tiếp thu và tích hợp khác nhau giữa các tổ chức và trong các tổ chức. Các các tổ chức giáo dục đại học nên tận dụng tối đa các cơ hội do chuyển đổi kỹ thuật số mang lại và coi công nghệ kỹ thuật số là yếu tố thúc đẩy quan trọng. Phần tự đánh giá này cung cấp một số tuyên bố để phản ánh về năng lực kỹ thuật số của tổ chức giáo dục đại học, được định nghĩa là khả năng tích hợp, tối ưu hóa và chuyển đổi công nghệ kỹ thuật số để hỗ trợ đổi mới và khởi nghiệp"
    },
    {
        // id: "6",
        // title: "TRAO ĐỔI TRI THỨC",
        urlImage: Criteria6,
        // content: "Trao đổi kiến ​​thức là một chất xúc tác quan trọng cho sự đổi mới tổ chức, sự tiến bộ của giảng dạy và nghiên cứu, và sự phát triển của địa phương. Đây là một quá trình liên tục bao gồm 'sứ mệnh thứ ba' của các tổ chức giáo dục đại học, được định nghĩa là việc kích thích và ứng dụng trực tiếp và khai thác kiến ​​thức vì lợi ích của sự phát triển kinh tế, văn hóa và xã hội. Động lực để tăng cường hợp tác và trao đổi kiến ​​thức là tạo ra giá trị cho các tổ chức giáo dục đại học và xã hội"
    },
    {
        // id: "7",
        // title: "QUỐC TẾ HÓA",
        urlImage: Criteria7,
        // content: "Quốc tế hóa là quá trình tích hợp một khía cạnh quốc tế hoặc toàn cầu vào việc thiết kế và cung cấp giáo dục, nghiên cứu và trao đổi kiến thức. Bản thân quốc tế hóa không phải là mục đích cuối cùng mà là phương tiện để thay đổi và cải tiến. Nó đưa ra những cách thức tư duy khác nhau, đặt câu hỏi về các phương pháp giảng dạy truyền thống, đồng thời mở ra cơ hội quản trị và quản lý cho các bên liên quan bên ngoài"
    },
    {
        // id: "8",
        // title: "ĐO LƯỜNG TÁC ĐỘNG",
        urlImage: Criteria8,
        // content: "Các tổ chức giáo dục đại học khởi nghiệp/sáng tạo cần hiểu tác động của những thay đổi mà họ mang lại cho tổ chức của mình. Khái niệm về một tổ chức giáo dục đại học khởi nghiệp/sáng tạo kết hợp sự tự nhận thức của chính tổ chức đó, phản ánh ra bên ngoài và có cách tiếp cận dựa trên bằng chứng. Tuy nhiên, đo lường tác động trong các cơ sở giáo dục đại học vẫn chưa được phát triển. Các phép đo hiện tại thường tập trung vào số lượng công ty con, số lượng và chất lượng của việc tạo ra tài sản trí tuệ và tạo ra thu nhập từ nghiên cứu, thay vì tinh thần khởi nghiệp của sinh viên tốt nghiệp, kết quả giảng dạy và học tập, giữ chân nhân tài, đóng góp cho phát triển kinh tế địa phương hoặc tác động của chương trình nghị sự kinh doanh rộng hơn. Phần này xác định các lĩnh vực mà một tổ chức có thể đo lường tác động"
    },
]

const hoverVariants = {
    hover: {
        scale: 1.1,
        opacity: 0.8,
        borderRadius: '30px'
    },
    tap: {
        scale: 0.8
    },
};
const JudgementCriteriaOptions = (props: MyProps) => {
    const [newOptionsLst, setNewOptionLst] = useState<ICriteria[]>();

    useEffect(() => {// Mapping du lieu nhan ve tu API sang class duoc khai bao o frontend
        let newLst: ICriteria[] = [];
        props.criteriaLst.map((item, index) => {
            newLst.push(
                {
                    description: item.description,
                    id: item.id,
                    name: item.name,
                    ...TemporaryCriteriaLst[index]
                }
            )
        }
        )
        setNewOptionLst(newLst)
    }, [])

    // console.log(props.criteriaLst)

    return (
        <div className='criteria-lst'>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a onClick={() => props.revertToIntro()}>Đánh giá</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item className='present-link'>
                    Bắt đầu đánh giá
                </Breadcrumb.Item>
                {/* <Breadcrumb.Item>
                <a href="">Application List</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>An Application</Breadcrumb.Item> */}
            </Breadcrumb>
            <List
                itemLayout="horizontal"
                dataSource={newOptionsLst}
                renderItem={(item) => (
                    <List.Item
                        onClick={() => props.tranferFromCriteriaToTest(item)}
                        style={{ cursor: "pointer" }}
                    >
                        <motion.div
                            whileHover="hover"
                            whileTap="tap"
                            variants={hoverVariants}
                        >

                            <List.Item.Meta
                                avatar={<img className='criteria-image' src={item.urlImage} />}
                                title={<a className='criteria-title'>{item.name}</a>}
                                description={<div>
                                    <div className='criteria-text'>{item.description}</div>
                                    <Button className='criteria-btn'>Đánh giá</Button>
                                </div>}
                                className="lst-item"
                            />
                        </motion.div>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default JudgementCriteriaOptions