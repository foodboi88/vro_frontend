import React, { useEffect, useState } from 'react'
import { AiOutlineSetting, AiOutlineLock, AiOutlineGift, AiOutlineQuestionCircle } from 'react-icons/ai';
import { BiGridAlt, BiPurchaseTagAlt } from 'react-icons/bi';
import { BsShop } from 'react-icons/bs';
import { RiBillLine } from 'react-icons/ri';

import { Outlet, useNavigate } from 'react-router-dom'

import './seller-layout.styles.scss';

const SellerLayout = () => {
	const navigate = useNavigate();
	const [active, setActive] = useState<number>(0)

	useEffect(() => {
		document.body.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}, [navigate]);

	useEffect(() => {
		if (window.location.pathname === "/seller") setActive(1);
		if (window.location.pathname === "/seller/management-sketch") setActive(2);
		if (window.location.pathname === "/seller/order") setActive(3);

		if (window.location.pathname === "/seller/upload-sketch") setActive(6);
		if (window.location.pathname === "/seller/withdraw") setActive(7);
		if (window.location.pathname === "/seller/purchased-sketchs") setActive(8);
	}, []);


	return (
		<div>
			<div className="main-profile">
				<div className='profile-navbar'>
					<div className={'profile-navbar-item' + (active === 1 ? ' active' : '')} onClick={() => {
						setActive(1)
						navigate('/seller')
					}}>
						<BiGridAlt className='profile-navbar-item-icon' />
						<span className='profile-navbar-item-text'>Tổng quan</span>
					</div>
					<div className={'profile-navbar-item' + (active === 2 ? ' active' : '')} onClick={() => {
						setActive(2)
						navigate("/seller/management-sketch")
					}}>
						<AiOutlineSetting className='profile-navbar-item-icon' />
						<span className='profile-navbar-item-text'>Quản lý sản phẩm</span>
					</div>
					<div className={'profile-navbar-item' + (active === 3 ? ' active' : '')} onClick={() => {
						setActive(3)
						navigate('/seller/order')
					}}>
						<BsShop className='profile-navbar-item-icon' />
						<span className='profile-navbar-item-text'>Quản lý đơn hàng</span>
					</div>
					<div className={'profile-navbar-item' + (active === 4 ? ' active' : '')} onClick={() => setActive(4)}>
						<AiOutlineLock className='profile-navbar-item-icon' />
						<span className='profile-navbar-item-text'>Quản lý thanh toán</span>
					</div>
					<div className={'profile-navbar-item' + (active === 6 ? ' active' : '')} onClick={() => {
						setActive(6)
						navigate('/seller/upload-sketch')
					}}>
						<AiOutlineGift className='profile-navbar-item-icon' />
						<span className='profile-navbar-item-text'>Upload bản vẽ</span>
					</div>
					<div className={'profile-navbar-item' + (active === 7 ? ' active' : '')} onClick={() => {
						setActive(7)
						navigate('/seller/withdraw')
					}}>
						<AiOutlineQuestionCircle className='profile-navbar-item-icon' />
						<span className='profile-navbar-item-text'>Rút tiền</span>
					</div>
					<div className={'profile-navbar-item' + (active === 5 ? ' active' : '')} onClick={() => setActive(5)}>
						<RiBillLine className='profile-navbar-item-icon' />
						<span className='profile-navbar-item-text'>Giải quyết phản hồi</span>
					</div>
					<div className={'profile-navbar-item' + (active === 8 ? ' active' : '')} onClick={() => {
						setActive(8)
						navigate('/seller/purchased-sketchs')
					}
					}>
						<BiPurchaseTagAlt className='profile-navbar-item-icon' />
						<span className='profile-navbar-item-text'>Sản phẩm đã mua</span>
					</div>

				</div>
				<div className='profile-content'>
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default SellerLayout