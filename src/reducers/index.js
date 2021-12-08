import { combineReducers } from 'redux'
import authReducers from './auth.reducers'
import userReducers from './user.reducers'
import categoryReducers from './category.reducers'
import productReducers from './product.reducers'
import orderReducers from './order.reducers'
import pageReducers from './page.reducers'

const rootReducer = combineReducers({
    auth: authReducers,
    user: userReducers,
    category: categoryReducers,
    product: productReducers,
    order: orderReducers,
    page: pageReducers
})

export default rootReducer