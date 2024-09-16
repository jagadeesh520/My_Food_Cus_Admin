import './App.css';
import ApprovalListTable from './Components/ApprovalListTable';
import VendorRequest from './Vendor_Request_Service'

function App() {
  return (
    <div className="App">
      <h1>My_Food_Cus_Admin</h1>
      <VendorRequest />
      <ApprovalListTable />
    </div>
  );
}

export default App;
