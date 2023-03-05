import React from 'react'
import { motion } from 'framer-motion';

// Phần tin tức của trang web
const News = () => {
    return (
        <motion.div
            className='news'
            style={{ padding: 50, width: '100%' }}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
        >
            <div>
                News
            </div>
        </motion.div>
    )
}

export default News