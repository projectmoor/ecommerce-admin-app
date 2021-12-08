import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Modal from '../../UI/Modal';
import { Row, Col, Container } from "react-bootstrap";
import Input from '../../UI/Input';
import linearCategories from '../../helpers/linearCategories';
import { useSelector, useDispatch } from 'react-redux';
import { createPage } from '../../actions';

const NewPage = () => {

    const [createModal, setCreateModal] = useState(false);
    const [title, setTitle] = useState('');
    const category = useSelector(state => state.category);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [desc, setDesc] = useState('');
    const [type, setType] = useState('');
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const page = useSelector(state => state.page);

    const dispatch = useDispatch();


    useEffect(() => {
        setCategories(linearCategories(category.categories)); // save linear category list to const categories
        // console.log('categories:', categories)
    }, [category]) // work as componentDidMount

    useEffect(() => {
        console.log('NewPage.js useEffect console.log', page)
        if(!page.loading){ // close modal when request is handled
            setCreateModal(false);
            setTitle('');
            setCategoryId('');
            setType('');
            setDesc('');
            setBanners([]);
            setProducts([]);
        }
    }, [page])

    const handleBannerImages = (e) => {
        if(e.target.files[0]){
            setBanners([...banners, e.target.files[0]])
        }
        
    }

    const onCategoryChange = (e) => {
        const category = categories.find(category => category._id == e.target.value);
        setCategoryId(e.target.value);
        setType(category.type);
    }
    
    const handleProductImages = (e) => {
        console.log(e)
        setProducts([...products, e.target.files[0]])
    }

    const submitPageForm = (e) => {
        if(title === ""){
            alert('Title is required');
            setCreateModal(false);
            return;
        }

        const form = new FormData();
        form.append('title', title);
        form.append('description', desc);
        form.append('category', categoryId);
        form.append('type', type);
        banners.forEach((banner, index) => {
            form.append('banners', banner);
        });
        products.forEach((product, index) => {
            form.append('products', product);
        });

        // console.log({title, desc, categoryId, type, banners, products})
        dispatch(createPage(form));
    }

    const renderCreatePageModal = () => {
        return (
            <Modal
                show={createModal}
                modalTitle={'Create New Page'}
                handleClose={() => setCreateModal(false)}
                onSubmit={submitPageForm}
            >
                <Container>
                    <Row>
                        <Col>
                            {/* <select 
                                className="form-control form-control-sm"
                                value={categoryId}
                                onChange={onCategoryChange}
                            >
                                <option value="">select category</option>
                                {
                                    categories.map(cat => 
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    )
                                }
                            </select> */}
                            <Input
                                type="select"
                                value={categoryId}
                                onChange={onCategoryChange}
                                options={categories}
                                placeholder="select category"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={'Page Title'}
                                className="form-control-sm"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Input 
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder={'Page Description'}
                                className="form-control-sm"
                            />
                        </Col>
                    </Row>
                    {banners.length > 0
                        ? banners.map((pic, index) => (
                            <div key={index}>{pic.name}</div>
                            ))
                        : null}
                    <Row>
                        <Col>
                            <Input 
                                className="form-control form-control-sm"
                                type="file"
                                name="banners"
                                onChange={handleBannerImages}
                            />
                        </Col>
                    </Row>
                    {products.length > 0
                        ? products.map((pic, index) => (
                            <div key={index}>{pic.name}</div>
                            ))
                        : null}
                    <Row>
                        <Col>
                            <Input 
                                className="form-control form-control-sm"
                                type="file"
                                name="products"
                                onChange={handleProductImages}
                            />
                        </Col>
                    </Row>
                </Container>
            </Modal>
        )
    }
    return (
        <Layout sidebar>
            {
                page.loading ? 
                <p>Creating Page...please wait</p>
                :
                <>
                {renderCreatePageModal()}
                <button onClick={()=> setCreateModal(true)}>Create Page</button>
                </>
            }
        </Layout>
    );
}

export default NewPage;
