import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Table } from "react-bootstrap";
import Layout from "../../components/Layout";
import Input from "../../UI/Input";
import { addProduct, deleteProductById } from "../../actions";
import NewModal from "../../UI/Modal";
import './style.css'
import { generatePublicUrl } from "../../urlConfig";

const Products = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [show, setShow] = useState(false); // to show/hide modal for adding category
  const [productDetailsModal, setProductDetailsModal] = useState(false) // to show or hide productDetailsModal
  const [productDetails, setProductDetails] = useState(null); // stores product details dynamically 
  const category = useSelector((state) => state.category); // get category state from store （used when add new product)
  const product = useSelector((state) => state.product); // get product state from store

  const dispatch = useDispatch();

  // when user click Save, triggers this function
  const handleSubmit = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("description", description);
    form.append("category", categoryId);

    if(productPictures.length < 6) {
      for (let pic of productPictures) {
        form.append("productPicture", pic);
      }
    } else {
      alert("Maximum of 5 pictures allowed");
      return
    }
  
    dispatch(addProduct(form));
    setShow(false);
  };

  const handleClose = () => {
    setShow(false);
  }

  // to show modal for adding product
  const handleShow = () => setShow(true);

  // render category list (linear)
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  // save user selected images to state
  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, ...e.target.files]);
  };

  // display product table
  const renderProducts = () => {
    return (
      <Table style={{ fontSize: 12 }} responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product) => (
                <tr key={product._id}>
                  <td>1</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category.name}</td>
                  <td>
                    <button onClick={() => showProductDetailsModal(product)}>
                      info
                    </button>
                    <button
                      onClick={() => {
                        const payload = {
                          productId: product._id,
                        };
                        dispatch(deleteProductById(payload));
                      }}
                    >
                      del
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  const renderAddProductModal = () => {
    return (
      <NewModal
        modalTitle="Add New Product"
        show={show}
        onSubmit={handleSubmit}
        handleClose={handleClose}
      >
        <Input
          label="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="form-control"
          value={categoryId}
          onChange={(e) => {
            setCategoryId(e.target.value);
          }}
        >
          <option>select category</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}

        <input
          type="file"
          name="productPictures"
          multiple
          onChange={handleProductPictures}
        />
      </NewModal>
    );
  };

  // handle productDetailsModal when [x] is clicked
  const handleCloseProductDetailsModal = () => {
    setProductDetailsModal(false)
  }

  // open modal when a row is clicked in the product table
  const showProductDetailsModal = (product) => {
    setProductDetails(product)
    setProductDetailsModal(true)
  }

  const renderProductDetailsModal = () => {
    if(!productDetails){
      return null
    }

    return (
      <NewModal 
      show={ productDetailsModal }
      handleClose={ handleCloseProductDetailsModal }
      modalTitle="Product Details"
      size="lg"
    >
      <Row>
        <Col md="6">
          <label className="key">Name</label>
          <p className="value">{ productDetails.name }</p>
        </Col>
        <Col md="6">
          <label className="key">Price</label>
          <p className="value">{ productDetails.price }</p>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <label className="key">Quantity</label>
          <p className="value">{ productDetails.quantity }</p>
        </Col>
        <Col md="6">
          <label className="key">Category</label>
          <p className="value">{ productDetails.category.name }</p>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <label className="key">Description</label>
          <p className="value">{ productDetails.description }</p>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <label className="key">Product Pictures</label>
          <div style={{display: 'flex'}}>
            { productDetails.productPictures.map(picture => 
              <div className="productImgContainer">
                <img src={ generatePublicUrl(picture.img) } />
              </div>
            )}
          </div>
        </Col>
      </Row>
    </NewModal>
    )
  }

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Products</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>{renderProducts()}</Col>
        </Row>
      </Container>

      { renderAddProductModal() }
      { renderProductDetailsModal() }
    </Layout>
  );
};

export default Products;
