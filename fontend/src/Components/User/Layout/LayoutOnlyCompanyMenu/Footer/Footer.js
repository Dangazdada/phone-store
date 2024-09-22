import './Footer.css';
const Footer = () => {
    return ( 
        <>
        <footer>
            <div className="Footer_bg">
            <div className="Footer_col-content">
                <div className="Footer_link-content">
                <h4><a>Hỗ Trợ - Dịch Vụ</a></h4>
                <ul className="Footer_ul">
                    <li><a href="/mua-hang-tra-gop">Chính sách và hướng dẫn mua hàng trả góp</a></li>
                    <li><a href="/huong-dan-dat-hang">Hướng dẫn mua hàng và chính sách vận chuyển</a></li>
                    <li><a href="/order/check">Tra cứu đơn hàng</a></li>
                    <li><a href="/chinh-sach-bao-hanh">Chính sách đổi mới và bảo hành</a></li>
                    <li><a href="/dat-hang/bao-hanh-mo-rong">Dịch vụ bảo hành mở rộng</a></li>
                    <li><a href="/chinh-sach-bao-mat">Chính sách bảo mật</a></li>
                    <li><a href="/chinh-sach-giai-quyet-khieu-nai">Chính sách giải quyết khiếu nại</a></li>
                    <li><a href="/dieu-khoan-mua-ban-hang-hoa">Quy chế hoạt động</a></li>
                </ul>
                </div>
                <div className="Footer_link-content">
                <h4><a>Thông Tin Liên Hệ</a></h4>
                <ul className="Footer_ul">
                    <li><a href="/mua-hang-online">Thông tin các trang TMĐT </a></li>
                    <li><a href="/tin-tuc/hoang-ha-care-dich-vu-sua-chua-dien-thoai-may-tinh-bang-voi-gia-tot-nhat-thi-truong">Dịch vụ sửa chữa Hoàng Hà Care</a></li>
                    <li><a href="/hop-tac-kinh-doanh">Khách hàng doanh nghiệp (B2B)</a></li>
                    <li><a href="/trung-tam-bao-hanh">Tra cứu bảo hành</a></li>
                </ul>
                </div>
                <div className="Footer_link-content">
                <h4><a href="/he-thong-cua-hang">Hệ thống 129 siêu thị trên toàn quốc</a></h4>
                <ul className="Footer_ul">
                    <li><a href="/he-thong-cua-hang">Danh sách 129 siêu thị trên toàn quốc</a></li>
                </ul>
                </div>

                <div>
                <h4>Tổng đài</h4>
                <a className="Footer_hotline" href="tel:1900.2091">1900.2088</a>
                </div>

                <div>
                <h4>Thanh toán miễn phí</h4>
                <ul className="Footer_list-logo">
                    <li>
                    <img src="https://hoanghamobile.com/Content/web/img/logo-visa.png"/>
                    <img src="https://hoanghamobile.com/Content/web/img/logo-master.png"/>
                    </li>
                    <li>
                    <img src="https://hoanghamobile.com/Content/web/img/logo-jcb.png"/>
                    <img src="https://hoanghamobile.com/Content/web/img/logo-samsungpay.png"/>
                    </li>
                    <li>
                    <img src="https://hoanghamobile.com/Content/web/img/logo-atm.png"/>
                    <img src="https://hoanghamobile.com/Content/web/img/logo-vnpay.png"/>
                    </li>
                    <li>
                    <img src="https://hoanghamobile.com/Content/web/img/logo-zalo.png" style={{borderRadius:"3px"}}/>
                    </li>
                </ul>
                </div>

                <div>
                <h4>Hình thức vận chuyển</h4>
                <ul className="Footer_list-logo">
                    <li>
                    <img src="https://hoanghamobile.com/Content/web/img/nhattin.jpg"/>
                    <img src="https://hoanghamobile.com/Content/web/img/vnpost.jpg"/>
                    </li>
                </ul>
                <div className="mg-top20">
                    <a href="http://online.gov.vn/Home/WebDetails/28738" target="_blank"><img src="https://hoanghamobile.com/Content/web/img/logo-bct.png"/></a>
                </div>
                </div>
            </div>

            <div className="Footer_info">
                <p>© 2024. CÔNG TY CỔ PHẦN XÂY DỰNG VÀ ĐẦU TƯ THƯƠNG MẠI KING CELL PHONE. (Đăng ký lần đầu: Ngày 15 tháng 12 năm 2016, Đăng ký thay đổi ngày 24/11/2022)</p>
                <p><strong>GP số 426/GP-TTĐT do sở TTTT Hồ Chí Minh cấp ngày 22/01/2021</strong></p>
                <p>Địa chỉ: Nhà A1 Lầu 3, Quận 1, Hồ Chí Minh, Việt Nam. Điện thoại: 1900.2088. Chịu trách nhiệm nội dung: <strong>Nguyễn Văn Luân</strong>. </p>

            </div>
            </div>
        </footer>
        </>
     );
}
 
export default Footer;