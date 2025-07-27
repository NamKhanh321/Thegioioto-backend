// phiếu nhập
import mongoose from 'mongoose';
const importSchema = mongoose.Schema({
    importDate: {
        type: Date,
        default: Date.now(),
    },
    deliverer: {
        type: String,
    },
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Provider",
    },
    storageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Storage",
    },
    note: {
        type: String,
    },
});

const importDetailSchema = mongoose.Schema({
    importId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Import",
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    amount: {
        type: Number,
    },
    // đơn giá
    price: {
        type: Number,
    },
    discount: { //chiết khấu
        type: Number,
    }

});

export const Import = mongoose.model('Import', importSchema);
export const ImportDetail = mongoose.model('ImportDetail', importDetailSchema);