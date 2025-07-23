import ProductType from '../models/productType-models.js';
import asyncWrapper from '../middlewares/asyncWrapper.js';
import { BadRequestError, NotFoundError} from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';

export const getAllProductType = asyncWrapper(async (req,res,next) => {
    const productType = await ProductType.find({});
    return res.status(StatusCodes.OK).json(productType);
})

export const getProductTypeById = asyncWrapper(async (req,res,next) => {
    const {id} = req.params;
    const productType = await ProductType.find({_id: id});
    if(!productType)
        throw new NotFoundError('Không tìm thấy loại sản phẩm này');
    return res.status(StatusCodes.OK).json(productType);  
})

export const createProductType = asyncWrapper(async (req,res,next) => {
    const {productTypeName} = req.body;
    const existProductType = await ProductType.findOne({productTypeName});
    if(existProductType){
        throw new BadRequestError('Loại sản phẩm đã tồn tại');
    }

    const productType = await ProductType.create({productTypeName});
    if(!productType)
        throw new BadRequestError('Tạo loại sản phẩm thất bại!, thông tin không hợp lệ');
    return res.status(StatusCodes.CREATED).json({msg: "Tạo loại sản phẩm thành công"});
} )

export const updateProductType = asyncWrapper(async (req,res,next) => {
    const {id} = req.params;
    const productType = await ProductType.findOne({_id: id});
    // const user = await User.findOneAndUpdate({_id: id}, {password, name, role});
    if(!productType)
        throw new NotFoundError('Không tìm thấy loại sản phẩm này');

    const {productTypeName} = req.body;
    productType.productTypeName = productTypeName || productType.productTypeName;

    const updatedProductType = await productType.save();
    res.status(StatusCodes.OK).json(updatedProductType);
})

export const deleteProductType = asyncWrapper(async (req,res,next) => {
    const {id} = req.params;
    const productType = await ProductType.findOne({_id: id});
    if(!productType)
        throw new NotFoundError('Không tìm thấy loại sản phẩm này');
    await productType.deleteOne();
    res.status(StatusCodes.OK).json('Xóa loại sản phẩm thành công!');
})