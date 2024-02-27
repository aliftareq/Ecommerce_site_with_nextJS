import styled from "styled-components";
import ProductBox from "./ProductBox";

const StyledProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    @media screen and (min-width: 768px){
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`

const ProductsGrid = ({ products }) => {
    return (
        <StyledProductsGrid>
            {products?.length && products?.map((product) => (
                <ProductBox key={product._id} {...product} />
            ))}
        </StyledProductsGrid>
    );
};

export default ProductsGrid;