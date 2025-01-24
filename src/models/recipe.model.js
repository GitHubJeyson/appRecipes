import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    ingredients: [{
        name: { type: String, required: true },
        quantity: { type: String, required: true },
    }],
    instructions: {
        type: String,
        required: true,
    },
    cookingtime: {
        type: {
            hour: { type: Number, default: 0 },
            minute: { type: Number, default: 0 },
        },
        required: true,
    },    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model('Recipe', recipeSchema);