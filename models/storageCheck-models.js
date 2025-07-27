import mongoose from 'mongoose';

// bảng phiếu kiểm kho
const storageCheckSchema = mongoose.Schema({
    // ngày kiểm kho
    checkDate: {
        type: Date,
    },
    storageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Storage",
    },
    // người kiểm kho
    checker: {
        type: String
    },
    note: {
        type: String,
    }
});

// bảng chi tiết phiếu kiểm kho
const storageCheckDetailSchema = mongoose.Schema({
    storageCheckId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StorageCheck',
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',        
    },
    // số lượng còn
    remaining: {
        type: Number,
    },
    // tình trạng
    status: {
        type: String,
        enum: ['good', 'expired', 'damaged'] // còn tốt, đã hết hạn, hàng hỏng
    }
})

export const StorageCheck = mongoose.model('StorageCheck', storageCheckSchema);

export const StorageCheckDetail = mongoose.model('StorageCheckDetail', storageCheckDetailSchema);