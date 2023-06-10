const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
const categorys = await Category.findAll(
  { include:[{model:Product, foreignKey:'category_id'}]}
)

return res.json(categorys)
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id,{include:[{model:Product,foreignKey:'category_id'}]}).then((categorysData) => {res.json(categorysData)})
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({ 
    category_name: req.body.category_name,})
    .then((newCategory)=>{
      res.json(newCategory)
      .catch(err => res.json(err))

    }
    )
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },{
    where: {
      id: req.params.id
    }})
    .then((updatedCategory)=>{
      res.json(updatedCategory)
    })
      .catch(err => res.json(err))
   
  
});

router.delete('/:id', (req, res) => {
  Category.destroy(
    {
      where:{
      id: req.params.id
      }
    }
  )
  .then((updatedCategory)=>{
    res.json(updatedCategory)
  })
    .catch(err => res.json(err))
  // delete a category by its `id` value
});

module.exports = router;
