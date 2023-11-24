const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const splitDetailsSchema = new Schema({
//     user: userSchema,
//     settlement: settlementSchema
// });

const expenseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  totalAmount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  // paidBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  paidBy: {
    type: String,
    required: true,
  },
  // splitDetails: [splitDetailsSchema]
  splitDetails: [
    {
      user: String,
      settlement: String,
    },
  ],
});

// create mongoose Model
const Expense = mongoose.model("Expense", expenseSchema);

// export the model so other modules can import it
module.exports = {
  Expense,
};
