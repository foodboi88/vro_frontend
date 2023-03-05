/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { SearchOutlined } from '@ant-design/icons'
import { Avatar, Button, Drawer, Dropdown, Input, Menu, MenuProps } from 'antd'
import { useEffect, useState } from 'react'
import "./styles.header.scss"
// import "./styles.css";
import { Link, useNavigate } from "react-router-dom"
// import CRegisterModal from './CRegisterModal';
import { MenuOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import Utils from '../../common/utils'
import UserIcon from '../../images/user_icon.png'
import SearchIcon from '../../images/Search_Icon.png'
import { useSelectorRoot } from '../../redux/store'


interface MyProps {
    // setIsLogout: React.Dispatch<React.SetStateAction<boolean>>
}

// Phần header của trang web
export const CHeader = (props: MyProps) => {
    const [visible, setVisible] = useState(false); // Biến thể hiện nút thu gọn menu có đang mở hay không
    const [current, setCurrent] = useState<string>('1') // Biến thể hiện giá trị cho nút hiện tại
    const { tokenLogin, user } = useSelectorRoot((state) => state.login);
    const [userName, setUserName] = useState<string>(user?.name ? user.name : '')
    const [userEmail, setUserEmail] = useState<string>(user?.email ? user.email : '')
    const navigate = useNavigate();

    useEffect(() => {
        if (tokenLogin) {
            const usermail = localStorage.getItem('userMail') ? localStorage.getItem('userMail') : '';
            const username = localStorage.getItem('userName') ? localStorage.getItem('userName') : '';
            setUserEmail(usermail ? usermail : '');
            setUserName(username ? username : '');
        }
    });
    // Kiểm tra xem đường dẫn đang là gì để set thuộc tính đã click cho header
    useEffect(() => {
        if (window.location.pathname === '/test')
            setCurrent('2')
        if (window.location.pathname === '/news')
            setCurrent('3')
        if (window.location.pathname === '/about_us')
            setCurrent('4')
        if (window.location.pathname === '/')
            setCurrent('1')
    }, [])

    // Hiển thị ra nút thu gọn menu
    const showDrawer = () => {
        setVisible(true);
    }

    // Đóng nút thu gọn menu
    const onClose = () => {
        setVisible(false);
    }

    // Gán giá trị cho biến nút hiện tại
    const handleClick = (e: { key: any }) => {
        setCurrent(e.key);
    };
    const onClickLogout = () => {
        Utils.removeItemLocalStorage('token');
        Utils.removeItemLocalStorage('userMail');
        Utils.removeItemLocalStorage('userName');
        window.location.reload();
    }
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div >
                    Tên: {userName}
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div >
                    Email: {userEmail}
                </div>
            ),
        },
        {
            key: '4',
            label: (
                <Link to='/' onClick={onClickLogout}>
                    Đăng xuất
                </Link>
            ),
        },
    ];

    const handleClickLogin = () => {
        navigate('/login');
    }
    return (
        <div className='main-header'>
            <div className='header-logo'>
                <Link to={'/'} className='logo-text'> V.innovate</Link>
            </div>
            <Menu
                className={`header-menu + ${tokenLogin ? 'login' : ''}`}
                onClick={handleClick}
                defaultSelectedKeys={[current]}
                selectedKeys={[current]}
                mode="horizontal"
                overflowedIndicator={<MenuOutlined />}
            >
                <Menu.Item key="1" >
                    <Link to={'/'}> Trang chủ </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to={'/test'}>Đánh giá </Link>
                </Menu.Item>
                {/* <Menu.Item key="3" >
                    <Link to={'/news'}>Tin tức</Link>
                </Menu.Item> */}
                <Menu.Item key="4">
                    <Link to={'/about_us'}>Về chúng tôi</Link>
                </Menu.Item>
            </Menu>
            {/* <div className='header-content-input '>
                <Input
                    className='search-input'
                    placeholder='Tìm kiếm'
                />
                <SearchOutlined className='icon-search' />
            </div> */}
            <div className={`header-content-input ${tokenLogin ? 'login' : ''}`}>
                <Input
                    className='search-input'
                    placeholder='Tìm kiếm'
                />
                <img src={SearchIcon} className='icon-search'></img>
                {/* <SearchOutlined className='icon-search' /> */}
            </div>
            {!tokenLogin &&
                <>
                    <motion.div className='header-button'
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}>
                        <Button onClick={handleClickLogin}>Đăng Ký / Đăng Nhập</Button>
                    </motion.div>
                </>
            }
            {tokenLogin &&
                <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                    <Avatar className='header-avatar' src={UserIcon} />
                </Dropdown>
            }
            <>
                <Button className={`menubtn + ${tokenLogin ? 'login' : ''}`} type="primary" shape="circle" icon={<MenuOutlined />} onClick={showDrawer} ></Button>
                <Drawer
                    title={
                        <div className='header-logo'>
                            <Link to={'/'} className='logo-text'>V.innovate</Link>
                        </div>
                    }
                    placement="right"
                    onClose={onClose}
                    visible={visible}>
                    <div style={{ display: 'flex', flexDirection: "column" }}>
                        <Button type="text" href="/" >Trang chủ</Button>
                        <Button type="text" href="/test" >Đánh giá</Button>
                        <Button type="text" href="/about_us" >Về chúng tôi</Button>
                        {!tokenLogin && <Button type="text" href="/login" >Đăng nhập / Đăng ký</Button>}
                    </div>
                </Drawer>
            </>
        </div>
    )
}
