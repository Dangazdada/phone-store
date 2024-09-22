import { useEffect, useState } from "react";
import { useAuth } from "../../../Components/Other/auth";
import axiosClient, {baseURL} from '../../../Components/Other/axiosClient';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { useNavigate } from "react-router-dom";
import './Star_Rating.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Star_Rating = ({ productId, idInvoiDetail, isRating,width }) => {
    const [selectedRating, setSelectedRating] = useState(0);
    const [comment, setComment] = useState("");
    const [invoiceDetailId, setInvoiceDetailId] = useState(null);
    const { userId } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosClient.get('/InvoiceDetails')
            .then((res) => {
                const detail = res.data.find((a) =>
                    a.invoiceId === idInvoiDetail && a.productDetailId === productId
                );
                setInvoiceDetailId(detail ? detail.id : null);
            });
    }, [idInvoiDetail, productId]);

    const handleRatingChange = (rating) => {
        setSelectedRating(rating);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmitRating = () => {
        if (selectedRating === 0) {
            toast.error('Please select a rating!');
            return;
        }

        const ratingData = {
            userId,
            ProductDetailId: productId,
            RatingTime: new Date(),
            invoiceDetailId,
            invoiceId: idInvoiDetail,
            Score: selectedRating,
            Review : comment,
            Status: false,
        };
        const token = localStorage.getItem('token');
        axiosClient.post('/Ratings', ratingData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(() => { 
            toast.success("Đánh giá thành công!"); 
            setTimeout(() => {
                window.location.reload();
            },1200)
            
        })
        .catch(() => toast.error("Đánh giá thất bại!"));
    };

    const renderStar = () => (
        <div className='star-container'>
            {[1, 2, 3, 4, 5].map((item) => (
                <i key={item}
                   className="fa fa-star"
                   icon={selectedRating >= item ? solidStar : regularStar}
                   onClick={() => handleRatingChange(item)}
                   style={{
                       cursor: 'pointer',
                       fontSize: '24px',
                       color: selectedRating >= item ? '#EDBB0E' : '#837979',
                   }}
                />
            ))}
        </div>
    );
    console.log('idid',invoiceDetailId);
    return (
        <div style={{width:`${width}`}} className="star-rating-container">
            <div>
                <h3 style={{ marginBottom: '10px' }}>Đánh giá:</h3>
                {renderStar()}
            </div>
            <div className='review-rating-container'>
                <h3 style={{ marginBottom: '10px' }}>Comment:</h3>
                <textarea 
                style={{ 
                    display: 'block', 
                    fontSize: '16px', 
                    height: '135px', 
                    width: '100%', 
                    resize: 'vertical', 
                    borderRadius: '10px',
                    maxHeight: '160px',
                }} 
                value={comment} 
                onChange={handleCommentChange}
                ></textarea>
                <button className="site-btn_invoice" onClick={handleSubmitRating}>Gửi</button>
            </div>
        </div>
    );
};

export default Star_Rating;