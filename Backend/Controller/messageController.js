import { json } from "express"
import { conversationModel } from "../Models/convertionModel.js"
import { messageModel } from "../Models/messageModel.js"
import { getReceiverSocketId, io } from "../Socket/Socket.js"

export const sendMessage = async (req, res) => {
  try {
    // console.log("ee")
    const senderId = req.id
    const receiverId = req.params.id
    // console.log(receiverId)
    const { message } = req.body
    // console.log(message)

    let getConversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    })

    if (!getConversation) {
      getConversation = await conversationModel.create({
        participants: [senderId, receiverId],
      })
    }

    const newMessage = await messageModel.create({
      senderId,
      receiverId,
      message,
    })

    if (newMessage) {
      getConversation.message.push(newMessage._id)
    }

    await Promise.all([getConversation.save(), newMessage.save()]);

    // socket.io

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage);
    }

    return res.status(201).json({
      message: "message send",
      success: true,
      newMessage
    })
  } catch (error) {
    console.log(error)
  }
}


export const getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.id;
    const conversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] }
    }).populate("message");
    const getConversation = conversation?.message;
    return res.status(200).json({
      getConversation,
      success: true
    }

    )

  } catch (error) {
    console.log(error);
    return res.json({
      message: "message is not get",
      success: false,
    })
  }
}