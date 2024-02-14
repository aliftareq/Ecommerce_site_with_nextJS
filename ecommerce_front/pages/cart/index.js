import Button from '@/components/Button';
import { CartContext } from '@/components/CartContext';
import Center from '@/components/Center';
import Header from '@/components/Header';
import Input from '@/components/Input';
import Table from '@/components/Table';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.2fr .8fr;
    gap:40px;
    margin-top: 40px;
`

const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
`

const ProductInfoCell = styled.td`
    padding: 10px 0;
`

const ProductImageBox = styled.div`
    width: 100px;
    height: 100px;
    padding: 10px;
    border: 1px solid rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    img{
        max-width: 80px;
        max-height: 80px;
    }
`

const QuantityLabel = styled.span`
    padding : 0 3px;

`

const CityHolder = styled.div`
    display: flex;
    gap:5px;

`

const CartPage = () => {
    const { cartProducts, addProduct, removeProduct } = useContext(CartContext)
    const [products, setProducts] = useState([])
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [country, setCountry] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    useEffect(() => {
        if (cartProducts.length > 0) {
            axios.post('/api/cart', { ids: cartProducts })
                .then(response => {
                    setProducts(response.data)
                })
        }
        else {
            setProducts([])
        }
    }, [])

    const moreThisofProduct = (id) => {
        addProduct(id)
    }
    const lessThisofProduct = (id) => {
        removeProduct(id)
    }

    let total = 0;
    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price
    }
    return (
        <>
            <Header />
            <Center>
                <ColumnsWrapper>
                    <Box>
                        {
                            !cartProducts.length && (
                                <div>Your cart is empty</div>
                            )
                        }
                        <h2>Cart</h2>
                        {products.length > 0 && (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map(product => (
                                            <tr>
                                                <ProductInfoCell>
                                                    <ProductImageBox>
                                                        <img src={product.images[0]} alt="" />
                                                    </ProductImageBox>
                                                    {product.title}
                                                </ProductInfoCell>
                                                <td>
                                                    <Button onClick={() => lessThisofProduct(product._id)}>-</Button>
                                                    <QuantityLabel>
                                                        {cartProducts.filter(id => id === product._id).length}
                                                    </QuantityLabel>
                                                    <Button onClick={() => moreThisofProduct(product._id)}>+</Button>
                                                </td>
                                                <td>${cartProducts.filter(id => id === product._id).length * product.price}</td>
                                            </tr>
                                        ))}
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>${total}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        )}
                    </Box>
                    {
                        !!cartProducts.length && (
                            <Box>
                                <h2>Order Information</h2>
                                <form method='post' action='/api/checkout'>
                                    <Input type="text"
                                        placeholder="Name"
                                        value={name}
                                        name="name"
                                        onChange={ev => setName(ev.target.value)} />
                                    <Input type="text"
                                        placeholder="Email"
                                        value={email}
                                        name="email"
                                        onChange={ev => setEmail(ev.target.value)} />
                                    <CityHolder>
                                        <Input type="text"
                                            placeholder="City"
                                            value={city}
                                            name="city"
                                            onChange={ev => setCity(ev.target.value)} />
                                        <Input type="text"
                                            placeholder="Postal Code"
                                            value={postalCode}
                                            name="postalCode"
                                            onChange={ev => setPostalCode(ev.target.value)} />
                                    </CityHolder>
                                    <Input type="text"
                                        placeholder="Street Address"
                                        value={streetAddress}
                                        name="streetAddress"
                                        onChange={ev => setStreetAddress(ev.target.value)} />
                                    <Input type="text"
                                        placeholder="Country"
                                        value={country}
                                        name="country"
                                        onChange={ev => setCountry(ev.target.value)} />
                                    <Button black block type='submit'>Continue to Payment</Button>
                                </form>
                            </Box>
                        )
                    }
                </ColumnsWrapper>
            </Center>
        </>
    );
};

export default CartPage;