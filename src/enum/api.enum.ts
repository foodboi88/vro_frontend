export enum API_URL {
    HOST = "http://14.231.84.10:6068",
    GET_LATEST_SKETCH = "products/home/latest",
    GET_MOST_VIEWS_SKETCH = "products/home/most-views",
    GET_ALL_TOOLS = "design-tools",
    GET_ALL_ARCHITECTURE = "type-of-architectures",
    GET_ALL_STYLE = "design-styles",
    GET_DETAIL_SKETCH = "products/by-id",
    GET_COMMENTS_BY_SKETCH_ID = "comments",
    ADVANCED_SEARCHING = "products/filter",
    UPLOAD_IMAGE_OF_SKETCH = "product-images",
    UPLOAD_CONTENT_OF_SKETCH = "products",
    UPLOAD_FILES_OF_SKETCH = "product-files",
    LOGIN = "users/login",
    REGISTER = "users/register",
    GET_USER_INFO = "users/profile",
    GET_RATES_BY_SKETCH_ID = "rates/by-id-product",
    GET_PRODUCT_FILE_BY_ID = "product-files/by-id-product",
    ADD_SKETCH_TO_CART = "Carts/add-product-to-cart", // Thêm bản vẽ vào giỏ hàng
    GET_SKETCH_QUANTITY_IN_CART = "Carts/get-quantity-product-my-cart",
    GET_ALL_SKETCH_IN_CART = "Carts/get-product-in-my-cart",
}
