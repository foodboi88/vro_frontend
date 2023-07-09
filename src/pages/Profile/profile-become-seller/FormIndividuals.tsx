import { Button, DatePicker, Form, Input } from 'antd';
import { getBusinessByTaxCodeRequest, sellerRegisterRequest } from '../../../redux/controller';
import { useDispatchRoot, useSelectorRoot } from '../../../redux/store';
import { useEffect } from 'react';
import { IReqFormArchitect } from '../../../common/profile.interface';

interface Props {
    setPage(e: any): void;
}

const FormIndividuals = (props: Props) => {
    const dispatch = useDispatchRoot();
    const { businessProfile } = useSelectorRoot((state) => state.sketch);
    const [formIndividuals] = Form.useForm();

    const onFinish = (values: any) => {
        console.log(values);

        // format date to 2021-01-01T00:00:00.000Z
        const date = new Date(values.dateOfIssue._d);

        const res: IReqFormArchitect = {
            sellerType: "ARCHITECT",
            identityCardNumber: values.CCCD,
            identityCardDate: date.toISOString(),
            identityCardPlace: values.placeOfIssue,
            vatCode: values.taxCode,
            bankAccountNumber: values.accountNumber,
            bankName: values.bank,
            bankBranch: values.branch,
            additionalProp1: {}
        }
        dispatch(sellerRegisterRequest(res));
    };

    const handleChangeTaxCode = (e: any) => {
        console.log(e.target.value);
        dispatch(getBusinessByTaxCodeRequest(e.target.value))
    }

    useEffect(() => {
        if (businessProfile) {
            formIndividuals.setFieldsValue({
                address: businessProfile.address,
            });
        }
    }, [businessProfile])

    return (
        <div className='profile-content form-individuals'>
            <div className='profile-content-title'>Điền thông tin của bạn vào ô dưới đây!</div>
            <div className="profile-content-sub-title">Admin sẽ duyệt thông tin của bạn và phản hồi lại trong vòng 15p nếu thông tin của bạn hợp lệ.</div>
            <Form
                layout={'vertical'}
                form={formIndividuals}
                onFinish={onFinish}
                className='form-individuals-content'
            >
                <Form.Item
                    label="Họ và tên"
                    name="userName"
                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                >
                    <Input placeholder='Nhập họ và tên' />
                </Form.Item>

                <Form.Item
                    label="Số CCCD"
                    name="CCCD"
                    rules={[{ required: true, message: 'Vui lòng nhập số CCCD' }]}
                >
                    <Input placeholder='Nhập số CCCD' />
                </Form.Item>
                <div className='flex-col' >
                    <Form.Item
                        label="Ngày cấp"
                        name="dateOfIssue"
                        rules={[{ required: true, message: 'Vui lòng nhập ngày cấp' }]}
                    >
                        <DatePicker placeholder='Nhập ngày cấp' />
                    </Form.Item>
                    <Form.Item
                        label="Nơi cấp"
                        name="placeOfIssue"
                        rules={[{ required: true, message: 'Vui lòng nhập nơi cấp' }]}
                    >
                        <Input placeholder='Nhập nơi cấp' />
                    </Form.Item>
                </div>
                <Form.Item
                    label="Mã số thuế cá nhân"
                    name="taxCode"
                    rules={[{ required: true, message: 'Vui lòng nhập mã số thuế' }]}
                >
                    <Input placeholder='Nhập mã số thuế' onBlur={handleChangeTaxCode} />
                </Form.Item>
                <Form.Item
                    label="Địa chỉ"
                    name="address"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                >
                    <Input placeholder='Nhập địa chỉ' />
                </Form.Item>
                <div className="flex-col">

                    <Form.Item
                        label="Email"
                        name="Email"
                        rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                    >
                        <Input placeholder='Nhập email' />
                    </Form.Item>
                    <Form.Item
                        label="Số điện thoại"
                        name="phoneNumber"
                        rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                    >
                        <Input placeholder='Nhập số điện thoại' />
                    </Form.Item>
                </div>
                <div className="flex-col">

                    <Form.Item
                        label="Số tài khoản"
                        name="accountNumber"
                        rules={[{ required: true, message: 'Vui lòng nhập số tài khoản' }]}
                    >
                        <Input placeholder='Nhập số tài khoản' />
                    </Form.Item>
                    <Form.Item
                        label="Tên tài khoản"
                        name="accountName"
                        rules={[{ required: true, message: 'Vui lòng nhập tên tài khoản' }]}
                    >
                        <Input placeholder='Nhập tên tài khoản' />
                    </Form.Item>
                </div>
                <div className="flex-col">

                    <Form.Item
                        label="Ngân hàng"
                        name="bank"
                        rules={[{ required: true, message: 'Vui lòng nhập ngân hàng' }]}
                    >
                        <Input placeholder='Nhập ngân hàng' />
                    </Form.Item>
                    <Form.Item
                        label="Chi nhánh"
                        name="branch"
                        rules={[{ required: true, message: 'Vui lòng nhập chi nhánh' }]}
                    >
                        <Input placeholder='Nhập chi nhánh' />
                    </Form.Item>
                </div>

                <Form.Item >
                    <div className='button-groud'>
                        <Button className='button-back' onClick={() => {
                            document.body.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            });
                            props.setPage(1)
                        }}>Quay lại</Button>
                        <Button className='button-submit' type="primary" htmlType="submit">Gửi thông tin</Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default FormIndividuals