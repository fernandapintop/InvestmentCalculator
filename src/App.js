import ShowForm from "./components/Userinput/Form";
import ShowResults from "./components/ResultsTable/Results";
import Header from "./components/Header/Header";
import { useState } from "react";

function App() {
  const [results, setResults] = useState(null);
  const [initialInvestment, setInitialInvestment] = useState("");

  const calculateHandler = (userInput) => {
    const yearlyData = [];
    const initialInvestmentValue = userInput["current-savings"];
    setInitialInvestment(initialInvestmentValue);

    let currentSavings = +userInput["current-savings"];
    const yearlyContribution = +userInput["yearly-contribution"];
    const expectedReturn = +userInput["expected-return"] / 100;
    const duration = +userInput["duration"];

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }

    setResults(yearlyData);
  };

  return (
    <div>
      <Header />
      <ShowForm onCalculate={calculateHandler} />
      {!results && (
        <p style={{ textAlign: "center" }}>No investment calculate yet</p>
      )}
      {results && (
        <ShowResults data={results} initialInvestment={initialInvestment} />
      )}
    </div>
  );
}

export default App;
