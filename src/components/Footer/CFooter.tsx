import { motion } from "framer-motion";
import "./styles.footer.scss";
const hoverVariants = {
    hover: {
        scale: 1.1,
        opacity: 0.8,
        fontWeight: "bold",
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 2
        },

    },
    tap: {
        scale: 0.8
    },
};
// Phần footer của trang web
export default function CFooter() {
    return (
        <div className='footer-main' id='footer-main'>
            <div className='separation-line'></div>
            <div className='content'>
                <div className='content-left'>
                    The U.innovate for design, creativity and innovation on the Internet
                </div>
            </div>
            <div className='content'>
                <div className='content-left'>
                    <motion.a className='link-to-page' href='/'
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}
                    >Trang chủ</motion.a>
                    <motion.a className='link-to-page' href='/evaluate'
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}>
                        Đánh giá
                    </motion.a>
                    <motion.a className='link-to-page' href='/news'
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}>
                        Tin tức
                    </motion.a>
                    <motion.a className='link-to-page' href='/about_us'
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}>
                        Về chúng tôi
                    </motion.a>
                    <motion.a className='link-to-page' href='/about_us'
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}>
                        Legal Notice
                    </motion.a>
                </div>
            </div>
            <div className='content'>
                <div className='content-left'>
                    <div className='text-bold'>Follow us</div>
                    <motion.a className='link-to-social' href="mailto:hello@iid.org.vn"
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}>
                        Emali: hello@iid.org.vn
                    </motion.a>
                    <motion.a className='link-to-social' href="tel:+8424888651212"
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}>
                        Điện thoại: +8424888651212
                    </motion.a>
                    <motion.a className='link-to-social' href='https://www.facebook.com/iidvietnam' target="_blank"
                        whileHover="hover"
                        whileTap="tap"
                        variants={hoverVariants}>
                        Social media: https://www.facebook.com/iidvietnam
                    </motion.a>
                </div>
            </div>
        </div>
    );
}