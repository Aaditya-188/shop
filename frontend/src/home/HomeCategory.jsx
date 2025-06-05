import React from "react";
import { Link } from "react-router-dom";

const subTitle = "Choose Any Products";
const title = "Buy Everything with Us";
const btnText = "Get Started Now";

const categoryList = [
  {
    imgUrl: "src/assets/images/category/shirts.jpg",
    imgAlt: "Category Shirts",
    iconName: "icofont-brand-windows",
    title: "Shirts",
    categoryName: "shirts",
  },
  {
    imgUrl: "src/assets/images/category/02.jpg",
    imgAlt: "Category Shoes",
    iconName: "icofont-brand-windows",
    title: "Shoes",
    categoryName: "shoes",
  },
  {
    imgUrl: "src/assets/images/category/pants.jpg",
    imgAlt: "Category Pants",
    iconName: "icofont-brand-windows",
    title: "Pants",
    categoryName: "pants",
  },
  {
    imgUrl: "src/assets/images/category/caps.jpg",
    imgAlt: "Category Caps",
    iconName: "icofont-brand-windows",
    title: "Caps",
    categoryName: "caps",
  },
  {
    imgUrl: "src/assets/images/category/05.jpg",
    imgAlt: "Category Bags",
    iconName: "icofont-brand-windows",
    title: "Bags",
    categoryName: "bags",
  },
];

function HomeCategory() {
  return (
    <div className="category-section style-4 padding-tb">
      <div className="container">
        {/* Section header */}
        <div className="section-header text-center">
          <span className="subtitle">{subTitle}</span>
          <h2 className="title">{title}</h2>
        </div>

        {/* Section Card */}
        <div className="section-wrapper">
          <div className="row g-4 justify-content-center row-cols-md-3 row-cols-sm-2 row-cols-1">
            {categoryList.map((category, index) => (
              <div key={index} className="col">
                <Link
                  to={`/shop/${category.categoryName}`}
                  className="category-item"
                >
                  <div className="category-inner">
                    {/* Image of category */}
                    <div className="category-thumb">
                      <img src={category.imgUrl} alt={category.imgAlt} />
                    </div>

                    {/* content of category */}
                    <div className="category-content">
                      <div className="cate-icon">
                        <i className={category.iconName}></i>
                      </div>
                      <h6>{category.title}</h6>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-5">
            <Link to="/shop" className="lab-btn">
              <span>{btnText}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeCategory;
