import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {createAlert, getAlerts, updateAlert, deleteAlert} from "../services/alertServices";
import Button from "../components/Button";
import AlertCard from "../components/AlertCard";
import '../styles/AlertPage.css';

const AlertPage = () => {
    const { authToken } = useContext(AuthContext);
    const [alerts, setAlerts] = useState([]);
    const [formData, setFormData] = useState({
        coinId: '',
        targetPrice:''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const{coinId, targetPrice} = formData;

    useEffect(() => {
        const fetchAlerts = async () => {
            try{
                const data = await getAlerts(authToken);
                setAlerts(data);
            }catch(err){
                setError('Failed to fetch alerts');
            }
        };
        fetchAlerts()
    }, [authToken]);

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try{
            const newAlert = await createAlert({
                coinId,
                targetPrice,
                email: 'chandresh2003cp@gmail.com'
            }, authToken);
            setAlerts([...alerts, newAlert]);
            setFormData({coinId:'', targetPrice:''});
        }catch(err){
            setError(err.response?.data?.error || 'Failed to create alert');
        }finally{
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteAlert(id, authToken);
            setAlerts(alerts.filter(alert => alert._id !== id));
        } catch (err) {
            setError('Failed to delete alert');
        }
    };

    const handleUpdate = async (id, updatedData) => {
        try {
            const updatedAlert = await updateAlert(id, updatedData, authToken);
            setAlerts(alerts.map(alert => alert._id === id ? updatedAlert : alert));
        } catch (err) {
            setError('Failed to update alert');
        }
    };

    return (
        <div className="alert-page">
            <h2>Your Price Alerts</h2>
            {error && <div className="error-message">{error}</div>}
            <form className="alert-form" onSubmit={onSubmit}>
                <label htmlFor="coinId">Coin ID</label>
                <input 
                    type="text" 
                    id="coinId" 
                    name="coinId" 
                    value={coinId} 
                    onChange={onChange} 
                    required 
                    placeholder="e.g., bitcoin"
                />

                <label htmlFor="targetPrice">Target Price (USD)</label>
                <input 
                    type="number" 
                    id="targetPrice" 
                    name="targetPrice" 
                    value={targetPrice} 
                    onChange={onChange} 
                    required 
                    placeholder="e.g., 30000"
                />

                <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Alert'}
                </Button>
            </form>

            <div className="alerts-list">
                {alerts.length > 0 ? (
                    alerts.map(alert => (
                        <AlertCard 
                            key={alert._id} 
                            alert={alert} 
                            onDelete={() => handleDelete(alert._id)}
                            onUpdate={(updatedData) => handleUpdate(alert._id, updatedData)}
                        />
                    ))
                ) : (
                    <p>No alerts found. Create one!</p>
                )}
            </div>
        </div>
    );
};

export default AlertPage;