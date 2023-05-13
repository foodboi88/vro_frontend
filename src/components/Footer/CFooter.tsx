import { motion } from "framer-motion";
import "./styles.footer.scss";
import Image1 from "../../images/footer/image1.png"
import Image2 from "../../images/footer/image2.png"
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
        <footer className="footer">
            <div className="row-1">
                <div className="column-1">
                    <div className="title-content">CÔNG TY CỔ PHẦN XÂY DỰNG VRO</div>
                    <div className="content">Giấy phép ĐKKD số: 123466 do Sở KH&ĐT Hà Nội cấp lần đầu ngày 01/01/1900</div>
                    <div className="content">Trụ sở: Lô 40 liền kề 7 Khu đô thị Tổng cục 5, Bộ Công an - Tân Triều - Thanh Trì - Hà Nội</div>
                    <div className="content">Điện thoại: 0866045577</div>
                    <div className="content">Email: mailto:sale@vro.vn</div>
                </div>
                <div className="column-2">
                    <div className="title-content">Về Chúng tôi</div>
                    <div className="content">Tư vấn mua hàng</div>
                    <div className="content">Giới thiệu về VRO Group</div>
                    <div className="content">Điều kiện & Điều khoản</div>
                    <div className="content">Kinh doanh online từ VRO</div>
                    <div className="content">Quy chế hoạt động</div>
                </div>
                <div className="column-3">
                    <div className="title-content">Chăm sóc khách hàng</div>
                    <div className="content">Quy trình thanh toán</div>
                    <div className="content">Chính sách vận chuyển</div>
                    <div className="content">Chính sách bảo mật</div>
                    <div className="content">Chính sách đổi trả</div>
                    <div className="content">Giải quyết tranh chấp</div>
                </div>
                <div className="column-4">
                    <div className="title-content">Mua hàng trên VRO</div>
                    <div className="content">Tất cả danh mục</div>
                    <div className="content">Yêu cầu báo giá</div>
                    <div className="content">Hỗ trợ người mua</div>
                    <div className="content">Thanh toán an toàn</div>
                    <div className="content">Đảm bảo giao dịch</div>
                </div>
                <div className="column-5">
                    <div className="title-content">Bán hàng trên VRO</div>
                    <div className="content">Quy định đối với người bán</div>
                    <div className="content">Thành viên là nhà cung cấp</div>
                    <div className="content">Khách hàng thân thiết</div>
                    <div className="content">Đăng ký mở gian hàng</div>
                    <div className="content">Hỗ trợ người bán</div>
                </div>
            </div>
            <div className="row-2">
                <div className="column-1">
                    <img src={Image1} alt="" width={150} />
                    <img src={Image2} alt="" width={150} />
                </div>
                <div className="column-2">
                    <div className="title-content">Miền Trung</div>
                    <div className="content">Chi nhánh: Số 129, Hoàng Đức Lương, TP. Đà Nẵng</div>
                    <div className="content">Điện thoại: 0866045577</div>
                    <div className="content">Email: mailto:sale@vro.vn</div>
                </div>
                <div className="column-3">
                    <div className="title-content">Miền Nam</div>
                    <div className="content">Chi nhánh: 34 Xuân Quỳnh, KDC Gia Hòa 523A Đỗ Xuân Hợp, P. Phước Long B, Quận 9, TP.HCM</div>
                    <div className="content">Điện thoại: 0866045577</div>
                    <div className="content">Email: mailto:sale@vro.vn</div>
                </div>
            </div>


        </footer>
    );
}