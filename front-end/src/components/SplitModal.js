import React, { useState } from "react"
import '../styles/SplitModal.css';

function SplitModal({ onMethodChange, onAmountsChange, showModal, totalAmount, participants, onClose }) {
    const [activeTab, setActiveTab] = useState('equally'); // Default to 'equally'
    const [participantPercentages, setParticipantPercentages] = useState({});
    const [participantAmounts, setParticipantAmounts] = useState({});

    const handlePercentageChange = (event, participantId) => {
        const newPercentages = { ...participantPercentages, [participantId]: parseFloat(event.target.value) };
        setParticipantPercentages(newPercentages);
    };

    const handleAmountChange = (event, participantId) => {
        const newAmounts = { ...participantAmounts, [participantId]: parseFloat(event.target.value) };
        setParticipantAmounts(newAmounts);
    };

    const calculateAmount = (participantId, totalAmount, percentages) => {
        const percentage = percentages[participantId] || 0;
        return (totalAmount * (percentage / 100));
    };

    const handleSave = () => {
        if (activeTab === 'equally') {
            const equalAmount = parseFloat(totalAmount) / participants.length;
            const amounts = participants.reduce((acc, participant) => {
                acc[participant.id] = equalAmount;
                participantAmounts[participant.id] = equalAmount;
                return acc;
            }, {});
            onAmountsChange(amounts);
        } else if (activeTab === 'percentage') {
            const amounts = Object.keys(participantPercentages).reduce((acc, participantId) => {
                const amount = calculateAmount(participantId, totalAmount, participantPercentages);
                acc[participantId] = amount;
                participantAmounts[participantId] = amount;
                return acc;
            }, {});
            onAmountsChange(amounts);
        } else {
            onAmountsChange(participantAmounts);
        }
        onMethodChange(activeTab);
    };
    
  
    return (
      showModal && (
        <div className="split-modal">
          <div className="split-modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <div className="tab">
              <button className={activeTab === "equally" ? "active" : ""} onClick={() => {setActiveTab("equally")}}>=</button>
              <button className={activeTab === "percentage" ? "active" : ""} onClick={() => {setActiveTab("percentage")}}>%</button>
              <button className={activeTab === "amount" ? "active" : ""} onClick={() => {setActiveTab("amount")}}>$</button>
            </div>
            <div className="tab-content">
              {participants.map((participant, index) => (
                <div key={index} className="amountPerPerson">
                    <span>{participant.first_name}</span>
                    {activeTab === 'equally' && 
                        <span>{"$"+(totalAmount / participants.length).toFixed(2)}</span>
                    }
                    {activeTab === 'percentage' && 
                        <div className="percentageContent">
                            <input 
                                type="number" 
                                value={participantPercentages[participant.id] || ''} 
                                onChange={(e) => handlePercentageChange(e, participant.id)} 
                            />% = 
                            <span>
                                {" " + "$"+calculateAmount(participant.id, totalAmount, participantPercentages).toFixed(2)}
                            </span>
                        </div>
                    }
                    {activeTab === 'amount' && 
                        <div>
                            $ <input type="number" onChange={(e) => handleAmountChange(e, participant.id)} />
                        </div>
                    }
                </div>
              ))}
            </div>
            <button onClick={() => {handleSave();}}>Save</button>
          </div>
        </div>
      )
    );
}

export default SplitModal;