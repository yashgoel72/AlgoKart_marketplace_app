import React, {useState} from "react";
import PropTypes from "prop-types";
import {Badge, Button, Card, Col, FloatingLabel, Form, Stack} from "react-bootstrap";
import {microAlgosToString, truncateAddress} from "../../utils/conversions";
import Identicon from "../utils/Identicon";

const Product = ({address, product, buyProduct, deleteProduct, user_points}) => {
    const {name, image, description, price, sold, appId, owner , points} =
        product;

    const [count, setCount] = useState(1)
    const [use_points, setUsePoints] = useState(0)

    return (
        <Col key={appId}>
            <Card className="h-100">
                <Card.Header>
                    <Stack direction="horizontal" gap={2}>
                        <span className="font-monospace text-secondary">{truncateAddress(owner)}</span>
                        <Identicon size={28} address={owner}/>
                        <Badge bg="secondary" className="ms-auto">
                            {sold} Sold
                        </Badge>
                        <Badge bg="secondary" className="ms-auto">
                            {points} Points/item
                        </Badge>
                    </Stack>
                </Card.Header>
                <div className="ratio ratio-4x3">
                    <img src={image} alt={name} style={{objectFit: "cover"}}/>
                </div>
                <Card.Body className="d-flex flex-column text-center">
                    <Card.Title>{name}</Card.Title>
                    <Card.Text className="flex-grow-1">{description}</Card.Text>
                    <Form className="d-flex align-content-stretch flex-row gap-2">
                        <FloatingLabel
                            controlId="inputCount"
                            label="Count"
                            className="w-25"
                        >
                            <Form.Control
                                type="number"
                                value={count}
                                min="1"
                                max="10"
                                onChange={(e) => {
                                    setCount(Math.min(10,Number(e.target.value)));
                                }}
                            />
                              <Form.Control
                                type="number"
                                value={use_points}
                                min="1"
                                //step="1000"
                                max = {Math.min(user_points ,price)}
                                onChange={(e) => {
                                    setUsePoints( Math.min(Math.min(user_points ,price),Number(e.target.value)));
                                }}
                            />
                        </FloatingLabel>
                        <Button
                            variant="outline-dark"
                            onClick={() => buyProduct(product, count , use_points)}
                            className="w-75 py-3"
                        >
                            Buy for {(microAlgosToString((price * count) - use_points))} ALGO
                        </Button>
                        {product.owner === address &&
                            <Button
                                variant="outline-danger"
                                onClick={() => deleteProduct(product)}
                                className="btn"
                            >
                                <i className="bi bi-trash"></i>
                            </Button>
                        }
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    );
};

Product.propTypes = {
    address: PropTypes.string.isRequired,
    product: PropTypes.instanceOf(Object).isRequired,
    buyProduct: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired
};

export default Product;