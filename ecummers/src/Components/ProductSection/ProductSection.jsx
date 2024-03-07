import React, { useState, useEffect } from "react";
import ProductSectionItem from "./ProductSectionItem";

const ProductSection = () => {
    const [products, setProducts] = useState([]);
    const [visibleProductsCount, setVisibleProductsCount] = useState(9);

    useEffect(() => {
        // Her antager vi, at API'et returnerer en liste af produkter
        fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=b') // Skift URL til din produkts API
            .then(response => response.json())
            .then(data => {
                // Antag at dataen fra API'en matcher den struktur, du har brug for. Juster dette efter behov.
                setProducts(data.drinks); // Skift "drinks" til den faktiske nøgle, der indeholder produktdata
            })
            .catch(error => console.error('Error fetching product data:', error));
    }, []); // Tomt array sikrer, at dette kun køres ved komponentens første mount



    const handleLoadMore = () => {
        setVisibleProductsCount(prevCount => Math.min(prevCount + 9, products.length)); // Brug products.length i stedet for storeData.length
    };

    // Tjek, om alle produkter er blevet indlæst
    const allProductsLoaded = visibleProductsCount >= products.length;

    return (
        <div>
            <div className="grid grid-cols-3 justify-items-center py-8 gap-4 mx-auto max-w-7xl rounded-2xl mt-5">
                {products.slice(0, visibleProductsCount).map((product, index) => (
                    <div key={index}>
                        <ProductSectionItem
                            id={product.idDrink} // Juster disse props efter dit API's responsstruktur
                            name={product.strDrink}
                            img={product.strDrinkThumb} // Eksempel på en thumbnail. Skift dette til din faktiske billedprop
                            text={product.strInstructions} // Dette er bare et eksempel, skift til relevant prop
                            price={product.price} // Antager at din API inkluderer pris, ellers fjern eller erstat
                            // Fjern de props der ikke matcher din API's data
                        />
                    </div>
                ))}
            </div>
            <div className="text-center mt-4">
                {!allProductsLoaded ? (
                    <button onClick={handleLoadMore} className="px-4 py-2 mb-5 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300">
                        Load More
                    </button>
                ) : (
                    <span className="text-gray-500">You've reached the end. No more products to load.</span>
                )}
            </div>
        </div>
    );
};

export default ProductSection;
