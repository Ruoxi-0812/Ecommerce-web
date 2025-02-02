const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//user schema

const UserSchema = new mongoose.Schema(
  {
    email: {
      required: [true, "Please enter your E-Mail!"],
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your Password!"],
      minLength: [8, "Password must be at least 8 characters long!"],
    },
    firstName: {
      type: String,
      required: [true, "Please enter your Name"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter your Surname"],
    },
    stripe_customer_id: {
      type: String,
    },
    subscriptions: [],
    isVerified: {
      type: Boolean,
      default: false,
    },
    accountVerificationToken: String,
    accountVerificationTokenExpires: Date,
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    profilePhoto: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_960_720.png",
    },
    role: {
      type: String,
      enum: ["subscriber", "Admin", "freeuser", "influencer"],
      default: "freeuser",
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    isSubscribed: {
      type: String,
    },
    isSubCanceled: {
      type: String,
      enum: ["Active", "ActiveTillEnd"],
    },
    saved: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

//account verification logic
UserSchema.methods.createAccountVerificationToken = async function () {

  //create random bytes
  const verificationToken = crypto.randomBytes(32).toString("hex");

  this.accountVerificationToken = crypto.createHash("sha256").update(verificationToken).digest("hex");

  this.accountVerificationTokenExpires = Date.now() + 30 * 60 * 1000; //10mins time

  return verificationToken;
}

//password reset logic

UserSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; //10mins time to click 

  return resetToken;
}


const User = mongoose.model("User", UserSchema);
module.exports = User;