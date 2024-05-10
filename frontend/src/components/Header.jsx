import React from 'react';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header>
          <div className={"header-side"}>
              <Link className={"header-link"} to={'/'}>Главная страница</Link>
              <Link className={"header-link"} to={'/products'}>Список продуктов</Link>
              <Link className={"header-link"} to={'/create-product'}>Создать новый продукт</Link>
              <Link className={"header-link"} to={'/create-product'}>Корзина</Link>
          </div>
      </header>
    );
};

export default Header;