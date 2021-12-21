import React from "react"
import { Link } from "react-router-dom"

import Helmet from "../components/Helmet"
import HeroSlider from "../components/HeroSlider"
import Section, { SectionTitle, SectionBody } from "../components/Section"
import PolicyCard from "../components/PolicyCard"
import Grid from "../components/Grid"
import ProductCard from "../components/ProductCard"

import policy from "../assets/fake-data/policy"

import banner from "../assets/images/banner/banner-03.jpg"
import { useState } from "react"
import { useEffect } from "react"

import { makeGetRequest } from "../utils/makeRequest"

const Home = () => {
  const [heroSliderData, setHeroSliderData] = useState([])
  const [productsData, setProductsData] = useState([])
  const [newProducts, setNewProducts] = useState([])
  const [popularProducst, setPopularProducts] = useState([])

  useEffect(() => {
    const getHeroSlides = async () => {
      const heroSlides = await makeGetRequest(
        `${process.env.REACT_APP_BACK_END_URL}/products/?limit=3`
      )

      const productsData = await makeGetRequest(
        `${process.env.REACT_APP_BACK_END_URL}/products/?random=4`
      )
      const newPros = await makeGetRequest(
        `${process.env.REACT_APP_BACK_END_URL}/products/?limit=8`
      )
      const popPros = await makeGetRequest(
        `${process.env.REACT_APP_BACK_END_URL}/products/?limit=12`
      )

      setHeroSliderData(heroSlides)
      setProductsData(productsData)
      setNewProducts(newPros)
      setPopularProducts(popPros)
    }

    getHeroSlides()
  }, [])

  return (
    <Helmet title='Trang chủ'>
      {/* HERO SLIDE */}
      <HeroSlider data={heroSliderData} control={true} />
      {/* END HERO SLIDE */}

      {/* POLICY SECTION */}
      <Section>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {policy.map((item, index) => (
              <Link to='/policy' key={index}>
                <PolicyCard
                  name={item.name}
                  description={item.description}
                  icon={item.icon}
                />
              </Link>
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* END POLICY SECTION */}

      {/* BEST SELLING SECTION */}
      <Section>
        <SectionTitle>top sản phẩm bán chạy</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {productsData.map((item) => (
              <ProductCard
                key={item._id}
                img01={item.image0}
                img02={item.image0}
                name={item.title}
                price={Number(item.price)}
                slug={item.categorySlug}
                _id={item._id}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* END BEST SELLING SECTION */}

      {/* NEW PRODUCT SECTION */}
      <Section>
        <SectionTitle>sản phẩm mới</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {newProducts.map((item) => (
              <ProductCard
                key={item._id}
                img01={item.image0}
                img02={item.image0}
                name={item.title}
                price={Number(item.price)}
                slug={item.categorySlug}
                _id={item._id}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* EMD NEW PRODUCT SECTION */}

      {/* BANNER */}
      <Section>
        <SectionBody>
          <Link to='/catalog'>
            <img style={{ width: "100%" }} src={banner} alt='' />
          </Link>
        </SectionBody>
      </Section>
      {/* END BANNER */}

      {/* POPULAR SECTION */}
      <Section>
        <SectionTitle>phổ biến</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {popularProducst.map((item) => (
              <ProductCard
                key={item._id}
                img01={item.image0}
                img02={item.image0}
                name={item.title}
                price={Number(item.price)}
                slug={item.categorySlug}
                _id={item._id}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* END POPULAR SECTION */}
    </Helmet>
  )
}

export default Home
