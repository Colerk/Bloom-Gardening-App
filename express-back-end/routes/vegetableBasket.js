const { request } = require('express');
const Express = require('express');
const router = Express.Router();
const db = require('../db/lib/db');
var app = Express();


const getCart = function () {
  return db.query(`SELECT veg_baskets.id, vegetables.name, vegetables.id as vid, vegetables.avatar_url 
  FROM veg_baskets 
  JOIN users ON users.id=veg_baskets.user_id
  JOIN vegetables ON vegetables.id=veg_baskets.vegetable_id 
  WHERE user_id=1`)
    .then(res => {
      return res.rows
    })
    .catch(err => console.log(err));
}

//get cart for user 
router.get('/api/cart/', (req, res) => {
  getCart().then(data => {
    res.json(data)
  })
});

router.delete('/api/cart/:id', (req,res) => {
  const veg_basketID = req.params.id
  db.query(`DELETE FROM veg_baskets WHERE id = $1::integer`, [veg_basketID]) 
   .then(data => {
    res.status(200).json(veg_basketID)
  })
  .catch(err => console.log("error!", err))
})

// /api/cart
router.post('/api/cart', (req, res) => {
  const veg_id = req.body.vegetableID
  const user_id = req.body.userID
  try {
    return db.query(`INSERT INTO veg_baskets(vegetable_id, user_id)
     VALUES($1,$2) RETURNING id`, [veg_id, user_id])
      .then(data => {
        res.status(200).json(data.rows[0].id)
      })
      .catch(err => console.log("error!", err))
  } catch (e) {
    console.error("error: ", e)

  }
})

router.delete("/api/cart/delete/:id", (req, res) => {
  db.query(`DELETE FROM veg_baskets`)
});

module.exports = router