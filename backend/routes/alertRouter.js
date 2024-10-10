import express from "express";
import Alert from "../models/alertSchema.js";

const Alertrouter = express.Router();

//Creating Alert
Alertrouter.post("/create", async(req, res) => {
    try{
        const {userId, coinId, targetPrice, email} = req.body;

        const newAlert = new Alert({userId, coinId, targetPrice, email});
        await newAlert.save();

        res.status(201).json({
            message: "Alert Created Successfully"
        });
    } catch (error){
        res.status(500).json({error: "Alert couldn't be created"});
    }
});


//Fetching All Alerts
Alertrouter.get('/', async(req, res) => {
    try{
        const alerts = await Alert.find();  
        res.status(200).json(alerts);
    }catch (error){
        res.status(500).json({error: "Failed to fetch alerts"});
    }
});


//Updating Alert
Alertrouter.put('/update/:id', async(req, res) => {
    try{
        const updatedAlert = await Alert.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!updatedAlert) {
            return res.status(404).json({error: "Alert not found"});
        }
        res.status(200).json(updatedAlert);
    } catch(error){
        res.status(500).json({error: "Failed to update alert"});
    }
});


//Deleting Alert
Alertrouter.delete("/delete/:id", async(req, res) => {
    try{
        const deletedAlert = await Alert.findByIdAndDelete(req.params.id);
        if (!deletedAlert) {
            return res.status(404).json({error: "Alert not found"});
        }
        res.status(200).json({message: "Alert deleted successfully"});
    }catch(error){
        res.status(500).json({error: "Failed to delete alert"});
    }
});


export default Alertrouter;