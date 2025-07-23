import mongoose from 'mongoose';

const providerSchema = mongoose.Schema({
    providerName: {
        type: String,
        required: [true, 'Phải có tên nhà cung cấp'],
    },
    phone: {
        type: String,
        maxLength: [10, 'Số điện thoại phải gồm 10 số'],
        minLength: [10, 'Số điện thoại phải gồm 10 số'],
        required: [true, 'Phải có số điện thoại'],
    },
    address: {
        type: String,
        trim: true,
    },
})

export default mongoose.model('Provider', providerSchema);