/* eslint-disable jsx-a11y/iframe-has-title */
import { Button, notification } from 'antd';
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
            <div className='intro-part'>
                <div className='text-of-intro'>
                    <div className='title' >Tổ chức Giáo dục Đại học của bạn đã chuẩn bị sẵn sàng cho những thách thức trong tương lai chưa? </div>
                    <div className='detail'>Viện Nghiên cứu Đổi mới và Phát triển (IID), được thành lập năm từ năm 2017, là một viện nghiên cứu dựa trên nền tảng công nghệ, dữ liệu và mạng lưới kết nối toàn cầu để theo đuổi sứ mệnh trở thành một là một tổ chức trung gian, xây dựng hệ sinh thái góp phần tạo ra sân chơi cho những học giả và ươm tạo nhân tài trẻ góp phần thúc đẩy khu vực sáng tạo và kinh doanh tạo tác động xã hội Việt Nam.</div>
                    <motion.div className='home-button'
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}>
                        <Button onClick={handleOnClick}>Đến trang đánh giá</Button>
                    </motion.div>
                </div>
                <div className='image-of-intro'>
                    <motion.img src={ImageOfIntro} alt=''
                        variants={imageVariants}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 'all' }}
                    />
                </div>
            </div>
            <div className='tool-of-web'>
                <div className="title">Công cụ đánh giá của V.innovate</div>
                <div className="subtitle">Đây là một nền tảng chuyên về đánh giá, xếp hạng các trường đại học, cao đẳng; tỉnh thành phố về đổi mới sáng tạo, khởi nghiệp và tạo tác động </div>
                <div className="lst-tool">
                    <motion.div
                        className="tool"
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}>
                        <div className="tool-title">U.INNOVATE</div>
                        <div className="tool-subtitle">Bộ tiêu chí đánh giá trường đại học khởi nghiệp</div>
                        <Button className="btn-tool">BẮT ĐẦU ĐÁNH GIÁ</Button>
                    </motion.div>
                    <motion.div
                        className="tool"
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}>
                        <div className="tool-title">U.IMPACT</div>
                        <div className="tool-subtitle">Bộ tiêu chí đánh giá trường đại học tạo tác động xã hội</div>
                        <Button className="btn-tool">BẮT ĐẦU ĐÁNH GIÁ</Button>
                    </motion.div>
                    <motion.div
                        className="tool"
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}>
                        <div className="tool-title">P.INNOVATE</div>
                        <div className="tool-subtitle">Bộ tiêu chí đánh giá khởi nghiệp tại địa phương</div>
                        <Button className="btn-tool">BẮT ĐẦU ĐÁNH GIÁ</Button>
                    </motion.div>

                </div>
            </div>
            {/* <div className='right-of-user'>
                <div className='title'>
                    Công cụ đánh giá của V.innovate
                </div>
                <div className="subtitle">Đây là một nền tảng chuyên về đánh giá, xếp hạng các trường đại học, cao đẳng; tỉnh thành phố về đổi mới sáng tạo, khởi nghiệp và tạo tác động </div>
                <div className='right-lst'>
                    <motion.div
                        className='lst-item'
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}
                    >

                        <img className='lst-item-image' src={RightOfUseImage1} alt='' />
                        <div className='lst-item-title'>ĐÁNH GIÁ</div>
                        <div className='lst-item-content'>Tiềm năng khởi nghiệp trong quy mô trường học</div>
                    </motion.div>
                    <motion.div className='lst-item' whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}>
                        <img className='lst-item-image' src={RightOfUseImage2} alt='' />

                        <div className='lst-item-title'>THEO DÕI</div>
                        <div className='lst-item-content'>Hoạt động khởi nghiệp trong tổ chức của mình</div>
                    </motion.div>
                    <motion.div className='lst-item' whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}>
                        <img className='lst-item-image' src={RightOfUseImage3} alt='' />
                        <div className='lst-item-title'>XẾP HẠNG</div>
                        <div className='lst-item-content'>Năng lực khởi nghiệp dựa trên tiêu chuẩn của bộ giáo dục và đào tạo</div>
                    </motion.div>
                    <motion.div className='lst-item' whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}>
                        <img className='lst-item-image' src={RightOfUseImage4} alt='' />
                        <div className='lst-item-title'>CUNG CẤP</div>
                        <div className='lst-item-content'>Những thông tin, kiến thức về đánh giá năng lực khởi nghiệp hoàn toàn miễn phí</div>
                    </motion.div>
                    <motion.div className='lst-item' whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}>
                        <img className='lst-item-image' src={RightOfUseImage5} alt='' />
                        <div className='lst-item-title'>CƠ HỘI</div>
                        <div className='lst-item-content'>Trao đổi, nhận tư vấn từ các chuyên gia đầu ngành về lĩnh vực khởi nghiệp tạo tác động</div>
                    </motion.div>

                </div>
            </div> */}
            <div className='how-to-use'>
                <div className='tutorial-image'>
                    <motion.img src={HowToUse} alt=''
                        variants={imageVariants}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 'all' }}
                    />
                </div>
                <div className='content'>
                    <div className='title'>Làm thế nào để sử dụng U.innovate?</div>
                    <div className='subtitle'>Các bước dưới đây hướng dẫn bạn về các tính năng và nội dung của U.innovate.</div>
                    <div className='step-lst'>
                        <div className='lst-item'>
                            <img className='img-item' src={HowToUse1} alt='' style={{ height: 30, width: 30 }} />
                            <div className='text-item'>Bạn cần tạo tài khoản của mình trên U.innovate</div>
                        </div>
                        <div className='lst-item'>
                            <img className='img-item' src={HowToUse2} alt='' style={{ height: 24, width: 30 }} />
                            <div className='text-item'>Bạn có thể có cái nhìn tổng quan về các tiêu chí và phương pháp của U.innovate</div>
                        </div>
                        <div className='lst-item'>
                            <img className='img-item' src={HowToUse3} alt='' style={{ height: 28, width: 30 }} />
                            <div className='text-item'>Bạn tiến hành tự động đánh giá thông qua các bước trên nền tảng U.innovate</div>
                        </div>
                        <div className='lst-item'>
                            <img className='img-item' src={HowToUse4} alt='' style={{ height: 30, width: 25 }} />
                            <div className='text-item'>Bạn có thể đọc báo cáo về cơ sở giáo dục của mình trên U.innovate hoặc download báo cáo về máy, hoặc gửi email báo cáo</div>
                        </div>
                        <div className='lst-item'>
                            <img className='img-item' src={HowToUse5} alt='' style={{ height: 27, width: 30 }} />
                            <div className='text-item'>Bạn có thể quay lại để tham khảo sự thay đổi của kết quả tự đánh giá và kết quả so sánh sau một thời gian</div>
                        </div>
                    </div>
                </div>
            </div>
            <iframe
                className="gmap_iframe"
                id='gmap'
                ref={mapRef}
                src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=176 P. Thái Hà, Trung Liệt, Đống Đa, Hà Nội&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" width="100%"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
            />
            {/* <iframe
                src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=5th Floor, Vietnam Academy of Social Sciences Building, 176 Thai Ha, Dong Da, Hanoi&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
            </iframe> */}

            <div className='our-partner'>
                <div className='title'>Đối tác của chúng tôi</div>
                <div className='partner-lst'>
                    <div className='item'>1</div>
                    <div className='item'>2</div>
                    <div className='item'>3</div>
                    <div className='item'>4</div>
                    <div className='item'>5</div>
                    <div className='item'>6</div>
                </div>
            </div>
        </motion.div>
    )
}

export default Home