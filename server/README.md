# e-commerce
### API Route

Route | HTTP | Header | Body | Response | Description | Validation
-- | -- | -- | -- | -- | -- | --
`/product` | POST | token | { name, description, price, stock} | {_id, name, description, price, stock} | Input product info | -
`/product` | GET | - | - | [{ _id, name, description, price, stock}] | Get list of products | -
`/product/:productId` | GET | - | - | { _id, name, description, price, stock} | Read product info | -
`/product/:productId` | PATCH | token | { name, description, price, stock} | { _id, name, description, price, stock } | Update product info | -
`/product/:productId` | DELETE | token | - | - | Delete product info | -
`/cart/:productId` | POST | token | - | [{products}] | Add product to cart | -
`/cart/:productId` | DELETE | token | - | - | Remove product to cart | -
`/user/register` | POST | - | {username, email, password} | 201 | Create an account | -
`/user/login` | POST | - | { email, password } | - |Login | -