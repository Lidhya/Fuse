const Conversation = require("../models/Conversation");

module.exports = {
  addNewConvo: async (req, res) => {
    const convo = await Conversation.findOne({
      members: { $all: [req.body.senderId, req.body.receiverId] },
    });
    if (convo?.members) return res.status(200).json({ exist: true });
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
    try {
      newConversation
        .save()
        .then((response) => res.status(200).json(response))
        .catch((error) => {
          res.status(500).json(error);
        });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getUserConvo: async (req, res) => {
    try {
      Conversation.find({
        members: { $in: [req.params.id] },
      })
        .then((response) => res.status(200).json(response))
        .catch((error) => res.status(500).json(error));
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getBothConvo: async (req, res) => {
    try {
      Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      })
        .then((response) => res.status(200).json(response))
        .catch((error) => res.status(500).json(error));
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
