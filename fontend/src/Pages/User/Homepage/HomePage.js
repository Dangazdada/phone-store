import React, { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./HomePage.css";
import axiosClient, {baseURL} from '../../../Components/Other/axiosClient';
import { useAuth  } from "../../../Components/Other/auth";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const HomePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoggedIn, userId} = useAuth();

    const [Product, setProduct] = useState([]);
    const [Favourites, setFavourites] = useState([]);
    const [SearchProduct, setSearchProduct] = useState([]);
    const [SearchfliterProductadd, setSearchfliterProductadd] = useState([]);
    const [ProductDetail, setProductDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    const [Ratings, setRatings] =  useState([]);
    const [carts, setCarts] =useState([]);

    const currentPath = window.location.pathname;

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 15;
    // const currentPath = window.location.pathname;

    if (localStorage.getItem('duongdanao') !== null){
    location.pathname = localStorage.getItem('duongdanao');
    localStorage.removeItem('duongdanao');
    }

    if(loading === false){
    if (localStorage.getItem('duongdanaodetail') !== null){
        location.pathname = localStorage.getItem('duongdanaodetail');
        localStorage.removeItem('duongdanaodetail');
        setLoading(true);
    }
    }

    const getLastPathSegment = (pathname) => {
        const segments = pathname.split('name=');
        return segments[segments.length - 1];
    }
    
    const lastSegment = getLastPathSegment(location.pathname);
    const handleAddToCart = (id) => {
        let soluong = 0;
        carts.map((item) =>{
            if(item.productDetailId === id && userId === item.userId){
            soluong = item.quantity;
            }
        });
        if(!isLoggedIn)
            {
                toast.error('Đăng nhập để thêm vào giỏ hàng!');
                setTimeout(() => {
                    navigate('/Login');
                }, 1500)
            }else if (soluong === 5 || soluong > 5) {
                toast.warning('Số lượng trong giỏ hàng đã đạt tối đa'); // Dừng hàm khi không thể thêm sản phẩm mới
                return;
            }
            else{
               
                let cart  = {
                    ProductDetailId: id,
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
                    toast.error('Thêm vào giỏ hàng không thành công!');
                  });
            }
    }
    const handleAddToFavourites = (id) => {
        if(!isLoggedIn)
            {
                toast.error('Đăng nhập để thêm vào yêu thích!');
                setTimeout(() => {
                    navigate('/Login');
                }, 1500)
            }
            else{
                let favourites  = {
                    ProductDetailId: id,
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

    const productAllRef = useRef(null); // Tham chiếu đến phần tử "TẤT CẢ ĐIỆN THOẠI"
    const searchProductRef = useRef(null);
    const searchfilterProductRef = useRef(null);
    useEffect(() => {
        if (location.pathname.includes('/ProductDetails/') && lastSegment !== ''){
            axiosClient
            .get(`/ProductDetails/SearchByName?name=${lastSegment}`)
            .then(res => {
                setSearchProduct(res.data);
            })
            .catch(error => console.error('Error fetching product details:', error));
        }
        if (location.pathname.includes('/Products/searchsFilter?') && lastSegment !== ''){
            axiosClient
            .get(`${location.pathname}`)
            .then(res => {
                setSearchfliterProductadd(res.data);
            })
            .catch(error => console.error('Error fetching product details:', error));
        }
        // Khi location.pathname là "/tat-ca-dien-thoai", cuộn đến phần tử "TẤT CẢ ĐIỆN THOẠI" và cuộn lên thêm 100px
        if (location.pathname === "/tat-ca-dien-thoai" && productAllRef.current) {
            productAllRef.current.scrollIntoView({
                behavior: 'auto',
            });
            window.scrollTo({
                    top: window.pageYOffset - 100,
                    behavior: 'auto'
                }); // Timeout nhỏ để đảm bảo DOM đã cập nhật hoàn tất trước khi cuộn lên
        }else if (location.pathname.includes('/ProductDetails/') && lastSegment !== '' && searchProductRef.current) {
            searchProductRef.current.scrollIntoView({
                behavior: 'auto',
            });
            window.scrollTo({
                    top: window.pageYOffset - 100,
                    behavior: 'auto'
                }); // Timeout nhỏ để đảm bảo DOM đã cập nhật hoàn tất trước khi cuộn lên
        }else if (location.pathname.includes('/Products/searchsFilter?') && lastSegment !== '' && searchfilterProductRef.current) {
            searchfilterProductRef.current.scrollIntoView({
                behavior: 'auto',
            });
            window.scrollTo({
                    top: window.pageYOffset - 100,
                    behavior: 'auto'
                }); // Timeout nhỏ để đảm bảo DOM đã cập nhật hoàn tất trước khi cuộn lên
        }
        else {
            // Nếu không phải "/tat-ca-dien-thoai", cuộn lên đầu trang
            window.scrollTo({
                top: 0,
                behavior: 'auto'
            });
        }
       
    }, [location.pathname]);
    




    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = () => {
         // Fetch products
        axiosClient
            .get('/Products/CusProductsview')
            .then(res => {
                setProduct(res.data);
            })
            .catch(error => console.error('Error fetching products:', error));
        //rating
        axiosClient.get(`/Ratings`)
        .then(res =>setRatings(res.data));
        // Favourites
        axiosClient
            .get('/Favourites')
            .then(res => {
                setFavourites(res.data);
            })
            .catch(error => console.error('Error fetching products:', error));
        //cart
        axiosClient.get(`/Carts/user?id=${userId}`)
        .then(res =>setCarts(res.data));
        
        //   Fetch product details
         axiosClient
             .get('/ProductDetails/CusProductDetailsview')
             .then(res => {
                 setProductDetail(res.data);
                 setLoading(false);
             })
             .catch(error => console.error('Error fetching product details:', error));
        //      //count views
        //     //  axiosClient
        //     //  .post(`/PageViews?url=${currentPath}`)
        //     //  .then(res => {
        //     //      console.log('đếm thành công',res.data);
        //     //  })
            //  .catch(error => console.error('Error count views:', error));

             //count views
            axiosClient
            .post(`/PageViews?url=${currentPath}`)
            .then(res => {
                console.log('đếm thành công',res.data);
            })
            .catch(error => console.error('Error count views:', error));

        

     };

    console.log('producthome', Product);
    console.log('productdetaihome', ProductDetail);
    console.log('producsearthome', SearchProduct);
    console.log('producsearthomefilter', SearchfliterProductadd);
    console.log('producFavourites', Favourites);
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

    const Sumratingstar = (id) => {
        let sumstar = 0;
        let count = 0;
    
        Ratings.forEach(rating => {
            if (rating.productDetailId === id) {
                sumstar += rating.score;
                count++;
            }
        });
    
        if (count === 0) return 0; // Tránh chia cho 0 nếu không có đánh giá nào
    
        const average = sumstar / count;
        return average;
    };
    const Sumratingreview = (id) => {
        let count = 0;
    
        Ratings.forEach(rating => {
            if (rating.productDetailId === id) {
                if (typeof rating.review === 'string' && rating.review.trim() !== '') {
                    count++;
                }
            }
        });
        return count;
    };
    
    const isPromotionValid = (dateEnd) => {
        const currentDate = new Date();
        const endDate = new Date(dateEnd);
        return currentDate <= endDate;
    };
    const handleXulygiaphantram = (value, giatien) => {
        const tientrikhau = giatien * (value / 100);
        const tongtien = giatien - tientrikhau;
        return tongtien;
    }

    const countMARANDROM = (products, productDetails) => {
        // Kiểm tra đầu vào
        if (!Array.isArray(products) || !Array.isArray(productDetails)) {
            return null;
        }
    
        // Lọc và sắp xếp sản phẩm theo launchtime gần nhất
        const sortedProducts = products.filter(product => 
            productDetails.some(detail => 
                detail.productId === product.id && Getlaunchtime(product.specifications).length > 0
            )
        ).sort((a, b) => {
            const aLaunchtime = new Date(Getlaunchtime(a.specifications)[0]);
            const bLaunchtime = new Date(Getlaunchtime(b.specifications)[0]);
            return bLaunchtime - aLaunchtime;
        }) // Chỉ lấy 8 sản phẩm

        const getProductsByBrand = (brand, limit) => {
            return sortedProducts.filter(product => product.manufacturer === brand).slice(0, limit);
        };
        // xử lý thêm vào giỏ hàng
       
        
    
        // Get products by brand with specified limits
        const iphoneProducts = getProductsByBrand('Apple', 4);
        const samsungProducts = getProductsByBrand('Samsung', 4);
        const xiaomiProducts = getProductsByBrand('Xiaomi', 2);
    
        // Combine all products
        const finalProducts = [...iphoneProducts, ...samsungProducts, ...xiaomiProducts];
        // console.log("all",finalProducts);
        return (
            <>
                {finalProducts.map(product => {
                    const productDetail = productDetails.find(detail => detail.productId === product.id);
                    console.log('data', productDetail);
                    if (productDetail) {
                        return (
                            <li className="sanPham" key={product.id}>
                                <a href={`/Phonedetail/${convertToSlug(product.name)}`}>
                                    <img src={`${baseURL}/Image/${product.imageurl}`} alt={product.name} />
                                    <h3>{product.name} {productDetail.memoryCapacity}</h3>
                                    <div className="price">
                                        {Getgiamgiatien(productDetail.promotions,productDetail)}
                                        
                                    </div>
                                    <div className="ratingresult">
                                        {renderStars(Sumratingstar(productDetail.productDetailId))}
                                        &nbsp;{Sumratingreview(productDetail.productDetailId)} đánh giá
                                    </div>
                                    {Getgiamgiaphantram(productDetail.promotions)}
                                    
                                </a>
                                <div className="tooltip">
                                        <button className="themvaogio" onClick={() => handleAddToCart(productDetail.productDetailId)}>
                                            <i style={{ fontSize: "20px" }} className="fa fa-cart-plus"></i>
                                            <span className="tooltiptext" style={{ fontSize: "10px" }}>Thêm vào giỏ</span>
                                        </button>
                                    </div>
                                    {Favourites.some(favour => productDetail.productDetailId == favour.productDetailId && userId == favour.userId) ? (
                                        <div className="tooltipyeuthich" onClick={() => handledeleteFavourites(Favourites.find(favour => productDetail.productDetailId == favour.productDetailId && userId == favour.userId).id)}>
                                            <button className="themvaogio" >
                                                <i style={{ fontSize: "20px", color: "red" }} className="fa fa-heart"></i>
                                                <span className="tooltiptext" style={{ fontSize: "10px" }}>Xóa khỏi yêu thích</span>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="tooltipyeuthich" onClick={() => handleAddToFavourites(productDetail.productDetailId)}>
                                            <button className="themvaogio" >
                                                <i style={{ fontSize: "20px"}} className="fa fa-heart"></i>
                                                <span className="tooltiptext" style={{ fontSize: "10px" }}>Thêm vào yêu thích</span>
                                            </button>
                                        </div>
                                    )}
                                    
                            </li>
                        );
                    }
                    return null;
                })}
            </>
        );
    }
    
    const countPromotions = (products, productDetails) => {
        // Kiểm tra đầu vào
        if (!Array.isArray(products) || !Array.isArray(productDetails)) {
            return null;
        }
    
        // Danh sách các hãng mục tiêu
        const targetBrands = ['Apple', 'Samsung', 'Oppo', 'Xiaomi', 'Vivo'];
    
        // Tính toán phần trăm giảm giá một cách an toàn
        const calculateDiscountPercentage = (promotions) => {
            if (!Array.isArray(promotions)) return 0;
    
            const discountPromotions = promotions.filter(item => item.description && item.description.includes("%"));
            if (discountPromotions.length === 0) {
                return 0;
            }
            const maxDiscount = Math.max(...discountPromotions.map(item => {
                const match = item.description.match(/(\d+)%/);
                return match ? parseInt(match[1]) : 0;
            }));
            return isNaN(maxDiscount) ? 0 : maxDiscount;
        }
    
        // Lọc và ánh xạ sản phẩm với chi tiết của chúng và tính phần trăm giảm giá
        const productsWithDetails = products.map(product => {
            const productDetail = productDetails.find(detail => detail.productId === product.id);
            if (productDetail && targetBrands.includes(product.manufacturer)) {
                const discount = calculateDiscountPercentage(productDetail.promotions);
                return { product, productDetail, discount };
            }
            return null;
        }).filter(item => item !== null);
    
        // Sắp xếp sản phẩm theo phần trăm giảm giá giảm dần
        productsWithDetails.sort((a, b) => b.discount - a.discount);
    
        // Lấy các sản phẩm có mức giảm giá cao nhất cho đến khi đủ 5 sản phẩm
        const top5Products = [];
        let currentDiscount = null;
    
        for (let i = 0; i < productsWithDetails.length; i++) {
            const product = productsWithDetails[i];
    
            // Nếu danh sách hiện tại nhỏ hơn 5 sản phẩm, thêm sản phẩm vào danh sách
            if (top5Products.length < 5) {
                top5Products.push(product);
                currentDiscount = product.discount;
            } else if (product.discount === currentDiscount) {
                // Nếu sản phẩm hiện tại có giảm giá bằng với giảm giá hiện tại và đã có 5 sản phẩm, thêm sản phẩm vào danh sách
                top5Products.push(product);
            } else {
                // Nếu có hơn 5 sản phẩm trong danh sách và sản phẩm hiện tại có giảm giá khác với giảm giá hiện tại, ngừng thêm sản phẩm
                break;
            }
        }
    
        // Chỉ giữ lại 5 sản phẩm đầu tiên
        const finalTop5Products = top5Products.slice(0, 5);
    
        return (
            <>
                {finalTop5Products.map(({ product, productDetail }) => (
               
                    <li className="sanPham" key={product.id}>
                            <a href={`/Phonedetail/${convertToSlug(product.name)}`}>
                            <img src={`${baseURL}/Image/${product.imageurl}`} alt={product.name} />
                            <h3>{product.name} {productDetail.memoryCapacity}</h3>
                            <div className="price">
                                {Getgiamgiatien(productDetail.promotions,productDetail)}
                            </div>
                            <div className="ratingresult">
                            {renderStars(Sumratingstar(productDetail.productDetailId))}
                            &nbsp;{Sumratingreview(productDetail.productDetailId)} đánh giá
                            </div>
                            {Getgiamgiaphantram(productDetail.promotions)}
                           
                        </a>
                                <div className="tooltip">
                                <button className="themvaogio" onClick={() => handleAddToCart(productDetail.productDetailId)} >
                                    <i style={{ fontSize: "20px" }} className="fa fa-cart-plus"></i>
                                    <span className="tooltiptext" style={{ fontSize: "10px" }}>Thêm vào giỏ</span>
                                </button>
                            </div>
                            {Favourites.some(favour => productDetail.productDetailId == favour.productDetailId && userId == favour.userId) ? (
                                <div className="tooltipyeuthich" onClick={() => handledeleteFavourites(Favourites.find(favour => productDetail.productDetailId == favour.productDetailId && userId == favour.userId).id)}>
                                    <button className="themvaogio" >
                                        <i style={{ fontSize: "20px", color: "red" }} className="fa fa-heart"></i>
                                        <span className="tooltiptext" style={{ fontSize: "10px" }}>Xóa khỏi yêu thích</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="tooltipyeuthich" onClick={() => handleAddToFavourites(productDetail.productDetailId)}>
                                    <button className="themvaogio" >
                                        <i style={{ fontSize: "20px"}} className="fa fa-heart"></i>
                                        <span className="tooltiptext" style={{ fontSize: "10px" }}>Thêm vào yêu thích</span>
                                    </button>
                                </div>
                            )}
                    </li>
                ))}
            </>
        );
    }

    const countProductAll = (products, productDetails) => {
        if (!Array.isArray(products) || !Array.isArray(productDetails)) {
            return null;
        }

        const sortedProducts = products.filter(product =>
            productDetails.some(detail =>
                detail.productId === product.id && Getlaunchtime(product.specifications).length > 0
            )
        ).sort((a, b) => {
            const aLaunchtime = new Date(Getlaunchtime(a.specifications)[0]);
            const bLaunchtime = new Date(Getlaunchtime(b.specifications)[0]);
            return bLaunchtime - aLaunchtime;
        });

        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

        return (
            <>
                {currentProducts.map(product => {
                    const productDetail = productDetails.find(detail => detail.productId === product.id);
                    if (productDetail) {
                        return (
                            <li className="sanPham" key={product.id}>
                                <a href={`/Phonedetail/${convertToSlug(product.name)}`}>
                                    <img src={`${baseURL}/Image/${product.imageurl}`} alt={product.name} />
                                    <h3>{product.name} {productDetail.memoryCapacity}</h3>
                                    <div className="price">
                                        {Getgiamgiatien(productDetail.promotions,productDetail)}
                                    </div>
                                    <div className="ratingresult">
                                        {renderStars(Sumratingstar(productDetail.productDetailId))}
                                        &nbsp;{Sumratingreview(productDetail.productDetailId)} đánh giá
                                    </div>
                                    {Getgiamgiaphantram(productDetail.promotions)}
                                   
                                </a>
                                <div className="tooltip">
                                <button className="themvaogio" onClick={() => handleAddToCart(productDetail.productDetailId)}>
                                    <i style={{ fontSize: "20px" }} className="fa fa-cart-plus"></i>
                                    <span className="tooltiptext" style={{ fontSize: "10px" }}>Thêm vào giỏ</span>
                                </button>
                                </div>
                                {Favourites.some(favour => productDetail.productDetailId == favour.productDetailId && userId == favour.userId) ? (
                                    <div className="tooltipyeuthich" onClick={() => handledeleteFavourites(Favourites.find(favour => productDetail.productDetailId == favour.productDetailId && userId == favour.userId).id)}>
                                        <button className="themvaogio" >
                                            <i style={{ fontSize: "20px", color: "red" }} className="fa fa-heart"></i>
                                            <span className="tooltiptext" style={{ fontSize: "10px" }}>Xóa khỏi yêu thích</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="tooltipyeuthich" onClick={() => handleAddToFavourites(productDetail.productDetailId)}>
                                        <button className="themvaogio" >
                                            <i style={{ fontSize: "20px"}} className="fa fa-heart"></i>
                                            <span className="tooltiptext" style={{ fontSize: "10px" }}>Thêm vào yêu thích</span>
                                        </button>
                                    </div>
                                )}
                            </li>
                        );
                    }
                    return null;
                })}
            </>
        );
    };

    const countSearchProduct = (searchProduct) => {
        if (!Array.isArray(searchProduct)) {
            return null;
        }

        const sortedProducts = searchProduct.sort((a, b) => {
            const aLaunchtime = new Date(Getlaunchtimeoke(a.specifications)[0]);
            const bLaunchtime = new Date(Getlaunchtimeoke(b.specifications)[0]);
            return bLaunchtime - aLaunchtime;
        });

        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

        return (
            <>
                {currentProducts.map((product, index) => {
                   
                        return (
                            <li className="sanPham" key={`${product.id}-${index}`}>
                                <a href={`/Phonedetail/${convertToSlug(product.name)}`}>
                                    <img src={`${baseURL}/Image/${product.imgUrlMain}`} alt={product.name} />
                                    <h3>{product.name} {product.memoryCapacity}</h3>
                                    <div className="price">
                                        {Getgiamgiatien(product.promotions,product)}
                                    </div>
                                    <div className="ratingresult">
                                    {renderStars(Sumratingstar(product.productDetailId))}
                                    &nbsp;{Sumratingreview(product.productDetailId)} đánh giá
                                    </div>
                                    {Getgiamgiaphantram(product.promotions)}
                                  
                                </a>
                                <div className="tooltip">
                                <button className="themvaogio" onClick={() => handleAddToCart(product.productDetailId)}>
                                    <i style={{ fontSize: "20px" }} className="fa fa-cart-plus"></i>
                                    <span className="tooltiptext" style={{ fontSize: "10px" }}>Thêm vào giỏ</span>
                                </button>
                                </div>
                                {Favourites.some(favour => product.productDetailId == favour.productDetailId && userId == favour.userId) ? (
                                    <div className="tooltipyeuthich" onClick={() => handledeleteFavourites(Favourites.find(favour => product.productDetailId == favour.productDetailId && userId == favour.userId).id)}>
                                        <button className="themvaogio" >
                                            <i style={{ fontSize: "20px", color: "red" }} className="fa fa-heart"></i>
                                            <span className="tooltiptext" style={{ fontSize: "10px" }}>Xóa khỏi yêu thích</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="tooltipyeuthich" onClick={() => handleAddToFavourites(product.productDetailId)}>
                                        <button className="themvaogio" >
                                            <i style={{ fontSize: "20px"}} className="fa fa-heart"></i>
                                            <span className="tooltiptext" style={{ fontSize: "10px" }}>Thêm vào yêu thích</span>
                                        </button>
                                    </div>
                                )}
                            </li>
                        );
                })}
            </>
        );
    };

    const countSearchfilterProduct = (searchfilterProduct) => {
        if (!Array.isArray(searchfilterProduct)) {
            return null;
        }
    
        const uniqueProducts = searchfilterProduct.map(product => {
            const uniqueDetails = [];
            const memoryStorageIds = new Set();
    
            product.productDetails.forEach(detail => {
                if (!memoryStorageIds.has(detail.memoryandStorageid)) {
                    memoryStorageIds.add(detail.memoryandStorageid);
                    uniqueDetails.push(detail);
                }
            });
    
            return {
                ...product,
                productDetails: uniqueDetails
            };
        });
    
        const sortedProducts = uniqueProducts.sort((a, b) => {
            const aLaunchtime = new Date(Getlaunchtimefilter(a.specifications)[0]);
            const bLaunchtime = new Date(Getlaunchtimefilter(b.specifications)[0]);
            return bLaunchtime - aLaunchtime;
        });
    
        const indexOfLastProduct = currentPage * productsPerPage;
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
        const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    
        return (
            <>
                {currentProducts.map((product, index) => {
                    console.log('datap', product);
                    return product.productDetails.map((detail, detailIndex) => (
                        <li className="sanPham" key={`${product.id}-${detail.memoryandStorageid}`}>
                                <a href={`/Phonedetail/${convertToSlug(product.name)}`}>
                                <img src={`${baseURL}/Image/${product.imgUrlMain}`} alt={product.name} />
                                <h3>{product.name} {detail.ram} / {detail.rom}</h3>
                                <div className="price">
                                    {Getgiamgiatien(product.promotions,detail)}
                                </div>
                                <div className="ratingresult">
                                {renderStars(Sumratingstar(detail.id))}
                                &nbsp;{Sumratingreview(detail.id)} đánh giá
                                </div>
                                {Getgiamgiaphantram(product.promotions)}
                              
                            </a>
                            <div className="tooltip">
                            <button className="themvaogio" onClick={() => handleAddToCart(detail.id)}>
                                <i style={{ fontSize: "20px" }} className="fa fa-cart-plus"></i>
                                <span className="tooltiptext" style={{ fontSize: "10px" }}>Thêm vào giỏ</span>
                            </button>
                            </div>
                            
                            {Favourites.some(favour => product.productDetailId == favour.productDetailId && userId == favour.userId) ? (
                                    <div className="tooltipyeuthich" onClick={() => handledeleteFavourites(Favourites.find(favour => detail.id == favour.productDetailId && userId == favour.userId).id)}>
                                        <button className="themvaogio" >
                                            <i style={{ fontSize: "20px", color: "red" }} className="fa fa-heart"></i>
                                            <span className="tooltiptext" style={{ fontSize: "10px" }}>Xóa khỏi yêu thích</span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="tooltipyeuthich" onClick={() => handleAddToFavourites(detail.id)}>
                                        <button className="themvaogio" >
                                            <i style={{ fontSize: "20px"}} className="fa fa-heart"></i>
                                            <span className="tooltiptext" style={{ fontSize: "10px" }}>Thêm vào yêu thích</span>
                                        </button>
                                    </div>
                                )}
                        </li>
                    ));
                })}
            </>
        );
    };
    
    const Getlaunchtimefilter = (spec) => {
        return spec.flatMap(item => 
            item.generalInformation ? [new Date(item.generalInformation)] : []
        );
    };
    
    
    const Getlaunchtime = (spec) => {
        return spec.flatMap(item => 
            item.generalInformation ? new Date(item.generalInformation.launchtime) : []
        );
    }

    const Getlaunchtimeoke = (spec) => {
        if (!Array.isArray(spec)) {
            return [];
        }
        return spec.reduce((acc, item) => {
            if (item.generalInformation && item.generalInformation.launchtime) {
                acc.push(new Date(item.generalInformation.launchtime));
            }
            return acc;
        }, []);
    }
    
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

    const Getgiamgiatien = (promotions, detai) => {
        const promotion = promotions.find((item) => (
            item.promotiontype === "giamgiaphantram" && isPromotionValid(item.dateEnd)
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


    const handlePageChange = (pageNumber) => {
        
        setCurrentPage(pageNumber);
        if (location.pathname === "/tat-ca-dien-thoai" && productAllRef.current) {
            productAllRef.current.scrollIntoView({
                behavior: 'auto',
            });
            window.scrollTo({
                    top: window.pageYOffset - 100,
                    behavior: 'auto'
                }); // Timeout nhỏ để đảm bảo DOM đã cập nhật hoàn tất trước khi cuộn lên
        }else if (location.pathname.includes('/ProductDetails/') && lastSegment !== '' && searchProductRef.current) {
            searchProductRef.current.scrollIntoView({
                behavior: 'auto',
            });
            window.scrollTo({
                    top: window.pageYOffset - 100,
                    behavior: 'auto'
                }); // Timeout nhỏ để đảm bảo DOM đã cập nhật hoàn tất trước khi cuộn lên
        }else if (location.pathname.includes('/Products/searchsFilter?') && lastSegment !== '' && searchfilterProductRef.current) {
            searchfilterProductRef.current.scrollIntoView({
                behavior: 'auto',
            });
            window.scrollTo({
                    top: window.pageYOffset - 100,
                    behavior: 'auto'
                }); // Timeout nhỏ để đảm bảo DOM đã cập nhật hoàn tất trước khi cuộn lên
        }
        else {
            // Nếu không phải "/tat-ca-dien-thoai", cuộn lên đầu trang
            window.scrollTo({
                top: 0,
                behavior: 'auto'
            });
        }
    };


    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(Product.length / productsPerPage); i++) {
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


    const renderPaginationSearch = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(SearchProduct.length / productsPerPage); i++) {
            pageNumbers.push(i);
        }
        // console.log("handlePageChange", pageNumbers[0]);

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
                        className={number === currentPage ? 'Btn_SP_CUS current' : pageNumbers.length === 1 ? handlePageChange(number) : 'Btn_SP_CUS'}
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

    const renderPaginationSearchfilter = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(SearchfliterProductadd.length / productsPerPage); i++) {
            pageNumbers.push(i);
        }
        // console.log("handlePageChange", pageNumbers[0]);

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
                        className={number === currentPage ? 'Btn_SP_CUS current' : pageNumbers.length === 1 ? handlePageChange(number) : 'Btn_SP_CUS'}
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

    const convertToSlug = (text) => {
        return text.toLowerCase().replace(/\s+/g, '-');
    };

    console.log('prohome', loading);

    return (
        <>
            <hr />
            <div data-fetch-key="NOIBAT:0">
                <div
                    className="Noibat-block-hot-sale"
                    style={{
                        background: "linear-gradient(rgb(248, 62, 96), rgb(254, 80, 72)) 0% 0% / cover"
                    }}
                >
                    <div className="Noibat-box-title">
                        <div className="Noibat-title-image">
                            <div style={{ textAlign: "center" }}>
                                <span style={{ fontSize: "40px", color: "white" }}>
                                    <i className="fa fa-mobile"></i><b>&nbsp;ĐIỆN THOẠI NỔI BẬT</b>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="listSpTrongKhung">
                        {countMARANDROM(Product,ProductDetail)}
                    </div>
                </div>
            </div>

            <hr />
            <div data-fetch-key="NOIBAT:0">
                <div
                    className="Noibat-block-hot-sale"
                    style={{
                        background: "white",
                        border: "2px solid #ddd"
                        
                    }}
                >
                    <div className="Noibat-box-title">
                        <div className="Noibat-title-image">
                            <div style={{ textAlign: "center" }}>
                                <span style={{ fontSize: "40px", color: "#ce3749" }}>
                                    <b>Giảm giá sốc %</b>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="listSpTrongKhung">
                        {countPromotions(Product,ProductDetail)}
                    </div>
                </div>
            </div>
            
            {location.pathname === "/tat-ca-dien-thoai" &&
            <>
            <hr ref={productAllRef}/>
            <div data-fetch-key="NOIBAT:0">
                <div
                    className="block-hot-sale"
                    style={{
                        background: "linear-gradient(rgb(248, 62, 96), rgb(254, 80, 72)) 0% 0% / cover",
                        borderRadius: "40px",
                        marginTop: "20px"
                    }}
                >
                    <div style={{ textAlign: "center" }}>
                        <span style={{ fontSize: "40px", color: "white" }}>
                            <b>TẤT CẢ ĐIỆN THOẠI</b>
                        </span>
                    </div>
                </div>
            </div>
            <div className="listSpTrongKhung">
                {countProductAll(Product, ProductDetail)}
            </div>
            {renderPagination()}
            </>
            }

            {location.pathname.includes('/ProductDetails/') && lastSegment !== '' &&
            <>
            <hr ref={searchProductRef}/>
            <div data-fetch-key="NOIBAT:0">
                <div
                    className="block-hot-sale"
                    style={{
                        background: "linear-gradient(rgb(248, 62, 96), rgb(254, 80, 72)) 0% 0% / cover",
                        borderRadius: "40px",
                        marginTop: "20px"
                    }}
                >
                    <div style={{ textAlign: "center" }}>
                        <span style={{ fontSize: "40px", color: "white" }}>
                            <b>Tìm kiếm theo tên điện thoại</b>
                        </span>
                    </div>
                </div>
            </div>
            <div className="listSpTrongKhung">
                {countSearchProduct(SearchProduct)}
            </div>
            {renderPaginationSearch()}
            </>
            }

            {location.pathname.includes('/Products/searchsFilter?') && lastSegment !== '' &&
            <>
            <hr ref={searchfilterProductRef}/>
            <div data-fetch-key="NOIBAT:0">
                <div
                    className="block-hot-sale"
                    style={{
                        background: "linear-gradient(rgb(248, 62, 96), rgb(254, 80, 72)) 0% 0% / cover",
                        borderRadius: "40px",
                        marginTop: "20px"
                    }}
                >
                    <div style={{ textAlign: "center" }}>
                        <span style={{ fontSize: "40px", color: "white" }}>
                            <b>Tìm kiếm bộ lọc</b>
                        </span>
                    </div>
                </div>
            </div>
            <div className="listSpTrongKhung">
                {countSearchfilterProduct(SearchfliterProductadd)}
            </div>
            {renderPaginationSearchfilter()}
            </>
            }
            <ToastContainer
            position="top-center"
            pauseOnHover={false}
            autoClose={1500}
            theme={'dark'}
            />
        </>
    );
}

export default HomePage;