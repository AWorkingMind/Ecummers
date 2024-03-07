import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Typography, Tooltip, Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/slices/cartSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
const ProductSectionItem = ({
                                id,
                                img, // Dette vil nu være strDrinkThumb fra API
                                name, // Dette vil nu være strDrink fra API
                                text, // Dette kan være strInstructions eller anden beskrivende tekst fra API
                            }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigate function

    // Funktion til at håndtere klik og navigere til produktdetaljer
    const handleProductClick = () => {
        navigate(`/product/${id}`); // Naviger til produktdetaljesiden
    };

    return (
        <div onClick={handleProductClick} className="cursor-pointer">
            <Card className="w-80 relative rounded-none bg-gray-200 drop-shadow">

                <CardHeader floated={false} className="h-100 rounded-none">
                    <img src={img} alt={name} />
                </CardHeader>

                <CardBody className="text-center">
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        {name}
                    </Typography>

                </CardBody>

                <CardFooter className="flex justify-center gap-7 pt-2">
                    <Tooltip content="Add to Cart" placement="bottom">
                        <Button className="bg-gray-900 hover:bg-red-900"
                            onClick={(e) => {
                                e.stopPropagation(); // Forhindrer navigation ved klik på knappen
                                dispatch(
                                    addToCart({
                                        id,
                                        img,
                                        name,
                                        // Antag at vi tilføjer en standardpris, da API'et ikke leverer en
                                        price: 100, // Dette er et eksempel, juster efter behov
                                    })
                                );
                            }}
                            ripple={true}
                        >
                            Add to Cart
                        </Button>
                    </Tooltip>
                </CardFooter>
            </Card>
        </div>
    );
};

export default ProductSectionItem;
