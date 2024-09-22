use APIServerPhone

--ProductTypes
INSERT ProductTypes(Name,Description,Status) Values
(N'IPhone(IOS)',N'Điện thoại thông minh chạy hệ điều hành iOS, đặc trưng bởi thiết kế cao cấp và tích hợp chặt chẽ với các dịch vụ của Apple.',1),
(N'Android',N'Điện thoại thông minh chạy hệ điều hành Android, có sẵn nhiều ứng dụng và dịch vụ từ Google Play.',1),
(N'Điện thoại phổ thông',N'Điện thoại cơ bản với các chức năng cơ bản như gọi điện, nhắn tin và một số tính năng đơn giản khác.',1);


INSERT Suppliers(Name,Description,Address,Phone,Email,Status) Values(N'Điện Tử Kim Thiên Bảo - Công Ty TNHH Tin Học Kim Thiên Bảo',N'Nhà phân phối điện thoại di động Xiaomi, Redmi với giá tốt nhất!
Điện Tử Kim Thiên Bảo cam kết:
+ Hàng chính hãng 100%
+ Bảo hành đầy đủ, uy tín.',N' 22-24 Đường Số 10, Khu Dân Cư Trung Sơn, P. Bình Hưng, H. Bình Chánh, Tp. Hồ Chí Minh (TPHCM)',N'0907 225 889',N'letandanh999@gmail.com',1)
,(N'Văn Phòng Đại Diện - Công Ty Nokia',N'Là công ty hàng đầu thế giới về điện thoại di động với 143 kiểu máy đa dạng, phù hợp với mọi tiêu chuẩn của khách hàng. Các sản phẩm điện thoại mới nhất của chúng tôi hiện nay là Nokia-X7, Nokia-E6, Nokia-E7, NokiaX1-X2,\...Hãy đến với Nokia nếu các bạn cần một chiếc điện thoại phù hợp cho riêng mình.',N'Phòng 703, Tầng7, Tòa Nhà Metropolitan, 235 Đồng Khởi, P. Bến Nghé, Q. 1, Tp. Hồ Chí Minh (TPHCM)',N'(028) 38236894',N'chau.nguyen@nokia.com',1)
,(N'Thế Giới Di Động - Công Ty TNHH Thế Giới Di Động',N'Là công ty hàng đầu thế giới về điện thoại di động với 143 kiểu máy đa dạng, phù hợp với mọi tiêu chuẩn của khách hàng. Các sản phẩm điện thoại mới nhất của chúng tôi hiện nay là Nokia-X7, Nokia-E6, Nokia-E7, NokiaX1-X2,\...Hãy đến với Nokia nếu các bạn cần một chiếc điện thoại phù hợp cho riêng mình.',N'Phòng 6.5, Tầng6, Tòa Nhà E. Town 2, 364 Cộng Hòa, P. 13, Q. Tân Bình, Tp. Hồ Chí Minh (TPHCM)',N'(028) 35100100',N'lienhe@thegioididong.com',1)
,(N'Mai Nguyên - Công Ty TNHH Công Nghệ Di Động Mai Nguyên',N'Chúng tôi chuyên cung cấp các sản phẩm điện thoại di động của các hãng danh tiếng như: Mobiado, Vertu, Nokia, Samsung, Motorola, Porsche Design, Sony Ericsson, Samsung, HTC, LG, Acer, JBL\...Mai Nguyên luôn nỗ lực mang đến cho quý khách hàng những sản phẩm chất lượng nhất cùng giá cả tốt nhất.',N'117 Nguyễn Bỉnh Khiêm, P. Đa Kao, Q. 1, Tp. Hồ Chí Minh (TPHCM)',N'(028) 39100332',N'mainguyen117@gmail.com',1)

--Manufacturers

INSERT INTO Manufacturers (Name, Address, Phone, Email, Status)
VALUES
(N'Apple', N'One Apple Park Way, Cupertino, CA 95014', N'+1-800-692-7753', N'contact@apple.com', 1),
(N'Samsung', N'129 Samsung-ro, Yeongtong-gu, Suwon-si, Gyeonggi-do, South Korea', N'+82-2-2255-0114', N'contact@samsung.com', 1),
(N'Xiaomi', N'68 Qinghe Middle Street, Haidian District, Beijing, China', N'+86-400-100-5678', N'service.global@xiaomi.com', 1),
(N'Oppo', N'18 Haibin Road, Wusha, Chang’an, Dongguan, China', N'+86-400-166-6888', N'contact@oppo.com', 1),
(N'Vivo', N'283 Huancheng West 2nd Road, Yuhang District, Hangzhou, China', N'+86-400-678-9688', N'service@vivo.com', 1),
(N'Tecno', N'No. 16, Afolabi Lasisi Street, Off Allen Avenue, Ikeja, Lagos, Nigeria', N'+234-701-234-5678', N'contact@tecno-mobile.com', 1),
(N'Nokia', N'Karaportti 3, 02610 Espoo, Finland', N'+358-10-44-88-000', N'contact@nokia.com', 1),
(N'Realme', N'10F, Tower A, China Resource Building, No. 136, Huayuan Road, Haidian District, Beijing, China', N'+86-400-870-9000', N'contact@realme.com', 1),
(N'Honor', N'Honor Base, Bantian, Longgang District, Shenzhen, China', N'+86-755-2878-0808', N'contact@hihonor.com', 1),
(N'TCL', N'26/F, TCL Tower, 8 Tai Chung Road, Tsuen Wan, Hong Kong', N'+852-2406-1388', N'contact@tcl.com', 1),
(N'Masstel', N'10th Floor, Building A, Nam Cuong Building, To Huu Street, Hanoi, Vietnam', N'+84-24-7308-8899', N'support@masstel.vn', 1),
(N'Itel', N'4th Floor, Avenir Building, 64 Nguyen Thi Minh Khai, District 3, Ho Chi Minh City, Vietnam', N'+84-28-7303-8888', N'support@itel-mobile.com', 1);

-- Product
 --ip
	--13prm
	--delete Products
INSERT Products(SKU,Name,Description,ProductTypeId,ManufacturerId,SupplierId,Status,ImgUrlMain) VALUES 
	--15prm
(N'spdk1',N'iPhone 15 Pro Max',NULL,1,1,3,1,N'iphone-15-pro-max-black-1.jpg'),
	--15pr
(N'spdk2',N'iPhone 15 Pro ',NULL,1,1,3,1,N'iphone-15-pro-tu-nhien-1.jpg'),
	--15plus
(N'spdk3',N'iPhone 15 Plus',NULL,1,1,3,1,N'iphone-15-plus-black-1.jpg'),
	--15
(N'spdk4',N'iPhone 15 ',NULL,1,1,3,1,N'iphone-15-plus-hong-1.jpg'),
	--13			 
(N'spdk5',N'iPhone 13',NULL,1,1,3,1,N'iphone-13-xanh-la-1.jpg'),
	--13pr			 
(N'spdk6',N'iPhone 13 Pro',NULL,1,1,3,1,N'iphone-13-pro-vang-dong-1.jpg'),		 
	--13prm
(N'spdk7',N'iPhone 13 Pro Max',NULL,1,1,3,1,N'iphone-13-pro-max-xanh-1.jpg'),
 --ss
	--S24
(N'spdk8',N'Samsung Galaxy S24',NULL,2,2,1,1,N'samsung-galaxy-s24-vang-1.jpg'),
	--S24plus
(N'spdk9',N'Samsung Galaxy S24 Plus',NULL,2,2,1,1,N'samsung-galaxy-s24-plus-tim-1.jpg'),
	--s24ultra
(N'spdk10',N'Samsung Galaxy S24 Ultra',NULL,2,2,1,1,N'samsung-galaxy-s24-ultra-xam-1.jpg'),
	--s23
(N'spdk11',N'Samsung Galaxy S23',NULL,2,2,1,1,N'samsung-galaxy-s23-tim-nhat-1.jpg'),
	--S23plus
(N'spdk12',N'Samsung Galaxy S23 Plus',NULL,2,2,1,1,N'samsung-galaxy-s23-plus-xanh-reu-1.jpg'),
	--s23ultra
(N'spdk13',N'Samsung Galaxy S23 Ultra',NULL,2,2,1,1,N'samsung-galaxy-s23-ultra-den-1.jpg'),
 --Xiaomi
	--Xiaomi 14 Ultra
(N'spdk14',N'Xiaomi 14 Ultra',NULL,2,3,2,1,N'xiaomi-14-ultra-trang-1.jpg'),
	--redmi note 13
(N'spdk15',N'Xiaomi Redmi Note 13',NULL,2,3,2,1,N'redmi-note-13-vang-1.jpg'),
	--redmi note 13 pro
(N'spdk16',N'Xiaomi Redmi Note 13 Pro',NULL,2,3,2,1,N'redmi-note-13-pro-tim-1.jpg'),
	--redmi note 13 pro plus
(N'spdk17',N'Xiaomi Redmi Note 13 Pro Plus',NULL,2,3,2,1,N'redmi-note-13-pro-plus-den-1.jpg'),
--OPPO
	--findn3
(N'spdk18',N'OPPO Find N3 Flip 5G',NULL,2,4,1,1,N'oppo-n3-flip-hong-1.jpg'),

(N'spdk19',N'OPPO Find N3 5G',NULL,2,4,1,1,N'oppo-find-n3-vang-dong-1.jpg'),
	--OPPO A58
(N'spdk20',N'OPPO A58',NULL,2,4,1,1,N'oppo-a58-den-1.jpg'),
--VIVO
	--VivoY36
(N'spdk21',N'VIVO Y36',NULL,2,5,1,1,N'vivo-y36-den-1.jpg'),
	--VivoY100
(N'spdk22',N'VIVO Y100',NULL,2,5,1,1,N'vivo-y100-xanh-nhat-1.jpg'),
--Tecno
	--Tecno Spark 20C
(N'spdk23',N'Tecno Spark 20C',NULL,2,6,3,1,N'tecno-spark-20c-trang-1.jpg')
;

INSERT Colors(Name,Status) VALUES
(N'Titan Đen',1),--1
(N'Titan Tự Nhiên',1),--2
(N'Titan Trắng',1),--3
(N'Titan Xanh',1),--4
(N'Đen',1),--5
(N'Hồng',1),--6
(N'Xanh dương',1),--7
(N'Xanh lá',1),--8
(N'Vàng',1),--9
(N'Trắng',1),--10
(N'Xám',1),--11
(N'Vàng đồng',1),--12
(N'Bạc',1),--13
(N'Tím',1),--14
(N'Tím nhạt',1),--15
(N'Xanh rêu',1),--16
(N'Kem',1),--17
(N'Xanh ngoc',1), --18
(N'Xanh',1),--19
(N'Xanh nhạt',1)--20

;

--MemoryAndStorages
--delete MemoryAndStorages
INSERT MemoryAndStorages(RAM,Storagecapacity,Remainingcapacityisapproximately,Phonebook,Status) VALUES
(N'8 GB',N'128 GB',N'Chưa Xác Định',N'Không Giới Hạn',1),
(N'8 GB',N'256 GB',N'Chưa Xác Định',N'Không Giới Hạn',1),
(N'8 GB',N'512 GB',N'Chưa Xác Định',N'Không Giới Hạn',1),
(N'8 GB',N'1 TB',N'Chưa Xác Định',N'Không Giới Hạn',1),

(N'6 GB',N'128 GB',N'Chưa Xác Định',N'Không Giới Hạn',1),
(N'6 GB',N'256 GB',N'Chưa Xác Định',N'Không Giới Hạn',1),
(N'6 GB',N'512 GB',N'Chưa Xác Định',N'Không Giới Hạn',1),

(N'4 GB',N'128 GB',N'Chưa Xác Định',N'Không Giới Hạn',1),
(N'4 GB',N'256 GB',N'Chưa Xác Định',N'Không Giới Hạn',1),
(N'4 GB',N'512 GB',N'Chưa Xác Định',N'Không Giới Hạn',1),

(N'6 GB',N'1 TB',N'Chưa Xác Định',N'Không Giới Hạn',1),

(N'8 GB',N'256 GB',N'231.2 GB',N'Không Giới Hạn',1), --12
(N'8 GB',N'512 GB',N'484.8 GB',N'Không Giới Hạn',1), --13

(N'12 GB',N'256 GB',N'231.2 GB',N'Không Giới Hạn',1), --14
(N'12 GB',N'512 GB',N'484.8 GB',N'Không Giới Hạn',1), --15

(N'12 GB',N'256 GB',N'231.2 GB',N'Không Giới Hạn',1), --16
(N'12 GB',N'512 GB',N'484.8 GB',N'Không Giới Hạn',1), --17
(N'12 GB',N'1 TB',N'994.5 GB',N'Không Giới Hạn',1), --18

(N'8 GB',N'128 GB',N'99 GB',N'Không Giới Hạn',1), --19
(N'8 GB',N'256 GB',N'227 GB',N'Không Giới Hạn',1), --20

(N'8 GB',N'256 GB',N'231.2 GB',N'Không Giới Hạn',1), --21
(N'8 GB',N'512 GB',N'484.8 GB',N'Không Giới Hạn',1), --22

(N'12 GB',N'256 GB',N'231.2 GB',N'Không Giới Hạn',1), --23
(N'12 GB',N'512 GB',N'484.8 GB',N'Không Giới Hạn',1), --24
(N'12 GB',N'1 TB',N'994.5 GB',N'Không Giới Hạn',1), --25

(N'16 GB',N'512 GB',N'Chưa xác định',N'Không Giới Hạn',1), --26

(N'6 GB',N'128 GB',N'104 GB',N'Không Giới Hạn',1), --27
(N'8 GB',N'128 GB',N'104 GB',N'Không Giới Hạn',1), --28
(N'8 GB',N'256 GB',N'232 GB',N'Không Giới Hạn',1), --29

(N'8 GB',N'128 GB',N'100 GB',N'Không Giới Hạn',1), --30
(N'8 GB',N'256 GB',N'228 GB',N'Không Giới Hạn',1), --31

(N'8 GB',N'256 GB',N'228 GB',N'Không Giới Hạn',1), --32

(N'12 GB',N'256 GB',N'239 GB',N'Không Giới Hạn',1), --33

(N'16 GB',N'512 GB',N'438 GB',N'Không Giới Hạn',1), --34

(N'6 GB',N'128 GB',N'106 GB',N'Không Giới Hạn',1), --35

(N'8 GB',N'128 GB',N'106 GB',N'Không Giới Hạn',1), --36

(N'8 GB',N'128 GB',N'104 GB',N'Không Giới Hạn',1), --37
(N'8 GB',N'256 GB',N'232 GB',N'Không Giới Hạn',1), --38

(N'8 GB',N'128 GB',N'107 GB',N'Không Giới Hạn',1), --39
(N'8 GB',N'256 GB',N'235 GB',N'Không Giới Hạn',1), --40

(N'8 GB',N'128 GB',N'116 GB',N'Không Giới Hạn',1) --41

;
--Promotion
INSERT INTO Promotions (ProductId,Description, Value, Promotiontype, Promotioncode, DateStart, DateEnd, Status) VALUES
(1,N'Giảm 16%', 16, N'giamgiaphantram', N'GG1', '2024-05-22', '2024-06-22', 1),
(1,N'Giảm ngay 500K khi thanh toán qua VNPAY', 500000, N'giamgiatien', N'GG2', '2024-05-22', '2024-06-22', 1),

(2,N'Giảm 15%', 15, N'giamgiaphantram', N'GG1', '2024-05-22', '2024-06-22', 1),
(2,N'Giảm ngay 500K khi thanh toán qua VNPAY', 500000, N'giamgiatien', N'GG2', '2024-05-22', '2024-06-22', 1),

(3,N'Giảm 17%', 17, N'giamgiaphantram', N'GG1', '2024-05-22', '2024-06-22', 1),
(3,N'Giảm ngay 500K khi thanh toán qua VNPAY', 500000, N'giamgiatien', N'GG2', '2024-05-22', '2024-06-22', 1),

(4,N'Giảm 14%', 14, N'giamgiaphantram', N'GG1', '2024-05-22', '2024-06-22', 1),
(4,N'Giảm ngay 500K khi thanh toán qua VNPAY', 500000, N'giamgiatien', N'GG2', '2024-05-22', '2024-06-22', 1),

(5,N'Giảm 18%', 18, N'giamgiaphantram', N'GG1', '2024-05-22', '2024-06-22', 1),
(5,N'Giảm ngay 500K khi thanh toán qua VNPAY', 500000, N'giamgiatien', N'GG2', '2024-05-22', '2024-06-22', 1),

(6,N'Giảm 15%', 15, N'giamgiaphantram', N'GG1', '2024-05-22', '2024-06-22', 1),
(6,N'Giảm ngay 500K khi thanh toán qua VNPAY', 500000, N'giamgiatien', N'GG2', '2024-05-22', '2024-06-22', 1),

(7,N'Giảm 15%', 15, N'giamgiaphantram', N'GG1', '2024-05-22', '2024-06-22', 1),
(7,N'Giảm ngay 500K khi thanh toán qua VNPAY', 500000, N'giamgiatien', N'GG2', '2024-05-22', '2024-06-22', 1),

(8,N'Giảm 15%', 15, N'giamgiaphantram', N'GG1', '2024-05-22', '2024-06-22', 1),
(8,N'Giảm ngay 500K khi thanh toán qua VNPAY', 500000, N'giamgiatien', N'GG2', '2024-05-22', '2024-06-22', 1),

(9,N'Giảm 12%', 12, N'giamgiaphantram', N'GG1', '2024-05-22', '2024-06-22', 1),
(9,N'Giảm ngay 500K khi thanh toán qua VNPAY', 500000, N'giamgiatien', N'GG2', '2024-05-22', '2024-06-22', 1),

(10,N'Giảm 13%', 13, N'giamgiaphantram', N'GG1', '2024-05-22', '2024-06-22', 1),
(10,N'Giảm ngay 500K khi thanh toán qua VNPAY', 500000, N'giamgiatien', N'GG2', '2024-05-22', '2024-06-22', 1),

(11,N'Giảm 16%', 16, N'giamgiaphantram', N'GG1', '2024-05-22', '2024-06-22', 1),
(11,N'Giảm ngay 500K khi thanh toán qua VNPAY', 500000, N'giamgiatien', N'GG2', '2024-05-22', '2024-06-22', 1),

(12,N'Giảm 16%', 16, N'giamgiaphantram', N'GG1', '2024-05-22', '2024-06-22', 1),
(12,N'Giảm ngay 500K khi thanh toán qua VNPAY', 500000, N'giamgiatien', N'GG2', '2024-05-22', '2024-06-22', 1),

(13,N'Giảm 16%', 16, N'giamgiaphantram', N'GG1', '2024-05-22', '2024-06-22', 1),
(13,N'Giảm ngay 500K khi thanh toán qua VNPAY', 500000, N'giamgiatien', N'GG2', '2024-05-22', '2024-06-22', 1),

(14,N'Giảm 14%', 14, N'giamgiaphantram', N'GG1', '2024-05-22', '2024-06-22', 1),
(14,N'Giảm ngay 500K khi thanh toán qua VNPAY', 500000, N'giamgiatien', N'GG2', '2024-05-22', '2024-06-22', 1),

(15,N'Giảm 17%', 17, N'giamgiaphantram', N'GG1', '2024-05-22', '2024-06-22', 1),
(15,N'Giảm ngay 500K khi thanh toán qua VNPAY', 500000, N'giamgiatien', N'GG2', '2024-05-22', '2024-06-22', 1),

(16,N'Giảm 17%', 17, N'giamgiaphantram', N'GG1', '2024-05-22', '2024-06-22', 1),
(16,N'Giảm ngay 500K khi thanh toán qua VNPAY', 500000, N'giamgiatien', N'GG2', '2024-05-22', '2024-06-22', 1),

(17,N'Giảm 17%', 17, N'giamgiaphantram', N'GG1', '2024-05-22', '2024-06-22', 1),
(17,N'Giảm ngay 500K khi thanh toán qua VNPAY', 500000, N'giamgiatien', N'GG2', '2024-05-22', '2024-06-22', 1),

(18,N'Giảm 17%', 17, N'giamgiaphantram', N'GG1', '2024-05-22', '2024-06-22', 1),
(18,N'Giảm ngay 500K khi thanh toán qua VNPAY', 500000, N'giamgiatien', N'GG2', '2024-05-22', '2024-06-22', 1),

(19,N'Giảm 17%', 17, N'giamgiaphantram', N'GG1', '2024-05-22', '2024-06-22', 1),
(19,N'Giảm ngay 500K khi thanh toán qua VNPAY', 500000, N'giamgiatien', N'GG2', '2024-05-22', '2024-06-22', 1),

(20,N'Giảm ngay 500K khi thanh toán qua VNPAY', 500000, N'giamgiatien', N'GG2', '2024-05-22', '2024-06-22', 1),

(21,N'Giảm ngay 500K khi thanh toán qua VNPAY', 500000, N'giamgiatien', N'GG2', '2024-05-22', '2024-06-22', 1),

(22,N'Giảm ngay 500K khi thanh toán qua VNPAY', 500000, N'giamgiatien', N'GG2', '2024-05-22', '2024-06-22', 1),

(23,N'Giảm ngay 500K khi thanh toán qua VNPAY', 500000, N'giamgiatien', N'GG2', '2024-05-22', '2024-06-22', 1)

;
--ProductDetail
INSERT ProductDetails(ProductId,ColorId,MemoryandStorageId,UnitPrice, PurchasePrice, MainUrl,Quantity,Status) VALUES

(1,1,2,29690000,292900000,N'iphone-15-pro-max-black-1.jpg',10,1),
(1,2,2,29590000,292900000,N'iphone-15-pro-max-tu-nhien-1.jpg',10,1),
(1,3,2,29890000,292900000,N'iphone-15-pro-max-white-1.jpg',10,1),
(1,4,2,29290000,292900000,N'iphone-15-pro-max-blue-1.jpg',10,1),

(1,1,3,36590000,35590000,N'iphone-15-pro-max-black-1.jpg',5,1),
(1,2,3,36890000,35590000,N'iphone-15-pro-max-tu-nhien-1.jpg',5,1),
(1,3,3,36990000,35590000,N'iphone-15-pro-max-white-1.jpg',5,1),
(1,4,3,36390000,35590000,N'iphone-15-pro-max-blue-1.jpg',5,1),

(1,1,4,43190000,42980000,N'iphone-15-pro-max-black-1.jpg',15,1),
(1,2,4,43190000,42980000,N'iphone-15-pro-max-tu-nhien-1.jpg',15,1),
(1,3,4,43190000,42980000,N'iphone-15-pro-max-white-1.jpg',15,1),
(1,4,4,43180000,42980000,N'iphone-15-pro-max-blue-1.jpg',15,1),

(2,1,1,25290000,25290000,N'iphone-15-pro-black-1.jpg',15,1),
(2,2,1,25290000,25290000,N'iphone-15-pro-tu-nhien-1.jpg',15,1),
(2,3,1,25290000,25290000,N'iphone-15-pro-white-1.jpg',15,1),
(2,4,1,25290000,25290000,N'iphone-15-pro-blue-1.jpg',15,1),

(2,1,2,27990000,27290000,N'iphone-15-pro-black-1.jpg',15,1),
(2,2,2,27690000,27290000,N'iphone-15-pro-tu-nhien-1.jpg',15,1),
(2,3,2,27890000,27290000,N'iphone-15-pro-white-1.jpg',15,1),
(2,4,2,27890000,27290000,N'iphone-15-pro-blue-1.jpg',15,1),

(2,1,3,34890000,34690000,N'iphone-15-pro-black-1.jpg',15,1),
(2,2,3,34690000,34690000,N'iphone-15-pro-tu-nhien-1.jpg',15,1),
(2,3,3,34790000,34690000,N'iphone-15-pro-white-1.jpg',15,1),
(2,4,3,34790000,34690000,N'iphone-15-pro-blue-1.jpg',15,1),
 
(2,1,4,39890000,39490000,N'iphone-15-pro-black-1.jpg',20,1),
(2,2,4,39690000,39490000,N'iphone-15-pro-tu-nhien-1.jpg',20,1),
(2,3,4,39790000,39490000,N'iphone-15-pro-white-1.jpg',20,1),
(2,4,4,39790000,39490000,N'iphone-15-pro-blue-1.jpg',20,1),

(3,5,5,22590000,22190000,N'iphone-15-plus-black-1.jpg',20,1),
(3,6,5,22190000,22190000,N'iphone-15-plus-hong-1.jpg',20,1),
(3,7,5,22490000,22190000,N'iphone-15-plus-xanh-1.jpg',20,1),
(3,8,5,22190000,22190000,N'iphone-15-plus-xanh-la-1.jpg',20,1),
(3,9,5,22590000,22190000,N'iphone-15-plus-yellow-1.jpg',20,1),

(3,5,6,24590000,24590000,N'iphone-15-plus-black-1.jpg',20,1),
(3,6,6,24590000,24590000,N'iphone-15-plus-hong-1.jpg',20,1),
(3,7,6,24590000,24590000,N'iphone-15-plus-xanh-1.jpg',20,1),
(3,8,6,24390000,24590000,N'iphone-15-plus-xanh-la-1.jpg',20,1),
(3,9,6,24590000,24590000,N'iphone-15-plus-yellow-1.jpg',20,1),

(3,5,7,32590000,32490000,N'iphone-15-plus-black-1.jpg',20,1),
(3,6,7,32590000,32490000,N'iphone-15-plus-hong-1.jpg',20,1),
(3,7,7,32490000,32490000,N'iphone-15-plus-xanh-1.jpg',20,1),
(3,8,7,32490000,32490000,N'iphone-15-plus-xanh-la-1.jpg',20,1),
(3,9,7,32490000,32490000,N'iphone-15-plus-yellow-1.jpg',20,1),

(4,5,5,19490000,19490000,N'iphone-15-black-1.jpg',20,1),
(4,6,5,19490000,19490000,N'iphone-15-hong-1.jpg',20,1),
(4,7,5,19490000,19490000,N'iphone-15-xanh-1.jpg',20,1),
(4,8,5,19490000,19490000,N'iphone-15-xanh-la-1.jpg',20,1),
(4,9,5,19490000,19490000,N'iphone-15-yellow-1.jpg',20,1),

(4,5,6,22590000,22490000,N'iphone-15-black-1.jpg',20,1),
(4,6,6,22490000,22490000,N'iphone-15-hong-1.jpg',20,1),
(4,7,6,22590000,22490000,N'iphone-15-xanh-1.jpg',20,1),
(4,8,6,22490000,22490000,N'iphone-15-xanh-la-1.jpg',20,1),
(4,9,6,22590000,22490000,N'iphone-15-yellow-1.jpg',20,1),

(4,5,7,28590000,28590000,N'iphone-15-black-1.jpg',20,1),
(4,6,7,28490000,28490000,N'iphone-15-hong-1.jpg',20,1),
(4,7,7,28590000,28490000,N'iphone-15-xanh-1.jpg',20,1),
(4,8,7,28490000,28490000,N'iphone-15-xanh-la-1.jpg',20,1),
(4,9,7,28590000,28490000,N'iphone-15-yellow-1.jpg',20,1),

(5,5,8,13790000,13690000,N'iphone-13-den-1.jpg',20,1),
(5,6,8,13790000,13690000,N'iphone-13-hong-1.jpg',20,1),
(5,7,8,13790000,13690000,N'iphone-13-xanh-1.jpg',20,1),
(5,8,8,13690000,13690000,N'iphone-13-xanh-la-1.jpg',20,1),
(5,10,8,13690000,13690000,N'iphone-13-trang-1.jpg',20,1),

(5,5,9,16990000,16990000,N'iphone-13-den-1.jpg',20,1),
(5,6,9,16990000,16990000,N'iphone-13-hong-1.jpg',20,1),
(5,7,9,16990000,16990000,N'iphone-13-xanh-1.jpg',20,1),
(5,8,9,16990000,16990000,N'iphone-13-xanh-la-1.jpg',20,1),
(5,10,9,16990000,16990000,N'iphone-13-trang-1.jpg',20,1),

(5,5,10,24390000,24390000,N'iphone-13-den-1.jpg',20,1),
(5,6,10,24390000,24390000,N'iphone-13-hong-1.jpg',20,1),
(5,7,10,24390000,24390000,N'iphone-13-xanh-1.jpg',20,1),
(5,8,10,24390000,24390000,N'iphone-13-xanh-la-1.jpg',20,1),
(5,10,10,24390000,24390000,N'iphone-13-trang-1.jpg',20,1),

(6,11,5,22000000,21990000,N'iphone-13-pro-xam-1.jpg',20,1),
(6,12,5,22000000,21990000,N'iphone-13-pro-vang-dong-1.jpg',20,1),
(6,7,5,22000000,21990000,N'iphone-13-pro-xanh-1.jpg',20,1),
(6,8,5,22000000,21990000,N'iphone-13-pro-xanh-la-1.jpg',20,1),
(6,13,5,22000000,21990000,N'iphone-13-pro-trang-1.jpg',20,1),
 
(6,11,6,24600000,24490000,N'iphone-13-pro-xam-1.jpg',20,1),
(6,12,6,24600000,24490000,N'iphone-13-pro-vang-dong-1.jpg',20,1),
(6,7,6,24600000,24490000,N'iphone-13-pro-xanh-1.jpg',20,1),
(6,8,6,24600000,24490000,N'iphone-13-pro-xanh-la-1.jpg',20,1),
(6,13,6,24600000,24490000,N'iphone-13-pro-trang-1.jpg',20,1),
 
(6,11,7,25500000,25490000,N'iphone-13-pro-xam-1.jpg',20,1),
(6,12,7,25500000,25490000,N'iphone-13-pro-vang-dong-1.jpg',20,1),
(6,7,7,25500000,25490000,N'iphone-13-pro-xanh-1.jpg',20,1),
(6,8,7,25500000,25490000,N'iphone-13-pro-xanh-la-1.jpg',20,1),
(6,13,7,25500000,25490000,N'iphone-13-pro-trang-1.jpg',20,1),
 
(6,11,11,26000000,25990000,N'iphone-13-pro-xam-1.jpg',20,1),
(6,12,11,26000000,25990000,N'iphone-13-pro-vang-dong-1.jpg',20,1),
(6,7,11,26000000,25990000,N'iphone-13-pro-xanh-1.jpg',20,1),
(6,8,11,26000000,25990000,N'iphone-13-pro-xanh-la-1.jpg',20,1),
(6,13,11,26000000,25990000,N'iphone-13-pro-trang-1.jpg',20,1),

--7

(7,11,5,23090000,22990000,N'iphone-13-pro-max-xam-1.jpg',20,1),
(7,12,5,23090000,22990000,N'iphone-13-pro-max-vang-dong-1.jpg',20,1),
(7,7,5,23090000,22990000,N'iphone-13-pro-max-xanh-1.jpg',20,1),
(7,8,5,23090000,22990000,N'iphone-13-pro-max-xanh-la-1.jpg',20,1),
(7,13,5,23090000,22990000,N'iphone-13-pro-max-bac-1.jpg',20,1),
 
(7,11,6,24090000,23990000,N'iphone-13-pro-max-xam-1.jpg',20,1),
(7,12,6,24090000,23990000,N'iphone-13-pro-max-vang-dong-1.jpg',20,1),
(7,7,6,24090000,23990000,N'iphone-13-pro-max-xanh-1.jpg',20,1),
(7,8,6,24090000,23990000,N'iphone-13-pro-max-xanh-la-1.jpg',20,1),
(7,13,6,24090000,23990000,N'iphone-13-pro-max-bac-1.jpg',20,1),
 
(7,11,7,26900000,25990000,N'iphone-13-pro-max-xam-1.jpg',20,1),
(7,12,7,26900000,25990000,N'iphone-13-pro-max-vang-dong-1.jpg',20,1),
(7,7,7,26900000,25990000,N'iphone-13-pro-max-xanh-1.jpg',20,1),
(7,8,7,26900000,25990000,N'iphone-13-pro-max-xanh-la-1.jpg',20,1),
(7,13,7,26900000,25990000,N'iphone-13-pro-max-bac-1.jpg',20,1),
 
(7,11,11,28090000,27990000,N'iphone-13-pro-max-xam-1.jpg',20,1),
(7,12,11,28090000,27990000,N'iphone-13-pro-max-vang-dong-1.jpg',20,1),
(7,7,11,28090000,27990000,N'iphone-13-pro-max-xanh-1.jpg',20,1),
(7,8,11,28090000,27990000,N'iphone-13-pro-max-xanh-la-1.jpg',20,1),
(7,13,11,28090000,27990000,N'iphone-13-pro-max-bac-1.jpg',20,1),

(8,5,12,21900000,21900000,N'samsung-galaxy-s24-den-1.jpg',20,1),
(8,9,12,21900000,21900000,N'samsung-galaxy-s24-vang-1.jpg',20,1),
(8,14,12,21900000,21900000,N'samsung-galaxy-s24-tim-1.jpg',20,1),
(8,11,12,21900000,21900000,N'samsung-galaxy-s24-xam-1.jpg',20,1),

(8,5,13,25590000,25490000,N'samsung-galaxy-s24-den-1.jpg',20,1),
(8,9,13,25590000,25490000,N'samsung-galaxy-s24-vang-1.jpg',20,1),
(8,14,13,25590000,25490000,N'samsung-galaxy-s24-tim-1.jpg',20,1),
(8,11,13,25590000,25490000,N'samsung-galaxy-s24-xam-1.jpg',20,1),

(9,5,14,24590000,24490000,N'samsung-galaxy-s24-plus-den-1.jpg',20,1),
(9,9,14,24590000,24490000,N'samsung-galaxy-s24-plus-vang-1.jpg',20,1),
(9,14,14,24590000,24490000,N'samsung-galaxy-s24-plus-tim-1.jpg',20,1),
(9,11,14,24590000,24490000,N'samsung-galaxy-s24-plus-xam-1.jpg',20,1),
 
(9,5,15,28690000,28590000,N'samsung-galaxy-s24-plus-den-1.jpg',20,1),
(9,9,15,28690000,28590000,N'samsung-galaxy-s24-plus-vang-1.jpg',20,1),
(9,14,15,28690000,28590000,N'samsung-galaxy-s24-plus-tim-1.jpg',20,1),
(9,11,15,28690000,28590000,N'samsung-galaxy-s24-plus-xam-1.jpg',20,1),

(10,5,16,30000000,29990000,N'samsung-galaxy-s24-ultra-den-1.jpg',20,1),
(10,9,16,30000000,29990000,N'samsung-galaxy-s24-ultra-vang-1.jpg',20,1),
(10,14,16,30000000,29990000,N'samsung-galaxy-s24-ultra-tim-1.jpg',20,1),
(10,11,16,30000000,29990000,N'samsung-galaxy-s24-ultra-xam-1.jpg',20,1),
 
(10,5,17,33590000,33490000,N'samsung-galaxy-s24-ultra-den-1.jpg',20,1),
(10,9,17,33590000,33490000,N'samsung-galaxy-s24-ultra-vang-1.jpg',20,1),
(10,14,17,33590000,33490000,N'samsung-galaxy-s24-ultra-tim-1.jpg',20,1),
(10,11,17,33590000,33490000,N'samsung-galaxy-s24-ultra-xam-1.jpg',20,1),

(10,5,18,40590000,40490000,N'samsung-galaxy-s24-ultra-den-1.jpg',20,1),
(10,9,18,40590000,40490000,N'samsung-galaxy-s24-ultra-vang-1.jpg',20,1),
(10,14,18,40590000,40490000,N'samsung-galaxy-s24-ultra-tim-1.jpg',20,1),
(10,11,18,40590000,40490000,N'samsung-galaxy-s24-ultra-xam-1.jpg',20,1),

(11,5,19,13590000,13490000,N'samsung-galaxy-s23-den-1.jpg',20,1),
(11,15,19,13590000,13490000,N'samsung-galaxy-s23-tim-nhat-1.jpg',20,1),
(11,16,19,13590000,13490000,N'samsung-galaxy-s23-xanh-reu-1.jpg',20,1),
(11,17,19,13590000,13490000,N'samsung-galaxy-s23-kem-1.jpg',20,1),

(11,5,20,14690000,14590000,N'samsung-galaxy-s23-den-1.jpg',20,1),
(11,15,20,14690000,14590000,N'samsung-galaxy-s23-tim-nhat-1.jpg',20,1),
(11,16,20,14690000,14590000,N'samsung-galaxy-s23-xanh-reu-1.jpg',20,1),
(11,17,20,14690000,14590000,N'samsung-galaxy-s23-kem-1.jpg',20,1),

(12,5,21,27000000,26990000,N'samsung-galaxy-s23-plus-den-1.jpg',20,1),
(12,15,21,27000000,26990000,N'samsung-galaxy-s23-plus-tim-nhat-1.jpg',20,1),
(12,16,21,27000000,26990000,N'samsung-galaxy-s23-plus-xanh-reu-1.jpg',20,1),
(12,17,21,27000000,26990000,N'samsung-galaxy-s23-plus-kem-1.jpg',20,1),
  
(12,5,22,30000000,29990000,N'samsung-galaxy-s23-plus-den-1.jpg',20,1),
(12,15,22,30000000,29990000,N'samsung-galaxy-s23-plus-tim-nhat-1.jpg',20,1),
(12,16,22,30000000,29990000,N'samsung-galaxy-s23-plus-xanh-reu-1.jpg',20,1),
(12,17,22,30000000,29990000,N'samsung-galaxy-s23-plus-kem-1.jpg',20,1),

(13,5,23,24000000,23990000,N'samsung-galaxy-s23-ultra-den-1.jpg',20,1),
(13,15,23,24000000,23990000,N'samsung-galaxy-s23-ultra-tim-nhat-1.jpg',20,1),
(13,16,23,24000000,23990000,N'samsung-galaxy-s23-ultra-xanh-reu-1.jpg',20,1),
(13,17,23,24000000,23990000,N'samsung-galaxy-s23-ultra-kem-1.jpg',20,1),

(13,5,24,29000000,28990000,N'samsung-galaxy-s23-ultra-den-1.jpg',20,1),
(13,15,24,29000000,28990000,N'samsung-galaxy-s23-ultra-tim-nhat-1.jpg',20,1),
(13,16,24,29000000,28990000,N'samsung-galaxy-s23-ultra-xanh-reu-1.jpg',20,1),
(13,17,24,29000000,28990000,N'samsung-galaxy-s23-ultra-kem-1.jpg',20,1),

(13,5,25,45000000,44990000,N'samsung-galaxy-s23-ultra-den-1.jpg',20,1),
(13,15,25,45000000,44990000,N'samsung-galaxy-s23-ultra-tim-nhat-1.jpg',20,1),
(13,16,25,45000000,44990000,N'samsung-galaxy-s23-ultra-xanh-reu-1.jpg',20,1),
(13,17,25,45000000,44990000,N'samsung-galaxy-s23-ultra-kem-1.jpg',20,1),

(14,5,26,29990000,29990000,N'xiaomi-14-ultra-den-1.jpg',20,1),
(14,10,26,30000000,29990000,N'xiaomi-14-ultra-trang-1.jpg',20,1),

(15,5,27,4790000,4690000,N'redmi-note-13-den-1.jpg',20,1),
(15,9,27,4690000,4690000,N'redmi-note-13-vang-1.jpg',20,1),
(15,8,27,4690000,4690000,N'redmi-note-13-xanh-la-1.jpg',20,1),

(15,5,28,5000000,4990000,N'redmi-note-13-den-1.jpg',20,1),
(15,9,28,4990000,4990000,N'redmi-note-13-vang-1.jpg',20,1),
(15,8,28,4990000,4990000,N'redmi-note-13-xanh-la-1.jpg',20,1),

(15,5,29,5590000,5500000,N'redmi-note-13-den-1.jpg',20,1),
(15,9,29,5500000,5500000,N'redmi-note-13-vang-1.jpg',20,1),
(15,8,29,5500000,5500000,N'redmi-note-13-xanh-la-1.jpg',20,1),

(16,5,30,6390000,6390000,N'redmi-note-13-pro-den-1.jpg',20,1),
(16,14,30,6290000,6290000,N'redmi-note-13-pro-tim-1.jpg',20,1),
(16,8,30,6390000,6290000,N'redmi-note-13-pro-xanh-la-1.jpg',20,1),
  
(16,5,31,6990000,6890000,N'redmi-note-13-pro-den-1.jpg',20,1),
(16,14,31,6890000,6890000,N'redmi-note-13-pro-tim-1.jpg',20,1),
(16,8,31,6890000,6890000,N'redmi-note-13-pro-xanh-la-1.jpg',20,1),

(17,5,32,9990000,9890000,N'redmi-note-13-pro-plus-den-1.jpg',20,1),
(17,14,32,9890000,9890000,N'redmi-note-13-pro-plus-tim-1.jpg',20,1),
(17,8,32,9890000,9890000,N'redmi-note-13-pro-plus-trang-1.jpg',20,1),

(18,6,33,23990000,22990000,N'oppo-n3-flip-hong-1.jpg',20,1),
(18,5,33,22990000,22990000,N'oppo-n3-flip-den-1.jpg',20,1),
(18,12,33,22990000,22990000,N'oppo-n3-flip-vang-dong-1.jpg',20,1),

(19,12,34,42990000,41990000,N'oppo-find-n3-vang-dong-1.jpg',20,1),
(19,5,34,41990000,41990000,N'oppo-find-n3-den-1.jpg',20,1),

(20,5,35,5590000,5590000,N'oppo-a58-den-1.jpg',20,1),
(20,18,35,5590000,5590000,N'oppo-a58-xanh-ngoc-1.jpg',20,1),

(20,5,36,5890000,5890000,N'oppo-a58-den-1.jpg',20,1),
(20,18,36,5890000,5890000,N'oppo-a58-xanh-ngoc-1.jpg',20,1),

(21,5,37,5190000,5190000,N'vivo-y36-den-1.jpg',20,1),
(21,19,37,5190000,5190000,N'vivo-y36-xanh-1.jpg',20,1),

(21,5,38,6190000,6190000,N'vivo-y36-den-1.jpg',20,1),
(21,19,38,6190000,6190000,N'vivo-y36-xanh-1.jpg',20,1),

(22,5,39,6990000,6990000,N'vivo-y100-den-1.jpg',20,1),
(22,20,39,6990000,6990000,N'vivo-y100-xanh-nhat-1.jpg',20,1),

(22,5,40,7990000,7990000,N'vivo-y100-den-1.jpg',20,1),
(22,20,40,7990000,7990000,N'vivo-y100-xanh-nhat-1.jpg',20,1),

(23,5,41,3190000,3190000,N'tecno-spark-20c-den-1.jpg',20,1),
(23,9,41,3190000,3190000,N'tecno-spark-20c-trang-1.jpg',20,1),
(23,10,41,3190000,3190000,N'tecno-spark-20c-vang-1.jpg',20,1)
;

--Image
INSERT Images(ProductId,ImgUrl,Status) VALUES 
(1,N'iphone-15-pro-max-black-1.jpg',1),
(1,N'iphone-15-pro-max-black-1-1.jpg',1),
(1,N'iphone-15-pro-max-black-2-1.jpg',1),
(1,N'iphone-15-pro-max-black-3-1.jpg',1),
(1,N'iphone-15-pro-max-black-4-1.jpg',1),
(1,N'iphone-15-pro-max-den-tem-99.jpg',1),
(1,N'iphone-15-pro-max-tu-nhien-1.jpg',1),
(1,N'iphone-15-pro-max-tu-nhien-1-1.jpg',1),
(1,N'iphone-15-pro-max-tu-nhien-2-1.jpg',1),
(1,N'iphone-15-pro-max-tu-nhien-3-1.jpg',1),
(1,N'iphone-15-pro-max-tu-nhien-4-1.jpg',1),
(1,N'iphone-15-pro-max-tu-nhien-tem-99.jpg',1),
(1,N'iphone-15-pro-max-white-1.jpg',1),
(1,N'iphone-15-pro-max-white-1-1.jpg',1),
(1,N'iphone-15-pro-max-white-2-1.jpg',1),
(1,N'iphone-15-pro-max-white-3-1.jpg',1),
(1,N'iphone-15-pro-max-white-4-1.jpg',1),
(1,N'iphone-15-pro-max-trang-tem-99.jpg',1),
(1,N'iphone-15-pro-max-blue-1.jpg',1),
(1,N'iphone-15-pro-max-blue-1-1.jpg',1),
(1,N'iphone-15-pro-max-blue-2-1.jpg',1),
(1,N'iphone-15-pro-max-blue-3-1.jpg',1),
(1,N'iphone-15-pro-max-blue-4-1.jpg',1),
(1,N'iphone-15-pro-max-blue-tem-99.jpg',1),

(2,N'iphone-15-pro-tu-nhien-1.jpg',1),
(2,N'iphone-15-pro-tu-nhien-1-1.jpg',1),
(2,N'iphone-15-pro-tu-nhien-2-1.jpg',1),
(2,N'iphone-15-pro-tu-nhien-3-1.jpg',1),
(2,N'iphone-15-pro-tu-nhien-4-1.jpg',1),
(2,N'iphone-15-pro-tu-nhien-tem-99.jpg',1),
(2,N'iphone-15-pro-black-1.jpg',1),
(2,N'iphone-15-pro-black-1-1.jpg',1),
(2,N'iphone-15-pro-black-2-1.jpg',1),
(2,N'iphone-15-pro-black-3-1.jpg',1),
(2,N'iphone-15-pro-black-4-1.jpg',1),
(2,N'iphone-15-pro-den-tem-99.jpg',1),
(2,N'iphone-15-pro-white-1.jpg',1),
(2,N'iphone-15-pro-white-1-1.jpg',1),
(2,N'iphone-15-pro-white-2-1.jpg',1),
(2,N'iphone-15-pro-white-3-1.jpg',1),
(2,N'iphone-15-pro-white-4-1.jpg',1),
(2,N'iphone-15-pro-trang-tem-99.jpg',1),
(2,N'iphone-15-pro-blue-1.jpg',1),
(2,N'iphone-15-pro-blue-1-1.jpg',1),
(2,N'iphone-15-pro-blue-2-1.jpg',1),
(2,N'iphone-15-pro-blue-3-1.jpg',1),
(2,N'iphone-15-pro-blue-4-1.jpg',1),
(2,N'iphone-15-pro-blue-tem-99.jpg',1),

(3,N'iphone-15-plus-black-1.jpg',1),
(3,N'iphone-15-plus-black-1-1.jpg',1),
(3,N'iphone-15-plus-black-2-1.jpg',1),
(3,N'iphone-15-plus-black-3-1.jpg',1),
(3,N'iphone-15-plus-den-tem-99.jpg',1),
(3,N'iphone-15-plus-hong-1.jpg',1),
(3,N'iphone-15-plus-hong-1-1.jpg',1),
(3,N'iphone-15-plus-hong-2-1.jpg',1),
(3,N'iphone-15-plus-hong-3-1.jpg',1),
(3,N'iphone-15-plus-hong-tem-99.jpg',1),
(3,N'iphone-15-plus-xanh-1.jpg',1),
(3,N'iphone-15-plus-xanh-1-1.jpg',1),
(3,N'iphone-15-plus-xanh-2-1.jpg',1),
(3,N'iphone-15-plus-xanh-3-1.jpg',1),
(3,N'iphone-15-plus-xanh-tem-99.jpg',1),
(3,N'iphone-15-plus-xanh-la-1.jpg',1),
(3,N'iphone-15-plus-xanh-la-1-1.jpg',1),
(3,N'iphone-15-plus-xanh-la-2-1.jpg',1),
(3,N'iphone-15-plus-xanh-la-3-1.jpg',1),
(3,N'iphone-15-plus-xanh-la-tem-99.jpg',1),
(3,N'iphone-15-plus-yellow-1-1.jpg',1),
(3,N'iphone-15-plus-yellow-2-1.jpg',1),
(3,N'iphone-15-plus-yellow-3-1.jpg',1),
(3,N'iphone-15-plus-yellow-tem-99.jpg',1),
			
(4,N'iphone-15-hong-1.jpg',1),
(4,N'iphone-15-hong-1-1.jpg',1),
(4,N'iphone-15-hong-2-1.jpg',1),
(4,N'iphone-15-hong-3-1.jpg',1),
(4,N'iphone-15-hong-tem-99.jpg',1),
(4,N'iphone-15-black-1.jpg',1),
(4,N'iphone-15-black-1-1.jpg',1),
(4,N'iphone-15-black-2-1.jpg',1),
(4,N'iphone-15-black-3-1.jpg',1),
(4,N'iphone-15-den-tem-99.jpg',1),
(4,N'iphone-15-xanh-1.jpg',1),
(4,N'iphone-15-xanh-1-1.jpg',1),
(4,N'iphone-15-xanh-2-1.jpg',1),
(4,N'iphone-15-xanh-3-1.jpg',1),
(4,N'iphone-15-xanh-tem-99.jpg',1),
(4,N'iphone-15-xanh-la-1.jpg',1),
(4,N'iphone-15-xanh-la-1-1.jpg',1),
(4,N'iphone-15-xanh-la-2-1.jpg',1),
(4,N'iphone-15-xanh-la-3-1.jpg',1),
(4,N'iphone-15-xanh-la-tem-99.jpg',1),
(4,N'iphone-15-yellow-1-1.jpg',1),
(4,N'iphone-15-yellow-2-1.jpg',1),
(4,N'iphone-15-yellow-3-1.jpg',1),
(4,N'iphone-15-yellow-tem-99.jpg',1),

(5,N'iphone-13-xanh-la-1.jpg',1),
(5,N'iphone-13-xanh-la-1-1.jpg',1),
(5,N'iphone-13-xanh-la-2-1.jpg',1),
(5,N'iphone-13-xanh-la-3-1.jpg',1),
(5,N'iphone-13-xanh-la-4-1.jpg',1),
(5,N'iphone-13-xanh-la-5-1.jpg',1),
(5,N'iphone-13-xanh-la-6-1.jpg',1),
(5,N'iphone-13-den-1.jpg',1),
(5,N'iphone-13-den-1-1.jpg',1),
(5,N'iphone-13-den-2-1.jpg',1),
(5,N'iphone-13-den-3-1.jpg',1),
(5,N'iphone-13-den-4-1.jpg',1),
(5,N'iphone-13-den-5-1.jpg',1),
(5,N'iphone-13-den-6-1.jpg',1),
(5,N'iphone-13-hong-1.jpg',1),
(5,N'iphone-13-hong-1-1.jpg',1),
(5,N'iphone-13-hong-2-1.jpg',1),
(5,N'iphone-13-hong-3-1.jpg',1),
(5,N'iphone-13-hong-4-1.jpg',1),
(5,N'iphone-13-hong-5-1.jpg',1),
(5,N'iphone-13-hong-6-1.jpg',1),
(5,N'iphone-13-trang-1.jpg',1),
(5,N'iphone-13-trang-1-1.jpg',1),
(5,N'iphone-13-trang-2-1.jpg',1),
(5,N'iphone-13-trang-3-1.jpg',1),
(5,N'iphone-13-trang-4-1.jpg',1),
(5,N'iphone-13-trang-5-1.jpg',1),
(5,N'iphone-13-trang-6-1.jpg',1),
(5,N'iphone-13-xanh-1.jpg',1),
(5,N'iphone-13-xanh-1-1.jpg',1),
(5,N'iphone-13-xanh-2-1.jpg',1),
(5,N'iphone-13-xanh-3-1.jpg',1),
(5,N'iphone-13-xanh-4-1.jpg',1),
(5,N'iphone-13-xanh-5-1.jpg',1),
(5,N'iphone-13-xanh-6-1.jpg',1),

(6,N'iphone-13-pro-vang-dong-1.jpg',1),
(6,N'iphone-13-pro-vang-dong-1-1.jpg',1),
(6,N'iphone-13-pro-vang-dong-2-1.jpg',1),
(6,N'iphone-13-pro-vang-dong-3-1.jpg',1),
(6,N'iphone-13-pro-vang-dong-4-1.jpg',1),
(6,N'iphone-13-pro-vang-dong-5-1.jpg',1),
(6,N'iphone-13-pro-vang-dong-6-1.jpg',1),
(6,N'iphone-13-pro-xanh-la-1.jpg',1),
(6,N'iphone-13-pro-xanh-la-1-1.jpg',1),
(6,N'iphone-13-pro-xanh-la-2-1.jpg',1),
(6,N'iphone-13-pro-xanh-la-3-1.jpg',1),
(6,N'iphone-13-pro-xanh-la-4-1.jpg',1),
(6,N'iphone-13-pro-xanh-la-5-1.jpg',1),
(6,N'iphone-13-pro-xanh-la-6-1.jpg',1),
(6,N'iphone-13-pro-xam-1.jpg',1),
(6,N'iphone-13-pro-xam-1-1.jpg',1),
(6,N'iphone-13-pro-xam-2-1.jpg',1),
(6,N'iphone-13-pro-xam-3-1.jpg',1),
(6,N'iphone-13-pro-xam-4-1.jpg',1),
(6,N'iphone-13-pro-xam-5-1.jpg',1),
(6,N'iphone-13-pro-xam-6-1.jpg',1),
(6,N'iphone-13-pro-trang-1.jpg',1),
(6,N'iphone-13-pro-trang-1-1.jpg',1),
(6,N'iphone-13-pro-trang-2-1.jpg',1),
(6,N'iphone-13-pro-trang-3-1.jpg',1),
(6,N'iphone-13-pro-trang-4-1.jpg',1),
(6,N'iphone-13-pro-trang-5-1.jpg',1),
(6,N'iphone-13-pro-trang-6-1.jpg',1),
(6,N'iphone-13-pro-xanh-1.jpg',1),
(6,N'iphone-13-pro-xanh-1-1.jpg',1),
(6,N'iphone-13-pro-xanh-2-1.jpg',1),
(6,N'iphone-13-pro-xanh-3-1.jpg',1),
(6,N'iphone-13-pro-xanh-4-1.jpg',1),
(6,N'iphone-13-pro-xanh-5-1.jpg',1),
(6,N'iphone-13-pro-xanh-6-1.jpg',1),

(7,N'iphone-13-pro-max-xanh-1.jpg',1),
(7,N'iphone-13-pro-max-xanh-1-1.jpg',1),
(7,N'iphone-13-pro-max-xanh-2-1.jpg',1),
(7,N'iphone-13-pro-max-xanh-3-1.jpg',1),
(7,N'iphone-13-pro-max-xanh-4-1.jpg',1),
(7,N'iphone-13-pro-max-xanh-5-1.jpg',1),
(7,N'iphone-13-pro-max-xanh-6-1.jpg',1),
(7,N'iphone-13-pro-max-vang-dong-1.jpg',1),
(7,N'iphone-13-pro-max-vang-dong-1-1.jpg',1),
(7,N'iphone-13-pro-max-vang-dong-2-1.jpg',1),
(7,N'iphone-13-pro-max-vang-dong-3-1.jpg',1),
(7,N'iphone-13-pro-max-vang-dong-4-1.jpg',1),
(7,N'iphone-13-pro-max-vang-dong-5-1.jpg',1),
(7,N'iphone-13-pro-max-vang-dong-6-1.jpg',1),
(7,N'iphone-13-pro-max-xanh-la-1.jpg',1),
(7,N'iphone-13-pro-max-xanh-la-1-1.jpg',1),
(7,N'iphone-13-pro-max-xanh-la-2-1.jpg',1),
(7,N'iphone-13-pro-max-xanh-la-3-1.jpg',1),
(7,N'iphone-13-pro-max-xanh-la-4-1.jpg',1),
(7,N'iphone-13-pro-max-xanh-la-5-1.jpg',1),
(7,N'iphone-13-pro-max-xanh-la-6-1.jpg',1),
(7,N'iphone-13-pro-max-xam-1.jpg',1),
(7,N'iphone-13-pro-max-xam-1-1.jpg',1),
(7,N'iphone-13-pro-max-xam-2-1.jpg',1),
(7,N'iphone-13-pro-max-xam-3-1.jpg',1),
(7,N'iphone-13-pro-max-xam-4-1.jpg',1),
(7,N'iphone-13-pro-max-xam-5-1.jpg',1),
(7,N'iphone-13-pro-max-xam-6-1.jpg',1),
(7,N'iphone-13-pro-max-bac-1.jpg',1),
(7,N'iphone-13-pro-max-bac-1-1.jpg',1),
(7,N'iphone-13-pro-max-bac-2-1.jpg',1),
(7,N'iphone-13-pro-max-bac-3-1.jpg',1),
(7,N'iphone-13-pro-max-bac-4-1.jpg',1),
(7,N'iphone-13-pro-max-bac-5-1.jpg',1),
(7,N'iphone-13-pro-max-bac-6-1.jpg',1),

(8,N'samsung-galaxy-s24-vang-1.jpg',1),
(8,N'samsung-galaxy-s24-vang-2.jpg',1),
(8,N'samsung-galaxy-s24-vang-3.jpg',1),
(8,N'samsung-galaxy-s24-vang-4.jpg',1),
(8,N'samsung-galaxy-s24-den-1.jpg',1),
(8,N'samsung-galaxy-s24-den-2.jpg',1),
(8,N'samsung-galaxy-s24-den-3.jpg',1),
(8,N'samsung-galaxy-s24-den-4.jpg',1),
(8,N'samsung-galaxy-s24-tim-1.jpg',1),
(8,N'samsung-galaxy-s24-tim-2.jpg',1),
(8,N'samsung-galaxy-s24-tim-3.jpg',1),
(8,N'samsung-galaxy-s24-tim-4.jpg',1),
(8,N'samsung-galaxy-s24-xam-1.jpg',1),
(8,N'samsung-galaxy-s24-xam-2.jpg',1),
(8,N'samsung-galaxy-s24-xam-3.jpg',1),
(8,N'samsung-galaxy-s24-xam-4.jpg',1),

(9,N'samsung-galaxy-s24-plus-tim-1.jpg',1),
(9,N'samsung-galaxy-s24-plus-tim-2.jpg',1),
(9,N'samsung-galaxy-s24-plus-tim-3.jpg',1),
(9,N'samsung-galaxy-s24-plus-tim-4.jpg',1),
(9,N'samsung-galaxy-s24-plus-vang-1.jpg',1),
(9,N'samsung-galaxy-s24-plus-vang-2.jpg',1),
(9,N'samsung-galaxy-s24-plus-vang-3.jpg',1),
(9,N'samsung-galaxy-s24-plus-vang-4.jpg',1),
(9,N'samsung-galaxy-s24-plus-den-1.jpg',1),
(9,N'samsung-galaxy-s24-plus-den-2.jpg',1),
(9,N'samsung-galaxy-s24-plus-den-3.jpg',1),
(9,N'samsung-galaxy-s24-plus-den-4.jpg',1),
(9,N'samsung-galaxy-s24-plus-xam-1.jpg',1),
(9,N'samsung-galaxy-s24-plus-xam-2.jpg',1),
(9,N'samsung-galaxy-s24-plus-xam-3.jpg',1),
(9,N'samsung-galaxy-s24-plus-xam-4.jpg',1),

(10,N'samsung-galaxy-s24-ultra-xam-1.jpg',1),
(10,N'samsung-galaxy-s24-ultra-xam-2.jpg',1),
(10,N'samsung-galaxy-s24-ultra-xam-3.jpg',1),
(10,N'samsung-galaxy-s24-ultra-xam-4.jpg',1),
(10,N'samsung-galaxy-s24-ultra-tim-1.jpg',1),
(10,N'samsung-galaxy-s24-ultra-tim-2.jpg',1),
(10,N'samsung-galaxy-s24-ultra-tim-3.jpg',1),
(10,N'samsung-galaxy-s24-ultra-tim-4.jpg',1),
(10,N'samsung-galaxy-s24-ultra-vang-1.jpg',1),
(10,N'samsung-galaxy-s24-ultra-vang-2.jpg',1),
(10,N'samsung-galaxy-s24-ultra-vang-3.jpg',1),
(10,N'samsung-galaxy-s24-ultra-vang-4.jpg',1),
(10,N'samsung-galaxy-s24-ultra-den-1.jpg',1),
(10,N'samsung-galaxy-s24-ultra-den-2.jpg',1),
(10,N'samsung-galaxy-s24-ultra-den-3.jpg',1),
(10,N'samsung-galaxy-s24-ultra-den-4.jpg',1),

(11,N'samsung-galaxy-s23-tim-nhat-1.jpg',1),
(11,N'samsung-galaxy-s23-tim-nhat-2.jpg',1),
(11,N'samsung-galaxy-s23-tim-nhat-3.jpg',1),
(11,N'samsung-galaxy-s23-tim-nhat-4.jpg',1),
(11,N'samsung-galaxy-s23-den-1.jpg',1),
(11,N'samsung-galaxy-s23-den-2.jpg',1),
(11,N'samsung-galaxy-s23-den-3.jpg',1),
(11,N'samsung-galaxy-s23-den-4.jpg',1),
(11,N'samsung-galaxy-s23-xanh-reu-1.jpg',1),
(11,N'samsung-galaxy-s23-xanh-reu-2.jpg',1),
(11,N'samsung-galaxy-s23-xanh-reu-3.jpg',1),
(11,N'samsung-galaxy-s23-xanh-reu-4.jpg',1),
(11,N'samsung-galaxy-s23-kem-1.jpg',1),
(11,N'samsung-galaxy-s23-kem-2.jpg',1),
(11,N'samsung-galaxy-s23-kem-3.jpg',1),
(11,N'samsung-galaxy-s23-kem-4.jpg',1),

(12,N'samsung-galaxy-s23-plus-xanh-reu-1.jpg',1),
(12,N'samsung-galaxy-s23-plus-xanh-reu-2.jpg',1),
(12,N'samsung-galaxy-s23-plus-xanh-reu-3.jpg',1),
(12,N'samsung-galaxy-s23-plus-xanh-reu-4.jpg',1),
(12,N'samsung-galaxy-s23-plus-den-1.jpg',1),
(12,N'samsung-galaxy-s23-plus-den-2.jpg',1),
(12,N'samsung-galaxy-s23-plus-den-3.jpg',1),
(12,N'samsung-galaxy-s23-plus-den-4.jpg',1),
(12,N'samsung-galaxy-s23-plus-tim-nhat-1.jpg',1),
(12,N'samsung-galaxy-s23-plus-tim-nhat-2.jpg',1),
(12,N'samsung-galaxy-s23-plus-tim-nhat-3.jpg',1),
(12,N'samsung-galaxy-s23-plus-tim-nhat-4.jpg',1),
(12,N'samsung-galaxy-s23-plus-kem-1.jpg',1),
(12,N'samsung-galaxy-s23-plus-kem-2.jpg',1),
(12,N'samsung-galaxy-s23-plus-kem-3.jpg',1),
(12,N'samsung-galaxy-s23-plus-kem-4.jpg',1),

(13,N'samsung-galaxy-s23-ultra-den-1.jpg',1),
(13,N'samsung-galaxy-s23-ultra-den-2.jpg',1),
(13,N'samsung-galaxy-s23-ultra-den-3.jpg',1),
(13,N'samsung-galaxy-s23-ultra-den-4.jpg',1),
(13,N'samsung-galaxy-s23-ultra-tim-nhat-1.jpg',1),
(13,N'samsung-galaxy-s23-ultra-tim-nhat-2.jpg',1),
(13,N'samsung-galaxy-s23-ultra-tim-nhat-3.jpg',1),
(13,N'samsung-galaxy-s23-ultra-tim-nhat-4.jpg',1),
(13,N'samsung-galaxy-s23-ultra-xanh-reu-1.jpg',1),
(13,N'samsung-galaxy-s23-ultra-xanh-reu-2.jpg',1),
(13,N'samsung-galaxy-s23-ultra-xanh-reu-3.jpg',1),
(13,N'samsung-galaxy-s23-ultra-xanh-reu-4.jpg',1),
(13,N'samsung-galaxy-s23-ultra-kem-1.jpg',1),
(13,N'samsung-galaxy-s23-ultra-kem-2.jpg',1),
(13,N'samsung-galaxy-s23-ultra-kem-3.jpg',1),
(13,N'samsung-galaxy-s23-ultra-kem-4.jpg',1),

(14,N'xiaomi-14-ultra-trang-1.jpg',1),
(14,N'xiaomi-14-ultra-trang-2.jpg',1),
(14,N'xiaomi-14-ultra-trang-3.jpg',1),
(14,N'xiaomi-14-ultra-trang-4.jpg',1),
(14,N'xiaomi-14-ultra-den-1.jpg',1),
(14,N'xiaomi-14-ultra-den-2.jpg',1),
(14,N'xiaomi-14-ultra-den-3.jpg',1),
(14,N'xiaomi-14-ultra-den-4.jpg',1),

(15,N'redmi-note-13-vang-1.jpg',1),
(15,N'redmi-note-13-vang-2.jpg',1),
(15,N'redmi-note-13-vang-3.jpg',1),
(15,N'redmi-note-13-vang-4.jpg',1),
(15,N'redmi-note-13-den-1.jpg',1),
(15,N'redmi-note-13-den-2.jpg',1),
(15,N'redmi-note-13-den-3.jpg',1),
(15,N'redmi-note-13-den-4.jpg',1),
(15,N'redmi-note-13-xanh-la-1.jpg',1),
(15,N'redmi-note-13-xanh-la-2.jpg',1),
(15,N'redmi-note-13-xanh-la-3.jpg',1),
(15,N'redmi-note-13-xanh-la-4.jpg',1),

(16,N'redmi-note-13-pro-tim-1.jpg',1),
(16,N'redmi-note-13-pro-tim-2.jpg',1),
(16,N'redmi-note-13-pro-tim-3.jpg',1),
(16,N'redmi-note-13-pro-tim-4.jpg',1),
(16,N'redmi-note-13-pro-den-1.jpg',1),
(16,N'redmi-note-13-pro-den-2.jpg',1),
(16,N'redmi-note-13-pro-den-3.jpg',1),
(16,N'redmi-note-13-pro-den-4.jpg',1),
(16,N'redmi-note-13-pro-xanh-la-1.jpg',1),
(16,N'redmi-note-13-pro-xanh-la-2.jpg',1),
(16,N'redmi-note-13-pro-xanh-la-3.jpg',1),
(16,N'redmi-note-13-pro-xanh-la-4.jpg',1),

(17,N'redmi-note-13-pro-plus-trang-1.jpg',1),
(17,N'redmi-note-13-pro-plus-trang-2.jpg',1),
(17,N'redmi-note-13-pro-plus-trang-3.jpg',1),
(17,N'redmi-note-13-pro-plus-trang-4.jpg',1),
(17,N'redmi-note-13-pro-plus-den-1.jpg',1),
(17,N'redmi-note-13-pro-plus-den-2.jpg',1),
(17,N'redmi-note-13-pro-plus-den-3.jpg',1),
(17,N'redmi-note-13-pro-plus-den-4.jpg',1),
(17,N'redmi-note-13-pro-plus-tim-1.jpg',1),
(17,N'redmi-note-13-pro-plus-tim-2.jpg',1),
(17,N'redmi-note-13-pro-plus-tim-3.jpg',1),
(17,N'redmi-note-13-pro-plus-tim-4.jpg',1),

(18,N'oppo-n3-flip-hong-1.jpg',1),
(18,N'oppo-n3-flip-hong-2.jpg',1),
(18,N'oppo-n3-flip-hong-3.jpg',1),
(18,N'oppo-n3-flip-hong-4.jpg',1),
(18,N'oppo-n3-flip-den-1.jpg',1),
(18,N'oppo-n3-flip-den-2.jpg',1),
(18,N'oppo-n3-flip-den-3.jpg',1),
(18,N'oppo-n3-flip-den-4.jpg',1),
(18,N'oppo-n3-flip-vang-dong-1.jpg',1),
(18,N'oppo-n3-flip-vang-dong-2.jpg',1),
(18,N'oppo-n3-flip-vang-dong-3.jpg',1),
(18,N'oppo-n3-flip-vang-dong-4.jpg',1),

(19,N'oppo-find-n3-vang-dong-1.jpg',1),
(19,N'oppo-find-n3-vang-dong-2.jpg',1),
(19,N'oppo-find-n3-vang-dong-3.jpg',1),
(19,N'oppo-find-n3-vang-dong-4.jpg',1),
(19,N'oppo-find-n3-den-1.jpg',1),
(19,N'oppo-find-n3-den-2.jpg',1),
(19,N'oppo-find-n3-den-3.jpg',1),
(19,N'oppo-find-n3-den-4.jpg',1),

(20,N'oppo-a58-den-1.jpg',1),
(20,N'oppo-a58-den-2.jpg',1),
(20,N'oppo-a58-den-3.jpg',1),
(20,N'oppo-a58-den-4.jpg',1),
(20,N'oppo-a58-xanh-ngoc-1.jpg',1),
(20,N'oppo-a58-xanh-ngoc-2.jpg',1),
(20,N'oppo-a58-xanh-ngoc-3.jpg',1),
(20,N'oppo-a58-xanh-ngoc-4.jpg',1),

(21,N'vivo-y36-den-1.jpg',1),
(21,N'vivo-y36-den-2.jpg',1),
(21,N'vivo-y36-den-3.jpg',1),
(21,N'vivo-y36-den-4.jpg',1),
(21,N'vivo-y36-xanh-1.jpg',1),
(21,N'vivo-y36-xanh-2.jpg',1),
(21,N'vivo-y36-xanh-3.jpg',1),
(21,N'vivo-y36-xanh-4.jpg',1),

(22,N'vivo-y100-den-1.jpg',1),
(22,N'vivo-y100-den-2.jpg',1),
(22,N'vivo-y100-den-3.jpg',1),
(22,N'vivo-y100-den-4.jpg',1),
(22,N'vivo-y100-xanh-nhat-1.jpg',1),
(22,N'vivo-y100-xanh-nhat-2.jpg',1),
(22,N'vivo-y100-xanh-nhat-3.jpg',1),
(22,N'vivo-y100-xanh-nhat-4.jpg',1),

(23,N'tecno-spark-20c-trang-1.jpg',1),
(23,N'tecno-spark-20c-trang-2.jpg',1),
(23,N'tecno-spark-20c-trang-3.jpg',1),
(23,N'tecno-spark-20c-trang-4.jpg',1),
(23,N'tecno-spark-20c-den-1.jpg',1),
(23,N'tecno-spark-20c-den-2.jpg',1),
(23,N'tecno-spark-20c-den-3.jpg',1),
(23,N'tecno-spark-20c-den-4.jpg',1),
(23,N'tecno-spark-20c-vang-1.jpg',1),
(23,N'tecno-spark-20c-vang-2.jpg',1),
(23,N'tecno-spark-20c-vang-3.jpg',1),
(23,N'tecno-spark-20c-vang-4.jpg',1)
;




				
--screens
INSERT Screens(Screentechnology,Resolution,Widescreen,Maximumbrightness,Touchglasssurface,Status) VALUES
(N'OLED',N'Super Retina XDR (1290 x 2796 Pixels)',N'6.7" - Tần số quét 120 Hz',N'2000 nits',N'Kính cường lực Ceramic Shield',1),
(N'OLED',N'Super Retina XDR (1179 x 2556 Pixels)',N'6.1" - Tần số quét 120 Hz',N'2000 nits',N'Kính cường lực Ceramic Shield',1),
(N'OLED',N'Super Retina XDR (1290 x 2796 Pixels)',N'6.7" - Tần số quét 60 Hz',N'2000 nits',N'Kính cường lực Ceramic Shield',1),
(N'OLED',N'Super Retina XDR (1179 x 2556 Pixels)',N'6.1" - Tần số quét 60 Hz',N'2000 nits',N'Kính cường lực Ceramic Shield',1),
(N'OLED',N'Super Retina XDR (1170 x 2532 Pixels)',N'6.1" - Tần số quét 60 Hz',N'1200 nits',N'Kính cường lực Ceramic Shield',1),--5
(N'OLED',N'Super Retina XDR (1170 x 2532 Pixels)',N'6.1" - Tần số quét 60 Hz',N'1200 nits',N'Kính cường lực Ceramic Shield',1),--6
(N'OLED',N'Super Retina XDR (1284 x 2778 Pixels)',N'6.7" - Tần số quét 120 Hz',N'1200 nits',N'Kính cường lực Ceramic Shield',1),--7
(N'Dynamic AMOLED 2X',N'Full HD+ (1080 x 2340 Pixels)',N'6.2" - Tần số quét 120 Hz',N'2600 nits',N'Kính cường lực Corning Gorilla Glass Victus 2',1),--8
(N'Dynamic AMOLED 2X',N'2K+ (1440 x 3120 Pixels)',N'6.7" - Tần số quét 120 Hz',N'2600 nits',N'Kính cường lực Corning Gorilla Glass Victus 2',1),--9
(N'Dynamic AMOLED 2X',N'2K+ (1440 x 3120 Pixels)',N'6.8" - Tần số quét 120 Hz',N'2600 nits',N'Kính cường lực Corning Gorilla Armor',1),--10
(N'Dynamic AMOLED 2X',N'Full HD+ (1080 x 2340 Pixels)',N'6.1" - Tần số quét 120 Hz',N'1750 nits',N'Kính cường lực Corning Gorilla Glass Victus 2',1),--11
(N'Dynamic AMOLED 2X',N'Full HD+ (1080 x 2340 Pixels)',N'6.6" - Tần số quét 120 Hz',N'1750 nits',N'Kính cường lực Corning Gorilla Glass Victus 2',1),--12
(N'Dynamic AMOLED 2X',N'2K+ (1440 x 3088 Pixels)',N'6.8" - Tần số quét 120 Hz',N'1750 nits',N'Kính cường lực Corning Gorilla Glass Victus 2',1),--13
(N'AMOLED',N'2K+ (1440 x 3200 Pixels)',N'6.73" - Tần số quét 120 Hz',N'3000 nits',N'Kính cường lực Xiaomi',1),--14
(N'AMOLED',N'Full HD+ (1080 x 2400 Pixels)',N'6.67" - Tần số quét 120 Hz',N'1800 nits',N'Kính cường lực Corning Gorilla Glass 3',1),--15
(N'AMOLED',N'Full HD+ (1080 x 2400 Pixels)',N'6.67" - Tần số quét 120 Hz',N'1800 nits',N'Kính cường lực Corning Gorilla Glass 5',1),--16
(N'AMOLED',N'1.5K (1220 x 2712 Pixels)',N'6.67" - Tần số quét 120 Hz',N'1800 nits',N'Kính cường lực Corning Gorilla Glass Victus',1),--17
(N'AMOLED',N'Chính: FHD+ (1080 x 2520 Pixels) & Phụ: SD (382 x 720 Pixels)',N'Chính 6.8" & Phụ 3.26" - Tần số quét Chính: 120 Hz & Phụ: 60 Hz',N'Chính 1600 nits & Phụ 900 nits',N'Chính: Kính siêu mỏng Schott UTG & Phụ: Corning Gorilla Glass 7',1),--18
(N'AMOLED',N'Chính: 2K+ (2268 x 2440 Pixels) & Phụ: FHD+ (1116 x 2484 Pixels)',N'Chính 7.82" & Phụ 6.31" - Tần số quét 120 Hz',N'2800 nits',N'Chính: Ultra Thin Glass & Phụ: Kính siêu mỏng Nanocrystal',1),--19
(N'LTPS LCD',N'Full HD+ (1080 x 2412 Pixels)',N'6.72" - Tần số quét 60 Hz',N'680 nits',N'Kính cường lực Panda',1),--20
(N'IPS LCD',N'Full HD+ (1080 x 2388 Pixels)',N'6.64" - Tần số quét 90 Hz',N'650 nits',N'Kính cường lực',1),--21
(N'AMOLED',N'Full HD+ (1080 x 2400 Pixels)',N'6.67" - Tần số quét 120 Hz',N'1800 nits',N'Kính cường lực',1),--22
(N'IPS LCD',N'HD+ (720 x 1612 Pixels)',N'6.56" - Tần số quét 90 Hz',N'480 nits',N'Kính cường lực Panda',1)--23

;
--RearCameras
INSERT RearCameras(Resolution,Film,Flashlight,Feature,Status) VALUES
(N'Chính 48 MP & Phụ 12 MP, 12 MP',N'HD 720p@30fps
FullHD 1080p@60fps
FullHD 1080p@24fps
4K 2160p@60fps
4K 2160p@30fps
4K 2160p@24fps',N'Có',N'Ảnh Raw
Zoom quang học
Zoom kỹ thuật số
Xóa phông
Trôi nhanh thời gian (Time Lapse)
Toàn cảnh (Panorama)
Smart HDR 5
Siêu độ phân giải
Quay chậm (Slow Motion)
Live Photo
Góc siêu rộng (Ultrawide)
Góc rộng (Wide)
Dolby Vision HDR
Deep Fusion
Cinematic
Chống rung quang học (OIS)
Bộ lọc màu
Ban đêm (Night Mode)',1),--1

(N'Chính 48 MP & Phụ 12 MP, 12 MP',N'HD 720p@30fps
FullHD 1080p@60fps
FullHD 1080p@24fps
4K 2160p@60fps
4K 2160p@30fps
4K 2160p@24fps',N'Có',N'Ảnh Raw
Zoom quang học
Zoom kỹ thuật số
Xóa phông
Trôi nhanh thời gian (Time Lapse)
Toàn cảnh (Panorama)
Smart HDR 5
Quay Siêu chậm (Super Slow Motion)
Quay chậm (Slow Motion)
Live Photo
Góc siêu rộng (Ultrawide)
Dolby Vision HDR
Deep Fusion
Cinematic
Chống rung quang học (OIS)
Chế độ hành động (Action Mode)
Bộ lọc màu
Ban đêm (Night Mode)',1),--2
(N'Chính 48 MP & Phụ 12 MP',N'HD 720p@30fps
FullHD 1080p@60fps
FullHD 1080p@30fps
FullHD 1080p@240fps
FullHD 1080p@120fps
4K 2160p@60fps
4K 2160p@30fps
4K 2160p@24fps',N'Có',N'Zoom quang học
Zoom kỹ thuật số
Xóa phông
Trôi nhanh thời gian (Time Lapse)
Toàn cảnh (Panorama)
Smart HDR 5
Siêu độ phân giải
Quay Siêu chậm (Super Slow Motion)
Quay chậm (Slow Motion)
Live Photo
Góc siêu rộng (Ultrawide)
Góc rộng (Wide)
Dolby Vision HDR
Deep Fusion
Cinematic
Chống rung quang học (OIS)
Chế độ hành động (Action Mode)
Bộ lọc màu
Ban đêm (Night Mode)',1),--3
(N'Chính 48 MP & Phụ 12 MP',N'HD 720p@30fps
FullHD 1080p@60fps
FullHD 1080p@30fps
FullHD 1080p@240fps
FullHD 1080p@120fps
4K 2160p@60fps
4K 2160p@30fps
4K 2160p@24fps',N'Có',N'Zoom quang học
Zoom kỹ thuật số
Xóa phông
Trôi nhanh thời gian (Time Lapse)
Toàn cảnh (Panorama)
Smart HDR 5
Siêu độ phân giải
Quay Siêu chậm (Super Slow Motion)
Quay chậm (Slow Motion)
Live Photo
HDR
Góc siêu rộng (Ultrawide)
Góc rộng (Wide)
Dolby Vision HDR
Deep Fusion
Cinematic
Chống rung quang học (OIS)
Chế độ hành động (Action Mode)
Bộ lọc màu
Ban đêm (Night Mode)',1),--4
(N'2 camera 12 MP',N'HD 720p@30fps
FullHD 1080p@60fps
FullHD 1080p@30fps
FullHD 1080p@25fps
FullHD 1080p@240fps
FullHD 1080p@120fps
4K 2160p@60fps
4K 2160p@30fps
4K 2160p@25fps
4K 2160p@24fps',N'Có',N'Zoom quang học
Zoom kỹ thuật số
Xóa phông
Trôi nhanh thời gian (Time Lapse)
Toàn cảnh (Panorama)
Smart HDR 4
Quay chậm (Slow Motion)
Live Photo
Góc siêu rộng (Ultrawide)
Dolby Vision HDR
Deep Fusion
Cinematic
Chống rung quang học (OIS)
Chế độ chân dung
Bộ lọc màu
Ban đêm (Night Mode)',1),--5
(N'3 camera 12 MP',N'HD 720p@30fps
FullHD 1080p@60fps
FullHD 1080p@30fps
FullHD 1080p@240fps
FullHD 1080p@120fps
4K 2160p@60fps
4K 2160p@30fps
4K 2160p@24fps',N'Có',N'Ảnh Raw
Zoom quang học
Zoom kỹ thuật số
Xóa phông
Tự động lấy nét (AF)
Trôi nhanh thời gian (Time Lapse)
Toàn cảnh (Panorama)
Smart HDR 4
Siêu cận (Macro)
Quay chậm (Slow Motion)
Nhận diện khuôn mặt
Góc siêu rộng (Ultrawide)
Góc rộng (Wide)
Dolby Vision HDR
Deep Fusion
Cinematic
Chống rung quang học (OIS)
Chạm lấy nét
Ban đêm (Night Mode)',1),--6

(N'3 camera 12 MP',N'HD 720p@30fps
FullHD 1080p@60fps
FullHD 1080p@30fps
FullHD 1080p@240fps
FullHD 1080p@120fps
4K 2160p@60fps
4K 2160p@30fps
4K 2160p@24fps',N'Có',N'Ảnh Raw
Zoom quang học
Zoom kỹ thuật số
Xóa phông
Tự động lấy nét (AF)
Trôi nhanh thời gian (Time Lapse)
Toàn cảnh (Panorama)
Smart HDR 4
Siêu cận (Macro)
Quay chậm (Slow Motion)
Nhận diện khuôn mặt
Góc siêu rộng (Ultrawide)
Góc rộng (Wide)
Dolby Vision HDR
Deep Fusion
Cinematic
Chống rung quang học (OIS)
Chạm lấy nét
Ban đêm (Night Mode)',1),--7

(N'Chính 50 MP & Phụ 12 MP, 10 MP',N'HD 720p@30fps
FullHD 1080p@60fps
FullHD 1080p@30fps
FullHD 1080p@240fps
FullHD 1080p@120fps
8K 4320p@30fps
4K 2160p@60fps
4K 2160p@30fps
4K 2160p@120fps',N'Có',N'Ảnh Raw
Zoom quang học
Zoom kỹ thuật số
Xóa phông
Video chân dung
Video chuyên nghiệp
Tự động lấy nét (AF)
Trôi nhanh thời gian (Time Lapse)
Toàn cảnh (Panorama)
Siêu độ phân giải
Quét mã QR
Quay video hiển thị kép
Quay Siêu chậm (Super Slow Motion)
Quay chậm (Slow Motion)
Làm đẹp
HDR
Góc siêu rộng (Ultrawide)
Chụp ảnh chuyển động
Chụp một chạm
Chụp hẹn giờ
Chống rung quang học (OIS)
Chống rung kỹ thuật số (VDIS)
Chuyên nghiệp (Pro)
Bộ lọc màu
Ban đêm (Night Mode)',1),--8

(N'Chính 50 MP & Phụ 12 MP, 10 MP',N'HD 720p@30fps
FullHD 1080p@60fps
FullHD 1080p@30fps
FullHD 1080p@240fps
FullHD 1080p@120fps
8K 4320p@30fps
4K 2160p@60fps
4K 2160p@30fps
4K 2160p@120fps',N'Có',N'Ảnh Raw
Zoom quang học
Zoom kỹ thuật số
Xóa phông
Video chân dung
Video chuyên nghiệp
Tự động lấy nét (AF)
Trôi nhanh thời gian (Time Lapse)
Toàn cảnh (Panorama)
Siêu độ phân giải
Quét mã QR
Quay video hiển thị kép
Quay Siêu chậm (Super Slow Motion)
Quay chậm (Slow Motion)
Làm đẹp
HDR
Góc siêu rộng (Ultrawide)
Chụp ảnh chuyển động
Chụp một chạm
Chụp hẹn giờ
Chống rung quang học (OIS)
Chống rung kỹ thuật số (VDIS)
Chuyên nghiệp (Pro)
Bộ lọc màu
Ban đêm (Night Mode)',1),--9

(N'Chính 200 MP & Phụ 50 MP, 12 MP, 10 MP',N'HD 720p@30fps
FullHD 1080p@60fps
FullHD 1080p@30fps
FullHD 1080p@240fps
FullHD 1080p@120fps
8K 4320p@30fps
4K 2160p@60fps
4K 2160p@30fps
4K 2160p@120fps',N'Có',N'Ảnh Raw
Zoom quang học
Zoom kỹ thuật số
Xóa phông
Video chân dung
Video chuyên nghiệp
Tự động lấy nét (AF)
Trôi nhanh thời gian (Time Lapse)
Toàn cảnh (Panorama)
Super HDR
Siêu độ phân giải
Quét mã QR
Quay video hiển thị kép
Quay Siêu chậm (Super Slow Motion)
Quay chậm (Slow Motion)
Làm đẹp
Góc siêu rộng (Ultrawide)
Chụp ảnh chuyển động
Chụp một chạm
Chụp hẹn giờChống rung quang học (OIS)
Chống rung kỹ thuật số (VDIS)
Chuyên nghiệp (Pro)
Bộ lọc màu
Ban đêm (Night Mode)',1),--10

(N'Chính 50 MP & Phụ 12 MP, 10 MP',N'HD 720p@30fps
FullHD 1080p@30fps
8K 4320p@30fps
8K 4320p@24fps
4K 2160p@60fps',N'Có',N'Ảnh Raw
Zoom quang học
Zoom kỹ thuật số
Xóa phông
Tự động lấy nét (AF)
Trôi nhanh thời gian (Time Lapse)
Toàn cảnh (Panorama)
Quay Siêu chậm (Super Slow Motion)
Quay chậm (Slow Motion)
Nhãn dán (AR Stickers)
Làm đẹp
Live Photo
Góc siêu rộng (Ultrawide)
Chống rung quang học (OIS)
Chuyên nghiệp (Pro)
Bộ lọc màu
Ban đêm (Night Mode)
AI Camera',1),--11

(N'Chính 50 MP & Phụ 12 MP, 10 MP',N'HD 720p@30fps
FullHD 1080p@60fps
FullHD 1080p@30fps
8K 4320p@30fps
4K 2160p@60fps
4K 2160p@30fps',N'Có',N'Ảnh Raw
Zoom quang học
Zoom kỹ thuật số
Xóa phông
Tự động lấy nét (AF)
Trôi nhanh thời gian (Time Lapse)
Toàn cảnh (Panorama)
Quay Siêu chậm (Super Slow Motion)
Quay chậm (Slow Motion)
Nhãn dán (AR Stickers)
Làm đẹp
Live Photo
Góc siêu rộng (Ultrawide)
Chống rung quang học (OIS)
Chuyên nghiệp (Pro)
Bộ lọc màu
Ban đêm (Night Mode)
AI Camera',1),--12

(N'Chính 200 MP & Phụ 12 MP, 10 MP, 10 MP',N'HD 720p@960fps
FullHD 1080p@60fps
FullHD 1080p@30fps
FullHD 1080p@240fps
8K 4320p@30fps
4K 2160p@60fps
4K 2160p@30fps',N'Có',N'Ảnh Raw
Zoom quang học
Zoom kỹ thuật số
Xóa phông
Tự động lấy nét (AF)
Trôi nhanh thời gian (Time Lapse)
Toàn cảnh (Panorama)
Quay Siêu chậm (Super Slow Motion)
Quay chậm (Slow Motion)
Làm đẹp
Live Photo
HDR
Góc siêu rộng (Ultrawide)
Góc rộng (Wide)
Chụp bằng giọng nói
Chụp bằng cử chỉ
Chống rung quang học (OIS)
Chuyên nghiệp (Pro)
Bộ lọc màu
Ban đêm (Night Mode)
AI Camera',1),--13

(N'4 camera 50 MP',N'HD 720p@960fps
HD 720p@480fps
HD 720p@30fps
HD 720p@240fps
HD 720p@1920fps
HD 720p@120fps
FullHD 1080p@960fps
FullHD 1080p@60fps
FullHD 1080p@480fps
FullHD 1080p@30fps
FullHD 1080p@240fps
FullHD 1080p@1920fps
FullHD 1080p@120fps
8K 4320p@30fps
4K 2160p@60fps
4K 2160p@30fps
4K 2160p@24fps
4K 2160p@120fps',N'Có',N'Ảnh Raw
Zoom quang học
Zoom kỹ thuật số
Xóa phông
Tự động lấy nét (AF)
Trôi nhanh thời gian (Time Lapse)
Toàn cảnh (Panorama)
Siêu độ phân giải
Siêu trăng
Siêu cận (Macro)
Quét tài liệu
Quay Siêu chậm (Super Slow Motion)
Quay chậm (Slow Motion)
Hiệu ứng Bokeh
HDR
Góc siêu rộng (Ultrawide)
Chống rung quang học (OIS)
Chân dung đêm
Chuyên nghiệp (Pro)
Ban đêm (Night Mode)
Xiaomi ProFocus',1),--14

(N'Chính 108 MP & Phụ 8 MP, 2 MP',N'HD 720p@30fps
HD 720p@120fps
FullHD 1080p@30fps',N'Có',N'Xóa phông
Trôi nhanh thời gian (Time Lapse)
Toàn cảnh (Panorama)
Tilt-shift
Siêu độ phân giải
Siêu cận (Macro)
Quét tài liệu
Quay chậm (Slow Motion)
Làm đẹp
HDR
Góc siêu rộng (Ultrawide)
Google Lens
Chụp hẹn giờ
Chuyên nghiệp (Pro)
Bộ lọc màu
Ban đêm (Night Mode)
AI Camera',1),--15

(N'Chính 200 MP & Phụ 8 MP, 2 MP',N'HD 720p@30fps
HD 720p@120fps
FullHD 1080p@60fps
FullHD 1080p@30fps',N'Có',N'Zoom kỹ thuật số
Xóa phông
Xiaomi ProCut
Trôi nhanh thời gian (Time Lapse)
Toàn cảnh (Panorama)
Siêu độ phân giải
Siêu cận (Macro)
Quét tài liệu
Quay chậm (Slow Motion)
Phơi sáng
Làm đẹp
HDR
Góc siêu rộng (Ultrawide)
Google Lens
Chụp hẹn giờ
Chống rung quang học (OIS)
Chuyên nghiệp (Pro)
Bộ lọc màu
Ban đêm (Night Mode)',1),--16

(N'Chính 200 MP & Phụ 8 MP, 2 MP',N'HD 720p@30fps
HD 720p@240fps
HD 720p@120fps
FullHD 1080p@60fps
FullHD 1080p@30fps
FullHD 1080p@120fps
4K 2160p@30fps
4K 2160p@24fps',N'Có',N'Zoom quang học
Xóa phông
Xiaomi ProCut
Tự động lấy nét (AF)
Trôi nhanh thời gian (Time Lapse)
Toàn cảnh (Panorama)
Tilt-shift
Siêu độ phân giải
Siêu cận (Macro)
Quét tài liệu
Quay chậm (Slow Motion)
Phơi sáng
Làm đẹp
HDR
Góc siêu rộng (Ultrawide)
Google Lens
Chụp ảnh chuyển động
Chụp hẹn giờ
Chống rung điện tử kỹ thuật số (EIS)
Chống rung quang học (OIS)
Chuyên nghiệp (Pro)
Bộ lọc màu
Ban đêm (Night Mode)
AI Camera',1),--17

(N'Chính 50 MP & Phụ 48 MP, 32 MP',N'HD 720p@60fps
HD 720p@480fps
HD 720p@30fps
FullHD 1080p@60fps
FullHD 1080p@30fps
FullHD 1080p@240fps
4K 2160p@30fps',N'Có',N'Ảnh Raw
Zoom quang học
Zoom kỹ thuật số
Xóa phông
Tự động lấy nét (AF)
Trôi nhanh thời gian (Time Lapse)
Toàn cảnh (Panorama)
Siêu độ phân giải
Quét tài liệu
Quét mã QR
Quay chậm (Slow Motion)
Phơi sáng
Nhãn dán (AR Stickers)
Làm đẹp
HDR
Góc siêu rộng (Ultrawide)
Google Lens
Chụp hẹn giờ
Chống rung quang học (OIS)
Chuyên nghiệp (Pro)
Bộ lọc màu
Ban đêm (Night Mode)',1),--18

(N'Chính 48 MP & Phụ 48 MP, 64 MP',N'HD 720p@60fps
HD 720p@480fps
HD 720p@30fps
HD 720p@240fps
FullHD 1080p@60fps
FullHD 1080p@30fps
FullHD 1080p@240fps
4K 2160p@60fps
4K 2160p@30fps',N'Có',N'Ảnh Raw
Zoom quang học
Zoom kỹ thuật số
Xóa phông
XPAN
Trôi nhanh thời gian (Time Lapse)
Toàn cảnh (Panorama)
Siêu độ phân giải
Siêu cận (Macro)
Quét mã QR
Quay video hiển thị kép
Quay chậm (Slow Motion)
Phơi sáng
Nhãn dán (AR Stickers)
Làm đẹp
HDR
Góc siêu rộng (Ultrawide)
Google Lens
FlexCam
Chụp hẹn giờ
Chống rung quang học (OIS)
Chuyên nghiệp (Pro)
Bộ lọc màu
Ban đêm (Night Mode)',1),--19

(N'Chính 50 MP & Phụ 2 MP',N'HD 720p@30fps, FullHD 1080p@30fps',N'Có',N'Xóa phông
Tự động lấy nét (AF)
Trôi nhanh thời gian (Time Lapse)
Toàn cảnh (Panorama)
Nhãn dán (AR Stickers)
Làm đẹp
Hiệu ứng Bokeh
Chuyên nghiệp (Pro)
Ban đêm (Night Mode)',1),--20

(N'Chính 50 MP & Phụ 2 MP',N'HD 720p@60fps
HD 720p@30fps
FullHD 1080p@30fps',N'Có',N'Zoom kỹ thuật số
Xóa phông
Tự động lấy nét (AF)
Trôi nhanh thời gian (Time Lapse)
Toàn cảnh (Panorama)
Siêu độ phân giải
Quay chậm (Slow Motion)
Phơi sáng kép
Làm đẹp
Live Photo
HDR
Chống rung điện tử kỹ thuật số (EIS)
Chuyên nghiệp (Pro)
Bộ lọc màu
Ban đêm (Night Mode)',1),--21

(N'Chính 50 MP & Phụ 2 MP, Flicker',N'HD 720p@60fps
HD 720p@30fps
FullHD 1080p@30fps',N'Có',N'Zoom kỹ thuật số
Xóa phông
Trôi nhanh thời gian (Time Lapse)
Toàn cảnh (Panorama)
Siêu độ phân giải
Quét tài liệu
Quay video hiển thị kép
Quay chậm (Slow Motion)
Làm đẹp
Google Lens
Chụp ảnh chuyển động
Chống rung
Chuyên nghiệp (Pro)
Bộ lọc màu
Ban đêm (Night Mode)',1),--22

(N'Chính 50 MP & Phụ 0.08 MP',N'HD 720p@30fps, FullHD 1080p@30fps',N'Có',N'Xóa phông
Trôi nhanh thời gian (Time Lapse)
Toàn cảnh (Panorama)
Quay chậm (Slow Motion)
Nhãn dán (AR Stickers)
Lấy nét theo pha (PDAF)
Làm đẹp
HDR
Ban đêm (Night Mode)',1)--23
;
--FrontCameras
INSERT FrontCameras(Resolution,Feature,Status) VALUES
(N'12 MP',N'Smart HDR 5
Xóa phông
Trôi nhanh thời gian (Time Lapse)
Quay video HD
Quay video Full HD
Quay video 4K
Nhãn dán (AR Stickers)
Live Photo
Chụp đêm
Bộ lọc màu',1),--1

(N'12 MP',N'Smart HDR 5
Xóa phông
Trôi nhanh thời gian (Time Lapse)
Quay video Full HD
Quay video 4K
Nhãn dán (AR Stickers)
Live Photo
Chụp đêm
Bộ lọc màu',1),--2

(N'12 MP',N'Smart HDR 5
Xóa phông
Trôi nhanh thời gian (Time Lapse)
Quay video HD
Quay video Full HD
Quay video 4K
Quay chậm (Slow Motion)
Nhãn dán (AR Stickers)
Live Photo
Cinematic
Chụp đêm
Bộ lọc màu',1),--3

(N'12 MP',N'Smart HDR 5
Xóa phông
Tự động lấy nét (AF)
Trôi nhanh thời gian (Time Lapse)
Retina Flash
Quay video HD
Quay video Full HD
Quay video 4K
Quay chậm (Slow Motion)
Nhãn dán (AR Stickers)
Live Photo
Cinematic
Chụp đêm
Bộ lọc màu',1),--4
(N'12 MP',N'Xóa phông
Trôi nhanh thời gian (Time Lapse)
Smart HDR 4
Retina Flash
Quay video HD
Quay video Full HD
Quay video 4K
Quay chậm (Slow Motion)
Nhãn dán (AR Stickers)
Live Photo
Deep Fusion
Cinematic
Chụp đêm
Chống rung điện tử kỹ thuật số (EIS)
Chế độ chân dung
Bộ lọc màu
TrueDepth',1), --5

(N'12 MP',N'Xóa phông
Tự động lấy nét (AF)
Smart HDR 4
Quay video HD
Quay video Full HD
Quay video 4K
Nhận diện khuôn mặt',1),--6

(N'12 MP',N'Xóa phông
Video chân dung
Video chuyên nghiệp
Trôi nhanh thời gian (Time Lapse)
Quay video HD
Quay video Full HD
Quay video 4K
Quay chậm (Slow Motion)
Nhãn dán (AR Stickers)
Làm đẹp
Góc rộng (Wide)
Flash màn hình
Chụp ảnh chuyển động
Chụp đêm
Chụp hẹn giờ
Chụp bằng cử chỉ
Chân dung đêm
Chuyên nghiệp (Pro)
Bộ lọc màu',1),--7

(N'12 MP',N'Xóa phông
Video chân dung
Video chuyên nghiệp
Trôi nhanh thời gian (Time Lapse)
Quay video HD
Quay video Full HD
Quay video 4K
Quay chậm (Slow Motion)
Nhãn dán (AR Stickers)
Làm đẹp
Góc rộng (Wide)
Flash màn hình
Chụp ảnh chuyển động
Chụp đêm
Chụp hẹn giờ
Chụp bằng cử chỉ
Chân dung đêm
Chuyên nghiệp (Pro)
Bộ lọc màu',1), --8

(N'12 MP',N'Xóa phông
Video chân dung
Video chuyên nghiệp
Trôi nhanh thời gian (Time Lapse)
Quay video HD
Quay video Full HD
Quay video 4K
Quay chậm (Slow Motion)
Nhãn dán (AR Stickers)
Làm đẹp
Góc rộng (Wide)
Flash màn hình
Chụp đêm
Chụp một chạm
Chụp hẹn giờ
Chụp bằng cử chỉ
Chân dung đêm
Chuyên nghiệp (Pro)
Bộ lọc màu',1), --9

(N'12 MP',N'Xóa phông
Video chân dung
Video chuyên nghiệp
Trôi nhanh thời gian (Time Lapse)
Quay video HD
Quay video Full HD
Quay video 4K
Quay chậm (Slow Motion)
Nhãn dán (AR Stickers)
Làm đẹp
Góc rộng (Wide)
Flash màn hình
Chụp ảnh chuyển động
Chụp đêm
Chụp một chạm
Chụp hẹn giờ
Chụp bằng cử chỉ
Chân dung đêm
Bộ lọc màu',1), --10

(N'12 MP',N'Xóa phông
Trôi nhanh thời gian (Time Lapse)
Quay video HD
Quay video Full HD
Quay video 4K
Quay chậm (Slow Motion)
Nhãn dán (AR Stickers)
Làm đẹp
Góc siêu rộng (Ultrawide)
Chụp đêm
Bộ lọc màu',1), --11

(N'12 MP',N'Xóa phông
Trôi nhanh thời gian (Time Lapse)
Quay video HD
Quay video Full HD
Quay video 4K
Quay chậm (Slow Motion)
Nhận diện khuôn mặt
Nhãn dán (AR Stickers)
Làm đẹp
Góc siêu rộng (Ultrawide)
Chụp đêm
Chuyên nghiệp (Pro)
Bộ lọc màu',1), --12

(N'12 MP',N'Xóa phông
Tự động lấy nét (AF)
Trôi nhanh thời gian (Time Lapse)
Quay video HD
Quay video Full HD
Quay video 4K
Quay chậm (Slow Motion)
PixelMaster
Nhận diện khuôn mặt
Nhãn dán (AR Stickers)
Làm đẹp A.I
Làm đẹp
Live Photo
HDR
Góc siêu rộng (Ultrawide)
Góc rộng (Wide)
Flash màn hình
Chụp đêm
Chụp bằng cử chỉ
Chống rung
Chuyên nghiệp (Pro)
Bộ lọc màu',1), --13

(N'32 MP',N'Xóa phông
Trôi nhanh thời gian (Time Lapse)
Quay video HD
Quay video Full HD
Quay video 4K
Quay chậm (Slow Motion)
HDR
Chụp đêm
Chụp hẹn giờ
Chống rung điện tử kỹ thuật số (EIS)',1), --14

(N'16 MP',N'Quay video HD
Quay video Full HD
Làm đẹp
HDR
Flash màn hình
Chụp hẹn giờ
Bộ lọc màu',1), --15

(N'16 MP',N'Xóa phông
Trôi nhanh thời gian (Time Lapse)
Toàn cảnh (Panorama)
Quay video HD
Quay video Full HD
Làm đẹp
HDR
Flash màn hình
Chụp đêm
Chụp hẹn giờ
Bộ lọc màu',1), --16

(N'16 MP',N'Xóa phông
Trôi nhanh thời gian (Time Lapse)
Toàn cảnh (Panorama)
Quay video HD
Quay video Full HD
Làm đẹp A.I
Làm đẹp
HDR
Flash màn hình
Chụp ảnh chuyển động
Chụp đêm
Chụp hẹn giờ
Bộ lọc màu',1), --17

(N'32 MP',N'Xóa phông
Trôi nhanh thời gian (Time Lapse)
Toàn cảnh (Panorama)
Quay video HD
Quay video Full HD
Quay video 4K
Nhãn dán (AR Stickers)
Làm đẹp
HDR
Góc rộng (Wide)
Chụp đêm
Chống rung
Bộ lọc màu',1), --18

(N'Trong: 20 MP & Ngoài: 32 MP',N'Xóa phông
Video hiển thị kép
Trôi nhanh thời gian (Time Lapse)
Toàn cảnh (Panorama)
Quay video HD
Quay video Full HD
Quay video 4K
Nhãn dán (AR Stickers)
Làm đẹp
HDR
Flash màn hình
Chụp đêm
Chụp hẹn giờ
Chống rung
Bộ lọc màu',1), --19

(N'8 MP',N'Xóa phông
Trôi nhanh thời gian (Time Lapse)
Toàn cảnh (Panorama)
Quay video HD
Quay video Full HD
Nhãn dán (AR Stickers)
Làm đẹp A.I',1), --20

(N'16 MP',N'Xóa phông
Quay video HD
Quay video Full HD
Phơi sáng kép
Làm đẹp
Live Photo
HDR
Chụp đêm
Bộ lọc màu',1), --21

(N'8 MP',N'Xóa phông
Video hiển thị kép
Quay video HD
Quay video Full HD
Làm đẹp
Chụp ảnh chuyển động
Chụp đêm
Bộ lọc màu',1), --22

(N'8 MP',N'Đèn Flash trợ sáng
Xóa phông
Trôi nhanh thời gian (Time Lapse)
Toàn cảnh (Panorama)
Làm đẹp
Góc rộng (Wide)
Chụp đêm',1) --23
;
--OperatingSystemsAndCPUs
INSERT OperatingSystemsAndCPUs(Operatingsystem,Processorchip,CPUspeed,Graphicschip,Status) VALUES
(N'iOS 17',N'Apple A17 Pro 6 nhân',N'3.78 GHz',N'Apple GPU 6 nhân',1),--1
(N'iOS 17',N'Apple A16 Bionic 6 nhân',N'3.46 GHz',N'Apple GPU 5 nhân',1),--2
(N'iOS 15',N'Apple A15 Bionic 6 nhân',N'3.22 GHz',N'Apple GPU 4 nhân',1), --3
(N'iOS 15',N'Apple A15 Bionic 6 nhân',N'3.22 GHz',N'Apple GPU 5 nhân',1), --4
(N'Android 14',N'Exynos 2400',N'3.2 GHz',N'Xclipse 940',1), --5
(N'Android 14',N'Exynos 2400',N'3.2 GHz',N'Xclipse 940',1), --6
(N'Android 14',N'Snapdragon 8 Gen 3 for Galaxy',N'3.39 GHz',N'Adreno 750',1), --7
(N'Android 13',N'Snapdragon 8 Gen 2 for Galaxy',N'1 nhân 3.36 GHz, 4 nhân 2.8 GHz & 3 nhân 2 GHz',N'Adreno 740',1), --8
(N'Android 13',N'Snapdragon 8 Gen 2 for Galaxy',N'1 nhân 3.36 GHz, 4 nhân 2.8 GHz & 3 nhân 2 GHz',N'Adreno 740',1), --9
(N'Android 13',N'Snapdragon 8 Gen 2 for Galaxy',N'1 nhân 3.36 GHz, 4 nhân 2.8 GHz & 3 nhân 2 GHz',N'Adreno 740',1), --10
(N'Android 14',N'Snapdragon 8 Gen 3 8 nhân',N'1 nhân 3.3 GHz, 3 nhân 3.2 GHz, 2 nhân 3 GHz & 2 nhân 2.3 GHz',N'Adreno 750',1), --11
(N'Android 13',N'Snapdragon 685 8 nhân',N'2.8 GHz',N'Adreno 610',1), --12
(N'Android 13',N'MediaTek Helio G99-Ultra 8 nhân',N'2.2 GHz',N'Mali-G57 MC2',1), --13
(N'Android 13',N'MediaTek Dimensity 7200 Ultra',N'2 nhân 2.8 GHz & 6 nhân 2 GHz',N'Mali-G610',1), --14
(N'Android 13',N'MediaTek Dimensity 9200 5G 8 nhân',N'2 nhân 2.8 GHz & 6 nhân 2 GHz',N'Mali-G610',1), --15
(N'Android 13',N'Snapdragon 8 Gen 2 8 nhân',N'1 nhân 3.2 GHz, 4 nhân 2.8 GHz & 3 nhân 2 GHz',N'Adreno 740',1), --16
(N'Android 13',N'MediaTek Helio G85 8 nhân',N'2.0 GHz',N'Mali-G52 MP2',1), --17
(N'Android 13',N'Snapdragon 680 8 nhân',N'4 nhân 2.4 GHz & 4 nhân 1.9 GHz',N'Adreno 610',1), --18
(N'Android 14',N'Snapdragon 685 8 nhân',N'2.8 GHz',N'Adreno 610',1), --19
(N'Android 13',N'MediaTek Helio G36 8 nhân',N'2.2 GHz',N'IMG PowerVR GE8320',1) --20
; 
--Connect
INSERT Connects(Mobilenetwork,SIM,WIFI,GPS,Bluetooth,ConnectionChargingPort,HeadPhoneJack,OtherConnections,Status) VALUES
(N'Hỗ trợ 5G',N'1 Nano SIM & 1 eSIM',N'Wi-Fi MIMO
Wi-Fi 802.11 a/b/g/n/ac/ax
6 GHz',N'QQZSS
NavIC
GPS
GLONASS
GALILEO
BEIDOU',N'v5.3',N'Type-C',N'Type-C',N'NFC',1),--1

(N'Hỗ trợ 5G',N'1 Nano SIM & 1 eSIM',N'Wi-Fi MIMO
Có
6 GHz',N'QZSS
NavIC
GLONASS
GALILEO
Có',N'v5.3',N'Type-C',N'Type-C',N'NFC',1),--2

(N'Hỗ trợ 5G',N'1 Nano SIM & 1 eSIM',N'Wi-Fi MIMO
Có
6 GHz',N'QZSS
GPS
GLONASS
GALILEO
BEIDOU
Có',N'v5.3',N'Type-C',N'Type-C',N'NFC',1),--3

(N'Hỗ trợ 5G',N'1 Nano SIM & 1 eSIM',N'Wi-Fi MIMO
Wi-Fi 802.11 a/b/g/n/ac/ax
Wi-Fi 6',N'QZSS
GPS
GLONASS
GALILEO
BEIDOU
Có',N'v5.3',N'Type-C',N'Type-C',N'NFC',1),--4

(N'Hỗ trợ 5G',N'1 Nano SIM & 1 eSIM',N'Wi-Fi MIMO
Wi-Fi hotspot
Wi-Fi 802.11 a/b/g/n/ac/ax
Dual-band (2.4 GHz/5 GHz)',N'QZSS
iBeacon
GPS
GLONASS
GALILEO
BEIDOU
Có',N'v5.0',N'Lightning',N'Lightning',N'NFC',1), --5

(N'Hỗ trợ 5G',N'1 Nano SIM & 1 eSIM',N'Wi-Fi MIMO
Wi-Fi hotspot
Wi-Fi 802.11 a/b/g/n/ac/ax
Dual-band (2.4 GHz/5 GHz)',N'QZSS
iBeacon
GPS
GLONASS
GALILEO
BEIDOU',N'v5.0
LE
A2DP',N'Lightning',N'Lightning',N'NFC',1), --6

(N'Hỗ trợ 5G',N'1 Nano SIM & 1 eSIM',N'Wi-Fi MIMO
Wi-Fi hotspot
Wi-Fi 802.11 a/b/g/n/ac/ax
Dual-band (2.4 GHz/5 GHz)',N'QZSS
iBeacon
GPS
GLONASS
GALILEO
BEIDOU',N'v5.0
LE
A2DP',N'Lightning',N'Lightning',N'NFC',1), --7
(N'Hỗ trợ 5G',N'2 Nano SIM hoặc 2 eSIM hoặc 1 Nano SIM + 1 eSIM',N'Wi-Fi MIMO
Wi-Fi hotspot
Wi-Fi Direct
Wi-Fi 802.11 a/b/g/n/ac/ax
Dual-band (2.4 GHz/5 GHz)',N'QZSS
GPS
GLONASS
GALILEO
BEIDOU
Có',N'v5.3',N'Type-C',N'Type-C',N'NFC',1), --8

(N'Hỗ trợ 5G',N'2 Nano SIM hoặc 2 eSIM hoặc 1 Nano SIM + 1 eSIM',N'Wi-Fi MIMO
Wi-Fi hotspot
Wi-Fi Direct
Wi-Fi 802.11 a/b/g/n/ac/ax
Dual-band (2.4 GHz/5 GHz)',N'QZSS
GPS
GLONASS
GALILEO
BEIDOU',N'v5.3',N'Type-C',N'Type-C',N'NFC',1), --9

(N'Hỗ trợ 5G',N'2 Nano SIM hoặc 2 eSIM hoặc 1 Nano SIM + 1 eSIM',N'Wi-Fi MIMO
Wi-Fi hotspot
Wi-Fi Direct
Wi-Fi 802.11 a/b/g/n/ac/ax
Dual-band (2.4 GHz/5 GHz)',N'QZSS
GPS
GLONASS
GALILEO
BEIDOU',N'v5.3',N'Type-C',N'Type-C',N'NFC',1), --10

(N'Hỗ trợ 5G',N'2 Nano SIM hoặc 1 Nano SIM + 1 eSIM',N'Wi-Fi Direct
Wi-Fi 802.11 a/b/g/n/ac/ax
Dual-band (2.4 GHz/5 GHz)
6 GHz',N'GPS
GLONASS
GALILEO
BEIDOU',N'v5.3',N'Type-C',N'Type-C',N'NFC, OTP',1), --11

(N'Hỗ trợ 5G',N'2 Nano SIM hoặc 1 Nano SIM + 1 eSIM',N'Wi-Fi Direct
Wi-Fi 802.11 a/b/g/n/ac/ax
Dual-band (2.4 GHz/5 GHz)
6 GHz',N'QZSS
GPS
GLONASS
GALILEO
BEIDOU',N'v5.3',N'Type-C',N'Type-C',N'NFC, OTP',1), --12

(N'Hỗ trợ 5G',N'2 Nano SIM hoặc 1 Nano SIM + 1 eSIM',N'Wi-Fi Direct
Wi-Fi 802.11 a/b/g/n/ac/ax
Dual-band (2.4 GHz/5 GHz)
6 GHz',N'QZSS
GPS
GLONASS
GALILEO
BEIDOU',N'v5.3',N'Type-C',N'Type-C',N'NFC, OTP',1), --13

(N'Hỗ trợ 5G',N'2 Nano SIM',N'Wi-Fi MIMO
Wi-Fi hotspot
Wi-Fi Direct
Wi-Fi 7
Wi-Fi 6',N'NavIC
GPS
GLONASS
GALILEO
BEIDOU',N'v5.3',N'Type-C',N'Type-C',N'NFC, Hồng ngoại',1), --14

(N'Hỗ trợ 4G',N'2 Nano SIM',N'Wi-Fi MIMO
Wi-Fi hotspot
Wi-Fi Direct
Wi-Fi 7
Wi-Fi 6',N'NavIC
GPS
GLONASS
GALILEO
BEIDOU',N'v5.2
LE
A2DP',N'Type-C',N'3.5 mm',N'Hồng ngoại',1), --15

(N'Hỗ trợ 4G',N'2 Nano SIM (SIM 2 chung khe thẻ nhớ)',N'Wi-Fi hotspot
Wi-Fi 802.11 a/b/g/n/ac
Dual-band (2.4 GHz/5 GHz)',N'GPS
GLONASS
GALILEO
BEIDOU',N'v5.2',N'Type-C',N'3.5 mm',N'NFC, Hồng ngoại',1), --16

(N'Hỗ trợ 5G',N'2 Nano SIM',N'Wi-Fi MIMO
Wi-Fi hotspot
Wi-Fi Direct
Wi-Fi 802.11 a/b/g/n/ac
Dual-band (2.4 GHz/5 GHz)',N'QZSS
GPS
GLONASS
GALILEO
BEIDOU',N'v5.3',N'Type-C',N'3.5 mm',N'OTG,NFC, Hồng ngoại',1), --17

(N'Hỗ trợ 5G',N'2 Nano SIM',N'Wi-Fi hotspot
Wi-Fi Direct
Wi-Fi 802.11 a/b/g/n/ac/ax
Wi-Fi 6
Dual-band (2.4 GHz/5 GHz)',N'QZSS
GPS
GLONASS
GALILEO
BEIDOU',N'v5.3',N'Type-C',N'Type-C',N'OTG, NFC',1), --18

(N'Hỗ trợ 5G',N'2 Nano SIM hoặc 1 Nano SIM + 1 eSIM',N'Wi-Fi hotspot
Wi-Fi Direct
Wi-Fi 802.11 a/b/g/n/ac/ax
Wi-Fi 6
Dual-band (2.4 GHz/5 GHz)',N'QZSS
GPS
GLONASS
GALILEO
BEIDOU',N'v5.3',N'Type-C',N'Type-C',N'OTG, NFC',1), --19

(N'Hỗ trợ 4G',N'2 Nano SIM',N'Wi-Fi hotspot
Wi-Fi Direct
Wi-Fi 802.11 a/b/g/n/ac
Dual-band (2.4 GHz/5 GHz)',N'QZSS
GPS
GLONASS
GALILEO
BEIDOU',N'v5.3',N'Type-C',N'3.5 mm',N'OTG',1), --20

(N'Hỗ trợ 4G',N'2 Nano SIM',N'Wi-Fi hotspot
Wi-Fi Direct
Wi-Fi 802.11 a/b/g/n/ac
Dual-band (2.4 GHz/5 GHz)',N'QZSS
GPS
GLONASS
GALILEO
BEIDOU',N'v5.3',N'Type-C',N'3.5 mm',N'OTG',1), --21

(N'Hỗ trợ 4G',N'2 Nano SIM',N'Wi-Fi hotspot
Wi-Fi Direct
Wi-Fi 802.11 a/b/g/n/ac
Dual-band (2.4 GHz/5 GHz)',N'QZSS
GPS
GLONASS
GALILEO
BEIDOU',N'v5.3',N'Type-C',N'Type-C',N'OTG',1), --22

(N'Hỗ trợ 4G',N'2 Nano SIM',N'Wi-Fi hotspot
Wi-Fi Direct
Wi-Fi 802.11 a/b/g/n/ac
Dual-band (2.4 GHz/5 GHz)',N'GPS
GLONASS
GALILEO',N'v5.3',N'Type-C',N'3.5 mm',N'OTG',1) --23
;
--BatteryandChargers
INSERT BatteryandChargers(Batterycapacity,Batterytype,Maximumchargingsupport,Batterytechnology,Status) VALUES
(4422,N'Li-Ion',N'20 W',N'Tiết kiệm pin
Sạc ngược không dây
Sạc không dây MagSafe',1),--1

(3274,N'Li-Ion',N'20 W',N'Tiết kiệm pin
Sạc không dây MagSafe
Sạc không dây',1),--2

(4383,N'Li-Ion',N'20 W',N'Tiết kiệm pin
Sạc pin nhanh
Sạc không dây',1),--3

(3349,N'Li-Ion',N'20 W',N'Tiết kiệm pin
Sạc pin nhanh
Sạc ngược qua cáp
Sạc không dây MagSafe
Sạc không dây',1),--4

(3240,N'Li-Ion',N'20 W',N'Tiết kiệm pin
Sạc pin nhanh
Sạc không dây MagSafe
Sạc không dây',1),--5

(3095,N'Li-Ion',N'20 W',N'Tiết kiệm pin
Sạc pin nhanh
Sạc không dây MagSafe
Sạc không dây',1),--6

(4352,N'Li-Ion',N'20 W',N'Sạc pin nhanh
Sạc không dây MagSafe
Sạc không dây
Siêu tiết kiệm pin',1),--7

(4000,N'Li-Ion',N'25 W',N'Sạc pin nhanh
Sạc ngược không dây
Sạc không dây',1),--8

(4900,N'Li-Ion',N'25 W',N'Sạc pin nhanh
Sạc ngược không dây
Sạc không dây',1),--9

(5000,N'Li-Ion',N'45 W',N'Tiết kiệm pin
Sạc pin nhanh
Sạc ngược không dây
Sạc không dây',1),--10

(3900,N'Li-Ion',N'25 W',N'Sạc pin nhanh
Sạc ngược không dây
Sạc không dây',1),--11

(4700,N'Li-Ion',N'45 W',N'Sạc pin nhanh
Sạc ngược không dây
Sạc không dây',1),--12

(5000,N'Li-Ion',N'45 W',N'Sạc pin nhanh
Sạc ngược không dây
Sạc không dây',1),--13

(5000,N'Li-Po',N'90 W',N'Tiết kiệm pin
Sạc pin nhanh
Sạc không dây
HyperCharge',1),--14

(5000,N'Li-Po',N'33 W',N'Tiết kiệm pin
Sạc pin nhanh
Siêu tiết kiệm pin',1),--15

(5000,N'Li-Po',N'67 W',N'Tiết kiệm pin
Sạc pin nhanh
Siêu tiết kiệm pin',1),--16

(5000,N'Li-Po',N'120 W',N'Tiết kiệm pin, HyperCharge',1),--17

(4300,N'Li-Po',N'44 W',N'Tiết kiệm pin
Sạc siêu nhanh SuperVOOC
Siêu tiết kiệm pin',1),--18

(4805,N'Li-Po',N'44 W',N'Tiết kiệm pin
Sạc siêu nhanh SuperVOOC
Siêu tiết kiệm pin',1),--19

(5000,N'Li-Po',N'33 W',N'Sạc siêu nhanh SuperVOOC',1),--20

(5000,N'Li-Po',N'44 W',N'Tiết kiệm pin
Sạc pin nhanh',1),--21

(5000,N'Li-Po',N'80 W',N'Tiết kiệm pin
Sạc pin nhanh
Siêu tiết kiệm pin',1),--22

(5000,N'Li-Po',N'18 W',N'Tiết kiệm pin, Sạc pin nhanh',1)--23
;

--Utilities
INSERT Utilities(Advancedsecurity,Specialfeatures,Wateranddustresistant,Record,Watchamovie,Listeningtomusic,Status) VALUES
(N'Mở khoá khuôn mặt Face ID',N'Phát hiện va chạm (Crash Detection)Màn hình luôn hiển thị AOD',N'IP68',N'Ghi âm mặc định',N'H.264(MPEG4-AVC)',N'MP3
FLAC
AAC',1),--1
(N'Mở khoá khuôn mặt Face ID',N'Phát hiện va chạm (Crash Detection)
Màn hình luôn hiển thị AOD',N'IP68',N'Ghi âm mặc định',N'Có',N'Có',1),--2
(N'Mở khoá khuôn mặt Face ID',N'Phát hiện va chạm (Crash Detection)
Màn hình luôn hiển thị AOD',N'IP68',N'Ghi âm mặc định',N'H.264(MPEG4-AVC)',N'MP3
FLAC
AAC',1),--3
(N'Mở khoá khuôn mặt Face ID',N'Âm thanh Dolby Atmos
Phát hiện va chạm (Crash Detection)',N'IP68',N'Ghi âm mặc định',N'H.264(MPEG4-AVC)
ProRes
HEVC',N'MP3
FLAC
AAC',1),--4
(N'Mở khoá khuôn mặt Face ID',N'Âm thanh Dolby Atmos
Loa kép
HDR10
DCI-P3
Công nghệ True Tone
Công nghệ hình ảnh Dolby Vision
Công nghệ HLG
Chạm 2 lần sáng màn hình
Apple Pay',N'IP68',N'Ghi âm có microphone chuyên dụng chống ồn',N'H.264(MPEG4-AVC)
ProRes
HEVC',N'Có',1),--5

(N'Mở khoá khuôn mặt Face ID',NULL,N'IP68',N'Ghi âm có microphone chuyên dụng chống ồn',N'H.264(MPEG4-AVC)
ProRes
HEVC',N'Có',1),--6

(N'Mở khoá khuôn mặt Face ID',N'NULL',N'IP68',N'Ghi âm có microphone chuyên dụng chống ồn',N'H.264(MPEG4-AVC)
ProRes
HEVC',N'Có',1),--7

(N'Mở khoá vân tay dưới màn hình, Mở khoá khuôn mặt',N'Ứng dụng kép (Dual Messenger)
Đa cửa sổ (chia đôi màn hình)
Âm thanh Dolby Atmos
Âm thanh AKG
Vision Booster
Tối ưu game (Game Booster)
Trợ lý ảo Samsung Bixby
Trợ lý ảo Google Assistant
Trợ lý Note thông minh
Trợ lý chỉnh ảnh
Trợ lý chat thông minh
Thu nhỏ màn hình sử dụng một tay
Samsung Pay
Samsung DeX (Kết nối màn hình sử dụng giao diện tương tự PC)
Ray Tracing
Phiên dịch trực tiếp
Mở rộng bộ nhớ RAM
Màn hình luôn hiển thị AOD
Loa kép
Khoanh vùng search đa năng
Hệ thống tản nhiệt Vapor Chamber
DCI-P3
Cử chỉ thông minh
Chế độ đơn giản (Giao diện đơn giản)
Chặn tin nhắn
Chặn cuộc gọi
Chạm 2 lần tắt/sáng màn hình',N'IP68',N'Ghi âm mặc định, Ghi âm cuộc gọi',N'WEBM
MP4
MKV
M4V
FLV
AVI
3GP
3G2',N'XMF
WAV
RTX
RTTTL
OTA
OGG
OGA
MXMF
MP3
Midi
M4A
IMY
FLAC
AWB
APE
AMR
AAC
3GA',1),--8

(N'Mở khoá vân tay dưới màn hình, Mở khoá khuôn mặt',N'Ứng dụng kép (Dual Messenger)
Đa cửa sổ (chia đôi màn hình)
Âm thanh Dolby Atmos
Âm thanh AKG
Vision Booster
Tối ưu game (Game Booster)
Trợ lý ảo Samsung Bixby
Trợ lý ảo Google Assistant
Trợ lý Note thông minh
Trợ lý chỉnh ảnh
Trợ lý chat thông minh
Thu nhỏ màn hình sử dụng một tay
Samsung Pay
Samsung DeX (Kết nối màn hình sử dụng giao diện tương tự PC)
Ray Tracing
Phiên dịch trực tiếp
Mở rộng bộ nhớ RAM
Màn hình luôn hiển thị AOD
Loa kép
Khoanh vùng search đa năng
Hệ thống tản nhiệt Vapor Chamber
DCI-P3
Cử chỉ thông minh
Chế độ đơn giản (Giao diện đơn giản)
Chặn tin nhắn
Chặn cuộc gọi
Chạm 2 lần tắt/sáng màn hình',N'IP68',N'Ghi âm mặc định, Ghi âm cuộc gọi',N'WEBM
MP4
MKV
M4V
FLV
AVI
3GP
3G2',N'XMF
WAV
RTX
RTTTL
OTA
OGG
OGA
MXMF
MP3
Midi
M4A
IMY
FLAC
AWB
APE
AMR
AAC
3GA',1),--9

(N'Mở khoá vân tay dưới màn hình, Mở khoá khuôn mặt',N'Ứng dụng kép (Dual Messenger)
Đa cửa sổ (chia đôi màn hình)
Âm thanh Dolby Atmos
Âm thanh AKG
Vision Booster
Tối ưu game (Game Booster)
Trợ lý ảo Samsung Bixby
Trợ lý ảo Google Assistant
Trợ lý Note thông minh
Trợ lý note quyền năng
Trợ lý chỉnh ảnh
Trợ lý chat thông minh
Thu nhỏ màn hình sử dụng một tay
Samsung Pay
Samsung DeX (Kết nối màn hình sử dụng giao diện tương tự PC)
Ray Tracing
Phiên dịch trực tiếp
Mở rộng bộ nhớ RAM
Màn hình luôn hiển thị AOD
Loa kép
Không gian thứ hai (Thư mục bảo mật)
Khoanh vùng search đa năng
Hệ thống tản nhiệt Vapor Chamber
Cử chỉ thông minh
Chặn tin nhắn
Chặn cuộc gọi
Chạm 2 lần tắt/sáng màn hình',N'IP68',N'Ghi âm mặc định, Ghi âm cuộc gọi',N'WEBM
MP4
MKV
M4V
FLV
AVI
3GP
3G2',N'XMF
WAV
RTX
RTTTL
OTA
OGG
OGA
MXMF
MP3
Midi
M4A
IMY
FLAC
AWB
APE
AMR
AAC
3GA',1),--10

(N'Mở khoá vân tay dưới màn hình, Mở khoá khuôn mặt',N'Đa cửa sổ (chia đôi màn hình)
Âm thanh Dolby Atmos
Âm thanh AKG
Tối ưu game (Game Booster)
Trợ lý ảo Samsung Bixby
Samsung Pay
Samsung DeX (Kết nối màn hình sử dụng giao diện tương tự PC)
Mở rộng bộ nhớ RAM
Màn hình luôn hiển thị AOD
Không gian thứ hai (Thư mục bảo mật)
Chặn tin nhắn
Chặn cuộc gọi
Chạm 2 lần tắt/sáng màn hình',N'IP68',N'Ghi âm mặc định, Ghi âm cuộc gọi',N'MP4
MKV
FLV
AVI
3GP',N'WAV
OGG
MP3
Midi
M4A
AMR
AAC',1),--11

(N'Mở khoá vân tay dưới màn hình, Mở khoá khuôn mặt',N'Đa cửa sổ (chia đôi màn hình)
Âm thanh Dolby Atmos
Âm thanh AKG
Tối ưu game (Game Booster)
Trợ lý ảo Samsung Bixby
Thu nhỏ màn hình sử dụng một tay
Samsung Pay
Samsung DeX (Kết nối màn hình sử dụng giao diện tương tự PC)
Màn hình luôn hiển thị AOD
Không gian thứ hai (Thư mục bảo mật)
Chế độ đơn giản (Giao diện đơn giản)
Chế độ trẻ em (Samsung Kids)
Chặn tin nhắn
Chặn cuộc gọi
Chạm 2 lần tắt/sáng màn hình',N'IP68',N'Ghi âm cuộc gọi',N'MP4
MKV
FLV
AVI
3GP',N'WAV
OGG
MP3
Midi
M4A
AMR
AAC',1),--12

(N'Mở khoá vân tay dưới màn hình, Mở khoá khuôn mặt',N'Đa cửa sổ (chia đôi màn hình)
Âm thanh Dolby Atmos
Âm thanh AKG
Tối ưu game (Game Booster)
Trợ lý ảo Samsung Bixby
Trợ lý ảo Google Assistant
Trợ lý Note thông minh
Trợ lý chỉnh ảnh
Trợ lý chat thông minh
Thu nhỏ màn hình sử dụng một tay
Samsung Pay
Samsung DeX (Kết nối màn hình sử dụng giao diện tương tự PC)
Mở rộng bộ nhớ RAM
Màn hình luôn hiển thị AOD
Loa kép
Không gian thứ hai
Khoanh vùng search đa năng
Chế độ đơn giản (Giao diện đơn giản)
Chế độ trẻ em (Samsung Kids)
Chặn tin nhắn
Chặn cuộc gọi
Chạm 2 lần tắt/sáng màn hình',N'IP68',N'Ghi âm mặc định, Ghi âm cuộc gọi',N'MP4
MKV
FLV
AV1
3GP',N'WAV
OGG
MP3
Midi
M4A
AMR
AAC',1),--13

(N'Mở khoá vân tay dưới màn hình, Mở khoá khuôn mặt',N'Công nghệ TrueColor
Âm thanh Hi-Res Audio
Âm thanh Dolby Atmos
Hệ thống làm mát Xiaomi IceLoop
HDR10+
HDR10
DCI-P3
Công nghệ hình ảnh Dolby Vision
4 mic',N'IP68',N'Ghi âm mặc định, Ghi âm cuộc gọi',N'WEBM
MP4
MKV
3GP',N'WAV
OGG
MP3
FLAC
AWB
APE
AMR
AAC',1),--14

(N'Mở khoá vân tay dưới màn hình, Mở khoá khuôn mặt',N'Ứng dụng kép (Nhân bản ứng dụng)
Đa cửa sổ (chia đôi màn hình)
Âm thanh Dolby Atmos
Thu nhỏ màn hình sử dụng một tay
Mở rộng bộ nhớ RAM
Màn hình luôn hiển thị AOD
Loa kép
Không gian thứ hai
Khoá ứng dụng
DCI-P3
Chặn tin nhắn
Chặn cuộc gọi
Chạm 2 lần tắt/sáng màn hình',N'IP54',N'Ghi âm mặc định, Ghi âm cuộc gọi',N'WMV
WEBM
MP4
MKV
AVI
3GP',N'WAV
MP3
MP2
Midi
FLAC
APE
AMR
ADPCM
AAC',1),--15

(N'Mở khoá vân tay dưới màn hình, Mở khoá khuôn mặt',N'Ứng dụng kép (Nhân bản ứng dụng)
Đo nhịp tim
Âm thanh Dolby Atmos
Trợ lý ảo Google Assistant
Thu nhỏ màn hình sử dụng một tay
Mở rộng bộ nhớ RAM
Màn hình luôn hiển thị AOD
Loa kép
Không gian thứ hai
Khoá ứng dụng
DCI-P3
Cửa sổ nổi
Cử chỉ thông minh',N'IP54',N'Ghi âm mặc định, Ghi âm cuộc gọi',N'WMV
WEBM
MP4
MKV
AVI
3GP',N'WAV
MP3
MP2
Midi
FLAC
APE
AMR
ADPCM
AAC',1),--16

(N'Mở khoá vân tay dưới màn hình, Mở khoá khuôn mặt',N'Ứng dụng kép (Nhân bản ứng dụng)
Đo nhịp tim
Đa cửa sổ (chia đôi màn hình)
Âm thanh Dolby Atmos
Trợ lý ảo Google Assistant
Thu nhỏ màn hình sử dụng một tay
Mở rộng bộ nhớ RAM
Màn hình luôn hiển thị AOD
Không gian thứ hai
Khoá ứng dụng
HDR10+
DCI-P3
Công nghệ hình ảnh Dolby Vision
Chạm 2 lần tắt/sáng màn hình',N'IP68',N'Ghi âm mặc định, Ghi âm cuộc gọi',N'WMV
WEBM
MP4
MKV
AVI
3GP',N'WAV
MP3
MP2
Midi
FLAC
APE
AMR
ADPCM
AAC',1),--17

(N'Mở khoá vân tay cạnh viền, Mở khoá khuôn mặt',N'Ứng dụng kép (Nhân bản ứng dụng)
Đa cửa sổ (chia đôi màn hình)
Âm thanh Dolby Atmos
Trợ lý ảo Google Assistant
Thu nhỏ màn hình sử dụng một tay
Mở rộng bộ nhớ RAM
Khoá ứng dụng
HDR10+
DCI-P3
Cử chỉ màn hình tắt
Chế độ trẻ em (Không gian trẻ em)
Chạm 2 lần tắt/sáng màn hình',N'IPX4',N'Ghi âm mặc định, Ghi âm cuộc gọi',N'MP4
AVI
3GP',N'OGG
MP3
Midi
FLAC',1),--18

(N'Mở khoá vân tay cạnh viền, Mở khoá khuôn mặt',N'Ứng dụng kép (Nhân bản ứng dụng)
Đa cửa sổ (chia đôi màn hình)
Âm thanh Dolby Atmos
Trợ lý ảo Google Assistant
Thu nhỏ màn hình sử dụng một tay
Thanh bên thông minh
Mở rộng bộ nhớ RAM
Khoá ứng dụng
Cử chỉ thông minh
Cử chỉ màn hình tắt
Công nghệ hình ảnh Dolby Vision
Chế độ trẻ em (Không gian trẻ em)
Chạm 2 lần tắt/sáng màn hình',N'IPX4',N'Ghi âm mặc định, Ghi âm cuộc gọi',N'MP4, AVI',N'OGG
MP3
Midi
FLAC',1),--19

(N'Mở khoá vân tay cạnh viền, Mở khoá khuôn mặt',N'Ứng dụng kép (Nhân bản ứng dụng)
Mở rộng bộ nhớ RAM
Loa kép
Cử chỉ thông minh',N'IP54',N'Ghi âm mặc định, Ghi âm cuộc gọi',N'MP4, AVI',N'OGG
MP3
Midi
FLAC',1),--20

(N'Mở khoá vân tay cạnh viền, Mở khoá khuôn mặt',N'Đa cửa sổ (chia đôi màn hình)
Âm thanh Hi-Res Audio
Trợ lý ảo Jovi
Thu nhỏ màn hình sử dụng một tay
Mở rộng bộ nhớ RAM
Cử chỉ thông minh
Chế độ đơn giản (Giao diện đơn giản)
Chặn tin nhắn
Chặn cuộc gọi
Chạm 2 lần tắt/sáng màn hình',N'IP54',N'Ghi âm mặc định, Ghi âm cuộc gọi',N'TS
MP4
MKV
FLV
AVI
3GP',N'WAV
OGG
MP3
MP2
MP1
Midi
M4A
FLAC
APE
AAC',1),--21

(N'Mở khoá vân tay dưới màn hình, Mở khoá khuôn mặt',N'Ứng dụng kép (Nhân bản ứng dụng)
Đa cửa sổ (chia đôi màn hình)
Âm thanh Hi-Res Audio
Tối ưu game (Siêu trò chơi)
Trợ lý ảo Jovi
Thu nhỏ màn hình sử dụng một tay
Thanh bên thông minh
Mở rộng bộ nhớ RAM
Loa kép
Không gian thứ hai',N'IP54',N'Ghi âm mặc định, Ghi âm cuộc gọi',N'WEBM
TS
MP4
MKV
FLV
AVI
ASF
3GP',N'WAV
Vorbis
MP3
Midi
FLAC
APE
AAC',1),--22

(N'Mở khoá vân tay cạnh viền, Mở khoá khuôn mặt',N'Mở rộng bộ nhớ RAM
Loa kép
Chạm 2 lần tắt/sáng màn hình',NULL,N'Ghi âm mặc định, Ghi âm cuộc gọi',N'MP4, AV1',N'OGG
MP3
Midi
FLAC',1)--23
;
--GeneralInformations
INSERT GeneralInformations(Design,Material,Sizevolume,Launchtime,Thefirm,Status) VALUES 
(N'Nguyên khối',N'Khung Titan & Mặt lưng kính cường lực',N'Dài 159.9 mm - Ngang 76.7 mm - Dày 8.25 mm - Nặng 221 g',N'09/2023',N'iPhone (Apple).',1),--1
(N'Nguyên khối',N'Khung Titan & Mặt lưng kính cường lực',N'Dài 146.6 mm - Ngang 70.6 mm - Dày 8.25 mm - Nặng 187 g',N'09/2023',N'iPhone (Apple).',1),--2
(N'Nguyên khối',N'Khung Nhựa & Mặt lưng kính cường lực',N'Dài 160.9 mm - Ngang 77.8 mm - Dày 7.8 mm - Nặng 201 g',N'09/2023',N'iPhone (Apple).',1),--3
(N'Nguyên khối',N'Khung Nhựa & Mặt lưng kính cường lực',N'Dài 147.6 mm - Ngang 71.6 mm - Dày 7.8 mm - Nặng 171 g',N'09/2023',N'iPhone (Apple).',1),--4
(N'Nguyên khối',N'Khung nhôm & Mặt lưng kính cường lực',N'Dài 146.7 mm - Ngang 71.5 mm - Dày 7.65 mm - Nặng 173 g',N'09/2021',N'iPhone (Apple).',1),--5
(N'Nguyên khối',N'Khung thép không gỉ & Mặt lưng kính cường lực',N'Dài 146.7 mm - Ngang 71.5 mm - Dày 7.65 mm - Nặng 204 g',N'09/2021',N'iPhone (Apple).',1),--6
(N'Nguyên khối',N'Khung thép không gỉ & Mặt lưng kính cường lực',N'Dài 160.8 mm - Ngang 78.1 mm - Dày 7.65 mm - Nặng 240 g',N'09/2021',N'iPhone (Apple).',1),--7
(N'Nguyên khối',N'Khung nhôm & Mặt lưng kính cường lực',N'Dài 147 mm - Ngang 70.6 mm - Dày 7.6 mm - Nặng 167 g',N'01/2024',N'Samsung.',1),--8
(N'Nguyên khối',N'Khung nhôm & Mặt lưng kính cường lực',N'Dài 158.5 mm - Ngang 75.9 mm - Dày 7.7 mm - Nặng 196 g',N'01/2024',N'Samsung.',1),--9
(N'Nguyên khối',N'Khung nhôm & Mặt lưng kính cường lực',N'Dài 158.5 mm - Ngang 75.9 mm - Dày 7.7 mm - Nặng 196 g',N'01/2024',N'Samsung.',1),--10
(N'Nguyên khối',N'Khung nhôm & Mặt lưng kính cường lực',N'Dài 146.3 mm - Ngang 70.9 mm - Dày 7.6 mm - Nặng 168 g',N'02/2023',N'Samsung.',1),--11
(N'Nguyên khối',N'Khung nhôm & Mặt lưng kính cường lực',N'Dài 157.8 mm - Ngang 76.2 mm - Dày 7.6 mm - Nặng 195 g',N'02/2023',N'Samsung.',1),--12
(N'Nguyên khối',N'Khung nhôm & Mặt lưng kính cường lực',N'Dài 163.4 mm - Ngang 78.1 mm - Dày 8.9 mm - Nặng 223 g',N'02/2023',N'Samsung.',1),--13
(N'Nguyên khối',N'Khung kim loại & Mặt lưng da nhân tạo',N'Dài 161.4 mm - Ngang 75.3 mm - Dày 9.2 mm - Nặng 219.8 g',N'05/2024',N'Xiaomi.',1),--14
(N'Nguyên khối',N'Khung & Mặt lưng nhựa',N'Dài 162.24 mm - Ngang 75.55 mm - Dày 7.97 mm - Nặng 188.5 g',N'01/2024',N'Xiaomi.',1),--15
(N'Nguyên khối',N'Khung & Mặt lưng nhựa',N'Dài 161.1 mm - Ngang 74.95 mm - Dày 7.98 mm - Nặng 188 g',N'02/2024',N'Xiaomi.',1),--16
(N'Nguyên khối',N'Khung & Mặt lưng nhựa',N'Dài 161.4 mm - Ngang 74.2 mm - Dày 8.9 mm - Nặng 204.5 g',N'01/2024',N'Xiaomi.',1),--17
(N'Nguyên khối',N'Khung nhôm & Mặt lưng kính cường lực Gorilla Glass 7',N'Dài 166.42 mm - Ngang 75.78 mm - Dày 7.79 mm - Nặng 198 g',N'10/2023',N'OPPO.',1),--18
(N'Nguyên khối',N'Khung hợp kim nhôm & Mặt lưng kính cường lực Gorilla Glass 5 (Màu Vàng) | Da (Màu Đen)',N'Dài 153.4 mm - Ngang 143.1 mm - Dày 5.9 mm - Nặng 245 g (kính) | 239 g (da)',N'10/2023',N'OPPO.',1),--19
(N'Nguyên khối',N'Khung hợp kim & Mặt lưng thuỷ tinh hữu cơ',N'Dài 165.65 mm - Ngang 75.98 mm - Dày 7.99 mm - Nặng 192 g',N'08/2023',N'OPPO.',1),--20
(N'Nguyên khối',N'Khung kim loại & Mặt lưng kính',N'Dài 164.06 mm - Ngang 76.17 mm - Dày 8.07 mm - Nặng 202 g',N'07/2023',N'vivo.',1),--21
(N'Nguyên khối',N'Khung & Mặt lưng nhựa',N'Dài 163.17 mm - Ngang 75.81 mm - Dày 7.79 mm (Đen) | 7.95 mm (Xanh) - Nặng 186 g (Đen) | 188 g (Xanh)',N'04/2023',N'vivo.',1),--22
(N'Nguyên khối',N'Khung & Mặt lưng nhựa',N'Dài 163.69 mm - Ngang 75.6 mm - Dày 8.55 mm - Nặng 189 g',N'05/2024',N'Tecno.',1)--23

;

--Specifications
INSERT Specifications(ProductId,ScreenId,RearcameraId,FrontcameraId,OperatingSystemandCPUId,ConnectId,BatteryandChargerId,UtilityId,GeneralinformationId,Status) VALUES
(1,1,1,1,1,1,1,1,1,1),
(2,2,2,2,1,2,2,2,2,2),
(3,3,3,3,2,3,3,3,3,3),
(4,4,4,4,2,4,4,4,4,4),
(5,5,5,5,3,5,5,5,5,5),
(6,6,6,6,4,6,6,6,6,6),
(7,7,7,7,4,7,7,7,7,7),
(8,8,8,8,5,8,8,8,8,8),
(9,9,9,9,6,9,9,9,9,9),
(10,10,10,10,7,10,10,10,10,10),
(11,11,11,11,8,11,11,11,11,11),
(12,12,12,12,9,12,12,12,12,12),
(13,13,13,13,10,13,13,13,13,13),
(14,14,14,14,11,14,14,14,14,14),
(15,15,15,15,12,15,15,15,15,15),
(16,16,16,16,13,16,16,16,16,16),
(17,17,17,17,14,17,17,17,17,17),
(18,18,18,18,15,18,18,18,18,18),
(19,19,19,19,16,19,19,19,19,19),
(20,20,20,20,17,20,20,20,20,20),
(21,21,21,21,18,21,21,21,21,21),
(22,22,22,22,19,22,22,22,22,22),
(23,23,23,23,20,23,23,23,23,23)
;

Insert OrderStatuses(Name) Values 
(N'Chờ xác nhận'),
(N'Chờ lấy hàng'),
(N'Đang giao hàng'),
(N'Đã giao'),
(N'Đã hủy');


Insert Pays(PayType, Status) Values
(N'Momo',1),
(N'VN Pay',1),
(N'Tiền mặt',1);


--Insert Carts(ProductDetailId, UserId, Quantity) 
--Values
--(2,N'6d466ff0-5adf-4098-804d-2effeedea8d9', 1),
--(11,N'6d466ff0-5adf-4098-804d-2effeedea8d9', 1),
--(1,N'6d466ff0-5adf-4098-804d-2effeedea8d9', 1)



--Insert Invoices(UserId, IssuedDate, DeliveryTime, ShippingAddress, ShippingPhone, Total, SubTotal, OrderStatusId, PayId, PayCode, Status) Values
--(N'f593d050-d650-45d9-afb1-4553c5b86339', '2024-01-20', '2024-01-23', N'số 17,p7, q10, tp HCM', N'0974756374',54839200,65880000, 6, 3, N'848833844343',1),
--(N'f593d050-d650-45d9-afb1-4553c5b86339', GETDATE(), null, N'số 17,p7, q10, tp HCM', N'0974756374',24439600 ,29690000, 6, 3, N'848633844543',1),
--(N'f593d050-d650-45d9-afb1-4553c5b86339', '2024-02-20', '2024-02-23', N'số 17,p7, q10, tp HCM', N'0974756374',24439600,29690000, 4, 3, N'848833844344',1),
--(N'f593d050-d650-45d9-afb1-4553c5b86339', '2024-03-20', '2024-03-23', N'số 17,p7, q10, tp HCM', N'0974756374',24439600,29690000, 4, 3, N'848833844345',1),
--(N'f593d050-d650-45d9-afb1-4553c5b86339', '2024-04-20', '2024-04-23', N'số 17,p7, q10, tp HCM', N'0974756374',24439600,29690000, 4, 3, N'848833844346',1),
--(N'176bb56f-9ea7-4c3c-8669-9bb4ac30a5c5', '2024-05-20', '2024-05-23', N'số 17,p7, q10, tp HCM', N'0974756374',24439600,29690000, 4, 3, N'848833844347',1),
--(N'176bb56f-9ea7-4c3c-8669-9bb4ac30a5c5', '2024-06-20', '2024-06-23', N'số 17,p7, q10, tp HCM', N'0974756374',24439600,29690000, 4, 3, N'848833844348',1),
--(N'176bb56f-9ea7-4c3c-8669-9bb4ac30a5c5', '2024-06-21', '2024-06-23', N'số 17,p7, q10, tp HCM', N'0974756374',24439600,29690000, 4, 3, N'848833844348',1),
--(N'0a7fa136-129b-4b6e-8f9c-79b396837d35', '2024-06-22', '2024-06-23', N'số 17,p7, q10, tp HCM', N'0974756374',24439600,29690000, 4, 3, N'848833844348',1),
--(N'0a7fa136-129b-4b6e-8f9c-79b396837d35', '2024-07-20', '2024-07-23', N'số 17,p7, q10, tp HCM', N'0974756374',24439600,29690000, 4, 3, N'848833844349',1),
--(N'0a7fa136-129b-4b6e-8f9c-79b396837d35', '2023-08-20', '2024-08-23', N'số 17,p7, q10, tp HCM', N'0974756374',24439600,29690000, 4, 3, N'848833844350',1),
--(N'0a7fa136-129b-4b6e-8f9c-79b396837d35', '2023-09-20', '2024-09-23', N'số 17,p7, q10, tp HCM', N'0974756374',24439600,29690000, 4, 3, N'848833844351',1),
--(N'0a7fa136-129b-4b6e-8f9c-79b396837d35', '2023-10-20', '2024-10-23', N'số 17,p7, q10, tp HCM', N'0974756374',24439600,29690000, 4, 3, N'848833844352',1),
--(N'0a7fa136-129b-4b6e-8f9c-79b396837d35', '2023-11-20', '2024-11-23', N'số 17,p7, q10, tp HCM', N'0974756374',24439600,29690000, 4, 3, N'848833844353',1),
--(N'0a7fa136-129b-4b6e-8f9c-79b396837d35d', '2023-12-20', '2024-12-23', N'số 17,p7, q10, tp HCM', N'0974756374',24439600,29690000, 4, 3, N'848833844343',1)





--Insert InvoicesDetails(InvoiceId, ProductDetailId, Quantity, UnitPrice) Values
--(24, 1, 1, 29690000),
--(26, 1, 1, 29690000),

--(8, 2, 1, 22900000),
--(8, 11, 1, 42980000),

--(10, 1, 1, 29690000),
--(11, 1, 1, 29690000),
--(12, 1, 1, 29690000),
--(13, 1, 1, 29690000),
--(14, 1, 1, 29690000),
--(15, 1, 1, 29690000),
--(16, 1, 1, 29690000),
--(17, 1, 1, 29690000),
--(18, 1, 1, 29690000),
--(19, 1, 1, 29690000),
--(20, 1, 1, 29690000),
--(21, 1, 1, 29690000),
--(22, 1, 1, 29690000)




--update Invoices 
--set OrderStatusId = 1



