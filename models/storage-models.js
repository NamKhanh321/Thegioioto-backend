import mongoose from 'mongoose';

const storageSchema = mongoose.Schema({
    storageName: {
        type: String,
        required: [true, 'Phải có tên kho'],
        trim: true,
    },

});

const storageDetailSchema = mongoose.Schema({
    storageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Storage',
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',        
    },
    amount: {
        type: Number,
        default: 0,
    }
})

export default mongoose.model('Storage', storageSchema);

export const StorageDetail = mongoose.model('StorageDetail', storageDetailSchema);