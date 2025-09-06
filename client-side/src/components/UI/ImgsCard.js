import React from 'react';
import { Carousel } from 'react-bootstrap';
import { getPublicURL } from '../../urlConfig';

const ImgsCard = (props) => {
    const { img1, img2, alt, style } = props;
    const linkOrUpload=(img)=>{
        return img.startsWith('https') ? img : getPublicURL(img);
    }
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={linkOrUpload(img1)}
                    alt={alt}
                    style={style}
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={linkOrUpload(img2)}
                    alt={alt}
                    style={style}
                />
            </Carousel.Item>
        </Carousel>
    );
}

export { ImgsCard }