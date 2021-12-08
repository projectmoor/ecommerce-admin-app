import React from "react";
import Input from "../../../UI/Input";
import NewModal from "../../../UI/Modal";
import { Row, Col } from "react-bootstrap";

const AddCategoryModal = (props) => {
  const {
    modalTitle,
    show,
    handleClose,
    categoryName,
    setCategoryName,
    parentCategoryId,
    setParentCategoryId,
    categoryList,
    handleCategoryImage,
    onSubmit
  } = props;

  return (
    <NewModal modalTitle={modalTitle} show={show} onSubmit={onSubmit} handleClose={handleClose}>
      <Row>
        <Col>
          <Input
            placeholder="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="form-control-sm"
          />
        </Col>
        <Col>
          <select
            className="form-control form-control-sm"
            value={parentCategoryId}
            onChange={(e) => {
              setParentCategoryId(e.target.value);
            }}
          >
            <option>select category</option>
            {categoryList.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="file"
            name="categoryImage"
            onChange={handleCategoryImage}
          />
        </Col>
      </Row>
    </NewModal>
  );
};

export default AddCategoryModal;
