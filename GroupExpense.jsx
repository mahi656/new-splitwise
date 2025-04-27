import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GroupExpense.css';

const GroupDetailsModal = ({ group, onClose }) => {
  const [memberAmounts, setMemberAmounts] = useState(() => {
    if (!group?.members?.length || !group?.amount) return [0];
    const amount = parseFloat(group.amount) / group.members.length;
    return group.members.map(() => isNaN(amount) ? 0 : amount);
  });
  const [showCalculator, setShowCalculator] = useState(null);

  const handleCalculation = (index, operation, value) => {
    if (!value || isNaN(parseFloat(value))) return;
    
    const amounts = [...memberAmounts];
    const currentAmount = amounts[index];
    let newAmount = currentAmount;
    
    try {
      switch(operation) {
        case 'add':
          newAmount = currentAmount + parseFloat(value);
          break;
        case 'subtract':
          newAmount = currentAmount - parseFloat(value);
          break;
        case 'multiply':
          newAmount = currentAmount * parseFloat(value);
          break;
        case 'divide':
          if (parseFloat(value) === 0) throw new Error('Cannot divide by zero');
          newAmount = currentAmount / parseFloat(value);
          break;
        case 'discount':
          newAmount = currentAmount * (1 - (parseFloat(value) / 100));
          break;
        default:
          break;
      }
      
      if (!isNaN(newAmount)) {
        amounts[index] = newAmount;
        setMemberAmounts(amounts);
      }
    } catch (error) {
      console.error('Calculation error:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content group-details-modal">
        <div className="group-header">
          <div className="group-title">
            <span className="group-icon">{group.icon}</span>
            <h2>{group.groupName}</h2>
          </div>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="group-info">
          <p><strong>Purpose:</strong> {group.purpose}</p>
          <p><strong>Total Amount:</strong> {group.currency || '₹'}{parseFloat(group.amount).toFixed(2)}</p>
          <p><strong>Paid by:</strong> {group.paidBy}</p>
          <p><strong>Date:</strong> {group.date || 'N/A'} {group.time ? `| ${group.time}` : ''}</p>
          <p><strong>Description:</strong> {group.description || 'No description'}</p>
        </div>

        <div className="split-section">
          <h3>Split Amount (per person)</h3>
          <div className="split-calculator">
            <input
              type="text"
              value={(parseFloat(group?.amount || 0) / (group?.members?.length || 1)).toFixed(2)}
              className="input"
              readOnly
            />
            <div className="calculator-buttons">
              <button onClick={() => {
                const perPersonAmount = parseFloat(group?.amount || 0) / (group?.members?.length || 1);
                const safeAmount = isNaN(perPersonAmount) ? 0 : perPersonAmount;
                setMemberAmounts(group?.members?.map(() => safeAmount) || [0]);
              }}>
                Split Equally ({group?.currency || '₹'}{(parseFloat(group?.amount || 0) / (group?.members?.length || 1)).toFixed(2)})
              </button>
            </div>
          </div>
        </div>

        <div className="members-list">
          {group.members.map((member, index) => (
            <div key={index} className="member-split-item">
              <div className="member-info">
                <span className="member-avatar">{member.avatar}</span>
                <div className="member-details">
                  <span className="member-name">{member.name}</span>
                  <span
                    className="member-owe"
                    style={{ color: member.owe === group.paidBy ? '#4CAF50' : '#FF9800' }}
                  >
                    {member.owe === group.paidBy ? 'Paid' : 'Owes'}
                  </span>
                </div>
              </div>
              <div className="member-amount-section">
                <span className="member-amount">{group.currency || '₹'}{memberAmounts[index].toFixed(2)}</span>
                <button
                  className="edit-amount-button"
                  onClick={() => setShowCalculator(showCalculator === index ? null : index)}
                >
                  Edit
                </button>
                {showCalculator === index && (
                  <div className="calculator-popup">
                    <div className="calculator-row">
                      <input
                        type="number"
                        defaultValue={memberAmounts[index].toFixed(2)}
                        className="calc-input"
                        id={`calc-value-${index}`}
                        style={{ appearance: 'textfield' }}
                      />
                      <select className="calc-operation" id={`calc-operation-${index}`}>
                        <option value="add">Add (+)</option>
                        <option value="subtract">Subtract (-)</option>
                        <option value="multiply">Multiply (×)</option>
                        <option value="divide">Divide (÷)</option>
                        <option value="discount">Discount (%)</option>
                      </select>
                      <button
                        onClick={() => {
                          const value = document.getElementById(`calc-value-${index}`).value;
                          const operation = document.getElementById(`calc-operation-${index}`).value;
                          handleCalculation(index, operation, value);
                        }}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const GroupExpense = () => {
  const navigate = useNavigate();
  const [currency, setCurrency] = useState('₹');
  const [expenseData, setExpenseData] = useState({
    purpose: '',
    groupTotal: '',
    memberCount: 0,
    splitWith: [],
    date: '',
    time: '',
    description: '',
  });

  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [memberName, setMemberName] = useState('');
  const [payerName, setPayerName] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [showGroupDetails, setShowGroupDetails] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupProfile, setGroupProfile] = useState({
    name: 'Default Group',
    icon: '👥',
    paidBy: ''
  });

  const updateGroupProfile = (newName, newIcon, newPaidBy) => {
    setGroupProfile({
      name: newName || groupProfile.name,
      icon: newIcon || groupProfile.icon,
      paidBy: newPaidBy !== undefined ? newPaidBy : groupProfile.paidBy
    });
  };

  const handleAddMember = () => {
    if (memberName.trim()) {
      setExpenseData(prev => ({
        ...prev,
        splitWith: [...prev.splitWith, {
          name: memberName.trim(),
          avatar: '👤',
          owe: payerName
        }],
        memberCount: prev.splitWith.length + 1
      }));
      setMemberName('');
      setShowAddMemberModal(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!expenseData.groupTotal || !expenseData.purpose) {
      alert('Please enter a purpose and total amount');
      return;
    }
    
    if (!expenseData.splitWith.length) {
      alert('Please add at least one member');
      return;
    }
    
    updateGroupProfile(expenseData.purpose, null, payerName);
    setShowSuccessModal(true);
  };

  const handleGotIt = () => {
    setShowSuccessModal(false);
    setTransactions(prev => [...prev, {
      groupName: expenseData.purpose || groupProfile.name,
      icon: groupProfile.icon,
      purpose: expenseData.purpose,
      amount: expenseData.groupTotal,
      currency: currency,
      date: expenseData.date,
      time: expenseData.time,
      members: expenseData.splitWith,
      description: expenseData.description,
      paidBy: payerName
    }]);
    
    // Reset form
    setExpenseData({
      purpose: '',
      groupTotal: '',
      memberCount: 0,
      splitWith: [],
      date: '',
      time: '',
      description: '',
    });
    setPayerName('');
    updateGroupProfile('Default Group', '👥', '');
  };

  return (
    <div className="container">
      {showSuccessModal ? (
        <div className="modal">
          <div className="modal-content">
            <div className="success-icon">✓</div>
            <span className="sparkle-1">✦</span>
            <span className="sparkle-2">✦</span>
            <span className="sparkle-3">✦</span>
            <span className="sparkle-4">✦</span>
            <h2>Group expense added!</h2>
            <p>Your group has been notified and splits are processing.</p>
            <button className="got-it-button" onClick={handleGotIt}>Got it</button>
          </div>
        </div>
      ) : (
        <>
          <div className="header">
            <button className="back-button" onClick={() => navigate("/")}>←</button>
            <h1 className="header-title">Create Group Expense</h1>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-columns">
              <div className="left-column">
                <div className="form-group">
                  <label className="label">What's this for?</label>
                  <input
                    className="input"
                    type="text"
                    value={expenseData.purpose}
                    onChange={(e) => setExpenseData({...expenseData, purpose: e.target.value})}
                    placeholder="Enter purpose"
                  />
                </div>

                <div className="form-group">
                  <label className="label">Group total expense</label>
                  <div className="expense-input-container">
                    <select 
                      className="currency-select"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      style={{ width: '50px', fontSize: '0.9em', padding: '4px' }}
                    >
                      <option value="₹">₹ (INR)</option>
                      <option value="£">£ (GBP)</option>
                      <option value="$">$ (USD)</option>
                      <option value="€">€ (EUR)</option>
                      <option value="¥">¥ (JPY)</option>
                      <option value="A$">A$ (AUD)</option>
                      <option value="C$">C$ (CAD)</option>
                      <option value="CHF">CHF (Swiss Franc)</option>
                      <option value="CNY">CNY (Chinese Yuan)</option>
                    </select>
                    <input
                      className="input"
                      type="text"
                      value={expenseData.groupTotal}
                      onChange={(e) => setExpenseData({...expenseData, groupTotal: e.target.value})}
                      placeholder="0.00"
                      style={{ fontSize: '1.5em', padding: '8px', width: 'calc(100% - 60px)' }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="label">Split with</label>
                  <div className="members-container">
                    <div className="members-grid">
                      {expenseData.splitWith.map((member, index) => (
                        <div key={index} className="member-item">
                          <div className="member-content">
                            <div className="member-avatar-wrapper">
                              <div className="member-avatar">{member.avatar}</div>
                              <button
                                type="button"
                                className="remove-member"
                                onClick={() => {
                                  setExpenseData(prev => ({
                                    ...prev,
                                    splitWith: prev.splitWith.filter((_, i) => i !== index),
                                    memberCount: prev.splitWith.length - 1
                                  }));
                                }}
                              >
                                -
                              </button>
                            </div>
                            <span className="member-name">{member.name}</span>
                            <span className="member-owe">{member.owe === payerName ? 'Paid' : 'Owes'}</span>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="add-member-button"
                        onClick={() => setShowAddMemberModal(true)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="label">Who Paid</label>
                  <input
                    className="input"
                    type="text"
                    value={payerName}
                    onChange={(e) => setPayerName(e.target.value)}
                    placeholder="Enter name of person who paid"
                  />
                </div>
              </div>

              <div className="right-column">
                <div className="date-time-container">
                  <div className="form-group" style={{ flex: 1, marginRight: '10px' }}>
                    <label className="label">Date</label>
                    <input
                      className="input"
                      type="date"
                      value={expenseData.date}
                      onChange={(e) => setExpenseData({...expenseData, date: e.target.value})}
                    />
                  </div>

                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="label">Time</label>
                    <input
                      className="input"
                      type="time"
                      value={expenseData.time}
                      onChange={(e) => setExpenseData({...expenseData, time: e.target.value})}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="label">Description</label>
                  <textarea
                    className="input"
                    value={expenseData.description}
                    onChange={(e) => setExpenseData({...expenseData, description: e.target.value})}
                    placeholder="Add a description"
                    style={{ minHeight: "100px" }}
                  />
                </div>
              </div>
            </div>

            <button className="submit-button" type="submit">ADD GROUP EXPENSE</button>
          </form>

          <div className="transactions-section">
            <div className="transactions-header">
              <h2>All Transactions</h2>
              <button className="view-all-button">View All</button>
            </div>
            <div className="transactions-list">
              {transactions.map((transaction, index) => (
                <div
                  key={index}
                  className="transaction-item"
                  onClick={() => {
                    setSelectedGroup(transaction);
                    setShowGroupDetails(true);
                  }}
                >
                  <div className="transaction-icon-container">
                    <span className="transaction-icon">{transaction.icon}</span>
                  </div>
                  <div className="transaction-details">
                    <h3>{transaction.groupName}</h3>
                    <p>{transaction.date || "N/A"} {transaction.time ? `| ${transaction.time}` : ""}</p>
                    <p><strong>Paid by:</strong> {transaction.paidBy}</p>
                  </div>
                  <div className="transaction-amount">
                    {transaction.currency || '₹'}{parseFloat(transaction.amount).toFixed(2)}
                  </div>
                </div>
              ))}
              {transactions.length === 0 && (
                <p style={{ textAlign: "center", color: "#888" }}>
                  No transactions available
                </p>
              )}
            </div>
          </div>
        </>
      )}

      {showAddMemberModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add Member</h2>
            <input
              className="input"
              type="text"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
              placeholder="Enter member name"
            />
            <div className="modal-buttons">
              <button className="cancel-button" onClick={() => setShowAddMemberModal(false)}>
                Cancel
              </button>
              <button className="add-button" onClick={handleAddMember}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {showGroupDetails && selectedGroup && (
        <GroupDetailsModal
          group={selectedGroup}
          onClose={() => setShowGroupDetails(false)}
        />
      )}
    </div>
  );
};

export default GroupExpense;
