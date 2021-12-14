import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Section = props => {
    return (
        <div className="section">
            {props.children}
        </div>
    )
}

export const SectionTitle = props => {
    return (
        <div className="section__title">
            <div className="section__title-title">
                {props.children}
            </div>
            <div className="section__title-button">
                <Link to='./catalog'>
                    <Button size="sm">xem thêm</Button>
                </Link>
            </div>
        </div>
    )
}

export const SectionBody = props => {
    return (
        <div className="section__body">
            {props.children}
        </div>
    )
}

export default Section