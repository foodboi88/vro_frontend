/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */

import {
    BellOutlined,
    DownOutlined,
    MessageOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import {
    Avatar,
    Button,
    Drawer,
    Dropdown,
    Input,
    Menu,
    MenuProps,
    Badge,
    notification,
} from "antd";
import { useEffect, useState } from "react";
import "./styles.header.scss";
// import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
// import CRegisterModal from './CRegisterModal';
import { MenuOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import Utils from "../../common/utils";
import UserIcon from "../../images/user_icon.png";
import SearchIcon from "../../images/Search_Icon.png";
import { useDispatchRoot, useSelectorRoot } from "../../redux/store";
import Logo from "../../images/header/logo.png";
import Login from "../../pages/login/Login";
import Register from "../../pages/login/Register";
import HeaderIcon from "../../images/header/header-icon.png";
import {
    advancedSearchingRequest,
    getAllSketchInCartRequest,
    getSketchQuantityInCartRequest,
} from "../../redux/controller";
import { ICurrentSearchValue } from "../../common/sketch.interface";
import { GoLocation } from "react-icons/go";
import { FaPhoneVolume } from "react-icons/fa";
import { BsQuestionCircle } from "react-icons/bs";
import { AiOutlineFileAdd } from "react-icons/ai";
import { ROLE } from "../../enum/role.enum";

interface MyProps {
    // setIsLogout: React.Dispatch<React.SetStateAction<boolean>>
}

// Phần header của trang web
export const CHeader = (props: MyProps) => {
    const [visible, setVisible] = useState(false); // Biến thể hiện nút thu gọn menu có đang mở hay không
    const [current, setCurrent] = useState<string>("1"); // Biến thể hiện giá trị cho nút hiện tại
    const { tokenLogin, accesstokenExpỉred, userName } = useSelectorRoot((state) => state.login);
    const { sketchsQuantityInCart } = useSelectorRoot((state) => state.sketch);


    const navigate = useNavigate();
    const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false); // Biến kiểm tra đang mở modal login hay chưa
    const [isOpenRegisterModal, setIsOpenRegisterModal] =
        useState<boolean>(false); // Biến kiểm tra đang mở modal registration hay chưa
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const { currentSearchValue } = useSelectorRoot((state) => state.sketch);
    const dispatch = useDispatchRoot();
    const { userRole } = useSelectorRoot((state) => state.login); // Biến kiểm tra xem user có phải là admin hay không

    useEffect(() => {
        document.body.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [navigate]);



    useEffect(() => {
        if (window.location.pathname === "/test") setCurrent("2");
        if (window.location.pathname === "/news") setCurrent("3");
        if (window.location.pathname === "/about_us") setCurrent("4");
        if (window.location.pathname === "/") setCurrent("1");
    }, []);

    useEffect(() => {
        let checkLogin = localStorage.getItem("token")
            ? localStorage.getItem("token")
            : "";
        if (checkLogin) {
            setIsLogin(true);
        }
    }, []);

    useEffect(() => {
        console.log(isLogin);
        if (accesstokenExpỉred === false) {
            dispatch(getSketchQuantityInCartRequest());
        }

    }, [accesstokenExpỉred])

    // Kiểm tra xem đường dẫn đang là gì để set thuộc tính đã click cho header

    // Hiển thị ra nút thu gọn menu
    const showDrawer = () => {
        setVisible(true);
    };

    // Đóng nút thu gọn menu
    const onClose = () => {
        setVisible(false);
    };

    // Gán giá trị cho biến nút hiện tại
    const handleClick = (e: { key: any }) => {
        setCurrent(e.key);
    };
    const onClickLogout = () => {
        Utils.removeItemLocalStorage("token");
        Utils.removeItemLocalStorage("userMail");
        Utils.removeItemLocalStorage("userName");
        Utils.removeItemLocalStorage("userPhone");
        Utils.removeItemLocalStorage("role");

        Utils.removeItemLocalStorage("refresh_token");
        setIsLogin(!isLogin);
        navigate("/")
        window.location.reload();
    };
    const items: MenuProps["items"] = [
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
            key: "4",
            label: (
                <Link to="/" onClick={onClickLogout}>
                    Đăng xuất
                </Link>
            ),
        },
    ];

    const handleClickLogin = () => {
        // navigate('/login');
    };

    // Hàm chuyển đổi trạng thái đóng mở modal login
    const toggleLoginModal = () => {
        setIsOpenLoginModal(!isOpenLoginModal);
        setIsOpenRegisterModal(!isOpenRegisterModal);
    };
    // Hàm chuyển đổi trạng thái đóng mở modal registration
    const toggleRegisterModal = () => {
        setIsOpenLoginModal(!isOpenLoginModal);
        setIsOpenRegisterModal(!isOpenRegisterModal);
    };

    const handleCancelModal = () => {
        setIsOpenLoginModal(false);
        setIsOpenRegisterModal(false);
    }
    const handleSearching = (event: any) => {
        console.log(event);
        const bodyrequest: ICurrentSearchValue = {
            name: event.target.value,
            architecture: currentSearchValue.architecture,
            tool: currentSearchValue.tool,
            style: currentSearchValue.style,
        };
        dispatch(advancedSearchingRequest(bodyrequest));
        navigate("/searching");
        onClose();
    };
    const handleUpload = () => {
        navigate("/upload-sketch");
    };
    const checkIsLogin = (val: boolean) => {
        setIsLogin(val);
    };
    const handleClickCart = () => {
        dispatch(getAllSketchInCartRequest());
        if (userRole === 'seller') {

            navigate("/seller/cart");
        } else if (userRole === 'user') {
            navigate("/buyer/cart");

        }
        else {
            navigate("/");

        }
    };

    // Hàm xử lý khi click vào avatar
    const onClickAvatar = () => {
        userRole === ROLE.BUYER ? navigate('/buyer') : navigate('/seller')
    }

    return (
        <div className="header">
            <div className="main-header">
                <div className="header-left">
                    <div className="header-logo">
                        <Link to={"/"} className="logo-text">
                            <img src={Logo} />
                            <div className="text-logo">Vro Group</div>

                        </Link>
                    </div>

                    <div className={`header-content-input ${isLogin && "login"}`}>
                        <Input
                            className="search-input"
                            placeholder="Tìm kiếm bản vẽ"
                            onPressEnter={handleSearching}
                        />
                        <img src={SearchIcon} className="icon-search"></img>
                        {/* <SearchOutlined className='icon-search' /> */}
                    </div>
                </div>
                {/* {!tokenLogin && */}

                {/* } */}

                {/* {tokenLogin && */}
                <div className="header-right">
                    <div className="user-infor">
                        {accesstokenExpỉred === true ? (
                            <>
                                <motion.div
                                    className="header-button login"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        onClick={() => setIsOpenLoginModal(true)}>
                                        Đăng nhập
                                    </Button>
                                </motion.div>
                                <motion.div
                                    className="header-button login"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        onClick={() => setIsOpenRegisterModal(true)}
                                    >
                                        Đăng ký
                                    </Button>
                                </motion.div>
                            </>
                        ) : (
                            <>
                                {/* <motion.div
                                    className={`header-button post ${isLogin && "login"}`}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        className="btn-upload-sketch"
                                        onClick={handleUpload}
                                        icon={<AiOutlineFileAdd />}
                                    >
                                        Đăng bản vẽ
                                    </Button>
                                </motion.div> */}
                                <div className="icon-group">
                                    {/* <Badge count={10} size="default">
                                        <BellOutlined />
                                    </Badge>
                                    <Badge count={10} size="default">
                                        <MessageOutlined />
                                    </Badge> */}
                                    <Badge
                                        count={sketchsQuantityInCart}
                                        size="default"
                                    >
                                        <ShoppingCartOutlined
                                            onClick={handleClickCart}
                                        />
                                    </Badge>
                                </div>
                                <div className="user-info-content" onClick={() => onClickAvatar()}>
                                    <Avatar className="avatar" src={UserIcon} />
                                    <div className="name-and-balance">
                                        <div className="name">{userName}</div>
                                        {/* <div className="balance">
                                        Số dư: {"1.500.000Đ"}
                                    </div> */}
                                    </div>
                                    <Dropdown
                                        className="drop-down"
                                        menu={{ items }}
                                        placement="bottomLeft"
                                        arrow
                                    >
                                        <DownOutlined />
                                    </Dropdown>
                                </div>
                            </>
                        )}
                        <Login
                            checkIsLogin={checkIsLogin}
                            isOpenModal={isOpenLoginModal}
                            toggleLoginModal={toggleLoginModal}
                            toggleRegisterModal={toggleRegisterModal}
                            handleCancelModal={handleCancelModal}
                        />
                        <Register
                            isOpenModal={isOpenRegisterModal}
                            toggleLoginModal={toggleLoginModal}
                            toggleRegisterModal={toggleRegisterModal}
                            handleCancelModal={handleCancelModal}
                        />
                    </div>
                    <>
                        <Button
                            className={`menubtn + ${isLogin ? "login" : ""}`}
                            shape="circle"
                            icon={<MenuOutlined />}
                            onClick={showDrawer}
                        ></Button>
                        <Drawer
                            title={
                                <div className="header-logo">
                                    <Link to={"/"} className="logo-text">
                                        Vro Group
                                    </Link>
                                </div>
                            }
                            placement="right"
                            onClose={onClose}
                            visible={visible}
                        >
                            <div
                                style={{ display: "flex", flexDirection: "column" }}
                            >
                                {!isLogin
                                    && (

                                        <Button className="drawer-button notlogin"
                                            onClick={() => {
                                                setIsOpenLoginModal(true)
                                                onClose()
                                            }}>
                                            Đăng nhập
                                        </Button>
                                    )}
                                {!isLogin
                                    && (
                                        <Button className="drawer-button notlogin"
                                            onClick={() => {
                                                setIsOpenRegisterModal(true)
                                                onClose()
                                            }}
                                        >
                                            Đăng ký
                                        </Button>
                                    )}
                                {isLogin && (
                                    <Button className={'drawer-button login'}>
                                        Đăng bản vẽ
                                    </Button>
                                )}
                                <div className={`header-content-input draw ${isLogin && "login"}`}>
                                    <Input
                                        className="search-input"
                                        placeholder="Tìm kiếm bản vẽ"
                                        onPressEnter={handleSearching}
                                    />
                                    {/* <SearchOutlined className='icon-search' /> */}
                                </div>
                            </div>
                        </Drawer>
                    </>
                </div>

                {/* } */}
            </div >
            <div className="header-action">
                <div className="header-action-content">
                    <div className="header-action-item">
                        <GoLocation className="header-aciton-item-icon" />
                        <div className="header-action-item-text">Mộ Lao, Hà Đông, Hà Nội</div>
                    </div>
                    <div className="header-action-type">
                        <div className="header-action-item">
                            Thư viện bản vẽ
                        </div>
                        <div className="header-action-item">
                            Hội kiến trúc sư
                        </div>
                        <div className="header-action-item">
                            Đăng ký bán bản vẽ
                        </div>
                        <div className="header-action-item">
                            Bản vẽ chất lượng
                        </div>
                        <div className="header-action-item">
                            Blog
                        </div>
                    </div>
                </div>
                <div className="header-action-content">
                    <div className="header-action-item">
                        <FaPhoneVolume />
                        <div className="header-action-item-text">Hotline: 19008198</div>
                    </div>
                    <div className="header-action-item">
                        <BsQuestionCircle />
                        <div className="header-action-item-text">Trung tâm hỗ trợ VRO</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
