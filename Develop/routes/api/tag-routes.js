const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  const tags = await Tag.findAll({include:[{model:Product, through:ProductTag, as:'productTag_product',foreignKey:"tag_id"}]})

  return res.json(tags)
    
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
const tags = await Tag.findByPk(req.params.id,{
  include:[{model:Product, through:ProductTag, as:'productTag_product',foreignKey:"tag_id"}]
})

return res.json(tags)
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  const newTag = await Tag.create({tag_name: req.body.tag_name})

  return res.json(newTag)
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
