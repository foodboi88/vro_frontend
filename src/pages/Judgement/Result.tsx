import { ArrowLeftOutlined } from '@ant-design/icons';
import { ChartDonut, ChartThemeColor } from '@patternfly/react-charts';
import { Pagination } from "antd";
import { Variants, motion } from 'framer-motion';
import React, { useState } from 'react';
import { ISetOfQuestions } from '../../common/u-innovate/define-setOfQuestions';
import ResultImage from '../../images/result-image.png';
import './styles.judgement.scss';

interface MyProps {
    receivedResult: any;
    quantityOfEachTypeOfAnswer: number[];
    doneQuestionLst: ISetOfQuestions[];
    totalScoreOfQuestionList: number;
    revertToCriteria: () => void;
    setReceivedResult: React.Dispatch<any>;
    numberOfQuestionList: number;
}
const imageVariants: Variants = {
    offscreen: {
        y: 100,
        opacity: 0
    },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 2
        }
    }
};
const Result = (props: MyProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePageChange = (page: number) => {
        setCurrentIndex(page - 1);
    };

    return (
        <div className='result-answer'>
            <div className='turn-back-btn' >
                <motion.div
                    className='back-button'
                    whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    onClick={() => {
                        props.setReceivedResult(undefined)
                        props.revertToCriteria()
                    }}

                >
                    <div className="icon"><ArrowLeftOutlined /></div>
                    <div className="text">Quay lại</div>
                </motion.div>
            </div>
            <div className='total-score'>
                <div className='total-score-left'>
                    <div className='title' >Kết quả đánh giá của bạn!</div>
                    <div className='sub-title'>Lorem ipsum dolor sit amet consectetur. Ut amet a amet lacinia etiam integer urna pharetra. Malesuada tristique volutpat semper pharetra mauris dis.</div>
                    <div className='detail-total'>
                        {/* <Child> */}
                        <ChartDonut
                            constrainToVisibleArea={true}
                            data={[{ x: 'Quan sát được hoàn toàn', y: props.quantityOfEachTypeOfAnswer[0] }, { x: 'Quan sát được một phần', y: props.quantityOfEachTypeOfAnswer[1] }, { x: 'Không quan sát thấy', y: props.quantityOfEachTypeOfAnswer[2] }]}
                            // labels={({ datum }) => `${datum.x}: ${datum.y}%`}
                            legendData={[{ name: `Quan sát được hoàn toàn: ${props.quantityOfEachTypeOfAnswer[0]} câu` }, { name: `Quan sát được một phần: ${props.quantityOfEachTypeOfAnswer[1]} câu` }, { name: `Không quan sát thấy: ${props.quantityOfEachTypeOfAnswer[2]} câu` }]}
                            legendOrientation="vertical"
                            legendPosition="right"
                            padding={{
                                bottom: 20,
                                left: 20,
                                right: 260, // Adjusted to accommodate legend
                                top: 20
                            }}
                            subTitle={`Tổng ${props.totalScoreOfQuestionList} điểm`}
                            title={props.receivedResult.total}
                            themeColor={ChartThemeColor.multiUnordered}
                            width={400}
                        />
                    </div>
                </div>
                <div className='total-score-right'>
                    <motion.img src={ResultImage} alt=''
                        variants={imageVariants}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 'all' }} />
                </div>
            </div>
            <div className='title-view-test'>
                <div className='title'>Xem lại phần trả lời</div>
                <div className='content'>Lorem ipsum dolor sit amet consectetur. Ut amet a amet lacinia etiam integer urna pharetra. Malesuada tristique volutpat semper pharetra mauris dis.</div>
            </div>
            <div className='taking-test-area'>
                {/* Khi call API se thay doan duoi nay thanh currentSetOfQuestion.content */}
                <div className='sub-title'>{props.doneQuestionLst[currentIndex].content}</div>

                <div className='question-lst'>
                    {
                        props.doneQuestionLst[currentIndex].questionLst.map((item) => ( // Sau nay se thay bang useState currentSetOfQuestion
                            <div>
                                <div className='content'>{item.content}</div>
                                <div className='options-of-answer'>
                                    {
                                        item.answerLst.map((subitem) => (
                                            <label className='lst-item'
                                                style={{ pointerEvents: "none" }}
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
                    <Pagination className='pagination paginnation-result' defaultCurrent={currentIndex + 1} onChange={handlePageChange} total={props.numberOfQuestionList * 10} showLessItems={true} />
                </div>
            </div>
        </div>
    )
}

export default Result