const express = require('express');
const router = express.Router();
const MenuItem = require('../models/menu');

router.post('/', async (req, res)=>{
    try{
        const data = req.body
        const newMenu = MenuItem(data)
        await newMenu.save();
        res.json({success: "New menu item created successfully"})
    }catch(err){
        res.json({error: `Something went wrong ${err}`})
    }
});

router.get('/', async (req, res)=>{
    try{
        const data = await MenuItem.find();
        res.json(data);
    } catch(err){
        res.json({error: `Somthing went wrong ${err}`})
    }
});

router.get('/:menuType', async(req, res)=>{
    try{
        const menuType = req.params.menuType;
        if(menuType=='sweet' || menuType=='sour' || menuType=='spicy'){
            const responseData = await MenuItem.find({taste:menuType});
            res.json(responseData);
        }else{
            res.json({error: "Invalid menu type input"})
        }
        
    }catch(err){
        res.json({error:`Something went wrong ${err}`})
    }
});

router.put('/:id', async(req, res)=>{
    try{
        const id = req.params.id;
        const updateMenuData = req.body;

        const responseData = await MenuItem.findByIdAndUpdate(id, updateMenuData,{
            new: true,
            runValidators: true,
        });

        if(!responseData){
            res.json({error: "Menu item not found"});
        }

        res.json(responseData);

    }catch(err){
        res.json({error:`Something went wrong ${err}`})
    }
});

router.delete("/:id", async(req, res)=>{
    try{
        const id = req.params.id;
    const response = await MenuItem.findByIdAndDelete(id);

    if(!response){
        res.json({error: "Menu item not found"});
    }
    res.json({message: "Menu item deleted successfully"})
    
    } catch(err){
        res.json({error:`Something went wrong ${err}`})
    }
});

module.exports = router;