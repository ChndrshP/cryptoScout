import React, {useState} from "react";
import Button from "../components/Button";
import '../styles/AlertCard.css';

const AlertCard = ({alert, onDelete, onUpdate}) => {
    const [isEditing, setIsEditing] =useState(false);
    const [editData, setEditData] = useState({
        coinId: alert.coinId,
        targetPrice: alert.targetPrice
    });

    const {coinId, targetPrice} = editData;

    const onChange = e => setEditData({...editData, [e.target.name]: e.target.value});

    const handleUpdate = e => {
        e.preventDefault();
        onUpdate(editData);
        setIsEditing(false);
    };

    return (
        <div className="alert-card">
            {isEditing ? (
                <form onSubmit={handleUpdate} className="edit-form">
                    <input 
                        type="text" 
                        name="coinId" 
                        value={coinId} 
                        onChange={onChange} 
                        required 
                        placeholder="Coin ID"
                    />
                    <input 
                        type="number" 
                        name="targetPrice" 
                        value={targetPrice} 
                        onChange={onChange} 
                        required 
                        placeholder="Target Price"
                    />
                    <div className="card-buttons">
                        <Button type="submit" variant="primary">Save</Button>
                        <Button onClick={() => setIsEditing(false)} variant="secondary">Cancel</Button>
                    </div>
                </form>
            ) : (
                <>
                    <h3>{alert.coinId}</h3>
                    <p>Target Price: ${alert.targetPrice}</p>
                    <div className="card-buttons">
                        <Button onClick={() => setIsEditing(true)} variant="secondary">Edit</Button>
                        <Button onClick={onDelete} variant="danger">Delete</Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default AlertCard;