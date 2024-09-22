import React, { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth  } from "../../../Components/Other/auth";
import axiosClient, {baseURL} from '../../../Components/Other/axiosClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Favourites.css';

const Favourites = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoggedIn, userId } = useAuth();
    const [Favourites, setFavourites] = useState([]);
    const [carts, setCarts] =useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 15;
    const titleRef = useRef(null);

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = () => {        
        axiosClient
            .get(`/Favourites/user?id=${userId}`)
            .then(res => {
                setFavourites(res.data);
            })
            .catch(error => console.error('Error fetching products:', error));
        axiosClient.get(`/Carts/user?id=${userId}`)
        .then(res =>setCarts(res.data));
    };

    const convertToSlug = (text) => {
        return text.toLowerCase().replace(/\s+/g, '-');
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

    const Getgiamgiaphantram = (promotions) => {
        return (
            promotions.map((item) => (
                item.description.includes("%") && isPromotionValid(item.dateEnd) &&
                <label className="giamgia" key={item.id}>
                    <i className="fa fa-bolt"></i>  {item.description}
                </label>
            ))
        );
    }
    const isPromotionValid = (dateEnd) => {
        const currentDate = new Date();
        const endDate = new Date(dateEnd);
        return currentDate <= endDate;
    };
    const Getgiamgiatien = (promotions, detai) => {
        const promotion = promotions.find((item) => (
            item.prmotiontype === "giamgiaphantram" && isPromotionValid(item.dateEnd)
        ));
    
        if (promotion) {
            const discountedPrice = handleXulygiaphantram(promotion.value, detai.unitPrice);
            return (
                <strong>
                    <s style={{ color: '#8f8f8f', fontSize: "12px" }}>
                        {detai.unitPrice.toLocaleString('vi-VN')}đ (-{promotion.value}%)
                    </s>
                    {' '}{discountedPrice.toLocaleString('vi-VN')}đ
                </strong>
            );
        }
    
        return <strong>{detai.unitPrice.toLocaleString('vi-VN')} ₫</strong>;
    };

    const handleXulygiaphantram = (value, giatien) => {
        const tientrikhau = giatien * (value / 100);
        const tongtien = giatien - tientrikhau;
        return tongtien;
    }

    const handleAddToCart = (id) => {
        let soluong = 0;
        carts.map((item) =>{
            if(item.productDetailId === id && userId === item.userId){
            soluong = item.quantity;
            }
        });
        if (!isLoggedIn) {
            navigate('/Login');
        }else if (soluong === 5 || soluong > 5) {
            toast.warning('Số lượng trong giỏ hàng đã đạt tối đa'); // Dừng hàm khi không thể thêm sản phẩm mới
            return;
        }
         else {
            let cart = {
                ProductDetailId: id,
                UserId: userId,
                Quantity: 1
            };
            console.log('cart Data', cart);
            axiosClient.post(`/Carts`, cart)
            .then(response => {
                toast.success('Thêm thành công vào giỏ hàng');
                fetchData();
              })
              .catch(error => {
                toast.error('Thêm vào giỏ hàng không thành công!');
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

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        if (titleRef.current) {
            titleRef.current.scrollIntoView({
                behavior: 'auto',
            });
            window.scrollTo({
                    top: window.pageYOffset - 100,
                    behavior: 'auto'
                });
        }
    }

    const renderPaginationSearchfilter = () => {
        const filteredFavourites = Favourites.filter(favour => favour.userId === userId);
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(filteredFavourites.length / productsPerPage); i++) {
            pageNumbers.push(i);
        }
    
        return (
            <div className="pagination">
                <button
                    className="Btn_SP_CUS"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <i style={{fontSize: "20px"}} className="fa fa-angle-left"></i>
                </button>
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={number === currentPage ? 'Btn_SP_CUS current' : 'Btn_SP_CUS'}
                    >
                        <b>{number}</b> 
                    </button>
                ))}
                <button
                    className="Btn_SP_CUS"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pageNumbers.length}
                >
                    <i style={{fontSize: "20px"}} className="fa fa-angle-right"></i>
                </button>
            </div>
        );
    };

    const renderProductList = (Favourites) => {
        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        const sortedFavourites = [...Favourites].sort((a, b) => b.id - a.id);
        const currentProducts = sortedFavourites.slice(indexOfFirstProduct, indexOfLastProduct);
        
        // Lọc các sản phẩm yêu thích theo userId
        const filteredProducts = currentProducts.filter(favour => favour.userId === userId);
    
        return (
            filteredProducts.length > 0 ? (
                filteredProducts.map((favour, index) => (
                    <li className="sanPham" key={index}>
                        <a href={`/Phonedetail/${convertToSlug(favour.productName)}`}>
                            <img src={`${baseURL}/Image/${favour.image}`} alt={favour.image} />
                            <h3>{favour.productName} {favour.ram} / {favour.rom}</h3>
                            <div className="price">
                                {Getgiamgiatien(favour.promotions,favour)}
                            </div>
                            <div className="ratingresult">
                                {renderStars(favour.rating)}
                                <span>{favour.reviews} đánh giá</span>
                            </div>
                            {Getgiamgiaphantram(favour.promotions)}
                        </a>
                        <div className="tooltip">
                            <button className="themvaogio" onClick={() => handleAddToCart(favour.productDetailId)}>
                                <i style={{ fontSize: "20px" }} className="fa fa-cart-plus"></i>
                                <span className="tooltiptext" style={{ fontSize: "10px" }}>Thêm vào giỏ</span>
                            </button>
                        </div>
                        <div className="tooltipyeuthich" onClick={() => handledeleteFavourites(favour.id)}>
                            <button className="themvaogio">
                                <i style={{ fontSize: "20px", color: "red" }} className="fa fa-heart"></i>
                                <span className="tooltiptext" style={{ fontSize: "10px" }}>Xóa khỏi yêu thích</span>
                            </button>
                        </div>
                    </li>
                ))
            ) : (
                <div style={{marginBottom:'20px'}} className='Null_favour'>
                    <span>Chưa có sản phẩm yêu thích</span>
                </div>
            )
        );
    };
    console.log('data:', Favourites);
    return ( 
    <>
        <div className="body_Favourites">
            <div className="title_Favourites" ref={titleRef}>
                <h2>ĐIỆN THOẠI YÊU THÍCH CỦA BẠN</h2>
            </div>
            <div className="Listproductfavour">
                {Favourites && Favourites.length > 0 ? (
                    renderProductList(Favourites)
                ) : (
                    <div style={{marginBottom:'20px'}} className='Null_favour'>
                        <span>Chưa có sản phẩm yêu thích</span>
                    </div>
                )}
            </div>
            {Favourites && Favourites.filter(favour => favour.userId === userId).length > 0 && renderPaginationSearchfilter()}
        </div>
        <ToastContainer
            position="top-center"
            pauseOnHover={false}
            autoClose={1500}
            theme={'dark'}
        />
    </>
    );
}

export default Favourites;
