import axios from "axios"
import React, { useState, useEffect } from "react"
import '../styles/SplitModal.css';

function SplitModal({ onMethodChange, showModal, totalAmount, participants, onClose }) {
    const [activeTab, setActiveTab] = useState('equally'); // Default to 'equally'
    const [participantPercentages, setParticipantPercentages] = useState({});

    const handlePercentageChange = (event, participantId) => {
        const newPercentages = { ...participantPercentages, [participantId]: parseFloat(event.target.value) };
        setParticipantPercentages(newPercentages);
      };
      
    const handleAmountChange = (event, participant) => {
    // Update the state to reflect the new amount for this participant
    };

    const calculateAmount = (participantId, totalAmount, percentages) => {
        const percentage = percentages[participantId] || 0;
        return (totalAmount * (percentage / 100));
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
                            $ <input type="number" onChange={(e) => handleAmountChange(e, participant)} />
                        </div>
                    }
                </div>
              ))}
            </div>
            <button onClick={() => onMethodChange(activeTab)}>Save</button>
          </div>
        </div>
      )
    );
}

export default SplitModal;