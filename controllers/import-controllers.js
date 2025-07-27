import {Import, ImportDetail} from '../models/import-models.js';
import {StorageDetail} from '../models/storage-models.js';
import asyncWrapper from '../middlewares/asyncWrapper.js';
import { BadRequestError, NotFoundError} from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

export const getAllImport = asyncWrapper(async (req,res,next) => {
    const imports = await Import.find({});
    return res.status(StatusCodes.OK).json(imports);
})

export const getImportById = asyncWrapper(async (req,res,next) => {
    const {id} = req.params;
    const imports = await Import.find({_id: id});
    if(!imports)
        throw new NotFoundError('Không tìm thấy phiếu nhập này');
    return res.status(StatusCodes.OK).json(imports);  
})

export const createImport = asyncWrapper(async (req,res,next) => {
    const {deliverer, providerId, storageId, note, importDetails} = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();

    const newImportOrder = new Import({
        deliverer,
        providerId,
        storageId,
        note
    });
    await newImportOrder.save({session});
    const id = newImportOrder._id;

    // 3. Prepare bulk operations for StorageDetail updates and ImportDetail creations
    const bulkStorageDetailOps = [];
    const bulkImportDetailInserts = [];

    for (const detail of importDetails) {
        // Update/Upsert StorageDetail quantity
        bulkStorageDetailOps.push({
            updateOne: {
                filter: {
                    // Use createFromHexString for string IDs
                    storageId: mongoose.Types.ObjectId.createFromHexString(storageId),
                    productId: mongoose.Types.ObjectId.createFromHexString(detail.productId)
                },
                update: { $inc: { amount: detail.amount } },
                upsert: true, // Create if not exists, update if exists
            },
        });

        // Prepare ImportDetail document for insertion
        bulkImportDetailInserts.push({
            importId: id,
            // Use createFromHexString for string IDs
            productId: mongoose.Types.ObjectId.createFromHexString(detail.productId),
            storageId: mongoose.Types.ObjectId.createFromHexString(storageId), // Store storageId here for detail context
            amount: detail.amount,
        });
    }

    // 4. Execute bulk operations
    if (bulkStorageDetailOps.length > 0) {
        await StorageDetail.bulkWrite(bulkStorageDetailOps, { session });
    }
    if (bulkImportDetailInserts.length > 0) {
        await ImportDetail.insertMany(bulkImportDetailInserts, { session });
    }

    // 5. Commit the transaction
    await session.commitTransaction();
    session.endSession();

    // const imports = await Import.create({deliverer, providerId, storageId, note});
    // if(!imports)
    //     throw new BadRequestError('Tạo phiếu nhập thất bại!, thông tin không hợp lệ');
    return res.status(StatusCodes.CREATED).json({msg: "Tạo phiếu nhập thành công"});
} )

export const updateImport = asyncWrapper(async (req,res,next) => {
    const {id} = req.params;
    const imports = await Import.findOne({_id: id});
    if(!imports)
        throw new NotFoundError('Không tìm thấy phiếu nhập này');

    const {deliverer, providerId, storageId, note} = req.body;
    imports.deliverer = deliverer || imports.deliverer;
    imports.providerId = providerId || imports.providerId;
    imports.storageId = storageId || imports.storageId;
    imports.note = note || imports.note;

    const updatedImport = await Import.save();
    res.status(StatusCodes.OK).json(updatedImport);
})

export const deleteImport = asyncWrapper(async (req,res,next) => {
    const {id} = req.params;
    const imports = await Import.findOne({_id: id});
    if(!imports)
        throw new NotFoundError('Không tìm thấy phiếu nhập này');
    await imports.deleteOne();
    res.status(StatusCodes.OK).json('Xóa phiếu nhập thành công!');
})