import Provider from '../models/provider-models.js';
import asyncWrapper from '../middlewares/asyncWrapper.js';
import { BadRequestError, NotFoundError} from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';

export const getAllProvider = asyncWrapper(async (req,res,next) => {
    const providers = await Provider.find({});
    return res.status(StatusCodes.OK).json(providers);
})

export const getProviderById = asyncWrapper(async (req,res,next) => {
    const {id} = req.params;
    const provider = await Provider.find({_id: id});
    if(!provider)
        throw new NotFoundError('Không tìm thấy nhà cung cấp này');
    return res.status(StatusCodes.OK).json(provider);  
})

export const createProvider = asyncWrapper(async (req,res,next) => {
    const {providerName, phone, address} = req.body;
    const existProvider = await Provider.findOne({providerName});
    if(existProvider){
        throw new BadRequestError('Nhà cung cấp đã tồn tại');
    }

    const provider = await Provider.create({phone, address, providerName});
    if(!provider)
        throw new BadRequestError('Tạo nhà cung cấp thất bại!, thông tin không hợp lệ');
    return res.status(StatusCodes.CREATED).json({msg: "Tạo nhà cung cấp thành công"});
} )

export const updateProvider = asyncWrapper(async (req,res,next) => {
    const {id} = req.params;
    const provider = await Provider.findOne({_id: id});
    // const user = await User.findOneAndUpdate({_id: id}, {password, name, role});
    if(!provider)
        throw new NotFoundError('Không tìm thấy nhà cung cấp này');
    const {providerName, phone, address} = req.body;
    provider.providerName = providerName || provider.providerName;
    provider.phone = phone || provider.phone;
    provider.address = address || provider.address
    const updatedProvider = await provider.save();
    res.status(StatusCodes.OK).json(updatedProvider);
})

export const deleteProvider = asyncWrapper(async (req,res,next) => {
    const {id} = req.params;
    const provider = await Provider.findOne({_id: id});
    if(!provider)
        throw new NotFoundError('Không tìm thấy nhà cung cấp này');
    await provider.deleteOne();
    res.status(StatusCodes.OK).json('Xóa nhà cung cấp thành công!');
})