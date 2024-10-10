import express from "express";
import Alert from "../models/alertSchema.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const Alertrouter = express.Router();

//Creating Alert
Alertrouter.post("/create", authMiddleware, async(req, res) => {
    try{
        const{coinId, targetPrice, email} = req.body;

        const newAlert = new Alert({
            userId: req.user,
            coinId,
            targetPrice,
            email
        });
        await newAlert.save();

        res.status(201).json({
            message: "Alert created successfully"
        });
    }catch(error){
        console.error("Error creating alert:", error);
        res.status(500).json({
            error: "Alert not created"
        });
    }
});


//Fetching All Alerts
Alertrouter.get('/', authMiddleware ,async(req, res) => {
    try{
        const alert = await Alert.find({
            userId: req.user
        });
        res.status(200).json(alert);
    }catch(error){
        console.error("Error fetching alerts:", error);
        res.status(500).json({
            error: "Failed to fetch alerts"
        });
    }
});

//Fetching One Alerts
Alertrouter.get('/:id', authMiddleware ,async(req, res) => {
    try{
        const alert = await Alert.find({
            _id: req.param.id,
            userId: req.user
        });
        if(!alert){
            return res.status(404).json({
                error: "Alert not found"
            });
        }

        res.status(200).json(alert);
    }catch(error){
        console.error("Error fetching alerts:", error);
        res.status(500).json({
            error: "Failed to fetch alerts"
        });
    }
});


//Updating Alert
Alertrouter.put('/update/:id', authMiddleware, async (req, res) => {
    try {
        const { targetPrice } = req.body; 

        if (!targetPrice) {
            return res.status(400).json({
                error: "Target price is required to update"
            });
        }

        const updatedAlert = await Alert.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user 
            },
            { targetPrice }, 
            { new: true }  
        );

        if (!updatedAlert) {
            return res.status(404).json({
                error: "Alert not found"
            });
        }

        res.status(200).json(updatedAlert);
    } catch (error) {
        console.error("Error updating alert:", error);
        res.status(500).json({
            error: "Failed to update alert"
        });
    }
});


//Deleting Alert
Alertrouter.delete("/delete/:id", authMiddleware, async(req, res) => {
    try{      
        const deletedAlert = await Alert.findOneAndDelete({
            _id:req.params.id,
            userId: req.user
        })
        if(!deletedAlert){
            return res.status(404).json({
                error: "Alert not found"
            });
        }
        res.status(200).json({
            message: "Alert deleted successfully"
        });
    }catch(error){
        console.error("Error deleting alert:", error);
        res.status(500).json({
            error: "Failed to delete Alert"
        });
    }
});

export default Alertrouter;