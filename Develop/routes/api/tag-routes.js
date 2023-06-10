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

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const updatedTag = await Tag.update({tag_name: req.body.tag_name},{where:{id:req.params.id}})
  return res.json(updatedTag)
});

router.delete('/:id', async (req, res) => {
  try{
    const TagData = await Tag.destroy({
      where:{
        id: req.params.id
      }
    })
    res.status(200).json(TagData)
  }catch(err){
    res.status(500).json(err)
  }
});

module.exports = router;
