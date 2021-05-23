const router = require("express").Router();
const db = require("../db");
const Game = db.game;

router.get("/all", (req, res) => {
  Game.findAll({ where: { owner_id: req.user.id } }).then(
    function findSuccess(data) {
      res.status(200).json({
        game: data,
        message: "Data fetched.",
      });
    },

    function findFail() {
      res.status(500).json({
        message: "Data not found",
      });
    }
  );
});

router.get("/:id", (req, res) => {
  Game.findOne({ where: { id: req.params.id, owner_id: req.user.id } }).then(
    function findSuccess(game) {
      if (game !== null) {
        res.status(200).json({
          game: game,
        });
      } else {
        res.status(500).json({
          message: "Data not found.",
        });
      }
    },

    function findFail(err) {
      res.status(500).json({
        message: "Data not found.",
      });
    }
  );
});

router.post("/create", (req, res) => {
  Game.create({
    title: req.body.Game.title,
    owner_id: req.user.id,
    studio: req.body.Game.studio,
    esrb_rating: req.body.Game.esrb_rating,
    user_rating: req.body.Game.user_rating,
    have_played: req.body.Game.have_played,
  }).then(
    function createSuccess(game) {
      res.status(200).json({
        game: game,
        message: "Game created.",
      });
    },

    function createFail(err) {
      res.status(500).send(err.message);
    }
  );
});

router.put("/update/:id", (req, res) => {
  Game.update(
    {
      title: req.body.Game.title,
      studio: req.body.Game.studio,
      esrb_rating: req.body.Game.esrb_rating,
      user_rating: req.body.Game.user_rating,
      have_played: req.body.Game.have_played,
    },
    {
      where: {
        id: req.params.id,
        owner_id: req.user.id,
      },
    }
  ).then(
    function updateSuccess(game) {
      if (game === 0) {
        res.status(200).json({
          game: game,
          message: "Successfully updated.",
        });
      } else {
        res.status(200).json({
          game: game,
          message: "Game not found.",
        });
      }
    },

    function updateFail(err) {
      res.status(500).json({
        message: err.message,
      });
    }
  );
});

router.delete("/remove/:id", (req, res) => {
  Game.destroy({
    where: {
      id: req.params.id,
      owner_id: req.user.id,
    },
  }).then(
    function deleteSuccess(game) {
      if (game === 1) {
        res.status(200).json({
          game: game,
          message: "Successfully deleted",
        });
      } else {
        res.status(200).json({
          message: "Not found",
        });
      }
    },

    function deleteFail(err) {
      res.status(500).json({
        error: err.message,
      });
    }
  );
});

module.exports = router;
