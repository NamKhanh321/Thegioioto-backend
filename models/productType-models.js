import mongoose from 'mongoose';

// import dotenv from 'dotenv';
// dotenv.config({quiet: true});

const productTypeSchema = mongoose.Schema({
    productTypeName: {
        type: String,
        required: [true, 'Phải có tên loại sản phẩm'],
        trim: true,
    },

});

export default mongoose.model('ProductType', productTypeSchema);