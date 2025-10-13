const chatModel = require("../model/chat.model");
const { LoginModel } = require("../model/consultmodel");

exports.FetchUsers = async (req, res) => {
  const response = await LoginModel.find({ userstatus: 3 }).populate("userid");
  res.status(200).json(response);
};

exports.sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    let receiver = receiverId;

    if (!receiverId) {
      // Default receiver is admin if not specified
      const admin = await LoginModel.findOne({ userstatus: 0 }); // Assuming 0 = admin
      if (!admin) return res.status(404).json({ error: "Admin not found" });

      receiver = admin._id;
      console.log(receiver, "admin id from the database");
    }

    const response = await chatModel.create({
      senderId,
      receiverId: receiver,
      message,
    });

    res.status(200).json(response);
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.fetchMessage = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    let receiver = receiverId;

    // If no receiverId is provided, assume it's the admin
    if (!receiverId) {
      const admin = await LoginModel.findOne({ userstatus: 0 }); // assuming 0 = admin
      if (!admin) return res.status(404).json({ error: "Admin not found" });

      receiver = admin._id;
    }

    const messages = await chatModel
      .find({
        $or: [
          { senderId: senderId, receiverId: receiver },
          { senderId: receiver, receiverId: senderId },
        ],
      })
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
