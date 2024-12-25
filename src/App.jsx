import { useState } from 'react';
import ProductList from './ProductList';
import './App.css';
import AboutUs from './AboutUs';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({error}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

function App() {

  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  const handleCloseProductList = () => {
    setShowProductList(false);
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="app-container">
        <div className={`landing-page ${showProductList ? 'fade-out' : ''}`}>
          <div className="background-image" />
          <div className="content">
              <h1 style={{marginTop:100}}> Welcome To Paradise Nursery</h1>
              <div className="divider"></div>
              <p>Where Green Meets Serenity</p>
              <button className="get-started-button" onClick={handleGetStartedClick}>
                Get Started
              </button>
            <AboutUs />

          </div>
        </div>
        <div className={`product-list-container ${showProductList ? 'visible' : ''}`}>
          <ProductList onClose={handleCloseProductList} />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;



