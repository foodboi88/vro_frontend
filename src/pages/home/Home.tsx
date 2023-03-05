/* eslint-disable jsx-a11y/iframe-has-title */
import { EyeOutlined } from '@ant-design/icons';
import { Button, Card, notification } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { Variants, motion, useTransform, useViewportScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageOfIntro from '../../images/home_image_1.png';
import HowToUse from '../../images/home_image_2.png';
import HowToUse1 from '../../images/how_to_use1.png';
import HowToUse2 from '../../images/how_to_use2.png';
import HowToUse3 from '../../images/how_to_use3.png';
import HowToUse4 from '../../images/how_to_use4.png';
import HowToUse5 from '../../images/how_to_use5.png';
import RightOfUseImage1 from '../../images/right_of_use_image_1.png';
import RightOfUseImage2 from '../../images/right_of_use_image_2.png';
import RightOfUseImage3 from '../../images/right_of_use_image_3.png';
import RightOfUseImage4 from '../../images/right_of_use_image_4.png';
import RightOfUseImage5 from '../../images/right_of_use_image_5.png';
import { useSelectorRoot } from '../../redux/store';
import BietThu from '../../images/homepage/bietthu1.png'
import './styles.home.scss';

// Phần trang chủ của trang web
const Home = () => {
    const { tokenLogin, user } = useSelectorRoot((state) => state.login);
    const navigate = useNavigate();
    const mapRef = useRef<any>(null);

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
    useEffect(() => {
        if (mapRef.current) {
            const mapDoc = mapRef.current.contentWindow?.document;
            if (mapDoc) {
                const placeCard = mapDoc.querySelector('.place-card');
                if (placeCard) {
                    placeCard.style.backgroundColor = 'red';
                }
            }
        }
    }, [mapRef]);

    const handleOnClick = () => {
        if (!tokenLogin) {
            notification['warning']({
                message: 'Vui lòng đăng nhập tài khoản trước',
                style: {
                    width: '100%'
                }
            });
        }
        else {
            navigate('/test')
        }
    }
    return (
        <motion.div
            className='main-home'
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
        >
            
            <div className='tool-of-web'>
                <div className="title">
                    <div>
                        Danh sách bản vẽ nổi bật
                    </div>
                    <div className='sub-title'>
                        {'Xem thêm ->'}
                    </div>
                </div>
                <div className="lst-tool">
                    <motion.div
                        className="tool"
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}
                    >
                        <Card
                            className='card'
                            hoverable
                            cover={<img alt="example" src={BietThu} />}
                        >
                            <div className='title-and-price'>
                                <Meta title="Bản vẽ biệt thự 2 tầng" description="File Sketchup" />
                                <span>500.000Đ</span>
                            </div>
                            <div className='seen-times'>
                                <EyeOutlined />
                                <span>100</span>
                            </div>

                        </Card>
                    </motion.div>
                    <motion.div
                        className="tool"
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}
                    >
                        <Card
                            className='card'
                            hoverable
                            cover={<img alt="example" src={BietThu} />}
                        >
                            <div className='title-and-price'>
                                <Meta title="Bản vẽ biệt thự 2 tầng" description="File Sketchup" />
                                <span>500.000Đ</span>
                            </div>
                            <div className='seen-times'>
                                <EyeOutlined />
                                <span>100</span>
                            </div>

                        </Card>
                    </motion.div>
                    <motion.div
                        className="tool"
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}
                    >
                        <Card
                            className='card'
                            hoverable
                            cover={<img alt="example" src={BietThu} />}                        >
                            <div className='title-and-price'>
                                <Meta title="Bản vẽ biệt thự 2 tầng" description="File Sketchup" />
                                <span>500.000Đ</span>
                            </div>
                            <div className='seen-times'>
                                <EyeOutlined />
                                <span>100</span>
                            </div>

                        </Card>
                    </motion.div>
                    <motion.div
                        className="tool"
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}
                    >
                        <Card
                            className='card'
                            hoverable
                            cover={<img alt="example" src={BietThu} />}                        >
                            <div className='title-and-price'>
                                <Meta title="Bản vẽ biệt thự 2 tầng" description="File Sketchup" />
                                <span>500.000Đ</span>
                            </div>
                            <div className='seen-times'>
                                <EyeOutlined />
                                <span>100</span>
                            </div>

                        </Card>
                    </motion.div>
                    
                </div>
            </div>
            <div className='tool-of-web'>
                <div className="title">
                    <div>
                        Danh sách bản vẽ nổi bật
                    </div>
                    <div className='sub-title'>
                        {'Xem thêm ->'}
                    </div>
                </div>
                <div className="lst-tool">
                    <motion.div
                        className="tool"
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}
                    >
                        <Card
                            className='card'
                            hoverable
                            cover={<img alt="example" src={BietThu} />}                        >
                            <div className='title-and-price'>
                                <Meta title="Bản vẽ biệt thự 2 tầng" description="File Sketchup" />
                                <span>500.000Đ</span>
                            </div>
                            <div className='seen-times'>
                                <EyeOutlined />
                                <span>100</span>
                            </div>

                        </Card>
                    </motion.div>
                    <motion.div
                        className="tool"
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}
                    >
                        <Card
                            className='card'
                            hoverable
                            cover={<img alt="example" src={BietThu} />}                        >
                            <div className='title-and-price'>
                                <Meta title="Bản vẽ biệt thự 2 tầng" description="File Sketchup" />
                                <span>500.000Đ</span>
                            </div>
                            <div className='seen-times'>
                                <EyeOutlined />
                                <span>100</span>
                            </div>

                        </Card>
                    </motion.div>
                    <motion.div
                        className="tool"
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}
                    >
                        <Card
                            className='card'
                            hoverable
                            cover={<img alt="example" src={BietThu} />}                        >
                            <div className='title-and-price'>
                                <Meta title="Bản vẽ biệt thự 2 tầng" description="File Sketchup" />
                                <span>500.000Đ</span>
                            </div>
                            <div className='seen-times'>
                                <EyeOutlined />
                                <span>100</span>
                            </div>

                        </Card>
                    </motion.div>
                    <motion.div
                        className="tool"
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}
                    >
                        <Card
                            className='card'
                            hoverable
                            cover={<img alt="example" src={BietThu} />}                        >
                            <div className='title-and-price'>
                                <Meta title="Bản vẽ biệt thự 2 tầng" description="File Sketchup" />
                                <span>500.000Đ</span>
                            </div>
                            <div className='seen-times'>
                                <EyeOutlined />
                                <span>100</span>
                            </div>

                        </Card>
                    </motion.div>
                    
                </div>
            </div>
            <div className='tool-of-web'>
                <div className="title">
                    <div>
                        Danh sách bản vẽ nổi bật
                    </div>
                    <div className='sub-title'>
                        {'Xem thêm ->'}
                    </div>
                </div>
                <div className="lst-tool">
                    <motion.div
                        className="tool"
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}
                    >
                        <Card
                            className='card'
                            hoverable
                            cover={<img alt="example" src={BietThu} />}                        >
                            <div className='title-and-price'>
                                <Meta title="Bản vẽ biệt thự 2 tầng" description="File Sketchup" />
                                <span>500.000Đ</span>
                            </div>
                            <div className='seen-times'>
                                <EyeOutlined />
                                <span>100</span>
                            </div>

                        </Card>
                    </motion.div>
                    <motion.div
                        className="tool"
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}
                    >
                        <Card
                            className='card'
                            hoverable
                            cover={<img alt="example" src={BietThu} />}                        >
                            <div className='title-and-price'>
                                <Meta title="Bản vẽ biệt thự 2 tầng" description="File Sketchup" />
                                <span>500.000Đ</span>
                            </div>
                            <div className='seen-times'>
                                <EyeOutlined />
                                <span>100</span>
                            </div>

                        </Card>
                    </motion.div>
                    <motion.div
                        className="tool"
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}
                    >
                        <Card
                            className='card'
                            hoverable
                            cover={<img alt="example" src={BietThu} />}                        >
                            <div className='title-and-price'>
                                <Meta title="Bản vẽ biệt thự 2 tầng" description="File Sketchup" />
                                <span>500.000Đ</span>
                            </div>
                            <div className='seen-times'>
                                <EyeOutlined />
                                <span>100</span>
                            </div>

                        </Card>
                    </motion.div>
                    <motion.div
                        className="tool"
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}
                    >
                        <Card
                            className='card'
                            hoverable
                            cover={<img alt="example" src={BietThu} />}                        >
                            <div className='title-and-price'>
                                <Meta title="Bản vẽ biệt thự 2 tầng" description="File Sketchup" />
                                <span>500.000Đ</span>
                            </div>
                            <div className='seen-times'>
                                <EyeOutlined />
                                <span>100</span>
                            </div>

                        </Card>
                    </motion.div>
                    
                </div>
            </div>
            <div className='tool-of-web'>
                <div className="title">
                    <div>
                        Danh sách bản vẽ nổi bật
                    </div>
                    <div className='sub-title'>
                        {'Xem thêm ->'}
                    </div>
                </div>
                <div className="lst-tool">
                    <motion.div
                        className="tool"
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}
                    >
                        <Card
                            className='card'
                            hoverable
                            cover={<img alt="example" src={BietThu} />}                        >
                            <div className='title-and-price'>
                                <Meta title="Bản vẽ biệt thự 2 tầng" description="File Sketchup" />
                                <span>500.000Đ</span>
                            </div>
                            <div className='seen-times'>
                                <EyeOutlined />
                                <span>100</span>
                            </div>

                        </Card>
                    </motion.div>
                    <motion.div
                        className="tool"
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}
                    >
                        <Card
                            className='card'
                            hoverable
                            cover={<img alt="example" src={BietThu} />}                        >
                            <div className='title-and-price'>
                                <Meta title="Bản vẽ biệt thự 2 tầng" description="File Sketchup" />
                                <span>500.000Đ</span>
                            </div>
                            <div className='seen-times'>
                                <EyeOutlined />
                                <span>100</span>
                            </div>

                        </Card>
                    </motion.div>
                    <motion.div
                        className="tool"
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}
                    >
                        <Card
                            className='card'
                            hoverable
                            cover={<img alt="example" src={BietThu} />}                        >
                            <div className='title-and-price'>
                                <Meta title="Bản vẽ biệt thự 2 tầng" description="File Sketchup" />
                                <span>500.000Đ</span>
                            </div>
                            <div className='seen-times'>
                                <EyeOutlined />
                                <span>100</span>
                            </div>

                        </Card>
                    </motion.div>
                    <motion.div
                        className="tool"
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}
                    >
                        <Card
                            className='card'
                            hoverable
                            cover={<img alt="example" src={BietThu} />}                        >
                            <div className='title-and-price'>
                                <Meta title="Bản vẽ biệt thự 2 tầng" description="File Sketchup" />
                                <span>500.000Đ</span>
                            </div>
                            <div className='seen-times'>
                                <EyeOutlined />
                                <span>100</span>
                            </div>

                        </Card>
                    </motion.div>
                    
                </div>
            </div>

           
        </motion.div>
    )
}

export default Home