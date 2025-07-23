import Product from '../models/product-models.js';
import asyncWrapper from '../middlewares/asyncWrapper.js';
import { BadRequestError, NotFoundError} from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';

export const getAllProduct = asyncWrapper(async (req,res,next) => {
    const products = await Product.find({});
    return res.status(StatusCodes.OK).json(products);
})

export const getProductById = asyncWrapper(async (req,res,next) => {
    const {id} = req.params;
    const products = await Product.find({_id: id});
    if(!products)
        throw new NotFoundError('Không tìm thấy sản phẩm này');
    return res.status(StatusCodes.OK).json(products);  
})

export const createProduct = asyncWrapper(async (req,res,next) => {
    const {productName, productDetail, productTypeId, price, image, providerId} = req.body;
    const existProduct = await Product.findOne({productName});
    if(existProduct){
        throw new BadRequestError('Sản phẩm đã tồn tại');
    }

    const product = await Product.create({productName, productDetail, productTypeId, price, image, providerId});
    if(!product)
        throw new BadRequestError('Tạo sản phẩm thất bại!, thông tin không hợp lệ');
    return res.status(StatusCodes.CREATED).json({msg: "Tạo sản phẩm thành công"});
} )

export const updateProduct = asyncWrapper(async (req,res,next) => {
    const {id} = req.params;
    const product = await Product.findOne({_id: id});
    // const user = await User.findOneAndUpdate({_id: id}, {password, name, role});
    if(!product)
        throw new NotFoundError('Không tìm thấy sản phẩm này');

    const {productName, productDetail, productTypeId, price, image, providerId} = req.body;
    product.productName = productName || product.productName;
    product.productDetail = productDetail || product.productDetail;
    product.productTypeId = productTypeId || product.productTypeId;
    product.price = price || product.price;
    product.image = image || product.image;
    product.providerId = providerId || product.providerId;

    const updatedProduct = await product.save();
    res.status(StatusCodes.OK).json(updatedProduct);
})

export const deleteProduct = asyncWrapper(async (req,res,next) => {
    const {id} = req.params;
    const product = await Product.findOne({_id: id});
    if(!product)
        throw new NotFoundError('Không tìm thấy sản phẩm này');
    await product.deleteOne();
    res.status(StatusCodes.OK).json('Xóa sản phẩm thành công!');
})