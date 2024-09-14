import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateInvoice from './CreateInvoice';
import ViewInvoices from './ViewInvoices';
import Index from './Index.jsx'
import ViewInvoice from './viewInvoice.jsx';
import EditInvoice from './editInvoice.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/view/:id" element={<ViewInvoice />} />
        <Route path="/edit/:id" element={< EditInvoice />} />
        < Route path="/" element={<Index/>}/>
        <Route path="/view" element={<ViewInvoices />} />
        <Route path="/create" element={<CreateInvoice />} />
      </Routes>
    </Router>
  );
}
export default App;
