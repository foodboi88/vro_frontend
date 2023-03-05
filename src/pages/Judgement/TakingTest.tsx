import { ArrowRightOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, notification, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import QuestionAPI from '../../api/questions/question.api';
import { ICriteria } from '../../common/u-innovate/define-criteria';
import { IQuestion } from '../../common/u-innovate/define-question';
import { ISetOfQuestions } from '../../common/u-innovate/define-setOfQuestions';
import OtherTestIcon from '../../images/other-test-icon.png';

import Result from './Result';
import { motion } from 'framer-motion';

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

]
const fakeSetOfQuestions1: IQuestion[] = [
    // {
    //     id: "1",
    //     content: "1.1 Nhà trường có tuyên bố sứ mệnh, tầm nhìn về đổi mới sáng tạo và khởi nghiệp",
    //     answerLst: [
    //         {
    //             id: "1",
    //             content: "Quan sát được hoàn toàn"
    //         },
    //         {
    //             id: "2",
    //             content: "Quan sát được một phần"
    //         },
    //         {
    //             id: "3",
    //             content: "Không quan sát thấy"
    //         },
    //     ],
    //     pickedAnswer: null
    // },
    // {
    //     id: "2",
    //     content: "1.2 Nhà trường có chiến lược về đổi mới sáng tạo và khởi nghiệp cho toàn trường",
    //     answerLst: [
    //         {
    //             id: "1",
    //             content: "Quan sát được hoàn toàn"
    //         },
    //         {
    //             id: "2",
    //             content: "Quan sát được một phần"
    //         },
    //         {
    //             id: "3",
    //             content: "Không quan sát thấy"
    //         },
    //     ],
    //     pickedAnswer: null
    // },
    // {
    //     id: "3",
    //     content: "1.3 Toàn bộ cán bộ, nhân viên, người học được truyền thông và hiểu rằng ĐMST&KN là ưu tiên hàng đầu của Nhà trường",
    //     answerLst: [
    //         {
    //             id: "1",
    //             content: "Quan sát được hoàn toàn"
    //         },
    //         {
    //             id: "2",
    //             content: "Quan sát được một phần"
    //         },
    //         {
    //             id: "3",
    //             content: "Không quan sát thấy"
    //         },
    //     ],
    //     pickedAnswer: null
    // },
    // {
    //     id: "4",
    //     content: "1.4 Lộ trình chiến lược về ĐMST&KN của Nhà trường được định dạng đơn giản, và được truyền thông rộng rãi trong toàn bộ Nhà trường",
    //     answerLst: [
    //         {
    //             id: "1",
    //             content: "Quan sát được hoàn toàn"
    //         },
    //         {
    //             id: "2",
    //             content: "Quan sát được một phần"
    //         },
    //         {
    //             id: "3",
    //             content: "Không quan sát thấy"
    //         },
    //     ],
    //     pickedAnswer: null
    // },
    // {
    //     id: "5",
    //     content: "1.5 Văn bản chiến lược về ĐMST&KN có đề cập đến việc thường xuyên xem xét, đánh giá, cập nhật cho phù hợp",
    //     answerLst: [
    //         {
    //             id: "1",
    //             content: "Quan sát được hoàn toàn"
    //         },
    //         {
    //             id: "2",
    //             content: "Quan sát được một phần"
    //         },
    //         {
    //             id: "3",
    //             content: "Không quan sát thấy"
    //         },
    //     ],
    //     pickedAnswer: null
    // },

]

const fakeSetOfQuestions2: IQuestion[] = [
    // {
    //     id: "6",
    //     content: "4.1 Nhà trường tích cực tham gia vào việc phát triển và thực hiện các chiến lược ĐMST&KN của địa phương, khu vực và / hoặc quốc gia",
    //     answerLst: [
    //         {
    //             id: "1",
    //             content: "Quan sát được hoàn toàn"
    //         },
    //         {
    //             id: "2",
    //             content: "Quan sát được một phần"
    //         },
    //         {
    //             id: "3",
    //             content: "Không quan sát thấy"
    //         },
    //     ],
    //     pickedAnswer: null
    // },
    // {
    //     id: "7",
    //     content: "4.2 Nhà trường cho phép cộng đồng địa phương được tiếp cận, sử dụng cơ sở vật chất của Nhà trường",
    //     answerLst: [
    //         {
    //             id: "1",
    //             content: "Quan sát được hoàn toàn"
    //         },
    //         {
    //             id: "2",
    //             content: "Quan sát được một phần"
    //         },
    //         {
    //             id: "3",
    //             content: "Không quan sát thấy"
    //         },
    //     ],
    //     pickedAnswer: null
    // },
    // {
    //     id: "8",
    //     content: "4.3 Nhà trường hỗ trợ các công ty khởi nghiệp tại địa phương để tăng cường đổi mới và tăng trưởng",
    //     answerLst: [
    //         {
    //             id: "1",
    //             content: "Quan sát được hoàn toàn"
    //         },
    //         {
    //             id: "2",
    //             content: "Quan sát được một phần"
    //         },
    //         {
    //             id: "3",
    //             content: "Không quan sát thấy"
    //         },
    //     ],
    //     pickedAnswer: null
    // },
    // {
    //     id: "9",
    //     content: "4.4 Nhà trường có sự hiện diện mạnh mẽ trong cộng đồng địa phương, bằng cách hỗ trợ các hoạt động văn hóa và nghệ thuật địa phương",
    //     answerLst: [
    //         {
    //             id: "1",
    //             content: "Quan sát được hoàn toàn"
    //         },
    //         {
    //             id: "2",
    //             content: "Quan sát được một phần"
    //         },
    //         {
    //             id: "3",
    //             content: "Không quan sát thấy"
    //         },
    //     ],
    //     pickedAnswer: null
    // },


]

const fakeSetOfQuestionsLst: ISetOfQuestions[] = [
    {
        id: '1',
        content: "4.1 Nhà trường tích cực tham gia vào việc phát triển và thực hiện các chiến lược ĐMST&KN của địa phương, khu vực và / hoặc quốc gia",
        questionLst: fakeSetOfQuestions1
    },
    {
        id: '2',
        content: "4.1 Nhà trường tích cực tham gia vào việc phát triển và thực hiện các chiến lược ĐMST&KN của địa phương, khu vực và / hoặc quốc gia",
        questionLst: fakeSetOfQuestions2
    },
    {
        id: '3',
        content: "4.1 Nhà trường tích cực tham gia vào việc phát triển và thực hiện các chiến lược ĐMST&KN của địa phương, khu vực và / hoặc quốc gia",
        questionLst: []
    },
    {
        id: '4',
        content: "4.1 Nhà trường tích cực tham gia vào việc phát triển và thực hiện các chiến lược ĐMST&KN của địa phương, khu vực và / hoặc quốc gia",
        questionLst: []
    },
    {
        id: '5',
        content: "4.1 Nhà trường tích cực tham gia vào việc phát triển và thực hiện các chiến lược ĐMST&KN của địa phương, khu vực và / hoặc quốc gia",
        questionLst: []
    },
    {
        id: '6',
        content: "4.1 Nhà trường tích cực tham gia vào việc phát triển và thực hiện các chiến lược ĐMST&KN của địa phương, khu vực và / hoặc quốc gia",
        questionLst: []
    },
    {
        id: '7',
        content: "4.1 Nhà trường tích cực tham gia vào việc phát triển và thực hiện các chiến lược ĐMST&KN của địa phương, khu vực và / hoặc quốc gia",
        questionLst: []
    },
    {
        id: '8',
        content: "4.1 Nhà trường tích cực tham gia vào việc phát triển và thực hiện các chiến lược ĐMST&KN của địa phương, khu vực và / hoặc quốc gia",
        questionLst: []
    },
    {
        id: '9',
        content: "4.1 Nhà trường tích cực tham gia vào việc phát triển và thực hiện các chiến lược ĐMST&KN của địa phương, khu vực và / hoặc quốc gia",
        questionLst: []
    },

]
interface MyProps {
    revertToIntro: () => void; // Chuyen qua lai giua cac phan cua danh gia
    revertToCriteria: () => void
    tranferFromTestToMoreTests: () => void;
    questionLst: ISetOfQuestions[];
    choseCriteria: ICriteria;
    numberOfQuestions: number;
}

const TakingTest = (props: MyProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentSetOfQuestion, setCurrentSetOfQuestion] = useState<ISetOfQuestions>(); // Set lai moi khi chon phan pagination
    const [currentChoseAnswerId, setCurrentChoseAnswerId] = useState<number>(0);
    const [receivedResult, setReceivedResult] = useState<any>();
    let questionLstOfRequestBody: any[] = []; // doi lai form cua questionLst cho phu hop voi bodyRequest cua API
    let quantityOfEachTypeOfAnswer: number[] = [0, 0, 0]; // Lst luu lai so luong cau tra loi moi loai, vi tri 0 luu cau tra loi "quan sat hoan toan", 1 la "quan sat duoc 1 phan", 2 la "khong quan sat duoc"    const [numberOfQuestionsAnswered, setNumberOfQuestionsAnswered] = useState<number>(0); // Kiểm tra xem đã điền hết đáp án của trang để hiển thị nút tiếp tuc
    const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);
    const [quantityOfEachTypeOfAnswerUseState, setquantityOfEachTypeOfAnswerUseState] = useState<number[]>([0, 0, 0]);
    const [numberOfQuestionsAnswered, setNumberOfQuestionsAnswered] = useState<number>(0); // Kiểm tra xem đã điền hết đáp án của trang để hiển thị nút tiếp tuc
    const [totalScoreOfQuestionList, setTotalScoreOfQuestionList] = useState<number>(0); // Tổng số điểm của danh sách câu hỏi
    const [checkNextBtn, setCheckNextBtn] = useState<boolean>(false); // Kiểm tra xem đã điền hết đáp án của trang để hiển thị nút tiếp tuc

    useEffect(() => {
        console.log('----------------RENDERED-------------------')
        console.log(props.questionLst)
        let count = 0;
        props.questionLst.forEach(item => {
            count += item.questionLst.length;
        });
        setNumberOfQuestions(count);
    }, [])

    useEffect(() => {
        console.log('----------------RENDERED-------------------')
        console.log(props.numberOfQuestions);
    })
    useEffect(() => {
        countQuestionIsAnswered();
        checkIsPartOfQuestionIsAnswered();
    }, [currentChoseAnswerId])

    useEffect(() => {
        checkIsPartOfQuestionIsAnswered();
    }, [currentIndex])

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentIndex(value - 1);
    };
    // Đếm số lượng câu hỏi đã được trả lời 
    const countQuestionIsAnswered = () => {
        let count = 0;
        props.questionLst.forEach(item => {
            item.questionLst.forEach(question => {
                if (question.pickedAnswer) count += 1;
            });
        });
        setNumberOfQuestionsAnswered(count);
    }
    // Kiểm tra xem từng trang của danh sách câu hỏi đã được trả lời hết chưa
    const checkIsPartOfQuestionIsAnswered = () => {
        for (let i = 0; i < props.questionLst[currentIndex].questionLst.length; i++) {
            if (!props.questionLst[currentIndex].questionLst[i].pickedAnswer) {
                setCheckNextBtn(false);
                return;
            }
        }
        props.questionLst.length === currentIndex + 1 ? setCheckNextBtn(false) : setCheckNextBtn(true);
    }
    const checkWhetherDoneTest = () => { // Check xem nguoi dung da nhap het cau tra loi chua
        let check = 1;
        questionLstOfRequestBody = [];
        props.questionLst.forEach((item) => {
            if (check === 0) return;
            item.questionLst.forEach((subitem) => {
                if (subitem.pickedAnswer === null) {
                    check = 0;
                    return;
                } else {
                    questionLstOfRequestBody.push({ // Neu cau hoi da duoc chon dap an thi se day ID cau hoi va ID cau tra loi vao lst
                        "questionId": subitem.id,
                        "answerId": subitem.pickedAnswer.id,
                        "point": subitem.pickedAnswer.point,
                        "additionalProp1": {}
                    })
                }
            })
        })
        if (check === 1) return true;
        else {
            questionLstOfRequestBody = [] // Neu chi can 1 cau hoi chua duoc tra loi thi se xoa toan bo lst
            return false
        };
    }
    const handleChangePagination = () => {
        setCurrentIndex(currentIndex + 1);
        setCheckNextBtn(false);
    };
    const handleBackPagination = () => {
        setCurrentIndex(currentIndex - 1);
        setCheckNextBtn(true);
    }

    const handlePageChange = (page: number) => {
        setCurrentIndex(page - 1);
    };
    const handleFinishTest = async () => { // Neu da nhap het cau tra loi thi se call API tinh toan diem 
        console.log("---------------Leu leu leu----------------")

        if (checkWhetherDoneTest() === true) {
            console.log('-----------------Mai la anh em ban nhe------------------')
            console.log(props.questionLst)
            let count = 0;
            // Luu lai so luong cau tra loi moi loai
            props.questionLst.forEach((item) => {
                count += item.questionLst.length * 5;
                item.questionLst.forEach((subitem) => {
                    console.log(subitem.pickedAnswer?.id);
                    if (subitem.pickedAnswer?.id === "63c4109aa5775a103cdc9de0") { // Quan sat duoc hoan toan
                        quantityOfEachTypeOfAnswer[0] += 1
                    } else if (subitem.pickedAnswer?.id === "63c410a6a5775a103cdc9de2") { // Quan sat duoc 1 phan
                        quantityOfEachTypeOfAnswer[1] += 1
                    } else {
                        quantityOfEachTypeOfAnswer[2] += 1 // KHong quan sat duoc
                    }
                })
            })

            console.log(quantityOfEachTypeOfAnswer)
            setquantityOfEachTypeOfAnswerUseState(quantityOfEachTypeOfAnswer)
            setTotalScoreOfQuestionList(count);
            //Call API tinh diem

            await QuestionAPI.caculateResult(questionLstOfRequestBody).then(res => {
                console.log(res.data.data);
                setReceivedResult(res.data.data);
            })
        }
    }

    return (
        <div className='taking-test'>
            {
                receivedResult && quantityOfEachTypeOfAnswerUseState &&
                <Result
                    receivedResult={receivedResult}
                    quantityOfEachTypeOfAnswer={quantityOfEachTypeOfAnswerUseState}
                    doneQuestionLst={props.questionLst}
                    revertToCriteria={props.revertToCriteria}
                    setReceivedResult={setReceivedResult}
                    totalScoreOfQuestionList={totalScoreOfQuestionList}
                    numberOfQuestionList={props.numberOfQuestions}
                />
            }
            {
                !receivedResult &&
                <div>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <a onClick={() => props.revertToIntro()}>Đánh giá</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a onClick={() => { props.revertToCriteria() }}>Bắt đầu đánh giá</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item className='present-link'>
                            {props.choseCriteria.name}
                        </Breadcrumb.Item>
                        {/* <Breadcrumb.Item>
                        <a href="">Application List</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>An Application</Breadcrumb.Item> */}
                    </Breadcrumb>
                    <div className='test-body'>
                        <div className='test-detail'>
                            <div className='title'>{props.choseCriteria.name}</div>
                            <div className='text'>Bạn có thể đọc về các yếu tố đánh giá của U.innovate và tải xuống ghi chú Khái niệm, cung cấp thông tin cơ bản về U.innovate và khái niệm về các trường đại học khởi nghiệp</div>
                            <div className='taking-test-area'>
                                {/* Khi call API se thay doan duoi nay thanh currentSetOfQuestion.content */}
                                <div className='sub-title'>{props.questionLst[currentIndex].content}</div>

                                <div className='question-lst' >
                                    {
                                        props.questionLst[currentIndex].questionLst.map((item) => ( // Sau nay se thay bang useState currentSetOfQuestion
                                            <div>
                                                <div className='content'>{item.content}</div>
                                                <div className='options-of-answer'>
                                                    {
                                                        item.answerLst.map((subitem) => (
                                                            <label className='lst-item'
                                                                onClick={() => {
                                                                    item.pickedAnswer = subitem
                                                                    setCurrentChoseAnswerId(currentChoseAnswerId + 1)
                                                                    console.log(item);
                                                                }}
                                                            >
                                                                <input
                                                                    type="radio" className="radio-btn"
                                                                    checked={item.pickedAnswer === subitem}
                                                                    value={subitem.id} id={subitem.id} name={item.id}
                                                                />
                                                                <div className="label">{subitem.content}</div>
                                                            </label>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className='footer'>
                                    {/* <Pagination className='pagination' page={currentIndex + 1} onChange={handleChange} count={props.questionLst.length} variant="outlined" siblingCount={0} /> */}
                                    <Pagination className='pagination' current={currentIndex + 1} total={props.numberOfQuestions * 10} onChange={handlePageChange} showLessItems={true} />
                                    <div className='button-group'>
                                        <div className='number-of-questions-answered'>
                                            Đã trả lời: {numberOfQuestionsAnswered}/{numberOfQuestions}
                                        </div>
                                        {/* {(checkWhetherDoneTest()) && <Button className='button' onClick={() => { handleFinishTest() }}>Hoàn thành</Button>} */}
                                        {currentIndex > 0 &&
                                            <motion.div className='taking-test-button'
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}>
                                                {/* <Button onClick={handleClickLogin}>Đăng nhập</Button> */}
                                                <Button className='button' onClick={() => { handleBackPagination() }}>Quay lại</Button>
                                            </motion.div>
                                        }
                                        {checkNextBtn &&
                                            <motion.div className='taking-test-button'
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}>
                                                <Button className='button' onClick={() => { handleChangePagination() }}>Tiếp tục</Button>
                                            </motion.div>
                                        }
                                        {
                                            (props.questionLst.length === currentIndex + 1 && checkWhetherDoneTest()) &&
                                            <motion.div className='taking-test-button'
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}>
                                                <Button className='button' onClick={() => { handleFinishTest() }}>Hoàn thành</Button>
                                            </motion.div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default TakingTest