import './baohanh.css';

const data = [
    ["10F2, Hồ Trung Thành, P7 – Tp. Cà Mau, Tỉnh Cà Mau", "(0780)-2212 158", "8h00 - 17h00"],
    ["14A2 Trần Nguyên Hãn, P.Mỹ Long, Long Xuyên, An Giang", "(0763)-8418 649", "8h00 - 17h00"],
    ["114 Tô Hiệu, Quận Lê Chân, Tp. Hải Phòng", "(031)-384 7689", "8h00 - 17h00"],
    ["32 Lương Khánh Thiện, Tp. Hải phòng", "(092)-4713 257", "8h00 - 17h00"],
    ["123 Nam Kỳ Khởi Nghĩa, Tp. Vũng Tàu, Tỉnh BRVT", "(064)-3531 248", "8h00 - 17h00"],
    ["157 Ngô Gia Tự, Phường Ngô Quyền, TP Bắc Giang", "(0240)-3820 349", "8h00 - 17h00"],
    ["32 Lương Khánh Thiện, Tp. Hải phòng", "(0781)-3827 676", "8h00 - 17h00"],
    ["139 Nguyễn Văn Cừ, Tp. Bắc Ninh, Tỉnh Bắc Ninh", "(0241)-3812767", "8h00 - 17h00"],
    ["39 Nguyễn Đình Chiểu, P 1, Tx. Bến Tre, Tỉnh Bến Tre", "(075)-3814 701", "8h00 - 17h00"],
    ["10A, Lý Thường Kiệt, Tp. Quy Nhơn, Tỉnh Bình Định", "(056)-3821 788", "8h00 - 17h00"],
    ["42 Phố 11 Vân Giang, P. Vân Giang, Tp. Ninh Bình", "(030)-389 3408", "8h00 - 17h00"],
    ["283 Cách Mạng Tháng Tám, TX.Thủ Dầu Một, Tỉnh Bình Dương", "(065)-0383 528", "8h00 - 17h00"],
    ["47 Khu 2, P. Phước Bình, Tx. Phước Long, Bình Phước", "(0651)-3774 789", "8h00 - 17h00"],
    ["20 Nguyễn Hội P.Phú Trinh Tp.Phan Thiết, Tỉnh Bình Thuận", "(062)-382 853", "8h00 - 17h00"],
    ["76 Nguyễn Đình Chiểu, P 2, Tp. Cao Lãnh, Đồng Tháp", "(067)-3874 686", "8h00 - 17h00"]
];

const Baohanh = () => {
    return (
        <table className="banglienhe">
            <thead className="daubanglienhe">
                <tr className="Thanbanlienhe">
                    <td colSpan="4" className="header-table_12222">
                        <div className="scrolling-text">
                            <span>Các trung tâm bảo hành của KingsCellPhone</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th className="col1_1">STT</th>
                    <th className="col2_1">Địa chỉ</th>
                    <th className="col3_1">Điện thoại</th>
                    <th className="col4_1">Thời gian làm việc</th>
                </tr>
            </thead>
            <tbody className="bodylienhe_1">
                {data.map((center, index) => (
                    <tr className="Thanbanlienhe" key={index}>
                        <td className="col1_1">{index + 1}</td>
                        <td className="col2_1">
                            <a className='abaohanh' href={`https://maps.google.com/maps?q=${encodeURIComponent(center[0])}`} target="_blank" rel="noopener noreferrer" title="Xem bản đồ">
                                {center[0]}
                            </a>
                        </td>
                        <td className="col3_1">{center[1]}</td>
                        <td className="col4_1">{center[2]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Baohanh;
