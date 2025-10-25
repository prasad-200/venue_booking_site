const stripe = require('stripe')(process.env.stripe_key);
const Deal = require('../models/deal');
const mongoose = require("mongoose");


const checkout = async (req, res) => {
  const { venueId, eventDate, bill, venueName, venueOwnerId } = req.body;

  try {
    const paymentSession = true; // simulate Stripe session

    if (!venueId || !eventDate || !bill) {
      return res.status(400).json({ msg: "Missing required booking details" });
    }

    if (!paymentSession) {
      return res.status(400).json({ msg: "Payment session not created" });
    }

    // Start MongoDB transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Step 1: Check if this venue is already booked for this date
      const existingDeal = await Deal.findOne({ venueId, eventDate }).session(session);

      if (existingDeal) {
        await session.abortTransaction();
        session.endSession();
        return res
          .status(409)
          .json({ msg: "Venue already booked for this date" });
      }

      // Step 2: Create a new tentative deal
      const deal = new Deal({
        venueId,
        eventDate,
        venueName,
        venueOwnerId,
        bill,
        userId: req.user.id,
        status: "pending", // optional, better than undefined
      });

      const savedDeal = await deal.save({ session });

      // Step 3: Commit transaction
      await session.commitTransaction();
      session.endSession();

      return res.status(201).json({
        msg: "Booking created successfully",
        dealId: savedDeal._id,
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error("Booking transaction failed:", error);
      return res.status(500).json({ msg: "Booking failed", error });
    }
  } catch (e) {
    console.error("Checkout error:", e);
    return res.status(500).json({ msg: "Server error during checkout", e });
  }
};

const confirmDeal = async (req, res) => {
    const { dealId } = req.params;
    console.log(dealId);
    const deal = await Deal.findOneAndUpdate({ _id: dealId }, {
        status: "green"
    });
    res.status(200).json({ deal });
}

const deleteUnconfirmDeal = (req, res) => {
    const { dealId } = req.params;
    Deal.findByIdAndDelete({ _id: dealId })
        .exec((error, deal) => {
            if (!deal) return res.status(200).json({ msg: 'Deal got deleted' });
            if (error) return res.status(400).json({ msg: 'Something went wrong', error });
        })
}

const confirmDealsOfUser = (req, res) => {
    const { userId } = req.params;
    Deal.find({ userId: userId, status: "green" })
        .exec((error, _allDeals) => {
            if (error) return res.status(400).json({ msg: `Something went wrong`, error });
            if (_allDeals) return res.status(200).json({ _allDeals });
        })
}

const confirmDealsOfDealer = (req, res) => {
    const { dealerId } = req.params;
    Deal.find({ venueOwnerId: dealerId, status: "green" })
        .exec((error, _allDeals) => {
            if (error) return res.status(400).json({ msg: `Something went wrong`, error });
            if (_allDeals) return res.status(200).json({ _allDeals });
        })
}

const getDeal = (req, res) => {
    const dealId = req.params;
    Deal.findById({ _id: dealId })
        .exec((error, _deal) => {
            if (error) return res.status(400).json({ msg: `Something went wrong`, error });
            if (_deal) return res.status(200).json({ _deal });
        })
}

module.exports = {
    checkout,
    confirmDealsOfUser,
    confirmDealsOfDealer,
    getDeal,
    confirmDeal,
    deleteUnconfirmDeal
}