import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/slices/cartSlice';
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const ProductDetails = () => {
    const { productId } = useParams(); // Her antager vi, at productId er et unikt navn eller ID for cocktailen
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Her kunne du hente cocktail data baseret på et unikt ID eller navn
        // Eksempel på en fetch til et fiktivt API, der tillader opslag via ID eller navn
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${productId}`)
            .then(response => response.json())
            .then(data => {
                if (data.drinks && data.drinks.length > 0) {
                    // Antag at vi kun får et resultat tilbage
                    const cocktail = data.drinks[0];
                    setProduct({
                        id: cocktail.idDrink,
                        img: cocktail.strDrinkThumb,
                        name: cocktail.strDrink,
                        text: cocktail.strInstructions,
                        price: 100, // TheCocktailDB indeholder ikke prisinformation, så dette er fiktivt
                    });
                }
            })
            .catch(error => console.log(error));
    }, [productId]);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="product-details-container">
            <Navbar />
            <h1>{product.name}</h1>
            <div className="product-details">
                <img src={product.img} alt={product.name} className="product-image" />
                <div className="product-info">
                    <p>Description: {product.text}</p>
                    <p>Price: ${product.price}</p>
                    <Button
                        onClick={() => {
                            dispatch(addToCart({
                                ...product, // Spread operator to pass all product details
                                amount: 1,

                            }));
                        }}
                        size="lg"
                        color="gray"
                        variant="outlined"
                        ripple={true}
                    >
                        Add to Cart
                    </Button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetails;
