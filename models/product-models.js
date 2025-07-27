import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'Phải có tên sản phẩm'],
    },
    //Thông số sản phẩm
    productDetail: {
        type: String,
    },
    // mã loại sản phẩm
    productTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductType',
    },
    price: {
        type: Number,
        required: [true, 'Phải có giá sản phẩm'],
        min: [0, 'Giá sản phẩm phải lớn hơn hoặc bằng 0']
    },
    image: {
        type: String,
    },
    // mã nhà cung cấp
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
    }
})

// productSchema.pre('save', function(next) {
//     const productDetail = this.productDetail;

//     if (productDetail === null || typeof productDetail === 'undefined') {
//         return next(); // Valid, proceed to save
//     }

//     if (typeof productDetail !== 'object' || Array.isArray(productDetail)) {
//         return next(new BadRequestError('Thông số sản phẩm không hợp lệ: phải là một đối tượng hoặc null/undefined.'));
//     }

//     next();
// });

// Example Usage (in your application code):
// const product = await Product.findById(someProductId);
// if (product) {
//     product.productDetail.newFeature = 'XYZ'; // Modifying a nested property
//     product.productDetail.weight = 1500;     // Updating an existing property
//     product.markModified('productDetail');   // <--- CRUCIAL! Tell Mongoose it changed
//     await product.save();
// }

export default mongoose.model('Product', productSchema);