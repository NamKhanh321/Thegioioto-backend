// phiếu nhập
import mongoose from 'mongoose';
const exportSchema = mongoose.Schema({
    importDate: {
        type: Date,
    },
    creator: {
        type: String,
    },
    // tổng tiền xuất phiếu
    price: {
        type: Number,
    },
    storageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Storage",
    },
    note: {
        type: String,
    },
});

const exportDetailSchema = mongoose.Schema({
    exportId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Export",
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    amount: {
        type: Number,

    },
    price: {
        type: Number,
    },

});

export const Export = mongoose.model('Export', exportSchema);
export const ExportDetail = mongoose.model('ExportDetail', exportDetailSchema);