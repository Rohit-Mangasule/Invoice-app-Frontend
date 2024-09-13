import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Index = () => {
  return (
    <div className="container text-center mt-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-8">
          <h1 className="display-4 fw-bold">Welcome to the Invoicing App</h1>
          <p className="lead mt-4">
            Streamline your business processes with our intuitive and easy-to-use invoicing platform.
            Create, manage, and view your invoices effortlessly. Keep track of all your financial
            transactions with complete transparency and efficiency.
          </p>

          <div className="mt-5">
            <img
              src="https://plus.unsplash.com/premium_photo-1679923814036-8febf10a04c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Invoicing app"
              className="img-fluid rounded"
            />
          </div>

          <div className="mt-5">
            <p className="text-muted mb-4">
              Our invoicing app offers you all the tools you need to manage your invoices easily. 
              Whether you're creating invoices for clients or viewing your past transactions, 
              our app helps you stay on top of your business.
            </p>

            <div className="d-grid gap-2 d-md-block">
              <Link to="/create" className="btn btn-primary btn-lg mx-2">
                Create Invoice
              </Link>
              <Link to="/view" className="btn btn-secondary btn-lg mx-2">
                View Invoices
              </Link>
            </div>
            
          </div>
        </div>
        
      </div>
      
    </div>
  );
};

export default Index;
