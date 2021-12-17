import React, { useCallback, useState, useEffect, useRef } from 'react'
import 'rc-slider/assets/index.css'

import Helmet from '../components/Helmet'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'
import Checkbox from '../components/CheckBox'
import Button from '../components/Button'

import productData from '../assets/fake-data/products'
import category from '../assets/fake-data/category'
import prices from '../assets/fake-data/product-price'



const Catalog = () => {

    const initFilter = {
        category: [],
        price: []
    }

    const productList = productData.getAllProducts()

    const [products, setProducts] = useState(productList)

    const [filter, setFilter] = useState(initFilter)

    const [search, setSearch] = useState("")

    const handleChange = value => {
        setSearch(value)
        filterData(value)
    }

    // search
    const filterData = value => {
        const lowerCaseValue = value.toLowerCase().trim()
        if (!lowerCaseValue){
            setProducts(productList)
        }
        else {
            const filteredData = productList.filter(item => {
                return Object.keys(item).some(key => {
                    return item[key].toString().toLowerCase().includes(lowerCaseValue)
                })
            })
            setProducts(filteredData)
        }
    }

    // filter category
    const filterSelect = (type, checked, item) => {
        if (checked){
            switch(type) {
                case "CATEGORY":
                    setFilter({...filter, category: [...filter.category, item.categorySlug]})
                    break
                case "PRICE":
                    setFilter({...filter, price: [...filter.price, item.price]})
                    break
                default:
            }
        }else{
            switch(type) {
                case "CATEGORY":
                    const newCategory = filter.category.filter(e => e !== item.categorySlug)
                    setFilter({...filter, category: newCategory})
                    break
                case "PRICE":
                    const newPrice = filter.category.filter(e => e !== item.price)
                    setFilter({...filter, category: newPrice})
                    break
                default:
            }
        }
        
    }

    const clearFilter = () => setFilter(initFilter)

    const updateProducts = useCallback(
        () => {
            let temp = productList

            if (filter.category.length > 0) {
                temp = temp.filter(e => filter.category.includes(e.categorySlug))
            }

            setProducts(temp)
        },
        [filter, productList],
    )

    useEffect(() => {
        updateProducts()
    }, [updateProducts])

    const filterRef =useRef(null)

    const showHideFilter = () => filterRef.current.classList.toggle('active');

    return (
        <Helmet title="Sản phẩm">
            {
                console.log(filter)
            }
            <div className="catalog">
                <div className="catalog__filter" ref={filterRef}>
                    <div className="catalog__filter__close" onClick={()=>showHideFilter()}>
                        <i className='bx bx-chevrons-left'></i>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__search">
                            <i className='bx bx-search'></i>
                            <input 
                                className='prompt' 
                                type="text" 
                                placeholder='Tìm kiếm...'
                                value={search}
                                onChange={e => handleChange(e.target.value)}
                            />
                        </div>
                        <div className="catalog__filter__widget__title">
                            danh mục sản phẩm
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                category.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <Checkbox
                                            label={item.display}
                                            onChange={(input) => filterSelect("CATEGORY", input.checked, item)}
                                            checked={filter.category.includes(item.categorySlug)}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">
                            giá
                        </div>
                        <div className="catalog__filter__widget__content">
                            {
                                prices.map((item, index) => (
                                    <div key={index} className="catalog__filter__widget__content__item">
                                        <Checkbox
                                            label={item.display}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__content">
                            <Button size="sm" onClick={clearFilter}>xóa bộ lọc</Button>
                        </div>
                    </div>
                </div>
                <div className="catalog__filter__toggle">
                    <Button size="sm" onClick={() => showHideFilter()}>bộ lọc</Button>
                </div>
                <div className="catalog__content">
                    <Grid
                        col={3}
                        mdCol={2}
                        smCol={1}
                        gap={20}
                    >
                        {
                            products.map((item, index) => (
                                <ProductCard 
                                    key={index}
                                    img01={item.image01}
                                    img02={item.image02}
                                    name={item.title}
                                    price={Number(item.price)}
                                    slug={item.slug}
                                />
                            ))
                        }
                        {
                            products.length === 0 && <h1>Không tìm thấy kết quả nào!</h1>
                        }
                    </Grid>
                </div>
            </div>
        </Helmet>
    )
}

export default Catalog
