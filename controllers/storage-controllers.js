import Storage from '../models/storage-models.js';
import { StorageDetail } from '../models/storage-models.js';
import Product from '../models/product-models.js';
import asyncWrapper from '../middlewares/asyncWrapper.js';
import { BadRequestError, NotFoundError} from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';

export const getAllStorage = asyncWrapper(async (req,res,next) => {
    const storages = await Storage.find({});
    return res.status(StatusCodes.OK).json(storages);
})

export const getStorageById = asyncWrapper(async (req,res,next) => {
    const {id} = req.params;
    const storage = await Storage.findOne({_id: id});
    if(!storage)
        throw new NotFoundError('Không tìm thấy kho này');
    const storageDetails = await StorageDetail.find({storageId: storage._id});
    const filteredStorageDetails = storageDetails.filter(
    (detail) => parseInt(detail.amount, 10) > 0
  );

    const detailPromises = filteredStorageDetails.map(async (storageDetail) => {
        const product = await Product.findOne({_id: storageDetail.productId});
        const productName = product? product.productName : 'Sản phẩm không tồn tại';
        return {productName: productName , amount: storageDetail.amount};
    });

    const details = await Promise.all(detailPromises);
    return res.status(StatusCodes.OK).json({storage, details: details});  
})

export const createStorage = asyncWrapper(async (req,res,next) => {
    const {storageName} = req.body;
    const existStorage = await Storage.findOne({storageName});
    if(existStorage){
        throw new BadRequestError('Kho đã tồn tại');
    }

    const storage = await Storage.create({storageName});
    if(!storage)
        throw new BadRequestError('Tạo kho thất bại!, thông tin không hợp lệ');
    // Khi tạo 1 kho mới, đồng thời tạo các chi tiết kho tương ứng với từng sản phẩm
    const products = await Product.find({});
    const storageDetailsToInsert = products.map((product) => ({storageId: storage._id, productId: product._id}));
    if(storageDetailsToInsert.length > 0){
        await StorageDetail.insertMany(storageDetailsToInsert);
    }

    return res.status(StatusCodes.CREATED).json({msg: "Tạo kho thành công"});
} )

export const updateStorage = asyncWrapper(async (req,res,next) => {
    const {id} = req.params;
    const storage = await Storage.findOne({_id: id});
    if(!storage)
        throw new NotFoundError('Không tìm thấy kho này');

    const {storageName} = req.body;
    const existStorage = await Storage.findOne({storageName});
    if(existStorage){
        throw new BadRequestError('Kho đã tồn tại');
    }
    storage.storageName = storageName || storage.storageName;

    const updatedStorage = await storage.save();
    res.status(StatusCodes.OK).json(updatedStorage);
})

export const deleteStorage = asyncWrapper(async (req,res,next) => {
    const {id} = req.params;
    const storage = await Storage.findOne({_id: id});
    if(!storage)
        throw new NotFoundError('Không tìm thấy kho này');
    const result = await StorageDetail.deleteMany({storageId: storage._id});
    await storage.deleteOne();
    res.status(StatusCodes.OK).json('Xóa kho thành công!');
})