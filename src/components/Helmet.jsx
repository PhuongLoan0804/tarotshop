import React from 'react'
import PropTypes from 'prop-types'

const Helmet = props => {

    document.title = 'LonTon - ' + props.title

    React.useEffect(() => {
        window.scroll(0,0)
    }, [])

    return (
        <div>
            {props.children}
        </div>
    )
}

Helmet.propTypes = {
    title: PropTypes.string.isRequired
}

export default Helmet
