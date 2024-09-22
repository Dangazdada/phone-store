import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient, {baseURL} from '../../../Components/Other/axiosClient';
import OwlCarousel from 'react-owl-carousel';
import Modal from 'antd/es/modal/Modal';
import {Button} from 'antd';
import 'react-owl-carousel2/lib/styles.css';
import './Phonedetail.css';
import { useAuth  } from "../../../Components/Other/auth";
import MessageModal from '../../../Components/Other/MessageModal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";

const Phonedetail = () => {
    const { id } = useParams();

    const { userId, isLoggedIn} = useAuth();
    const [ProductidPD, setProductidPD] = useState({});
    const [productdetailID, setProductdetailID] = useState(null);
    const [selectedColorId, setSelectedColorId] = useState(null);
    const [selectedromID, setSelectedromID] = useState(null);
    const [selectedramID, setSelectedramID] = useState(null);
    const [selectedromnullID, setSelectedromnullID] = useState(null);
    const [selectedphonebookID, setSelectedphonebookID] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isXemthem, setIsxemthem] = useState(false);
    const [ShowMessageModal, setShowMessageModal] = useState(false);
    const [Notificationstr, setNotificationstr] = useState('');
    const [Ratings, setRatings] =  useState([]);
    const [CommentData, setCommentData] =  useState([]);

    const [comment, setComment] = useState("");
    const [repcomment, setRepComment] = useState("");
    const [Parentcomment, setParentcomment] = useState(null);
    const [Parentcommentrep, setParentcommentrep] = useState(null);
    const [carts, setCarts] =useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        fetchData();
    },[id]);
    
    const fetchData = () => {
        axiosClient
        .get(`/Products/Productdetail?Name=${id}`)
        .then(res => { setProductidPD(res.data);
            // đếm lượt truy cập cảu sản phẩm

            if (res.data && res.data.productdetail.length > 0) {
                const firstColor = res.data.productdetail[0]; // Get the first color
                const prefix = firstColor.mainUrl.split('-').slice(0, -1).join('-');
                const selectedImages = res.data.image
                    .filter(img => img.imgUrl.startsWith(prefix) && firstColor.mainUrl !== img.imgUrl)
                    .map(img => `${baseURL}/Image/${img.imgUrl}`);
                setCurrentImages(selectedImages);
                setKey(prevKey => prevKey + 1);
                setSelectedColorId(firstColor.color);
                setSelectedromID(firstColor.rom);
                setSelectedramID(firstColor.ram);
                document.title = res.data.name + " " + firstColor.ram + " " + firstColor.rom;
                setSelectedphonebookID(firstColor.phonebook);
                setSelectedromnullID(firstColor.romnull);
                setProductdetailID(firstColor.id);
                
            }
        })
        .catch(error => console.error('Error fetching products:', error));
        axiosClient.get(`/Ratings`)
        .then(res =>setRatings(res.data));
        axiosClient.get(`/Comments`)
        .then(res =>setCommentData(res.data));
        axiosClient.get(`/Carts/user?id=${userId}`)
        .then(res =>setCarts(res.data));
        
       
    }

    const [currentImages, setCurrentImages] = useState([]);
    const [key, setKey] = useState(0); // Thêm trạng thái key để buộc render lại

    const handleThumbnailClick = (color) => {
        const selectedDetails = ProductidPD.productdetail.find(detail => detail.color === color);
        if (selectedDetails) {
            const prefix = selectedDetails.mainUrl.split('-').slice(0, -1).join('-'); // Lấy tiền tố của URL
            
            const isDifferent = (url1, url2) => {
                const parts1 = url1.split('-');
                const parts2 = url2.split('-');
                console.log(parts1, parts2);
                const tongparts =parts2.length - parts1.length;
                if(tongparts<=1){
                    if(url2.includes('-xanh-la') && !url1.includes('-xanh-la')){
                        return false;
                    }
                    return true;
                }
                else{
                    return false;
                }
            };

            const selectedImages = ProductidPD.image.filter(image =>
                image.imgUrl.startsWith(prefix) &&  selectedDetails.mainUrl !== image.imgUrl && isDifferent(selectedDetails.mainUrl,image.imgUrl)
            ).map(image => `${baseURL}/Image/${image.imgUrl}`);
    
            setCurrentImages(selectedImages);
            setKey(prevKey => prevKey + 1); // Tăng key để buộc render lại
        }
        setSelectedColorId(color);
    };

    const handleThumbnailrom = (rom,ram,phonebook,romnull,id) => {
        setSelectedromID(rom);
        setSelectedramID(ram);
        setSelectedphonebookID(phonebook);
        setSelectedromnullID(romnull);
        setProductdetailID(id)
    };

    const carouselOptions = {
        items: 1,
        margin: 1000,
        center: true,
        loop: true,
        nav: true
    };

    const renderStars = (numStars) => {
        const stars = [];
        const totalStars = 5;

        for (let i = 1; i <= totalStars; i++) {
            if (i <= numStars) {
                stars.push(<i key={i} className="fa fa-star"></i>);
            } else {
                stars.push(<i key={i} className="fa fa-star-o"></i>);
            }
        }

        return stars;
    };

    const handleXulygiaphantram = (value, giatien) => {
        const tientrikhau = giatien * (value / 100);
        const tongtien = giatien - tientrikhau;
        return tongtien;
    }

    const isPromotionValid = (dateEnd) => {
        const currentDate = new Date();
        const endDate = new Date(dateEnd);
        return currentDate <= endDate;
    };

    const specifications = [
        { title: "Màn hình", value: ProductidPD.specifications?.[0]?.screen?.screentechnology },
        { title: "Kích thước màn hình", value: ProductidPD.specifications?.[0]?.screen?.widescreen },
        { title: "Camera sau", value: ProductidPD.specifications?.[0]?.rearcamera?.resolution },
        { title: "Camera trước", value: ProductidPD.specifications?.[0]?.frontCamera?.resolution },
        { title: "Chip", value: ProductidPD.specifications?.[0]?.operatingSystemAndCPU?.processorchip },
        { title: "Hệ điều hành", value: ProductidPD.specifications?.[0]?.operatingSystemAndCPU?.operatingsystem },
        { title: "Ram", value: selectedramID },
        { title: "Bộ nhớ trong", value: selectedromID },
        { title: "Thẻ sim", value: ProductidPD.specifications?.[0]?.connect?.sim },
        { title: "Độ phân giải màn hình", value: ProductidPD.specifications?.[0]?.screen?.resolution },
        { title: "Pin, sạc", value: ProductidPD.specifications?.[0]?.batteryandCharger ? `${ProductidPD.specifications[0].batteryandCharger.batterycapacity} mAh${ProductidPD.specifications[0].batteryandCharger.maximumchargingsupport ? ', ' + ProductidPD.specifications[0].batteryandCharger.maximumchargingsupport : ''}` : null },
        { title: "Hãng", value: ProductidPD.manufacturer +'.' },
    ];

    const specificationsfull = [
        { section: "Màn hình", items: [
            { title: "Công nghệ màn hình", value: ProductidPD.specifications?.[0]?.screen?.screentechnology },
            { title: "Độ phân giải", value: ProductidPD.specifications?.[0]?.screen?.resolution },
            { title: "Màn hình rộng", value: ProductidPD.specifications?.[0]?.screen?.widescreen },
            { title: "Độ sáng tối đa", value: ProductidPD.specifications?.[0]?.screen?.maximumbrightness },
            { title: "Mặt kính cảm ứng", value: ProductidPD.specifications?.[0]?.screen?.touchglasssurface },
        ]},
        { section: "Camera sau", items: [
            { title: "Độ phân giải", value: ProductidPD.specifications?.[0]?.rearcamera?.resolution },
            { title: "Quay phim", value: ProductidPD.specifications?.[0]?.rearcamera?.film },
            { title: "Đèn Flash", value: ProductidPD.specifications?.[0]?.rearcamera?.flashlight },
            { title: "Tính năng", value: ProductidPD.specifications?.[0]?.rearcamera?.feature },
        ]},
        { section: "Camera trước", items: [
            { title: "Độ phân giải", value: ProductidPD.specifications?.[0]?.frontCamera?.resolution },
            { title: "Tính năng", value: ProductidPD.specifications?.[0]?.frontCamera?.feature },
        ]},
        { section: "Hệ điều hành & CPU", items: [
            { title: "Hệ điều hành", value: ProductidPD.specifications?.[0]?.operatingSystemAndCPU?.operatingsystem },
            { title: "Chip xử lý (CPU)", value: ProductidPD.specifications?.[0]?.operatingSystemAndCPU?.processorchip },
            { title: "Tốc độ CPU", value: ProductidPD.specifications?.[0]?.operatingSystemAndCPU?.cpUspeed },
            { title: "Chip đồ họa (GPU)", value: ProductidPD.specifications?.[0]?.operatingSystemAndCPU?.graphicschip },
        ]},
        { section: "Bộ nhớ & Lưu trữ", items: [
            { title: "RAM", value: selectedramID },
            { title: "Dung lượng lưu trữ", value: selectedromID },
            { title: "Dung lượng còn trống", value: selectedromnullID },
            { title: "Danh bạ", value: selectedphonebookID },
        ]},
        { section: "Kết nối", items: [
            { title: "Mạng di động", value: ProductidPD.specifications?.[0]?.connect?.mobilenetwork },
            { title: "SIM", value: ProductidPD.specifications?.[0]?.connect?.sim },
            { title: "Wifi", value: ProductidPD.specifications?.[0]?.connect?.wifi },
            { title: "GPS", value: ProductidPD.specifications?.[0]?.connect?.gps },
            { title: "Bluetooth", value: ProductidPD.specifications?.[0]?.connect?.bluetooth },
            { title: "Cổng kết nối/sạc", value: ProductidPD.specifications?.[0]?.connect?.connectionChargingPort },
            { title: "Jack tai nghe", value: ProductidPD.specifications?.[0]?.connect?.headPhoneJack },
            { title: "Kết nối khác", value: ProductidPD.specifications?.[0]?.connect?.otherConnections },
        ]},
        { section: "Pin & Sạc", items: [
            { title: "Dung lượng pin", value: ProductidPD.specifications?.[0]?.batteryandCharger?.batterycapacity +' mAh' },
            { title: "Loại pin", value: ProductidPD.specifications?.[0]?.batteryandCharger?.batterytype },
            { title: "Hỗ trợ sạc tối đa", value: ProductidPD.specifications?.[0]?.batteryandCharger?.maximumchargingsupport },
            { title: "Công nghệ pin", value: ProductidPD.specifications?.[0]?.batteryandCharger?.batterytechnology },
        ]},
        { section: "Tiện ích", items: [
            { title: "Bảo mật nâng cao", value: ProductidPD.specifications?.[0]?.utility?.advancedsecurity },
            { title: "Tính năng đặc biệt", value: ProductidPD.specifications?.[0]?.utility?.specialfeatures },
            { title: "Kháng nước, bụi", value: ProductidPD.specifications?.[0]?.utility?.wateranddustresistant },
            { title: "Ghi âm", value: ProductidPD.specifications?.[0]?.utility?.record },
            { title: "Xem phim", value: ProductidPD.specifications?.[0]?.utility?.watchamovie },
            { title: "Nghe nhạc", value: ProductidPD.specifications?.[0]?.utility?.listeningtomusic },
        ]},
        { section: "Thông tin chung", items: [
            { title: "Thiết kế", value: ProductidPD.specifications?.[0]?.generalInformation?.design },
            { title: "Chất liệu", value: ProductidPD.specifications?.[0]?.generalInformation?.material },
            { title: "Kích thước, khối lượng", value: ProductidPD.specifications?.[0]?.generalInformation?.sizevolume },
            { title: "Thời điểm ra mắt", value: ProductidPD.specifications?.[0]?.generalInformation?.launchtime },
            { title: "Hãng", value: ProductidPD.specifications?.[0]?.generalInformation?.thefirm },
        ]}
    ];

    const renderItem = (title, content, isOdd, isFirstItem, isLastItem) => {
        if (!content) return null;
        const style = {};
        if (isOdd) {
            if (isFirstItem) {
                style.borderRadius = '15px 15px 0px 0px';
            } else if (isLastItem) {
                style.borderRadius = '0px 0px 15px 15px';
            }
        }
        return (
            <div className={`Item_Thongsokythuat${isOdd ? '_le' : ''}`} style={style}>
                <span className="Titlet_Thongsokythuat">{title}:</span>
                <p className='context_Thongsokythuat'>{content}</p>
            </div>
        );
    };


    const renderItemfull = (title, content, isOdd) => {
        if (!content) return null;
        // Thay thế ký tự xuống dòng bằng thẻ <br>
        const formattedContent = content.replace(/\r\n/g, '<br>');
        return (
          <div className={`Item_Thongsokythuat${isOdd ? '_le' : ''}`}>
            <span className="Titlet_Thongsokythuat">{title}:</span>
            {/* Sử dụng dangerouslySetInnerHTML để hiển thị nội dung đã được thay thế */}
            <p className='context_Thongsokythuatall' dangerouslySetInnerHTML={{ __html: formattedContent }}></p>
          </div>
        );
      };
    
    const oddItems = specifications.filter((_, index) => (index + 1) % 2 !== 0);
    const firstOddItemIndex = oddItems.length > 0 ? specifications.indexOf(oddItems[0]) : -1;
    const lastOddItemIndex = oddItems.length > 0 ? specifications.indexOf(oddItems[oddItems.length - 1]) : -1;
    
    const handleCloseMessageModal = () => setShowMessageModal(false); 

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleAddToCart = () => {
        let soluong = 0;
        carts.map((item) =>{
            if(item.productDetailId === productdetailID && userId === item.userId){
            soluong = item.quantity;
            }
        });
        if (soluong === 5 || soluong > 5) {
            toast.warning('Số lượng trong giỏ hàng đã đạt tối đa');
            return; // Dừng hàm khi không thể thêm sản phẩm mới
        }
        if(!isLoggedIn)
            {
                setNotificationstr('Bạn phải đăng nhập mới thêm được sản vào giỏ hàng!')
               setShowMessageModal(true);
            }
            else{
                let productDetailId = ProductidPD.productdetail.find( item => 
                    item.color === selectedColorId && item.rom === selectedromID);
                    console.log('productdetail', productDetailId);
                let cart  = {
                    ProductDetailId: productDetailId.id,
                    UserId: userId,
                    Quantity :1
                    
                };
                console.log('cart Data', cart);
                axiosClient.post(`/Carts`,cart)
                .then(response => {
                    toast.success('Thêm thành công vào giỏ hàng');
                    fetchData();
                  })
                  .catch(error => {
                    toast.error('Thêm thành công vào giỏ hàng');
                  });
            }
    }

    const handleAddToCartMuangay = () => {
        if(!isLoggedIn)
            {
                setNotificationstr('Bạn phải đăng nhập mới thêm được sản vào giỏ hàng!')
               setShowMessageModal(true);
            }
            let soluong = 0;
            carts.map((item) =>{
                if(item.productDetailId === productdetailID){
                soluong = item.quantity;
                }
            });
            if (soluong >= 5) {
                navigate('/cart') // Dừng hàm khi không thể thêm sản phẩm mới
            }
            else{
                let productDetailId = ProductidPD.productdetail.find( item => 
                    item.color === selectedColorId && item.rom === selectedromID);
                    console.log('productdetail', productDetailId);
                let cart  = {
                    ProductDetailId: productDetailId.id,
                    UserId: userId,
                    Quantity :1
                    
                };
                console.log('cart Data', cart);
                axiosClient.post(`/Carts`,cart)
                .then(response => {
                    navigate('/Cart');
                  });
            }
    }

    const handleAddToFavourites = () => {
        if(!isLoggedIn)
            {
                setNotificationstr('Bạn phải đăng nhập mới thêm được sản phẩm vào yêu thích!');
                setShowMessageModal(true);
            }
            else{
                let favourites  = {
                    ProductDetailId: productdetailID,
                    UserId: userId,
                    Quantity :1    
                };
                console.log('favourites Data', favourites);
                axiosClient.post('/Favourites', favourites)
                .then(response => {
                  toast.success('Thêm thành công vào yêu thích');
                  fetchData();
                })
                .catch(error => {
                  toast.error('Thêm thành công vào yêu thích');
                });
            }
    }

    const handledeleteFavourites = (id) => {
        
        axiosClient.delete(`/Favourites/${id}`)
        .then(response => {
            toast.success('Xóa thành công yêu thích');
            fetchData();
        })
        .catch(error => {
            toast.error('Xóa không thành công yêu thích');
        });
    }

    const handleXemthemthongtindetail = () => {
        setIsxemthem(true);
    };

    const formatDate = (date) => {
        return moment(date).format('HH:mm  DD/MM/YYYY' );
    };
    const Sumratingstar = () => {
        let sumstar = 0;
        let count = 0;
    
        Ratings.forEach(rating => {
            if (rating.productDetailId === productdetailID) {
                sumstar += rating.score;
                count++;
            }
        });
    
        if (count === 0) return 0; // Tránh chia cho 0 nếu không có đánh giá nào
    
        const average = sumstar / count;
        return average;
    };
    const Sumratingreview = () => {
        let count = 0;
    
        Ratings.forEach(rating => {
            if (rating.productDetailId === productdetailID) {
                if (typeof rating.review === 'string' && rating.review.trim() !== '') {
                    count++;
                }
            }
        });
        return count;
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmitcommet = () => {
        if (comment === "") {
            toast.error('Ô bình luận không được để trống!');
            return;
        }
        setParentcomment(null);
        const commentData = {
            ProductDetailId: productdetailID,
            userId,
            Conent: comment,
            Commenttime: new Date(),
            ParentcommentId: Parentcomment,
            IsReplied: false,
        };
        const token = localStorage.getItem('token');
        axiosClient.post('/Comments', commentData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(() => { 
            toast.success("Bình luận thành công!"); 
            setTimeout(() => {
                window.location.reload();
            },1200)
            
        })
        .catch(() => toast.error("Bình luận thất bại!"));
    }

    const handleCommentChangerep = (e) => {
        setRepComment(e.target.value);
    };

    const handleSubmitcommetrep = () => {
        if (repcomment === "") {
            toast.error('Ô bình luận không được để trống!');
            return;
        }
        const commentrepData = {
            ProductDetailId: productdetailID,
            userId,
            Conent: repcomment,
            Commenttime: new Date(),
            ParentcommentId: Parentcomment,
            isReplied: true,
        };
        const token = localStorage.getItem('token');
        axiosClient.post('/Comments', commentrepData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(() => { 
            toast.success("Bình luận thành công!"); 
            setTimeout(() => {
                window.location.reload();
            },1200)
            
        })
        .catch(() => toast.error("Bình luận thất bại!"));
    }
    

    console.log('id',ProductidPD);
    console.log('[selectedromID;', selectedromID);
    console.log('[selectedColorId;', selectedColorId);
    console.log('[productdetailID;', productdetailID);
    console.log('[Ratings;', Ratings);
    console.log('[CommentData;', CommentData);
    return (
        <>
            <div className="box-headerphonedetail is-flex is-align-items-center box-header-desktop">
                <div className="box-product-name">
                    <h1 className='h1phonedetail'>{ProductidPD.name} {selectedramID} {selectedromID} </h1>
                </div>
                <div className="box-ratingphonedetail">
                    {renderStars(Sumratingstar())}
                    &nbsp;{Sumratingreview()} đánh giá
                </div>
            </div>
            <hr/>
            <div className="two-columnsdetai">
                <div className="left-columndetai">
                    <OwlCarousel
                        key={key} // Thêm key vào đây để buộc render lại
                        className="owl-theme Dodaicarosel latest-product__slider owl-carousel"
                        {...carouselOptions}
                    >   
                        {currentImages.map((image, index) => (
                            <div key={index} className="banner-item">
                                <div className='slider-item_carosel'>
                                    <img src={image}/>
                                </div>
                            </div>
                        ))}
                    </OwlCarousel>
                    <div className="scrolling_innerimage">
                    {ProductidPD.productdetail && 
                        ProductidPD.productdetail.reduce((uniqueColors, detail) => {
                            // Kiểm tra xem màu đã được thêm vào mảng uniqueColors chưa
                            const isColorExist = uniqueColors.some(color => color.color === detail.color);
                            if (!isColorExist) {
                                uniqueColors.push(detail); // Thêm màu duy nhất vào mảng
                            }
                            return uniqueColors;
                        }, []).map((detail) => (
                            <div key={detail.id}
                                onClick={() => handleThumbnailClick(detail.color)}
                                className={selectedColorId === detail.color ? 'activechonmau' : ''}
                            >
                                <div className="Itemimage">
                                    <img className='Anhthunhoimage' src={`${baseURL}/Image/${detail.mainUrl}`} alt={`${detail.mainUrl}`} />
                                </div>
                                <div className='setimageinner_pkhung'>
                                    <p className='setimageinner_p'>{detail.color}</p>
                                </div>
                            </div>
                        ))
                        
                    }
                    </div>

                        {ProductidPD.posts?.map((post) =>(
                            post.content !== null 
                            && 
                            <>
                            <div key={post.id} style={{
                                overflow: isXemthem ? 'visible' : 'hidden',
                                maxHeight: isXemthem ? '100%' : '100vh'
                            }} className="Post_detail">
                                <h1>{post.title}</h1>
                                <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
                                
                            </div>
                            {isXemthem === false ?
                            <div className='setXemthemthongtindetail'>
                            <button onClick={handleXemthemthongtindetail} className="Xemthemthongtindetail">Xem thêm <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="10" height="10"><path d="M224 416c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L224 338.8l169.4-169.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-192 192C240.4 412.9 232.2 416 224 416z"></path></svg></button>
                            </div>
                            : null
                            }
                            </>
                        ))}

                    {Ratings.length !== 0 && Ratings.find(a => a.productDetailId === productdetailID) &&
                    <div className='Product__Rating__detail'>
                        {Ratings.find(a => a.productDetailId === productdetailID) && <h3 style={{fontSize: '20px',marginBottom:'2%'}}><b>Đánh giá và nhận xét {ProductidPD.name} {selectedromID}:</b></h3>}
                        {Ratings.find(a => a.productDetailId === productdetailID) && 
                        <div className='Product__Rating__detail_setrcoll'>
                        {Ratings.sort((a, b) => new Date(b.ratingTime) - new Date(a.ratingTime))
                            .map((rating) => (
                            rating.productDetailId === productdetailID &&
                            <div className='Rating__product' key={rating.id}>
                                        <div className="user-profile">
                                            <h3> <i className="fa fa-user"></i> {rating.user.lastName} {rating.user.firstName}</h3> <span> <svg height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z"></path></svg> {formatDate(rating.ratingTime)}</span>
                                        </div>
                                        <span className='StarRating'> {renderStars(rating.score)}</span>
                                        <div>
                                            <span>Nhận xét: {rating.review}</span>
                                        </div>
                        </div>
                    ))}  
                    </div>
                    }

                </div>
                }
                <div className='Product_comment_detail'>
                    
                    <h3 style={{fontSize: '20px',marginBottom:'2%'}}><b>Bình luận:</b></h3>
                    <div className='Comment_header'>
                    <textarea 
                    style={{ 
                        display: 'block', 
                        fontSize: '16px', 
                        minHeight: '40px',
                        height: '105px', 
                        width: '100%', 
                        resize: 'vertical', 
                        borderRadius: '10px',
                        maxHeight: '260px',
                    }} 
                    value={comment} 
                    onChange={handleCommentChange}
                    ></textarea>
                    <button className="site-btn_detailproduct" onClick={ e => {e.preventDefault();handleSubmitcommet()}}>Gửi</button>
                    </div>
                    {CommentData.find(a => a.productDetailId === productdetailID) && 
                        <div className='Product__Rating__detail_setrcoll'>
                        {CommentData.sort((a, b) => {
                            if (a.parentcommentId === null && b.parentcommentId === null) {
                                return new Date(b.commenttime) - new Date(a.commenttime); // Mới đến cũ
                            } else if (a.parentcommentId !== null && b.parentcommentId !== null) {
                                return new Date(a.commenttime) - new Date(b.commenttime); // Cũ đến mới
                            }
                            return 0;
                            }).map((comments) => (
                            comments.productDetailId === productdetailID && comments.parentcommentId === null   &&
                            <>
                            <div className='comment__product' key={comments.id}>
                                        <div className="user-profile">
                                            <h3> <i className="fa fa-user"></i> {comments.user.lastName} {comments.user.firstName}</h3> <span> <svg height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z"></path></svg> {formatDate(comments.commenttime)}</span>
                                        </div>
                                        <div>
                                            <span>Nội dung:  {comments.conent}</span>
                                        </div>
                                        <button style={{marginLeft:'90%'}} onClick={e=>{e.preventDefault(); setParentcomment(comments.id);setParentcommentrep(comments.id)}}>Trả lời</button>
                                        {Parentcomment === comments.id && Parentcomment === Parentcommentrep &&
                                        <div className='Comment_header'>
                                        <textarea 
                                        style={{ 
                                            display: 'block', 
                                            fontSize: '16px', 
                                            height: '105px', 
                                            width: '100%', 
                                            resize: 'vertical', 
                                            borderRadius: '10px',
                                            maxHeight: '260px',
                                        }} 
                                        value={repcomment} 
                                        onChange={handleCommentChangerep}
                                        ></textarea>
                                        <button className="site-btn_detailproduct" onClick={ e => {e.preventDefault();handleSubmitcommetrep()}}>Gửi</button>
                                        </div>
                                        }
                            </div>
                            {CommentData.map((commentrep) => {
                                return commentrep.productDetailId === productdetailID && commentrep.parentcommentId === comments.id && commentrep.isReplied === true && (
                                    <div style={{marginLeft:'10%',width:'73%'}} className='comment__product' key={commentrep.id}>
                                        <div className="user-profile">
                                            <h3> <i className="fa fa-user"></i> {commentrep.user.lastName} {commentrep.user.firstName}</h3> <span> <svg height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z"></path></svg> {formatDate(commentrep.commenttime)}</span>
                                        </div>
                                        <div>
                                            <span>Nội dung:  {commentrep.conent}</span>
                                        </div>
                                        <button style={{marginLeft:'90%'}} onClick={e=>{e.preventDefault(); setParentcomment(comments.id);setParentcommentrep(commentrep.id)}}>Trả lời</button>
                                        {Parentcomment === comments.id && Parentcomment !== Parentcommentrep && Parentcommentrep === commentrep.id  &&
                                        <div className='Comment_header'>
                                        <textarea 
                                        style={{ 
                                            display: 'block', 
                                            fontSize: '16px', 
                                            minHeight: '40px',
                                            height: '105px', 
                                            width: '100%', 
                                            resize: 'vertical', 
                                            borderRadius: '10px',
                                            maxHeight: '260px',
                                        }} 
                                        value={repcomment} 
                                        onChange={handleCommentChangerep}
                                        ></textarea>
                                        <button className="site-btn_detailproduct" onClick={ e => {e.preventDefault();handleSubmitcommetrep()}}>Gửi</button>
                                        </div>
                                        }
                                    </div>
                                )
                            })}
                            
                            </>
                        ))}  
                    </div>
                    }
                </div>
                    
                </div>
                <div className="right-columndetai">
                    <h3>Chọn bộ nhớ:</h3>
                    <div className="chon_innerimage">
                    {ProductidPD.productdetail && 
                        ProductidPD.productdetail.reduce((uniqueRom, detail) => {
                            // Kiểm tra xem rom đã được thêm vào mảng uniqueRom chưa
                            const isRomExist = uniqueRom.some(rom => rom.rom === detail.rom && rom.ram === detail.ram);
                            if (!isRomExist) {
                                uniqueRom.push(detail); // Thêm rom duy nhất vào mảng
                            }
                            return uniqueRom;
                        }, []).map((detail) => (
                            <div key={detail.id}
                                onClick={() => handleThumbnailrom(detail.rom,detail.ram,detail.phonebook,detail.romnull,detail.id)}
                                className={selectedromID === detail.rom && selectedramID === detail.ram ? 'activechonrom' : ''}
                            >
                                <div className="Itemrom_chon">
                                    <h4>{detail.rom}</h4>
                                    <p style={{color: 'black', fontWeight: '400'}} className='setrominner_p'>{detail.romprice.toLocaleString()} đ</p>
                                </div>
                                
                            </div> 
                        ))
                    }
                    </div>
                    <h3 className="scrolling_innercolorram">Chọn màu:</h3>
                    {selectedromID !== null && selectedramID !== null && 
                        <div className="scrolling_innercolor">
                        {ProductidPD.productdetail && 
                            ProductidPD.productdetail.map((detail) => (
                                selectedromID === detail.rom && selectedramID === detail.ram &&
                                <div key={detail.id}
                                    onClick={() => handleThumbnailClick(detail.color)}
                                    className={selectedColorId === detail.color ? 'activechonmau' : ''}
                                >
                                    <div className="Itemrom_choncolor">
                                        <img className='color_image_item' src={`${baseURL}/Image/${detail.mainUrl}`} alt={`${detail.color}`} />
                                        <div className="Textmau_item">
                                        <h5>{detail.color}</h5>
                                        <p style={{color: 'black', fontWeight: '400'}} className='setrominner_p'>{detail.ramprice.toLocaleString()} đ</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }

                    {selectedromID !== null && selectedramID !== null && selectedColorId &&
                        <div className="scrolling_innercolorgia">
                        {ProductidPD.productdetail && 
                            ProductidPD.productdetail.map((detail) => (
                                selectedromID === detail.rom && selectedramID === detail.ram && selectedColorId === detail.color &&
                                <div key={detail.id}
                                >
                                    <div className="Itemgia_choncolor">
                                        
                                        <h2>Giá tiền: </h2>
                                        <h2 style={{color: 'red',marginLeft:'20px'}} className='setrominner_p'>
                                        {ProductidPD.promotion[0].promotiontype === "giamgiaphantram" && isPromotionValid(ProductidPD.promotion[0].dateEnd) ? (
                                            <>
                                            <s style={{color:'#8f8f8f'}}>{detail.ramprice.toLocaleString()}đ </s>(-{ProductidPD.promotion[0].value}%)
                                            {' '}{handleXulygiaphantram(ProductidPD.promotion[0].value, detail.ramprice).toLocaleString()}đ

                                            </>
                                        ) : (
                                            `${detail.ramprice.toLocaleString()} đ`
                                        )}
                                        </h2>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    <div className="Voucher_inner">
                        <div className="Titile_khuyenmain">
                            <h3 style={{marginLeft:'20px'}}><i style={{fontSize: '30px'}} className="fa fa-gift"></i> Voucher khuyến mãi</h3>
                        </div>
                    {ProductidPD.promotion && 
                        ProductidPD.promotion.find(promotions => promotions.promotiontype === 'giamgiatien' && isPromotionValid(promotions.dateEnd)) ?
                        ProductidPD.promotion.map((promotions) => (
                            promotions.promotiontype !== 'giamgiaphantram'  && isPromotionValid(promotions.dateEnd) &&
                            <div key={promotions.id} className="Container_khuyenmain">
                                <span>{promotions.description}</span>
                            </div>
                        ))
                        :
                        <div className="Container_khuyenmain">
                                <span>Không có khuyến mãi cho sản phẩm này!</span>
                        </div>
                    }
                    </div>
                    
                    <div className="pay_detailphone">
                        <a href="#" onClick={(e) => { e.preventDefault(); handleAddToCartMuangay(); }} >
                        <div className='Mua_ngayphone'>
                            <span>Mua ngay</span>
                        </div>
                        </a>
                        <a href="#" onClick={(e) => { e.preventDefault(); handleAddToCart(); }}>
                        <div className="cart_detail">
                            <i className="fa fa-shopping-cart"></i>
                        </div>
                        </a>
                        {ProductidPD.productdetail && ProductidPD.productdetail.map((detail) => (
                        detail.id === productdetailID && detail.favourite[0] && detail.favourite[0].userId === userId ? (
                            <a href="#" key={productdetailID} onClick={(e) => { e.preventDefault(); handledeleteFavourites(detail.favourite[0].id); }}>
                                <div className="heart_detail">
                                    <i style={{color:'red'}} className="fa fa-heart"></i>
                                </div>
                            </a>
                        ) : (
                            detail.id === productdetailID ? (
                                <a href="#" key={productdetailID} onClick={(e) => { e.preventDefault(); handleAddToFavourites(); }}>
                                <div className="heart_detail">
                                    <i className="fa fa-heart"></i>
                                </div>
                            </a>) : ( null)
                        )
                    ))}
                        
                    </div>

                    <h3>Thông số kỹ thuật {ProductidPD.name} {selectedromID}</h3>

                    <div className="Thongsokythuat">
                        {specifications.map((spec, index) => (
                            <React.Fragment key={index}>
                                {renderItem(
                                    spec.title, 
                                    spec.value, 
                                    (index + 1) % 2 !== 0, 
                                    index === firstOddItemIndex, 
                                    index === lastOddItemIndex
                                )}
                            </React.Fragment>
                        ))}
                        
                    </div>
                    <div className="SetXemchitietthongso">
                    <button onClick={showModal} className="Xemchitietthongso">Xem thêm thông số kỹ thuật chi tiết</button>
                    </div>
                </div>
            </div>
            



            <Modal 
                open={isModalVisible} 
                footer={null} 
                onCancel={handleCancel}
                style={{ top: '0px',bottom:'0px', }}
            >
                <div style={{ color: 'red',fontSize:'20px',textAlign:'center' }}>Thông số kỹ thuật chi tiết</div>
                <div style={{border: 'none', maxHeight: '78vh', overflowY: 'auto'}} className="ThongsokythuatAll">
                        {specificationsfull.map((section, sectionIndex) => (
                            <div key={sectionIndex}>
                                <hr style={{ marginTop: '10px' }}/>
                                <h3>{section.section}</h3>
                                {section.items.map((spec, index) => (
                                    <div key={index}>{renderItemfull(
                                        spec.title, 
                                        spec.value, 
                                        (index + 1) % 2 !== 0 // Điều kiện để xác định các mục lẻ
                                    )}</div>
                                ))}
                            </div>
                        ))}
                    </div>
                <div className='SetXemchitietthongsoall'>
                    <Button className='Xemchitietthongsoall' onClick={handleCancel}>X Đóng</Button>
                </div>
            </Modal>

            <MessageModal
            visible = {ShowMessageModal}
            handleCancel = {handleCloseMessageModal}
            notificationstr = {Notificationstr}
            />
            <ToastContainer
            position="top-center"
            pauseOnHover={false}
            autoClose={1500}
            theme={'dark'}
            />
        </>

    );
}

export default Phonedetail;
