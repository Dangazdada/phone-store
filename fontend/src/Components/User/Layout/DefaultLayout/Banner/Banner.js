import OwlCarousel from 'react-owl-carousel';
import './banner.css';

const Banner = () => {

    const imgList = [];

  
    const numBanner = 4;
    for (let i = 0; i <= numBanner; i++) {
      const linkimg = `img/banners/banner${i}.jpg`;
      imgList.push({ imageUrl: linkimg, linkUrl: linkimg });
    }
    console.log(imgList);

    let carouselOptions = {
        items: 1.5,
		margin: 100,
		center: true,
		loop: true,
		smartSpeed: 450,
		autoplay: true,
		autoplayTimeout: 3500
      };
    return ( 
        <>
            <section>
            <OwlCarousel
            className="owl-theme banner"
            loop
            margin={10}
            {...carouselOptions}
            >
                {imgList.map((banner, index) => (
                    <div key={index} className="banner-item">
                        <a href={banner.linkUrl} target="_blank">
                            <img src={banner.imageUrl} alt={`Banner ${index}`} />
                        </a>
                    </div>
                ))}
        </OwlCarousel>
        </section>
        </>
    );
}
 
export default Banner;