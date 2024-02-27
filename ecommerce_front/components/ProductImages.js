import { useState } from "react";
import styled from "styled-components";


const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
`

const BigImage = styled.img`
    max-width: 100%;
    max-height: 200px;
`
const ImageWrapper = styled.div`
   text-align: center;
`

const ImageButtons = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap:10px;
    flex-grow: 0;
    margin-top: 10px;
`
const ImageButton = styled.div`
    border: 1px solid #ccc;
    ${props => props.active ? `
        border-color:#ccc;
    ` : `
        border-color:transparent;
        opacity: .5;
    `}
    height: 40px;
    padding: 5px;
    cursor:pointer;
    border-radius: 5px;
    text-align:center;
`
const ProductImages = ({ images }) => {
    const [activeImage, setActiveImage] = useState(images?.[0])
    return (
        <>
            <ImageWrapper>
                <BigImage src={activeImage} />
            </ImageWrapper>
            <ImageButtons>
                {
                    images.map(image => (
                        <ImageButton
                            key={image}
                            active={image === activeImage}
                            onClick={() => setActiveImage(image)}>
                            <Image src={image} />
                        </ImageButton>
                    ))
                }
            </ImageButtons>
        </>
    );
};

export default ProductImages;