import React from "react"

import Helmet from "../components/Helmet"
import Section, { SectionBody, SectionTitle } from "../components/Section"
import Grid from "../components/Grid"
import ProductCard from "../components/ProductCard"
import ProductView from "../components/ProductView"

import productData from "../assets/fake-data/products"

import { makeGetRequest } from "../utils/makeRequest"
import { useState } from "react"

const Product = (props) => {
  const [product, setProduct] = useState({
    title: "",
    image0: "",
    price: 0,
    categorySlug: "",
  })

  const [relatedProducts, setRelateProducts] = useState([])

  React.useEffect(() => {
    window.scroll(0, 0)
  }, [product])

  React.useEffect(() => {
    const setProductData = async () => {
      const product = await makeGetRequest(
        `${process.env.REACT_APP_BACK_END_URL}/products/${props.match.params.id}`
      )

      const relatedProducts = await makeGetRequest(
        `${process.env.REACT_APP_BACK_END_URL}/products/?limit=8`
      )

      setProduct(product)
      setRelateProducts(relatedProducts)
    }
    setProductData()
  }, [props.match.params.id])

  return (
    <Helmet title={product.title}>
      <Section>
        <SectionBody>
          <ProductView product={product} />
        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>Khám phá thêm</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {relatedProducts.map((item) => (
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
    </Helmet>
  )
}

export default Product
