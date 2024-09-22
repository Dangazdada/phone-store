import './CompanyMenu.css';
import { Fragment } from 'react';

const CompanyMenu = () => {

    const companyList = ["Apple.jpg", "Samsung.jpg", "Oppo.jpg", "Nokia.jpg", "Huawei.jpg", "Xiaomi.png",
    "Realme.png", "Vivo.jpg", "Philips.jpg", "Mobell.jpg", "Mobiistar.jpg", "Itel.jpg",
    "Coolpad.png", "HTC.jpg", "Motorola.jpg"
    ];

    const addCompany = (img, nameCompany) => {
        const link = createLinkFilter('add', 'company', nameCompany);
        return (
            <a href={link}>
                <img src={img} alt={nameCompany} />
            </a>
        );
    }
    const createLinkFilter = (type, category, name) => {
        return `/loc?type=${type}&category=${category}&name=${name}`;
    }

    return ( 
        <>
            <div className="companyMenu group flexContain">
            {companyList.map((company, index) => (
                <Fragment key={index}>
                    {addCompany(`img/company/${company}`, company.slice(0, company.length - 4))}
                </Fragment>
            ))}
            </div>
        </>
    );
}
 
export default CompanyMenu;