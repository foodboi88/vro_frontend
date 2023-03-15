/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { BellOutlined, DownOutlined, MessageOutlined, SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Avatar, Button, Drawer, Dropdown, Input, Menu, MenuProps, Badge } from 'antd'
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
import Logo from '../../images/header/logo.png'
import Login from '../../pages/login/Login'
import Register from '../../pages/login/Register'
import HeaderIcon from '../../images/header/header-icon.png';



interface MyProps {
    // setIsLogout: React.Dispatch<React.SetStateAction<boolean>>
}

// Phần header của trang web
export const CHeader = (props: MyProps) => {
    const [visible, setVisible] = useState(false); // Biến thể hiện nút thu gọn menu có đang mở hay không
    const [current, setCurrent] = useState<string>('1') // Biến thể hiện giá trị cho nút hiện tại
    // const { tokenLogin, user } = useSelectorRoot((state) => state.login);
    // const [userName, setUserName] = useState<string>(user?.name ? user.name : '')
    // const [userEmail, setUserEmail] = useState<string>(user?.email ? user.email : '')
    const navigate = useNavigate();
    const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false) // Biến kiểm tra đang mở modal login hay chưa
    const [isOpenRegisterModal, setIsOpenRegisterModal] = useState<boolean>(false) // Biến kiểm tra đang mở modal registration hay chưa
    const [isLogin, setIsLogin] = useState<boolean>(false);
    // useEffect(() => {
    //     if (tokenLogin) {
    //         const usermail = localStorage.getItem('userMail') ? localStorage.getItem('userMail') : '';
    //         const username = localStorage.getItem('userName') ? localStorage.getItem('userName') : '';
    //         setUserEmail(usermail ? usermail : '');
    //         setUserName(username ? username : '');
    //     }
    // });
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
        // {
        //     key: '1',
        //     label: (
        //         <div >
        //             Tên: {userName}
        //         </div>
        //     ),
        // },
        // {
        //     key: '2',
        //     label: (
        //         <div >
        //             Email: {userEmail}
        //         </div>
        //     ),
        // },
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
        // navigate('/login');
    }

    // Hàm chuyển đổi trạng thái đóng mở modal login
    const toggleLoginModal = () => {
        setIsOpenLoginModal(!isOpenLoginModal);
        setIsOpenRegisterModal(false);

    };
    // Hàm chuyển đổi trạng thái đóng mở modal registration
    const toggleRegisterModal = () => {
        setIsOpenLoginModal(false);
        setIsOpenRegisterModal(!isOpenRegisterModal);
    };

    const handleSearching = (event: any) => {
        console.log(event.target.value)
        navigate('/searching')
    }
    const checkIsLogin = (val: boolean) => {
        setIsLogin(val);
    }
    return (
        <div className='main-header'>
            <div className="header-left">
                <div className='header-logo'>
                    <Link to={'/'} className='logo-text'>
                        <img src={Logo} />
                    </Link>
                </div>

                <div className={`header-content-input`}>
                    <Input
                        className='search-input'
                        placeholder='Tìm kiếm bản vẽ'
                        onPressEnter={handleSearching}
                    />
                    <img src={SearchIcon} className='icon-search'></img>
                    {/* <SearchOutlined className='icon-search' /> */}
                </div>
            </div>
            {/* {!tokenLogin && */}

            {/* } */}


            {/* {tokenLogin && */}
            <div className="header-right">
                <div className='user-infor'>
                    <motion.div className={`header-button post ${isLogin && 'login'}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}>

                        <Button icon={<img src={HeaderIcon} />} >
                            Đăng bản vẽ
                        </Button>
                    </motion.div>
                    <div className='icon-group'>
                        <Badge count={10} size="small">
                            <BellOutlined />
                        </Badge>
                        <Badge count={10} size="small">
                            <MessageOutlined />
                        </Badge>
                        <Badge count={10} size="small">
                            <ShoppingCartOutlined />
                        </Badge>
                    </div>
                    {!isLogin ?
                        <>
                            <motion.div className='header-button login'
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}>
                                <Button onClick={() => setIsOpenLoginModal(true)}>Đăng nhập</Button>
                            </motion.div>
                            <motion.div className='header-button login'
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}>
                                <Button onClick={() => setIsOpenRegisterModal(true)}>Đăng ký</Button>
                            </motion.div>
                        </>
                        :
                        <div className='user-info-content'>
                            <Avatar className='avatar' src={UserIcon} />
                            <div className='name-and-balance'>
                                <div className='name'>Nguyễn Trần Kiên</div>
                                <div className='balance'>Số dư: {'1.500.000Đ'}</div>
                            </div>
                            <Dropdown className='drop-down' menu={{ items }} placement="bottomLeft" arrow>
                                <DownOutlined />
                            </Dropdown>
                        </div>
                    }
                    <Login
                        checkIsLogin={checkIsLogin}
                        isOpenModal={isOpenLoginModal}
                        toggleLoginModal={toggleLoginModal}
                        toggleRegisterModal={toggleRegisterModal}
                    />
                    <Register
                        isOpenModal={isOpenRegisterModal}
                        toggleLoginModal={toggleLoginModal}
                        toggleRegisterModal={toggleRegisterModal}
                    />


                </div>
                <>
                    <Button className={`menubtn + ${isLogin ? 'login' : ''}`} shape="circle" icon={<MenuOutlined />} onClick={showDrawer} ></Button>
                    <Drawer
                        title={
                            <div className='header-logo'>
                                <Link to={'/'} className='logo-text'>Vro Group</Link>
                            </div>
                        }
                        placement="right"
                        onClose={onClose}
                        visible={visible}>
                        <div style={{ display: 'flex', flexDirection: "column" }}>
                            {!isLogin && <Button type="text" href="/login" >Đăng nhập / Đăng ký</Button>}
                            <Button className={`post-btn ${isLogin && 'login'}`} type="text" icon={<img src={HeaderIcon} />} >
                                Đăng bản vẽ
                            </Button>
                        </div>
                    </Drawer>
                </>
            </div>

            {/* } */}



        </div>
    )
}
