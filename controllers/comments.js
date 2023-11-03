const cloudinary = require("../middleware/cloudinary");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        user:req.user.id
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+ req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  likeComment: async (req, res) => {
    try {
      // console.log(req.params)
      await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      // res.redirect("/feed");
      res.redirect(req.get('referer'));
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find comment by id
      let comment = await Comment.findById({ _id: req.params.id });
      // Delete comment from db
      await comment.remove({ _id: req.params.id });
      console.log("Deleted Comment");
      res.redirect(req.get('referer'));
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
