import FileLoader from './components/FileLoader/FileLoader';
import EmployeeList from './components/EmployeeList/EmployeeList';
import ErrorMsg from './components/ErrorMsg/ErrorMsg';
import './App.css';
import { useState } from 'react';

function App() {
  const [gridData, setGridData] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  /**
   * get app content based on data ana error msg
   * @returns jsx element
   */
  const showContent = () => {
    const content = null;
    if (errorMsg && gridData.length === 0) {
      return (<ErrorMsg message={errorMsg} />);
    } else if (gridData.length > 0) {
      return (<EmployeeList data={gridData} />);
    }
    return content;
  };
  return (
    <div className="App">
      <FileLoader setGridData={setGridData} setErrorMsg={setErrorMsg} />
      {showContent()}
    </div>
  );
}

export default App;
