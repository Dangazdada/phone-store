import React, { useState } from 'react';
import './CompanyMenu.css';
import { Fragment } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {useNavigate,useLocation } from 'react-router-dom';

const CompanyMenu = ({ onMenuResultChange, searchResultChange }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [range, setRange] = useState([0, 45000000]);
    const [SearchfilterPhone, setSearchfilterPhone] = useState(false);
    const [SearchfiltercatoPhone, setSearchfiltercatoPhone] = useState(false);
    const [SearchfiltercatoPhonenull, setSearchfiltercatoPhonenull] = useState(false);
    
    const [dropdowns, setDropdowns] = useState({
        filter: false,
        price: false,
        producttype_s: false,
        ram: false,
        rom: false,
        hz:false,
        wsac:false,
      });
    
      const [selectedItem, setSelectedItem] = useState({
        manufacture:'',
        price: '',
        producttype_s: '',
        ram: '',
        rom:'',
        hz:'',
        wsac:'',
      });

      const [tamselectedItem, settamSelectedItem] = useState({
        manufacture:'',
        price: '',
        producttype_s: '',
        ram: '',
        rom:'',
        hz:'',
        wsac:'',
      });

      const toggleDropdown = (dropdown) => {
        setDropdowns((prevState) => {
          const newDropdowns = { filter: false, price: false, producttype_s: false, ram: false, rom: false, hz: false, wsac: false};
          newDropdowns[dropdown] = !prevState[dropdown];
          return newDropdowns;
        });
      };

      const handleSelection = (type, value) => {
        console.log('handleSelection', type, value);
        setSelectedItem((prevState) => ({
            ...prevState,
            [type]: prevState[type] === value ? '' : value,
        }));
        setSearchfiltercatoPhonenull(true);
    };

    const handleSelectionNull = (dropdown) => {
        setSelectedItem({
            manufacture:'',
            price: '',
            producttype_s: '',
            ram: '',
            rom:'',
            hz:'',
            wsac:'',
          }
        );
        settamSelectedItem(selectedItem);
        toggleDropdown(dropdown);
        setSearchfilterPhone(false);
        setSearchfiltercatoPhonenull(false);
        if (localStorage.getItem('duongdanao') !== null){
            localStorage.removeItem('duongdanao');
        }
        window.location.reload();


    };

    const handleSliderChange = (value) => {
        setRange(value);
        handleSelection('price',`${value[0].toString()}-${value[1].toString()}`);
    };
    const companyList = ["Apple.jpg", "Samsung.jpg", "Xiaomi.png", "Oppo.jpg", "Vivo.jpg", "Tecno.jpg", "Nokia.jpg", 
    "Realme.png",  "Honor.jpg", "TCL.jpg", "Masstel.jpg", "Itel.jpg"
    ];

    const addCompany = (img, nameCompany) => {
        const link = createLinkFilter('add', 'company', nameCompany);
        return (
            <a  onClick={(event) => {
                event.preventDefault(); // Ngăn chặn chuyển hướng
                handleXemketquacatogery('manufacture', `${link}`);
                
            }}
            className={selectedItem.manufacture === `${link}` ? 'selecteda' : ''}
            >
                <img src={img} alt={nameCompany} />
            </a>
        );
    }
    const createLinkFilter = (type, category, name) => {
        return name;
    }

    const handleXemketqua = (dropdown) => {
        handleMenuClick(true);
        setSearchfilterPhone(true);
        settamSelectedItem(selectedItem);
        toggleDropdown(dropdown);
        navigate('/');
    }
    const handleXemketquanull = (dropdown) => {
        handleMenuClick(true);
        if (localStorage.getItem('duongdanao') !== null){
            localStorage.removeItem('duongdanao');
        }
        localStorage.setItem('duongdanao','/tat-ca-dien-thoai')
        toggleDropdown(dropdown);
        setSearchfiltercatoPhonenull(false);
        navigate('/');
    }
    const handleXemketquacatogery = (Manufacture,linkname) => {
        handleMenuClick(true);
        setSearchfilterPhone(true);
        if(selectedItem.manufacture !== linkname)
        {
            handleSelection(Manufacture,linkname);
        }else{
            handleSelection(Manufacture,'');
            if (selectedItem.producttype_s === '' && selectedItem.price === '' && selectedItem.ram === '' && selectedItem.rom === '' && selectedItem.hz === '' && selectedItem.wsac === ''){
            setSearchfiltercatoPhone(true);
            }
        }
        
        navigate('/');
    }
    if (SearchfilterPhone === true) {
        if (localStorage.getItem('duongdanao') !== null){
            localStorage.removeItem('duongdanao');
        }
        if (selectedItem.manufacture !== ''){
            localStorage.setItem('duongdanao',`/Products/searchsFilter?${selectedItem.producttype_s !== '' ? `producttype=${selectedItem.producttype_s}` : ''}${selectedItem.manufacture !== '' ? `&manufacture=${selectedItem.manufacture}` : ''}${selectedItem.price !== '' ? `&price=${selectedItem.price}` : ''}${selectedItem.ram !== '' ? `&ram=${selectedItem.ram}` : ''}${selectedItem.rom !== '' ? `&rom=${selectedItem.rom}` : ''}${selectedItem.hz !== '' ? `&widescreen=${selectedItem.hz}` : ''}${selectedItem.wsac !== '' ? `&maxChargingSupport=${selectedItem.wsac}` : ''}`);
        }else if (selectedItem.manufacture === ''){
            localStorage.setItem('duongdanao',`/Products/searchsFilter?${tamselectedItem.producttype_s !== '' ? `producttype=${tamselectedItem.producttype_s}` : ''}${tamselectedItem.manufacture !== '' ? `&manufacture=${tamselectedItem.manufacture}` : ''}${tamselectedItem.price !== '' ? `&price=${tamselectedItem.price}` : ''}${tamselectedItem.ram !== '' ? `&ram=${tamselectedItem.ram}` : ''}${tamselectedItem.rom !== '' ? `&rom=${tamselectedItem.rom}` : ''}${tamselectedItem.hz !== '' ? `&widescreen=${tamselectedItem.hz}` : ''}${tamselectedItem.wsac !== '' ? `&maxChargingSupport=${tamselectedItem.wsac}` : ''}`);
        }
        setSearchfilterPhone(false);
        if(SearchfiltercatoPhone === true){
            if (localStorage.getItem('duongdanao') !== null){
                if (selectedItem.producttype_s === '' && selectedItem.manufacture === '' && selectedItem.price === '' && selectedItem.ram === '' && selectedItem.rom === '' && selectedItem.hz === '' && selectedItem.wsac === ''){
                localStorage.removeItem('duongdanao');
                setSearchfiltercatoPhone(false);
                setSearchfilterPhone(false);
                }
            }
        }    
    }
    const handleMenuClick = (result) => {
        onMenuResultChange(result);
    };

    console.log('Searchfiltercato',SearchfiltercatoPhonenull);
    return ( 
        <>
            <div className="companyMenu group flexContain">
            {companyList.map((company, index) => (
                <Fragment key={index}>
                    {addCompany(`img/company/${company}`, company.slice(0, company.length - 4))}
                </Fragment>
            ))}
            </div>
            <hr/>
            <div className="dropbtnflexContain">
                <div className="Filter_Filter dropdown">                   
                    <button className="dropbtn" onClick={() => toggleDropdown('filter')}>
                    <i style={{ fontSize: "18px" }} className="fa fa-filter"></i>&nbsp;Bộ lọc
                    </button>
                    {dropdowns.filter && (<>
                    <div className="arrow-filter"></div>
                    <div className="dropdown-contents">
                        
                        <div className="column_Filter">
                        <h4 className="TenBang_column">Giá tiền</h4>
                        <a  href="/"
                            className={selectedItem.price === '0-2000000' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('price', '0-2000000');
                            }}
                        >
                            Dưới 2 triệu
                        </a>
                        <a href="/"
                            className={selectedItem.price === '2000000-4000000' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('price', '2000000-4000000');
                            }}
                        >
                            Từ 2 - 4 triệu
                        </a>
                        <a href="/"
                            className={selectedItem.price === '4000000-70000000' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('price', '4000000-70000000');
                            }}
                        >
                            Từ 4 - 7 triệu
                        </a>
                        <a href="/"
                            className={selectedItem.price === '7000000-13000000' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('price', '7000000-13000000');
                            }}
                        >
                            Từ 7 - 13 triệu
                        </a>
                        <a href="/"
                            className={selectedItem.price === '13000000-0' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('price', '13000000-0');
                            }}
                        >
                            Trên 13 triệu
                        </a>
                        <span></span>
                        <div className="price-filter-range">

                        <Slider
                            range
                            min={0}
                            max={45000000}
                            defaultValue={range}
                            onChange={handleSliderChange}
                            className={selectedItem.price === range[0].toString()+"-"+range[1].toString() ? 'selectedd' : ''}
                            trackStyle={{ backgroundColor: '#d71008' }}
                            handleStyle={[
                                { borderColor: '#d71008' },
                                { borderColor: '#d71008' }
                            ]}
                        />
                        <div className="range-values">
                            <span>{range[0].toLocaleString()}đ</span>
                            <span>{range[1].toLocaleString()}đ</span>
                        </div>
                        </div>

                        </div>
                        
                        <div className="column_Filter01">
                        <h4 className="TenBang_column">Loại điện thoại</h4>
                        <a href="/"
                            className={selectedItem.producttype_s === 'Android' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('producttype_s', 'Android');
                            }}
                        >
                            Android
                        </a>
                        <a href="/"
                            className={selectedItem.producttype_s === 'IPhone(IOS)' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('producttype_s', 'IPhone(IOS)');
                            }}
                        >
                            IPhone(IOS)
                        </a>
                        <a href="/"
                            className={selectedItem.producttype_s === 'Điện thoại phổ thông' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('producttype_s', 'Điện thoại phổ thông');
                            }}
                        >
                            Điện thoại phổ thông
                        </a>
                        
                        </div>

                        <div className="column_Filter02">
                        <h4 className="TenBang_column">Dung lượng RAM</h4>
                        <a  href="/"
                            className={selectedItem.ram === '3 GB' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('ram', '3 GB');
                            }}
                        >
                            3 GB
                        </a>

                        <a  href="/"
                            className={selectedItem.ram === '4 GB' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('ram', '4 GB');
                            }}
                        >
                            4 GB
                        </a>

                        <a  href="/"
                            className={selectedItem.ram === '6 GB' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('ram', '6 GB');
                            }}
                        >
                            6 GB
                        </a>

                        <a  href="/"
                            className={selectedItem.ram === '8 GB' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('ram', '8 GB');
                            }}
                        >
                            8 GB
                        </a>

                        <a  href="/"
                            className={selectedItem.ram === '12 GB' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('ram', '12 GB');
                            }}
                        >
                            12 GB
                        </a>

                        <a  href="/"
                            className={selectedItem.ram === '16 GB' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('ram', '16 GB');
                            }}
                        >
                            16 GB
                        </a>

                        </div>

                        <div className="column_Filter03">
                        <h4 className="TenBang_column">Dung lượng lưu trữ</h4>
                        <a  href="/"
                            className={selectedItem.rom === '64 GB' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('rom', '64 GB');
                            }}
                        >
                            64 GB
                        </a>

                        <a  href="/"
                            className={selectedItem.rom === '128 GB' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('rom', '128 GB');
                            }}
                        >
                            128 GB
                        </a>

                        <a  href="/"
                            className={selectedItem.rom === '256 GB' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('rom', '256 GB');
                            }}
                        >
                            256 GB
                        </a>

                        <a  href="/"
                            className={selectedItem.rom === '512 GB' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('rom', '512 GB');
                            }}
                        >
                            512 GB
                        </a>

                        <a  href="/"
                            className={selectedItem.rom === '1 TB' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('rom', '1 TB');
                            }}
                        >
                            1 TB
                        </a>

                        </div>

                        <div className="column_Filter04">
                        <h4 className="TenBang_column">Tần số quét</h4>
                        <a  href="/"
                            className={selectedItem.hz === '60 Hz' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('hz', '60 Hz');
                            }}
                        >
                            60 Hz
                        </a>
                        <a  href="/"
                            className={selectedItem.hz === '90 Hz' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('hz', '90 Hz');
                            }}
                        >
                            90 Hz
                        </a>
                        <a  href="/"
                            className={selectedItem.hz === '120 Hz' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('hz', '120 Hz');
                            }}
                        >
                            120 Hz
                        </a>

                        </div>

                        <div className="column_Filter05">
                        <h4 className="TenBang_column">Tính năng sạc</h4>
                        <a  href="/"
                            className={selectedItem.wsac === '20 W' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('wsac', '20 W');
                            }}
                        >
                            Sạc nhanh(từ 20W)
                        </a>

                        <a  href="/"
                            className={selectedItem.wsac === '60 W' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('wsac', '60 W');
                            }}
                        >
                            Sạc nhanh(từ 60W)
                        </a>

                        <a  href="/"
                            className={selectedItem.wsac === '90 W' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('wsac', '90 W');
                            }}
                        >
                            Sạc nhanh(từ 90 W)
                        </a>
                        </div>
                        
                        {selectedItem.price === '' && selectedItem.manufacture === '' && selectedItem.producttype_s === '' && selectedItem.ram === '' && selectedItem.rom === '' && selectedItem.hz === '' && selectedItem.wsac ===''
                        ? 
                        SearchfiltercatoPhonenull === true && selectedItem.manufacture === '' && selectedItem.price === '' && selectedItem.producttype_s === '' && selectedItem.ram === '' && selectedItem.rom === '' && selectedItem.hz === '' && selectedItem.wsac ===''
                        ? 
                        <>
                        <button className="Bochonloc" onClick={() => handleSelectionNull('filter')} >Bỏ chọn</button>
                        <button className="Xemchonloc" onClick={() => handleXemketquanull('filter')}>Xem tất cả điện thoại</button>
                        </>
                        :
                        null
                         :
                        <>
                        <button className="Bochonloc" onClick={() => handleSelectionNull('filter')}>Bỏ chọn</button>
                        <button className="Xemchonloc" onClick={() => handleXemketqua('filter')}>Xem kết quả</button>
                        </>
                        }

                    </div>
                    </>
                    )}
                    
                </div>

                <div className="pricesRangeFilter dropdown">
                    <button className="dropbtn" onClick={() => toggleDropdown('price')}>Giá tiền</button>
                    {dropdowns.price && (
                    <>
                    <div className="arrow-filter"></div>
                    <div className="dropdown-content">
                        <a  href="/"
                            className={selectedItem.price === '0-2000000' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('price', '0-2000000');
                            }}
                        >
                            Dưới 2 triệu
                        </a>
                        <a href="/"
                            className={selectedItem.price === '2000000-4000000' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('price', '2000000-4000000');
                            }}
                        >
                            Từ 2 - 4 triệu
                        </a>
                        <a href="/"
                            className={selectedItem.price === '4000000-70000000' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('price', '4000000-70000000');
                            }}
                        >
                            Từ 4 - 7 triệu
                        </a>
                        <a href="/"
                            className={selectedItem.price === '7000000-13000000' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('price', '7000000-13000000');
                            }}
                        >
                            Từ 7 - 13 triệu
                        </a>
                        <a href="/"
                            className={selectedItem.price === '13000000-0' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('price', '13000000-0');
                            }}
                        >
                            Trên 13 triệu
                        </a>
                        <span></span>
                        <div className="price-filter-range">

                        <Slider
                            range
                            min={0}
                            max={45000000}
                            defaultValue={range}
                            onChange={handleSliderChange}
                            className={selectedItem.price === range[0].toString()+"-"+range[1].toString() ? 'selectedd' : ''}
                            trackStyle={{ backgroundColor: '#d71008' }}
                            handleStyle={[
                                { borderColor: '#d71008' },
                                { borderColor: '#d71008' }
                            ]}
                        />
                        <div className="range-values">
                            <span>{range[0].toLocaleString()}đ</span>
                            <span>{range[1].toLocaleString()}đ</span>
                        </div>
                        </div>
                        {selectedItem.price === '' && selectedItem.producttype_s === '' && selectedItem.ram === '' && selectedItem.rom === '' && selectedItem.hz === '' && selectedItem.wsac ===''
                        ? null :
                        <>
                        <button className="Bochonloc" onClick={() => handleSelectionNull('price')}>Bỏ chọn</button>
                        <button className="Xemchonloc" onClick={() => handleXemketqua('price')}>Xem kết quả</button>
                        </>
                        }
                    </div>
                    </>
                    )}
                </div>

                <div className="producttype_sFilter dropdown">
                    <button className="dropbtn" onClick={() => toggleDropdown('producttype_s')}>Loại điện thoại</button>
                    {dropdowns.producttype_s && (
                    <>
                    <div className="arrow-filter"></div>
                    <div className="dropdown-content">
                        <a href="/"
                            className={selectedItem.producttype_s === 'Android' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('producttype_s', 'Android');
                            }}
                        >
                            Android
                        </a>
                        <a href="/"
                            className={selectedItem.producttype_s === 'IPhone(IOS)' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('producttype_s', 'IPhone(IOS)');
                            }}
                        >
                            IPhone(IOS)
                        </a>
                        <a href="/"
                            className={selectedItem.producttype_s === 'Điện thoại phổ thông' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('producttype_s', 'Điện thoại phổ thông');
                            }}
                        >
                            Điện thoại phổ thông
                        </a>
                        {selectedItem.price === '' && selectedItem.producttype_s === '' && selectedItem.ram === '' && selectedItem.rom === '' && selectedItem.hz === '' && selectedItem.wsac ===''
                        ? null :
                        <>
                        <button className="Bochonloc" onClick={() => handleSelectionNull('producttype_s')}>Bỏ chọn</button>
                        <button className="Xemchonloc" onClick={() => handleXemketqua('producttype_s')}>Xem kết quả</button>
                        </>
                        }
                    </div>
                    </>
                    )}
                </div>

                <div className="ramFilter dropdown">
                    <button className="dropbtn" onClick={() => toggleDropdown('ram')}>Dung lượng RAM</button>
                    {dropdowns.ram && (
                    <>
                    <div className="arrow-filter"></div>
                    <div className="dropdown-content">
                        <a  href="/"
                            className={selectedItem.ram === '3 GB' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('ram', '3 GB');
                            }}
                        >
                            3 GB
                        </a>

                        <a  href="/"
                            className={selectedItem.ram === '4 GB' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('ram', '4 GB');
                            }}
                        >
                            4 GB
                        </a>

                        <a  href="/"
                            className={selectedItem.ram === '6 GB' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('ram', '6 GB');
                            }}
                        >
                            6 GB
                        </a>

                        <a  href="/"
                            className={selectedItem.ram === '8 GB' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('ram', '8 GB');
                            }}
                        >
                            8 GB
                        </a>

                        <a  href="/"
                            className={selectedItem.ram === '12 GB' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('ram', '12 GB');
                            }}
                        >
                            12 GB
                        </a>

                        <a  href="/"
                            className={selectedItem.ram === '16 GB' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('ram', '16 GB');
                            }}
                        >
                            16 GB
                        </a>
                        {selectedItem.price === '' && selectedItem.producttype_s === '' && selectedItem.ram === '' && selectedItem.rom === '' && selectedItem.hz === '' && selectedItem.wsac ===''
                        ? null :
                        <>
                        <button className="Bochonloc" onClick={() => handleSelectionNull('ram')}>Bỏ chọn</button>
                        <button className="Xemchonloc" onClick={() => handleXemketqua('ram')}>Xem kết quả</button>
                        </>
                        }
                    </div>
                    </>
                    )}
                </div>

                <div className="romFilter dropdown">
                    <button className="dropbtn" onClick={() => toggleDropdown('rom')}>Dung lượng lưu trữ</button>
                    {dropdowns.rom && (
                    <>
                    <div className="arrow-filter"></div>
                    <div className="dropdown-content">
                        <a  href="/"
                            className={selectedItem.rom === '64 GB' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('rom', '64 GB');
                            }}
                        >
                            64 GB
                        </a>

                        <a  href="/"
                            className={selectedItem.rom === '128 GB' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('rom', '128 GB');
                            }}
                        >
                            128 GB
                        </a>

                        <a  href="/"
                            className={selectedItem.rom === '256 GB' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('rom', '256 GB');
                            }}
                        >
                            256 GB
                        </a>

                        <a  href="/"
                            className={selectedItem.rom === '512 GB' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('rom', '512 GB');
                            }}
                        >
                            512 GB
                        </a>

                        <a  href="/"
                            className={selectedItem.rom === '1 TB' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('rom', '1 TB');
                            }}
                        >
                            1 TB
                        </a>
                        {selectedItem.price === '' && selectedItem.producttype_s === '' && selectedItem.ram === '' && selectedItem.rom === '' && selectedItem.hz === '' && selectedItem.wsac ===''
                        ? null :
                        <>
                        <button className="Bochonloc" onClick={() => handleSelectionNull('rom')}>Bỏ chọn</button>
                        <button className="Xemchonloc" onClick={() => handleXemketqua('rom')}>Xem kết quả</button>
                        </>
                        }
                    </div>
                    </>
                    )}
                </div>

                <div className="hzFilter dropdown">
                    <button className="dropbtn" onClick={() => toggleDropdown('hz')}>Tần số quét</button>
                    {dropdowns.hz && (
                    <>
                    <div className="arrow-filter"></div>
                    <div className="dropdown-content">
                        <a  href="/"
                            className={selectedItem.hz === '60 Hz' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('hz', '60 Hz');
                            }}
                        >
                            60 Hz
                        </a>
                        <a  href="/"
                            className={selectedItem.hz === '90 Hz' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('hz', '90 Hz');
                            }}
                        >
                            90 Hz
                        </a>
                        <a  href="/"
                            className={selectedItem.hz === '120 Hz' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('hz', '120 Hz');
                            }}
                        >
                            120 Hz
                        </a>
                        {selectedItem.price === '' && selectedItem.producttype_s === '' && selectedItem.ram === '' && selectedItem.rom === '' && selectedItem.hz === '' && selectedItem.wsac ===''
                        ? null :
                        <>
                        <button className="Bochonloc" onClick={() => handleSelectionNull('hz')}>Bỏ chọn</button>
                        <button className="Xemchonloc" onClick={() => handleXemketqua('hz')}>Xem kết quả</button>
                        </>
                        }
                    </div>
                    </>
                    )}
                </div>

                <div className="wsacFilter dropdown">
                    <button className="dropbtn" onClick={() => toggleDropdown('wsac')}>Tính năng sạc</button>
                    {dropdowns.wsac && (
                    <>
                    <div className="arrow-filter"></div>
                    <div className="dropdown-content-tinhnangsac">
                                                <a  href="/"
                            className={selectedItem.wsac === '20 W' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('wsac', '20 W');
                            }}
                        >
                            Sạc nhanh(từ 20W)
                        </a>

                        <a  href="/"
                            className={selectedItem.wsac === '60 W' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('wsac', '60 W');
                            }}
                        >
                            Sạc nhanh(từ 60W)
                        </a>

                        <a  href="/"
                            className={selectedItem.wsac === '90 W' ? 'selected' : ''}
                            onClick={(event) => {
                                event.preventDefault(); // Ngăn chặn chuyển hướng
                                handleSelection('wsac', '90 W');
                            }}
                        >
                            Sạc nhanh(từ 90 W)
                        </a>
                        {selectedItem.price === '' && selectedItem.producttype_s === '' && selectedItem.ram === '' && selectedItem.rom === '' && selectedItem.hz === '' && selectedItem.wsac ===''
                        ? null :
                        <>
                        <button className="Bochonloc" onClick={() => handleSelectionNull('wsac')}>Bỏ chọn</button>
                        <button className="Xemchonloc" onClick={() => handleXemketqua('wsac')}>Xem kết quả</button>
                        </>
                        }
                    </div>
                    </>
                    )}
                </div>
            </div>
        </>
    );
}
 
export default CompanyMenu;