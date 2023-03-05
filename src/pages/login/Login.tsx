import { ArrowLeftOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Checkbox, Form, Input, Select, Steps, message, notification } from 'antd';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginImage2 from '../../images/login-image-2.png';
import LoginImage from '../../images/login-image.png';
import UniversityReview from '../../images/university-reviews-bg.png';
import LocalReview from '../../images/local-reviews-bg.png';

import { LoginRequest, RegisterRequest } from '../../common/define-identity';
import { IFacilities, IFacilitiesList } from '../../common/u-innovate/define-facilities';
import { IPosition } from '../../common/u-innovate/define-position';
import { getAllAddressesRequest, getAllFacilitiesByDescriptionRequest, getAllPositionsRequest } from '../../redux/controller';
import { checkEmailRequest, loginRequest, registerRequest } from '../../redux/controller/login.slice';
import { useDispatchRoot, useSelectorRoot } from '../../redux/store';
import ActiveAccountModel from '../ActiveAccount/ActiveAccountModel';
import './login.scss';
import '../../App.scss';
import { IAddresses } from '../../common/u-innovate/define-addresses';
interface MyProps {
    isLogin?: boolean
}

const { Option } = Select;

const hoverVariants = {
    hover: {
        scale: 1.1,
        borderRadius: '30px'
    },
    tap: {
        scale: 0.8
    },
};
// Phần đăng nhập / đăng ký của trang web
const Login = (props: MyProps) => {

    const [form] = Form.useForm();
    const [isLogin, setIsLogin] = useState(true); // Biến kiểm tra có đang ở trang đăng nhập hay đăng ký
    const dispatch = useDispatchRoot();
    const navigate = useNavigate();
    const { tokenLogin, isExistEmail, registerSuccess } = useSelectorRoot((state) => state.login);

    const { positionsLst, facilitiesLst, facilitiesLstByDescription, addressesLst, positonUniversityLst, positonLocalLst } = useSelectorRoot((state) => state.uinnovate);

    const [lstPosition, setLstPosition] = useState<IPosition[]>([]);
    const [lstPositonUniversity, setLstPositonUniversity] = useState<IPosition[]>([]);
    const [lstPositonLocal, setLstPositonLocal] = useState<IPosition[]>([]);
    const [lstFacility, setLstFacility] = useState<IFacilities[]>([]);
    const [lstFacilityByDescription, setLstFacilityByDescription] = useState<IFacilitiesList>();
    const [lstAddresses, setLstAddresses] = useState<IAddresses[]>([]);

    const [userName, setUserName] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPassword, setUserPassword] = useState<string>('');
    const [userConfirmPassword, setUserConfirmPassword] = useState<string>('');
    const [userFacilityId, setUserFacilityId] = useState<string>('');
    const [userPositionId, setUserPositionId] = useState<string>('');
    const [userLocalId, setUserLocalId] = useState<string>('');
    const [userPositionLocalId, setUserPositionLocalId] = useState<string>('');
    const [positionIdStudent, setPositionIdStudent] = useState<string>('63bfc266919bbb3754b7162a')
    const [positionIdStaffInChange, setPositionIdStaffInChange] = useState<string>('63fed41004d0683c30798352')
    const [positionIdStaffInChangeStartUp, setPositionIdStaffInChangeStartUp] = useState<string>('63ff17abe3784121fb227fc0')
    const [isMailEdu, setIsMailEdu] = useState<boolean>(false);
    const [checkFacility, setCheckFacility] = useState<number>(0);
    const [checkClickTypeOfFacility, setCheckClickTypeOfFacility] = useState<boolean>(false);
    const [checkClickFacility, setCheckClickFacility] = useState<boolean>(false);
    const [checkClickPosition, setCheckClickPosition] = useState<boolean>(false);
    const [checkBeginFrom, setCheckBeginFrom] = useState<boolean>(false);
    const [checkClickUniversityReview, setCheckClickUniversityReview] = useState<boolean>(false);
    const [checkClickLocalReview, setCheckClickLocalReview] = useState<boolean>(false);
    const [currentUniversity, setCurrentUniversity] = useState(0);  // Biến gán giá trị đang ở bước bao nhiêu của trang đăng ký
    const [currentLocal, setCurrentLocal] = useState(0);  // Biến gán giá trị đang ở bước bao nhiêu của trang đăng ký

    // Thực hiện lấy vai trò và cơ sở đào tạo của user
    useEffect(() => {
        if (!isLogin) {
            // dispatch(getAllFacilitiesRequest());
            dispatch(getAllFacilitiesByDescriptionRequest());
            dispatch(getAllPositionsRequest());
            dispatch(getAllAddressesRequest());
        }
    }, [isLogin])

    // Thực hiện gán giá trị cơ sở đào tạo
    useEffect(() => {
        setLstFacility(JSON.parse(JSON.stringify(facilitiesLst)));
    }, [facilitiesLst]);

    // Thực hiện gán giá trị cơ sở đào tạo
    useEffect(() => {
        facilitiesLstByDescription && setLstFacilityByDescription(JSON.parse(JSON.stringify(facilitiesLstByDescription)));
        console.log(facilitiesLstByDescription);
    }, [facilitiesLstByDescription]);

    useEffect(() => {
        addressesLst && setLstAddresses(JSON.parse(JSON.stringify(addressesLst)));
        console.log(addressesLst);
    }, [addressesLst]);
    // Thực hiện gán giá trị vai trò
    useEffect(() => {
        setLstPosition(JSON.parse(JSON.stringify(positionsLst)));
        setLstPositonUniversity(JSON.parse(JSON.stringify(positonUniversityLst)));
        setLstPositonLocal(JSON.parse(JSON.stringify(positonLocalLst)));
        console.log(positonUniversityLst);
        console.log(positonLocalLst);

    }, [positionsLst]);

    // Thực hiện nếu đã đăng nhập thành công, trở về trang chủ
    useEffect(() => {
        if (tokenLogin) {
            navigate("/");
        }
    }, [tokenLogin])

    // Thực hiện chuyển đến trang tiếp theo nếu thông tin hợp lệ
    useEffect(() => {
        if (!isExistEmail) {
            if (checkClickUniversityReview)
                setCurrentUniversity(currentUniversity + 1);
            if (checkClickLocalReview)
                setCurrentLocal(currentLocal + 1);
        }
    }, [isExistEmail])

    // Thực hiện khi đăng ký thành công
    useEffect(() => {
        if (registerSuccess) {
            setIsLogin(!isLogin)
            // message.success('Email xác nhận đã gửi!');
        }
    }, [registerSuccess])

    useEffect(() => {
        if (checkClickUniversityReview) {
            if (userEmail && !userEmail.includes("edu.vn")) {
                notification['info']({
                    message: 'Email cung cấp không có đuôi edu.vn',
                    description: 'Bạn không thể lựa chọn vai trò cán bộ/giảng viên/cán bộ chuyên trách nếu không cung cấp email có đuôi edu.vn',
                    duration: 3,
                    style: {
                        width: '50%',
                        marginTop: '-50px'
                    }
                });
            }
            if (userEmail && userEmail.includes("edu.vn")) setIsMailEdu(true);

        }
        else if (checkClickLocalReview) {
            if (userEmail && !userEmail.includes("gov.vn")) {
                notification['info']({
                    message: 'Email cung cấp không có đuôi gov.vn',
                    description: 'Bạn không thể lựa chọn vai trò cán bộ chuyên trách nếu không cung cấp email có đuôi gov.vn',
                    duration: 3,
                    style: {
                        width: '50%',
                        marginTop: '-50px'
                    }
                });
            }
            if (userEmail && userEmail.includes("gov.vn")) setIsMailEdu(true);
        }
        console.log(isMailEdu);
    }, [userEmail])

    // Hàm thực hiện lưu thông tin của trang đầu tiên của đăng ký
    const handleClickFirstStep = async (res: any): Promise<any> => {
        console.log(res);
        setUserName(res.userName);
        setUserEmail(res.userEmail);
        setUserPassword(res.userPassword);
        setUserConfirmPassword(res.userConfirmPassword);
        dispatch(checkEmailRequest(res.userEmail));
    }
    // Hàm thực hiện check khi click vào select 
    const handleTypeOfFacilityVisibleChange = (visible: boolean) => {
        setCheckClickTypeOfFacility(visible);
    }

    // Hàm thực hiện check khi click vào select của trường đại học / cao đẳng

    const handleFacilityVisibleChange = (visible: boolean) => {
        setCheckClickFacility(visible);
    }

    // Hàm thực hiện check khi click vào select của vị trí

    const handlePositionVisibleChange = (visible: boolean) => {
        setCheckClickPosition(visible);
    }
    // Hàm thực hiện thay đổi thông tin nhập khi chọn đại học / cao đẳng 
    const handleOnChangeTypeOfFacility = (val: string) => {
        if (val === '1') {
            setCheckFacility(1)
        }
        if (val === '2') {
            setCheckFacility(2)
        }
        console.log(val);

    }

    // Hàm thực hiện lưu thông tin của trang thứ 2 của đăng ký
    const handleClickSecondStep = async (res: any): Promise<any> => {
        console.log(res);
        if (checkClickUniversityReview) {
            if (checkFacility === 1)
                setUserFacilityId(res.userFacilityUniversitiesId);
            if (checkFacility === 2)
                setUserFacilityId(res.userFacilityCollegesId);
            setUserPositionId(res.userPositionId)

            setCurrentUniversity(currentUniversity + 1);
        }
        else if (checkClickLocalReview) {
            setUserLocalId(res.userLocalId);
            setUserPositionLocalId(res.userPositionLocalId);
            setCurrentLocal(currentLocal + 1);
        }
    }
    // Hàm thực hiện khi đã hoàn thành form đăng ký
    const onFinishRegister = async (): Promise<any> => {

        let type = "";
        if (userPositionId !== positionIdStaffInChange) {
            type = "UINNOVATE";
        }
        else if (userPositionId === positionIdStaffInChange) {
            type = "UIMPACT";
        }
        if (userPositionLocalId) {
            type = "PINNOVATE";
        }
        if (userPositionId) {
            const req: RegisterRequest = {
                "email": userEmail,
                "password": userPassword,
                "confirmPassword": userConfirmPassword,
                "name": userName,
                "phone": "string",
                "address": "string",
                "type": type,
                "addressId": userLocalId,
                "facilityId": userFacilityId,
                "positionId": userPositionId,
                "additionalProp1": {}
            };
            dispatch(registerRequest(req));
        }
        else {
            const req: RegisterRequest = {
                "email": userEmail,
                "password": userPassword,
                "confirmPassword": userConfirmPassword,
                "name": userName,
                "phone": "string",
                "address": "string",
                "type": type,
                "addressId": userLocalId,
                "facilityId": userFacilityId,
                "positionId": userPositionLocalId,
                "additionalProp1": {}
            };
            dispatch(registerRequest(req));
        }
    }
    // Hàm thực hiện khi đã hoàn thành form đăng nhập
    const onFinishLogin = async (account: any): Promise<any> => {
        console.log(account);
        const req: LoginRequest = {
            "email": account.EmailLogin,
            "password": account.PasswordLogin,
            "remember": account.remember,
            "additionalProp1": {},

        };
        dispatch(loginRequest(req));
    }

    // Hàm thực hiện trở lại trang chủ
    const onClickBackButton = () => {
        navigate("/");
    }

    // Hàm chuyển đổi giữa đăng nhập và đăng xuất
    const onClickSwitchButton = () => {
        setIsLogin(!isLogin)
        setCheckBeginFrom(true);
        setCheckClickUniversityReview(false);
        setCheckClickLocalReview(false);
    }

    // Hàm thực hiện trở lại các bước đăng nhập
    const onClickBackPage = () => {
        if (checkClickUniversityReview)
            setCurrentUniversity(currentUniversity - 1);
        if (checkClickLocalReview)
            setCurrentLocal(currentLocal - 1);
    }

    const handleClickUniversityReview = () => {
        setCheckClickUniversityReview(true);
        setCheckBeginFrom(false);
        setCurrentUniversity(0);
        setIsMailEdu(false);
    }

    const handleClickLocalReview = () => {
        setCheckClickLocalReview(true);
        setCurrentLocal(0);
        setCheckBeginFrom(false);
        setIsMailEdu(false);
    }

    return (
        <motion.div className='login-main'
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
        >
            <div className='back-to-login'>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <div onClick={onClickBackButton}>
                            <motion.div
                                className='back-button'
                                whileHover={{ scale: 1.5 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                                <div className="icon"><ArrowLeftOutlined /></div>
                                <div className="text">Quay lại</div>
                            </motion.div>
                        </div>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='content-main'>
                <div className='image-of-login'>
                    <div className='title'>Chào mừng bạn đến với V.innovate!</div>
                    <div className='sub-title'>Đánh giá, xếp hạng các trường đại học. cao đằng/tỉnh thành phố về dổi mới sáng tạo, khởi nghiệp và tạo tác động.</div>
                    {isLogin && <motion.img src={isLogin ? LoginImage : LoginImage2} alt=''
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}

                    />}
                    {!isLogin && <motion.img src={isLogin ? LoginImage : LoginImage2} alt=''
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    />}

                </div>
                <div className='form-login'>
                    {
                        isLogin ?
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1 }}
                            >
                                <div className='login-content'>
                                    <div className='title'>VUI LÒNG ĐĂNG NHẬP ĐỂ ĐÁNH GIÁ</div>
                                    <div className='content'>Lorem ipsum dolor sit amet consectetur. Sit mattis mattis non convallis pulvinar sem commodo vitae est.</div>
                                </div>
                                <Form
                                    name="basic"
                                    wrapperCol={{ span: 16 }}
                                    initialValues={{ remember: true }}
                                    onFinish={onFinishLogin}
                                    autoComplete="off"
                                >
                                    <Form.Item
                                        label="Email/Tài khoản"
                                        name="EmailLogin"
                                        rules={[
                                            { type: 'email', message: 'Email không hợp lệ', },
                                            { required: true, message: 'Vui lòng nhập email!' }
                                        ]}
                                    >
                                        <Input className='input-login email-input' placeholder='Nhập Email hoặc tài khoản' />
                                    </Form.Item>

                                    <Form.Item
                                        label="Mật khẩu"
                                        name="PasswordLogin"
                                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                                    >
                                        <Input.Password className='input-login' placeholder='Nhập mật khẩu' />
                                    </Form.Item>

                                    <Form.Item className='remember-forgot-password' name="remember" valuePropName="checked" >
                                        <label className='label-login'>
                                            <Checkbox className='checkbox-login' />
                                            <motion.div
                                                style={{ cursor: 'pointer' }}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                whileFocus={{ scale: 1.1 }}>Nhớ mật khẩu</motion.div>
                                        </label>
                                        <motion.div className='forgot-password'
                                            whileHover={{ scale: 1.3 }}
                                            whileTap={{ scale: 0.95 }}
                                            whileFocus={{ scale: 1.3 }}>Quên mật khẩu</motion.div>
                                    </Form.Item>
                                    <Form.Item >
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            whileFocus={{ scale: 1.1 }}
                                        >
                                            <Button className='button-submit' type="text" htmlType="submit">
                                                Đăng nhập
                                            </Button>
                                        </motion.div>
                                    </Form.Item>
                                </Form>
                                <div className='change-to-register'>
                                    Bạn chưa có tài khoản ?
                                    <motion.strong
                                        className='register'
                                        whileHover={{ scale: 1.3 }}
                                        whileTap={{ scale: 0.95 }}
                                        whileFocus={{ scale: 1.3 }}
                                        onClick={onClickSwitchButton}
                                    >
                                        Đăng ký
                                    </motion.strong>
                                </div>
                            </motion.div>
                            :
                            <div>
                                {checkBeginFrom && <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1 }}
                                >
                                    <div className='login-content'>
                                        <div className='title'>BẠN CẦN ĐÁNH GIÁ ĐIỀU GÌ?</div>
                                        <div className='content'>Chúng tôi sẽ xác định xem bạn có phải người thực sự là người thuộc ở trong trường đại học hay không ?</div>
                                    </div>
                                    <div className='choose-evaluate'>
                                        <motion.div className='content-box'
                                            whileHover="hover"
                                            whileTap="tap"
                                            variants={hoverVariants}
                                            onClick={handleClickUniversityReview}
                                        >
                                            <div className='title'>ĐÁNH GIÁ TRƯỜNG ĐẠI HỌC</div>
                                            <div className='sub-title'>Quan tâm đánh giá trường đại học, anh/chị có thể tiếp cận đến bộ công cụ U.innovate và U.impact</div>
                                        </motion.div>
                                        <motion.div className='content-box'
                                            whileHover="hover"
                                            whileTap="tap"
                                            variants={hoverVariants}
                                            onClick={handleClickLocalReview}
                                        >
                                            <div className='title'>ĐÁNH GIÁ ĐỊA PHƯƠNG</div>
                                            <div className='sub-title'>Quan tâm đánh giá địa phương, anh/chị có thể tiếp cận đến bộ công cụ P.innovate</div>
                                        </motion.div>
                                    </div>

                                </motion.div>}

                                {checkClickUniversityReview && <>
                                    {currentUniversity === 0 &&
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 1 }}>
                                            <div className='login-content'>
                                                <div className='title'>CUNG CẤP THÔNG TIN CƠ BẢN</div>
                                                <div className='content'>Chúng tôi sẽ xác định xem bạn có phải người thực sự là người thuộc ở trong trường đại học hay không ?</div>
                                            </div>
                                            <Form
                                                name="basic"
                                                wrapperCol={{ span: 16 }}
                                                initialValues={{ remember: true }}
                                                onFinish={handleClickFirstStep}
                                                autoComplete="off"
                                                form={form}
                                            >
                                                <Form.Item
                                                    label="Họ và tên"
                                                    name="userName"
                                                    rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                                                >

                                                    <Input className='email-input' placeholder='Nhập họ và tên' />
                                                </Form.Item>

                                                <Form.Item
                                                    label="Email"
                                                    name="userEmail"
                                                    rules={[
                                                        { type: 'email', message: 'Email không hợp lệ', },
                                                        { required: true, message: 'Vui lòng nhập email!' }
                                                    ]}
                                                >
                                                    <Input className='email-input' placeholder='Nhập Email' />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Mật khẩu"
                                                    name="userPassword"
                                                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                                                >
                                                    <Input.Password id='basic_PasswordRegiter' placeholder='Nhập mật khẩu' />
                                                </Form.Item>

                                                <Form.Item
                                                    className='userConfirmPassword'
                                                    label="Xác nhận mật khẩu"
                                                    name="userConfirmPassword"
                                                    dependencies={['userPassword']}
                                                    rules={[
                                                        { required: true, message: 'Vui lòng nhập xác nhận mật khẩu!' },
                                                        ({ getFieldValue }) => ({
                                                            validator(_, value) {
                                                                if (!value || getFieldValue('userPassword') === value) {
                                                                    return Promise.resolve();
                                                                }
                                                                return Promise.reject(new Error('Mật khẩu xác nhận không đúng!'));
                                                            },
                                                        }),
                                                    ]}
                                                >
                                                    <Input.Password id='basic_ConfirmPasswordRegiter' placeholder='Nhập lại mật khẩu' />
                                                </Form.Item>

                                                <Form.Item >
                                                    <motion.div
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        whileFocus={{ scale: 1.1 }}
                                                    >
                                                        <Button className='button-submit' type="text" htmlType="submit">
                                                            Tiếp tục
                                                        </Button>
                                                    </motion.div>
                                                </Form.Item>
                                                <Form.Item className='step-item'>
                                                    <Steps
                                                        direction='horizontal'
                                                        progressDot
                                                        current={currentUniversity}
                                                        items={[{}, {}, {},]}
                                                    />
                                                </Form.Item>
                                            </Form>
                                        </motion.div>
                                    }
                                    {currentUniversity === 1 &&
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 1 }}>
                                            <div className='login-content'>
                                                <div className='title'>THÔNG TIN TẠI CƠ SỞ ĐÀO TẠO</div>
                                                <div className='content'>Chúng tôi sẽ xác định xem bạn có phải người thực sự là người thuộc ở trong trường đại học hay không ?</div>
                                            </div>
                                            <Form
                                                name="basic"
                                                wrapperCol={{ span: 16 }}
                                                initialValues={{ remember: true }}
                                                onFinish={handleClickSecondStep}
                                                autoComplete="off"
                                                form={form}
                                            >
                                                <Form.Item
                                                    label="Cơ sở đào tạo"
                                                    name="typeOfFacility"
                                                    rules={[{ required: true, message: 'Vui lòng cơ sở đào tạo!' }]}>
                                                    <Select
                                                        suffixIcon={<CaretDownOutlined />}
                                                        placeholder="Chọn cơ sở đào tạo"
                                                        onChange={handleOnChangeTypeOfFacility}
                                                        onDropdownVisibleChange={handleTypeOfFacilityVisibleChange}
                                                    >
                                                        <Option value='1'>Đại học</Option>
                                                        <Option value='2'>Cao đẳng</Option>
                                                    </Select>
                                                </Form.Item>
                                                {checkFacility === 1 &&
                                                    <motion.div
                                                        initial={{ opacity: 0, marginTop: 70 }}
                                                        animate={checkClickTypeOfFacility ? { opacity: 1, marginTop: 70 } : { opacity: 1, marginTop: 0 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.25 }}
                                                    >
                                                        <Form.Item
                                                            label="Chọn trường đại học"
                                                            name="userFacilityUniversitiesId"
                                                            rules={[{ required: true, message: 'Vui lòng chọn trường đại học!' }]}
                                                        >
                                                            <Select
                                                                showSearch
                                                                optionFilterProp="children"
                                                                filterOption={(input, option) => option?.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option?.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                                suffixIcon={<CaretDownOutlined />}
                                                                placeholder="Tìm kiếm trường đại học"
                                                                onDropdownVisibleChange={handleFacilityVisibleChange}
                                                            >
                                                                {lstFacilityByDescription?.universities.map((index) => (
                                                                    <Option value={index.id}>{index.name}</Option>
                                                                ))}
                                                            </Select>
                                                        </Form.Item>
                                                    </motion.div>
                                                }
                                                {checkFacility === 2 &&
                                                    <motion.div
                                                        initial={{ opacity: 0, marginTop: 70 }}
                                                        animate={checkClickTypeOfFacility ? { opacity: 1, marginTop: 70 } : { opacity: 1, marginTop: 0 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.25 }}
                                                    >
                                                        <Form.Item
                                                            label="Chọn trường cao đẳng"
                                                            name="userFacilityCollegesId"
                                                            rules={[{ required: true, message: 'Vui lòng chọn trường cao đẳng!' }]}
                                                        >
                                                            <Select
                                                                showSearch
                                                                optionFilterProp="children"
                                                                filterOption={(input, option) => option?.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option?.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                                suffixIcon={<CaretDownOutlined />}
                                                                placeholder="Tìm kiếm theo cao đẳng"
                                                                onDropdownVisibleChange={handleFacilityVisibleChange}
                                                            >
                                                                {lstFacilityByDescription?.colleges.map((index) => (
                                                                    <Option value={index.id}>{index.name}</Option>
                                                                ))}
                                                            </Select>
                                                        </Form.Item>
                                                    </motion.div>
                                                }
                                                <motion.div
                                                    initial={{ marginTop: 0 }}
                                                    animate={checkClickFacility ? { marginTop: 260 } : { marginTop: 0 }}
                                                    exit={{ marginTop: 0 }}
                                                    transition={{ duration: 0.25 }}>
                                                    <Form.Item
                                                        label="Vai trò tại cơ sở đào tạo"
                                                        name="userPositionId"
                                                        rules={[{ required: true, message: 'Vui lòng chọn vai trò cơ sở đào tạo!' }]}
                                                    >
                                                        <Select
                                                            suffixIcon={<CaretDownOutlined />}
                                                            placeholder="Chọn vai trò"
                                                            onDropdownVisibleChange={handlePositionVisibleChange}
                                                        >
                                                            {lstPositonUniversity.map((index) => (
                                                                <>
                                                                    {index.id === positionIdStudent && <Option value={index.id}>{index.name}</Option>}
                                                                    {(index.id !== positionIdStudent && isMailEdu) && <Option value={index.id}>{index.name}</Option>}
                                                                    {(index.id !== positionIdStudent && !isMailEdu) && <Option value={index.id} disabled>{index.name}</Option>}
                                                                </>
                                                                // <Option value={index.id}>{index.name}</Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                </motion.div>

                                                <Form.Item >
                                                    <motion.div
                                                        style={{ display: 'flex', justifyContent: 'space-between' }}
                                                        initial={{ marginTop: 10 }}
                                                        animate={checkClickPosition ? { marginTop: 130 } : { marginTop: 10 }}
                                                    >
                                                        <motion.div
                                                            style={{ width: '100%', marginRight: '20px' }}
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}>
                                                            <Button className='button-submit' type="text" htmlType="submit" style={{ marginRight: 10 }}>
                                                                Tiếp tục
                                                            </Button>
                                                        </motion.div>
                                                        <motion.div
                                                            style={{ width: '100%' }}
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}>
                                                            <Button className='button-back' onClick={onClickBackPage}>
                                                                Quay lại
                                                            </Button>
                                                        </motion.div>
                                                    </motion.div>
                                                </Form.Item>
                                                <Form.Item className='step-item'>
                                                    <Steps
                                                        progressDot
                                                        current={currentUniversity}
                                                        items={[{}, {}, {},]}
                                                    />
                                                </Form.Item>
                                            </Form>
                                        </motion.div>}
                                    {(currentUniversity === 2 && userPositionId !== positionIdStaffInChange) &&
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 1 }}>
                                            <div className='login-content'>
                                                <div className='title'>THÔNG TIN CHUYÊN SÂU</div>
                                                <div className='content'>Chúng tôi sẽ xác định xem bạn có phải người thực sự là người thuộc ở trong trường đại học hay không ?</div>
                                            </div>
                                            <Form
                                                name="basic"
                                                wrapperCol={{ span: 16 }}
                                                initialValues={{ remember: true }}
                                                onFinish={onFinishRegister}
                                                autoComplete="off"
                                                form={form}

                                            >
                                                <Form.Item
                                                    label="Anh/chị thuộc Khoa/Viện nào tại cơ sở đào tạo?"
                                                    name="FinalInfo-1"
                                                    rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
                                                >
                                                    <Input className='email-input' placeholder='Nhập câu trả lời' />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Vai trò của anh/chị tại Cơ sở đào tạo? "
                                                    name="FinalInfo-2"
                                                    rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
                                                >
                                                    <Input className='email-input' placeholder='Nhập câu trả lời' />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Lĩnh vực anh, chị phụ trách?"
                                                    name="FinalInfo-3"
                                                >
                                                    <Input className='email-input' placeholder='Nhập câu trả lời' />
                                                </Form.Item>
                                                <Form.Item
                                                    className='agreement'
                                                    name="agreement-1"
                                                    valuePropName="checked"
                                                    rules={[
                                                        {
                                                            validator: (_, value) =>
                                                                value ? Promise.resolve() : Promise.reject(new Error('Vui lòng chấp nhận điều khoản')),
                                                        },
                                                    ]}
                                                >
                                                    <label className='label-login label-agreement'>
                                                        <Checkbox className='checkbox-login' />
                                                        <>Tôi chấp nhận Tuyên bố về quyền riêng tư
                                                            Bằng cách chọn hộp này, tôi xác nhận rằng tôi muốn đăng ký dịch vụ này và tôi đồng ý cho IID xử lý dữ liệu cá nhân của tôi cho mục đích được mô tả trong tuyên bố về quyền riêng tư (nghĩa là để nhận thông tin được yêu cầu về các chủ đề khác nhau trong lĩnh vực dịch vụ của VNHEI thông qua bản tin hoặc thông báo của chúng tôi)   </>
                                                    </label>
                                                </Form.Item>
                                                <Form.Item
                                                    className='agreement'
                                                    name="agreement-2"
                                                    valuePropName="checked"
                                                    rules={[
                                                        {
                                                            validator: (_, value) =>
                                                                value ? Promise.resolve() : Promise.reject(new Error('Vui lòng chấp nhận điều khoản')),
                                                        },
                                                    ]}
                                                >
                                                    <label className='label-login label-agreement'>
                                                        <Checkbox className='checkbox-login' />
                                                        <>Tôi chấp nhận <strong>  Điều khoản và Điều kiện</strong></>
                                                    </label>
                                                </Form.Item>
                                                <Form.Item
                                                    name="agreement-3"
                                                    className='agreement'
                                                    valuePropName="checked"

                                                >
                                                    <label className='label-login label-agreement'>
                                                        <Checkbox className='checkbox-login' />
                                                        <>Tôi muốn nhận thông tin cập nhật về VNHEI</>
                                                    </label>
                                                </Form.Item>
                                                <Form.Item
                                                    name="agreement-4"
                                                    className='agreement'
                                                    valuePropName="checked"
                                                >
                                                    <label className='label-login label-agreement'>
                                                        <Checkbox className='checkbox-login' />
                                                        <>Tôi muốn nhận thêm thông tin về cách sử dụng trang web VNHEI</>
                                                    </label>
                                                </Form.Item>

                                                <Form.Item >
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <motion.div
                                                            style={{ width: '100%', marginRight: '20px' }}
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}>
                                                            <Button className='button-submit' type="text" htmlType="submit" style={{ marginRight: 10 }}>
                                                                Đăng ký
                                                            </Button>
                                                        </motion.div>
                                                        <motion.div
                                                            style={{ width: '100%' }}
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}>
                                                            <Button className='button-back' onClick={onClickBackPage}>
                                                                Quay lại
                                                            </Button>
                                                        </motion.div>
                                                    </div>
                                                </Form.Item>
                                                <Form.Item className='step-item'>
                                                    <Steps
                                                        progressDot
                                                        current={currentUniversity}
                                                        items={[{}, {}, {},]}
                                                    />
                                                </Form.Item>
                                            </Form>
                                        </motion.div>
                                    }
                                    {(currentUniversity === 2 && userPositionId === positionIdStaffInChange) &&
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 1 }}>
                                            <div className='login-content'>
                                                <div className='title'>THÔNG TIN CHUYÊN SÂU</div>
                                                <div className='content'>Chúng tôi sẽ xác định xem bạn có phải người thực sự là người thuộc ở trong trường đại học hay không ?</div>
                                            </div>
                                            <Form
                                                name="basic"
                                                wrapperCol={{ span: 16 }}
                                                initialValues={{ remember: true }}
                                                onFinish={onFinishRegister}
                                                autoComplete="off"
                                                form={form}

                                            >
                                                <Form.Item
                                                    label="Anh/chị thuộc Tổ chức nào ?"
                                                    name="input-1"
                                                    rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
                                                >
                                                    <Input className='email-input' placeholder='Nhập câu trả lời' />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Vai trò của anh/chị tại tổ chức của mình?"
                                                    name="input-2"
                                                    rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
                                                >
                                                    <Input className='email-input' placeholder='Nhập câu trả lời' />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Lĩnh vực anh, chị phụ trách?"
                                                    name="input-3"
                                                    rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
                                                >
                                                    <Input className='email-input' placeholder='Nhập câu trả lời' />
                                                </Form.Item>
                                                <Form.Item
                                                    className='agreement'
                                                    name="agreement-1"
                                                    valuePropName="checked"
                                                    rules={[
                                                        {
                                                            validator: (_, value) =>
                                                                value ? Promise.resolve() : Promise.reject(new Error('Vui lòng chấp nhận điều khoản')),
                                                        },
                                                    ]}
                                                >
                                                    <label className='label-login label-agreement'>
                                                        <Checkbox className='checkbox-login' />
                                                        <>Tôi chấp nhận Tuyên bố về quyền riêng tư
                                                            Bằng cách chọn hộp này, tôi xác nhận rằng tôi muốn đăng ký dịch vụ này và tôi đồng ý cho IID xử lý dữ liệu cá nhân của tôi cho mục đích được mô tả trong tuyên bố về quyền riêng tư (nghĩa là để nhận thông tin được yêu cầu về các chủ đề khác nhau trong lĩnh vực dịch vụ của VNHEI thông qua bản tin hoặc thông báo của chúng tôi)   </>
                                                    </label>
                                                </Form.Item>
                                                <Form.Item
                                                    className='agreement'
                                                    name="agreement-2"
                                                    valuePropName="checked"
                                                    rules={[
                                                        {
                                                            validator: (_, value) =>
                                                                value ? Promise.resolve() : Promise.reject(new Error('Vui lòng chấp nhận điều khoản')),
                                                        },
                                                    ]}
                                                >
                                                    <label className='label-login label-agreement'>
                                                        <Checkbox className='checkbox-login' />
                                                        <>Tôi chấp nhận <strong>  Điều khoản và Điều kiện</strong></>
                                                    </label>
                                                </Form.Item>
                                                <Form.Item
                                                    name="agreement-3"
                                                    className='agreement'
                                                    valuePropName="checked"

                                                >
                                                    <label className='label-login label-agreement'>
                                                        <Checkbox className='checkbox-login' />
                                                        <>Tôi muốn nhận thông tin cập nhật về VNHEI</>
                                                    </label>
                                                </Form.Item>
                                                <Form.Item
                                                    name="agreement-4"
                                                    className='agreement'
                                                    valuePropName="checked"
                                                >
                                                    <label className='label-login label-agreement'>
                                                        <Checkbox className='checkbox-login' />
                                                        <>Tôi muốn nhận thêm thông tin về cách sử dụng trang web VNHEI</>
                                                    </label>
                                                </Form.Item>

                                                <Form.Item >
                                                    <div style={{ display: 'flex', margin: '10px 0', justifyContent: 'space-between' }}>
                                                        <motion.div
                                                            style={{ width: '100%', marginRight: '20px' }}
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}>
                                                            <Button className='button-submit' type="primary" htmlType="submit" style={{ marginRight: 10 }}>
                                                                Đăng ký
                                                            </Button>
                                                        </motion.div>
                                                        <motion.div
                                                            style={{ width: '100%' }}
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}>
                                                            <Button className='button-back' onClick={onClickBackPage}>
                                                                Quay lại
                                                            </Button>
                                                        </motion.div>
                                                    </div>
                                                </Form.Item>
                                                <Form.Item className='step-item'>
                                                    <Steps
                                                        progressDot
                                                        current={currentUniversity}
                                                        items={[{}, {}, {},]}
                                                    />
                                                </Form.Item>
                                            </Form>
                                        </motion.div>
                                    }</>
                                }
                                {checkClickLocalReview && <>
                                    {currentLocal === 0 &&
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 1 }}>
                                            <div className='login-content'>
                                                <div className='title'>CUNG CẤP THÔNG TIN CƠ BẢN</div>
                                                <div className='content'>Chúng tôi sẽ xác định xem bạn có phải người thực sự là người thuộc ở trong trường đại học hay không ?</div>
                                            </div>
                                            <Form
                                                name="basic"
                                                wrapperCol={{ span: 16 }}
                                                initialValues={{ remember: true }}
                                                onFinish={handleClickFirstStep}
                                                autoComplete="off"
                                                form={form}
                                            >
                                                <Form.Item
                                                    label="Họ và tên"
                                                    name="userName"
                                                    rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                                                >

                                                    <Input className='email-input' placeholder='Nhập họ và tên' />
                                                </Form.Item>

                                                <Form.Item
                                                    label="Email"
                                                    name="userEmail"
                                                    rules={[
                                                        { type: 'email', message: 'Email không hợp lệ', },
                                                        { required: true, message: 'Vui lòng nhập email!' }
                                                    ]}
                                                >
                                                    <Input className='email-input' placeholder='Nhập Email' />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Mật khẩu"
                                                    name="userPassword"
                                                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                                                >
                                                    <Input.Password id='basic_PasswordRegiter' placeholder='Nhập mật khẩu' />
                                                </Form.Item>

                                                <Form.Item
                                                    className='userConfirmPassword'
                                                    label="Xác nhận mật khẩu"
                                                    name="userConfirmPassword"
                                                    dependencies={['userPassword']}
                                                    rules={[
                                                        { required: true, message: 'Vui lòng nhập xác nhận mật khẩu!' },
                                                        ({ getFieldValue }) => ({
                                                            validator(_, value) {
                                                                if (!value || getFieldValue('userPassword') === value) {
                                                                    return Promise.resolve();
                                                                }
                                                                return Promise.reject(new Error('Mật khẩu xác nhận không đúng!'));
                                                            },
                                                        }),
                                                    ]}
                                                >
                                                    <Input.Password id='basic_ConfirmPasswordRegiter' placeholder='Nhập lại mật khẩu' />
                                                </Form.Item>

                                                <Form.Item >
                                                    <motion.div
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        whileFocus={{ scale: 1.1 }}
                                                    >
                                                        <Button className='button-submit' type="text" htmlType="submit">
                                                            Tiếp tục
                                                        </Button>
                                                    </motion.div>
                                                </Form.Item>
                                                <Form.Item className='step-item'>
                                                    <Steps
                                                        direction='horizontal'
                                                        progressDot
                                                        current={currentLocal}
                                                        items={[{}, {}, {},]}
                                                    />
                                                </Form.Item>
                                            </Form>
                                        </motion.div>
                                    }
                                    {currentLocal === 1 &&
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 1 }}>
                                            <div className='login-content'>
                                                <div className='title'>THÔNG TIN TẠI ĐỊA PHƯƠNG</div>
                                                <div className='content'>Chúng tôi sẽ xác định xem bạn có phải người thực sự là người thuộc ở trong trường đại học hay không ?</div>
                                            </div>
                                            <Form
                                                name="basic"
                                                wrapperCol={{ span: 16 }}
                                                initialValues={{ remember: true }}
                                                onFinish={handleClickSecondStep}
                                                autoComplete="off"
                                                form={form}
                                            >
                                                <motion.div
                                                    initial={{ opacity: 0, marginTop: 70 }}
                                                    animate={checkClickTypeOfFacility ? { opacity: 1, marginTop: 70 } : { opacity: 1, marginTop: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 0.25 }}
                                                >
                                                    <Form.Item
                                                        label="Anh chị đến từ tỉnh, thành phố nào ?"
                                                        name="userLocalId"
                                                        rules={[{ required: true, message: 'Vui lòng chọn tỉnh / thành phố!' }]}
                                                    >
                                                        <Select
                                                            showSearch
                                                            optionFilterProp="children"
                                                            filterOption={(input, option) => option?.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option?.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                            suffixIcon={<CaretDownOutlined />}
                                                            placeholder="Tìm kiếm tỉnh / thành phố"
                                                            onDropdownVisibleChange={handleFacilityVisibleChange}
                                                        >
                                                            {lstAddresses.map((index) => (
                                                                <Option value={index.id}>{index.name}</Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                </motion.div>
                                                <motion.div
                                                    initial={{ marginTop: 0 }}
                                                    animate={checkClickFacility ? { marginTop: 260 } : { marginTop: 0 }}
                                                    exit={{ marginTop: 0 }}
                                                    transition={{ duration: 0.25 }}>
                                                    <Form.Item
                                                        label="Vai trò tại hệ sinh thái của địa phương ?"
                                                        name="userPositionLocalId"
                                                        rules={[{ required: true, message: 'Vui lòng chọn vai trò cơ sở đào tạo!' }]}
                                                    >
                                                        <Select
                                                            suffixIcon={<CaretDownOutlined />}
                                                            placeholder="Chọn vai trò"
                                                            onDropdownVisibleChange={handlePositionVisibleChange}
                                                        >
                                                            {lstPositonLocal.map((index) => (
                                                                <>
                                                                    {(index.id !== positionIdStaffInChangeStartUp) && <Option value={index.id}>{index.name}</Option>}
                                                                    {(index.id === positionIdStaffInChangeStartUp && isMailEdu) && <Option value={index.id}>{index.name}</Option>}
                                                                    {(index.id === positionIdStaffInChangeStartUp && !isMailEdu) && <Option value={index.id} disabled>{index.name}</Option>}
                                                                </>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                </motion.div>

                                                <Form.Item >
                                                    <motion.div
                                                        style={{ display: 'flex', justifyContent: 'space-between' }}
                                                        initial={{ marginTop: 10 }}
                                                        animate={checkClickPosition ? { marginTop: 260 } : { marginTop: 10 }}
                                                    >
                                                        <motion.div
                                                            style={{ width: '100%', marginRight: '20px' }}
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}>
                                                            <Button className='button-submit' type="text" htmlType="submit" style={{ marginRight: 10 }}>
                                                                Tiếp tục
                                                            </Button>
                                                        </motion.div>
                                                        <motion.div
                                                            style={{ width: '100%' }}
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}>
                                                            <Button className='button-back' onClick={onClickBackPage}>
                                                                Quay lại
                                                            </Button>
                                                        </motion.div>
                                                    </motion.div>
                                                </Form.Item>
                                                <Form.Item className='step-item'>
                                                    <Steps
                                                        progressDot
                                                        current={currentLocal}
                                                        items={[{}, {}, {},]}
                                                    />
                                                </Form.Item>
                                            </Form>
                                        </motion.div>}
                                    {(currentLocal === 2 && userPositionLocalId === positionIdStaffInChangeStartUp) &&
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 1 }}>
                                            <div className='login-content'>
                                                <div className='title'>THÔNG TIN CHUYÊN SÂU</div>
                                                <div className='content'>Chúng tôi sẽ xác định xem bạn có phải người thực sự là người thuộc ở trong trường đại học hay không ?</div>
                                            </div>
                                            <Form
                                                name="basic"
                                                wrapperCol={{ span: 16 }}
                                                initialValues={{ remember: true }}
                                                onFinish={onFinishRegister}
                                                autoComplete="off"
                                                form={form}

                                            >
                                                <Form.Item
                                                    label="Anh/chị thuộc Sở, ban ngành nào?"
                                                    name="FinalInfo-1"
                                                    rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
                                                >
                                                    <Input className='email-input' placeholder='Nhập câu trả lời' />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Vai trò của anh/chị tại cơ quan của mình? "
                                                    name="FinalInfo-2"
                                                    rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
                                                >
                                                    <Input className='email-input' placeholder='Nhập câu trả lời' />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Lĩnh vực anh, chị phụ trách?"
                                                    name="FinalInfo-3"
                                                >
                                                    <Input className='email-input' placeholder='Nhập câu trả lời' />
                                                </Form.Item>
                                                <Form.Item
                                                    className='agreement'
                                                    name="agreement-1"
                                                    valuePropName="checked"
                                                    rules={[
                                                        {
                                                            validator: (_, value) =>
                                                                value ? Promise.resolve() : Promise.reject(new Error('Vui lòng chấp nhận điều khoản')),
                                                        },
                                                    ]}
                                                >
                                                    <label className='label-login label-agreement'>
                                                        <Checkbox className='checkbox-login' />
                                                        <>Tôi chấp nhận Tuyên bố về quyền riêng tư
                                                            Bằng cách chọn hộp này, tôi xác nhận rằng tôi muốn đăng ký dịch vụ này và tôi đồng ý cho IID xử lý dữ liệu cá nhân của tôi cho mục đích được mô tả trong tuyên bố về quyền riêng tư (nghĩa là để nhận thông tin được yêu cầu về các chủ đề khác nhau trong lĩnh vực dịch vụ của VNHEI thông qua bản tin hoặc thông báo của chúng tôi)   </>
                                                    </label>
                                                </Form.Item>
                                                <Form.Item
                                                    className='agreement'
                                                    name="agreement-2"
                                                    valuePropName="checked"
                                                    rules={[
                                                        {
                                                            validator: (_, value) =>
                                                                value ? Promise.resolve() : Promise.reject(new Error('Vui lòng chấp nhận điều khoản')),
                                                        },
                                                    ]}
                                                >
                                                    <label className='label-login label-agreement'>
                                                        <Checkbox className='checkbox-login' />
                                                        <>Tôi chấp nhận <strong>  Điều khoản và Điều kiện</strong></>
                                                    </label>
                                                </Form.Item>
                                                <Form.Item
                                                    name="agreement-3"
                                                    className='agreement'
                                                    valuePropName="checked"

                                                >
                                                    <label className='label-login label-agreement'>
                                                        <Checkbox className='checkbox-login' />
                                                        <>Tôi muốn nhận thông tin cập nhật về VNHEI</>
                                                    </label>
                                                </Form.Item>
                                                <Form.Item
                                                    name="agreement-4"
                                                    className='agreement'
                                                    valuePropName="checked"
                                                >
                                                    <label className='label-login label-agreement'>
                                                        <Checkbox className='checkbox-login' />
                                                        <>Tôi muốn nhận thêm thông tin về cách sử dụng trang web VNHEI</>
                                                    </label>
                                                </Form.Item>

                                                <Form.Item >
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                        <motion.div
                                                            style={{ width: '100%', marginRight: '20px' }}
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}>
                                                            <Button className='button-submit' type="text" htmlType="submit" style={{ marginRight: 10 }}>
                                                                Đăng ký
                                                            </Button>
                                                        </motion.div>
                                                        <motion.div
                                                            style={{ width: '100%' }}
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}>
                                                            <Button className='button-back' onClick={onClickBackPage}>
                                                                Quay lại
                                                            </Button>
                                                        </motion.div>
                                                    </div>
                                                </Form.Item>
                                                <Form.Item className='step-item'>
                                                    <Steps
                                                        progressDot
                                                        current={currentLocal}
                                                        items={[{}, {}, {},]}
                                                    />
                                                </Form.Item>
                                            </Form>
                                        </motion.div>
                                    }
                                    {(currentLocal === 2 && userPositionLocalId !== positionIdStaffInChangeStartUp) &&
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 1 }}>
                                            <div className='login-content'>
                                                <div className='title'>THÔNG TIN CHUYÊN SÂU</div>
                                                <div className='content'>Chúng tôi sẽ xác định xem bạn có phải người thực sự là người thuộc ở trong trường đại học hay không ?</div>
                                            </div>
                                            <Form
                                                name="basic"
                                                wrapperCol={{ span: 16 }}
                                                initialValues={{ remember: true }}
                                                onFinish={onFinishRegister}
                                                autoComplete="off"
                                                form={form}

                                            >
                                                <Form.Item
                                                    label="Anh/chị thuộc Tổ chức nào ?"
                                                    name="input-1"
                                                    rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
                                                >
                                                    <Input className='email-input' placeholder='Nhập câu trả lời' />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Vai trò của anh/chị tại tổ chức của mình?"
                                                    name="input-2"
                                                    rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
                                                >
                                                    <Input className='email-input' placeholder='Nhập câu trả lời' />
                                                </Form.Item>
                                                <Form.Item
                                                    label="Lĩnh vực anh, chị phụ trách?"
                                                    name="input-3"
                                                    rules={[{ required: true, message: 'Vui lòng nhập thông tin!' }]}
                                                >
                                                    <Input className='email-input' placeholder='Nhập câu trả lời' />
                                                </Form.Item>
                                                <Form.Item
                                                    className='agreement'
                                                    name="agreement-1"
                                                    valuePropName="checked"
                                                    rules={[
                                                        {
                                                            validator: (_, value) =>
                                                                value ? Promise.resolve() : Promise.reject(new Error('Vui lòng chấp nhận điều khoản')),
                                                        },
                                                    ]}
                                                >
                                                    <label className='label-login label-agreement'>
                                                        <Checkbox className='checkbox-login' />
                                                        <>Tôi chấp nhận Tuyên bố về quyền riêng tư
                                                            Bằng cách chọn hộp này, tôi xác nhận rằng tôi muốn đăng ký dịch vụ này và tôi đồng ý cho IID xử lý dữ liệu cá nhân của tôi cho mục đích được mô tả trong tuyên bố về quyền riêng tư (nghĩa là để nhận thông tin được yêu cầu về các chủ đề khác nhau trong lĩnh vực dịch vụ của VNHEI thông qua bản tin hoặc thông báo của chúng tôi)   </>
                                                    </label>
                                                </Form.Item>
                                                <Form.Item
                                                    className='agreement'
                                                    name="agreement-2"
                                                    valuePropName="checked"
                                                    rules={[
                                                        {
                                                            validator: (_, value) =>
                                                                value ? Promise.resolve() : Promise.reject(new Error('Vui lòng chấp nhận điều khoản')),
                                                        },
                                                    ]}
                                                >
                                                    <label className='label-login label-agreement'>
                                                        <Checkbox className='checkbox-login' />
                                                        <>Tôi chấp nhận <strong>  Điều khoản và Điều kiện</strong></>
                                                    </label>
                                                </Form.Item>
                                                <Form.Item
                                                    name="agreement-3"
                                                    className='agreement'
                                                    valuePropName="checked"

                                                >
                                                    <label className='label-login label-agreement'>
                                                        <Checkbox className='checkbox-login' />
                                                        <>Tôi muốn nhận thông tin cập nhật về VNHEI</>
                                                    </label>
                                                </Form.Item>
                                                <Form.Item
                                                    name="agreement-4"
                                                    className='agreement'
                                                    valuePropName="checked"
                                                >
                                                    <label className='label-login label-agreement'>
                                                        <Checkbox className='checkbox-login' />
                                                        <>Tôi muốn nhận thêm thông tin về cách sử dụng trang web VNHEI</>
                                                    </label>
                                                </Form.Item>

                                                <Form.Item >
                                                    <div style={{ display: 'flex', margin: '10px 0', justifyContent: 'space-between' }}>
                                                        <motion.div
                                                            style={{ width: '100%', marginRight: '20px' }}
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}>
                                                            <Button className='button-submit' type="primary" htmlType="submit" style={{ marginRight: 10 }}>
                                                                Đăng ký
                                                            </Button>
                                                        </motion.div>
                                                        <motion.div
                                                            style={{ width: '100%' }}
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}>
                                                            <Button className='button-back' onClick={onClickBackPage}>
                                                                Quay lại
                                                            </Button>
                                                        </motion.div>
                                                    </div>
                                                </Form.Item>
                                                <Form.Item className='step-item'>
                                                    <Steps
                                                        progressDot
                                                        current={currentLocal}
                                                        items={[{}, {}, {},]}
                                                    />
                                                </Form.Item>
                                            </Form>
                                        </motion.div>
                                    }</>
                                }
                                <div className='change-to-register'>
                                    Bạn đã có tài khoản ?
                                    <motion.strong
                                        className='register'
                                        whileHover={{ scale: 1.3 }}
                                        whileTap={{ scale: 0.95 }}
                                        whileFocus={{ scale: 1.3 }}
                                        onClick={onClickSwitchButton}
                                    >
                                        Đăng nhập
                                    </motion.strong>
                                </div>
                            </div>
                    }
                </div>
            </div>
            {registerSuccess && <ActiveAccountModel email={userEmail} />}
        </motion.div>
    )
}

export default Login