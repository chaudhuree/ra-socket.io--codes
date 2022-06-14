import './App.css';

const sendMessage = () => {
  console.log("sendMessage");
}
function App() {
  return (
    <div className="App">
    <input type="text" placeholder="message.." />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default App;
