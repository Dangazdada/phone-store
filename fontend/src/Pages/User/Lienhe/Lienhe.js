import './lienhe.css';

const Lienhe = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
        // Form handling logic here
        console.log('Form submitted');
    };

    return (
        <div className="body-lienhe">
            <div className="lienhe-header">Liên hệ</div>
            <div className="lienhe-info">
                <div className="info-left">
                    <h2 style={{ color: 'gray' }}>CÔNG TY CỔ PHẦN LĐ - GROUP</h2><br />
                    <b>Địa chỉ:</b> 782 Phạm Văn Bạch, Phường 12, Quận Gò vấp, Hồ Chí Minh<br /><br />
                    <b>Telephone:</b> 19001003<br /><br />
                    <b>Hotline:</b> 0364304226 - CSKH: 19001003<br /><br />
                    <b>E-mail:</b> KingsCellPhoneLD@gmail.com<br /><br />
                    <b>Mã số thuế:</b> 01 02 03 04 05<br /><br />
                    <b>Tài khoản ngân hàng:</b><br /><br />
                    <b>Số TK:</b> 060008086888<br /><br />
                    <b>Tại Ngân hàng:</b> Agribank Chi nhánh Sài Gòn<br /><br /><br /><br />
                    <b>Quý khách có thể gửi liên hệ tới chúng tôi bằng cách hoàn tất biểu mẫu dưới đây. Chúng tôi sẽ trả lời thư của quý khách, xin vui lòng khai báo đầy đủ. Hân hạnh phục vụ và chân thành cảm ơn sự quan tâm, đóng góp ý kiến đến Smartphone Store.</b>
                </div>
                <div className="info-right">
                    <iframe 
                    
                        width="100%" 
                        height="450" 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.8784834649281!2d106.70032633160932!3d10.771894099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f40a3b49e59%3A0xa1bd14e483a602db!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEvhu7kgdGh14bqtdCBDYW8gVGjhuq9uZw!5e0!3m2!1svi!2s!4v1701787635028!5m2!1svi!2s"
                        title="Company Location"
                    ></iframe>
                </div>
            </div>
            <div className="lienhe-info">
                <div className="guithongtin">
                    <p style={{ fontSize: '22px', color: 'gray' }}>Gửi thông tin liên lạc cho chúng tôi: </p>
                    <hr />
                    <form name="formlh" onSubmit={handleSubmit}>
                        <table className="Chiuchiutable" cellSpacing="10px">
                            <tbody>
                                <tr>
                                    <td>Họ và tên</td>
                                    <td>
                                        <input 
                                            type="text" 
                                            name="ht" 
                                            size="40" 
                                            maxLength="40" 
                                            placeholder="Họ tên"
                                            autoComplete="off" 
                                            required
                                            style={{ borderRadius: '20px', padding: '10px', border: '1px solid #ccc' }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Điện thoại liên hệ</td>
                                    <td>
                                        <input 
                                            type="text" 
                                            name="sdt" 
                                            size="40" 
                                            maxLength="11" 
                                            minLength="10" 
                                            placeholder="Điện thoại"
                                            required 
                                            style={{ borderRadius: '20px', padding: '10px', border: '1px solid #ccc' }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Địa chỉ Email</td>
                                    <td>
                                        <input 
                                            type="email" 
                                            name="em" 
                                            size="40" 
                                            placeholder="Email" 
                                            autoComplete="off"
                                            required 
                                            style={{ borderRadius: '20px', padding: '10px', border: '1px solid #ccc' }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Tiêu đề</td>
                                    <td>
                                        <input 
                                            type="text" 
                                            name="tde" 
                                            size="40" 
                                            maxLength="100" 
                                            placeholder="Tiêu đề"
                                            required 
                                            style={{ borderRadius: '20px', padding: '10px', border: '1px solid #ccc' }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Nội dung</td>
                                    <td>
                                        <textarea 
                                            name="nd" 
                                            rows="5" 
                                            cols="44" 
                                            maxLength="500" 
                                            wrap="physical"
                                            placeholder="Nội dung liên hệ" 
                                            required 
                                            style={{ borderRadius: '20px', padding: '10px', border: '1px solid #ccc' }}
                                        ></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <button style={{ borderRadius: '20px', padding: '10px', border: '1px solid #ccc' }} type="submit">Gửi thông tin liên hệ</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Lienhe;
