import { useEffect, useState } from 'react'
import { AiOutlineGift, AiOutlineLock, AiOutlineQuestionCircle, AiOutlineSetting } from 'react-icons/ai'
import { BiGridAlt } from 'react-icons/bi'
import { BsShop } from 'react-icons/bs'
import { RiBillLine } from 'react-icons/ri'
import ProfileBecomeSeller from './profile-become-seller/ProfileBecomeSeller'
import ProfileResume from './profile-resume/ProfileResume'
import './style.profile.scss'
import { Outlet, useNavigate } from 'react-router-dom'
const Profile = () => {
    const [active, setActive] = useState<number>(0)
    const navigate = useNavigate();
    useEffect(() => {
        if (window.location.pathname === "/profile" || window.location.pathname === '/profile/resume') setActive(1);
        if (window.location.pathname === "/profile/become-seller") setActive(3);
    }, []);

    return (
        <div className="main-profile">
            <div className='profile-navbar'>
                <div className={'profile-navbar-item' + (active === 1 ? ' active' : '')} onClick={() => {
                    setActive(1)
                    navigate('/profile/resume')
                }
                }>
                    <BiGridAlt className='profile-navbar-item-icon' />
                    <span className='profile-navbar-item-text'>Hồ sơ cá nhân</span>
                </div>
                <div className={'profile-navbar-item' + (active === 2 ? ' active' : '')} onClick={() => setActive(2)}>
                    <AiOutlineSetting className='profile-navbar-item-icon' />
                    <span className='profile-navbar-item-text'>Cài đặt chung</span>
                </div>
                <div className={'profile-navbar-item' + (active === 3 ? ' active' : '')} onClick={() => {
                    setActive(3)
                    navigate('/profile/become-seller')
                }
                }>
                    <BsShop className='profile-navbar-item-icon' />
                    <span className='profile-navbar-item-text'>Trở thành người bán</span>
                </div>
                <div className={'profile-navbar-item' + (active === 4 ? ' active' : '')} onClick={() => setActive(4)}>
                    <AiOutlineLock className='profile-navbar-item-icon' />
                    <span className='profile-navbar-item-text'>Thay đổi mật khẩu</span>
                </div>
                <div className={'profile-navbar-item' + (active === 5 ? ' active' : '')} onClick={() => setActive(5)}>
                    <RiBillLine className='profile-navbar-item-icon' />
                    <span className='profile-navbar-item-text'>Đơn mua</span>
                </div>
                <div className={'profile-navbar-item' + (active === 6 ? ' active' : '')} onClick={() => setActive(6)}>
                    <AiOutlineGift className='profile-navbar-item-icon' />
                    <span className='profile-navbar-item-text'>Kho Voucher</span>
                </div>
                <div className={'profile-navbar-item' + (active === 7 ? ' active' : '')} onClick={() => setActive(7)}>
                    <AiOutlineQuestionCircle className='profile-navbar-item-icon' />
                    <span className='profile-navbar-item-text'>Hỗ trợ</span>
                </div>
            </div>
            <div className='profile-content'>
                <Outlet />
            </div>
            {/* {active === 1 &&
                <ProfileResume />
            }

            {active === 3 &&
                <ProfileBecomeSeller />
            } */}
        </div>
    )
}

export default Profile