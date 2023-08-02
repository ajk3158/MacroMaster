import React, { useState, useEffect } from 'react';
import { AppWrap } from '../../wrapper';
import './Calculator.scss';

const Calculator = () => {

  //Defines array of foods
  const [foods, setFoods] = useState(false);
  const [resultFoods, setResultFoods] = useState(false);

  const [proteinAmount, setProteinAmount] = useState(0);

  useEffect(() => {
    getFoods();
    setProteinAmount(document.getElementById('Weight').value);
  });


  //Stops form from refreshing page when submit button is clicked
  function CalculateFoods() {
    //console.log(proteinAmount);
    //console.log(foods);
    document.getElementById("calculate").scrollIntoView({ behavior: 'smooth' }, true);

    setResultFoods(<div className="app__calculator-results">
      <label className="app__calculator-form-text">Recommended Protein Foods</label>

      <label className="small-text">Food Name (protein per 100g)</label>
      {optimalFoods()}

    </div>);
  }

  //Array for proteins of all foods (to be used in DP algorithm)
  const foodProteins = [];

  //Determines the optimal foods results based on DP algorithm and food proteins
  function optimalFoods() {
    //Defines values for foodProteins in the format of [food name, food proteins per 100g]
    for (let i = 0; i < foods.length; i++) {
      foodProteins[i] = [foods[i].food_name, parseInt(foods[i].proteins_100g)];
    }

    console.log(optimalFoodsCalculation(foodProteins, foodProteins.length, proteinAmount));
    console.log("example", foodProteins[0][1]);

    return (foods.map((food) => (
      <div key={food.food_name} className="row app__calculator-food-box">
        <label className="p-text results-text">{food.food_name} ({food.proteins_100g})</label>
      </div>
    )));
  }

  //Bottom-up Tabulation dynamic programming approach to calculating the amount of protein foods a user should eat per day
  //foodsProvided = foodProteins, n = foodProteins.length, sum = proteinAmount
  function optimalFoodsCalculation(foodsProvided, n, sum) {
    //Table that stores results of subproblems.
    sum = parseInt(sum);
    n = parseInt(n);
    const table = new Array(sum+1);

    table.fill(0);

    //Base case (sum = 0)
    table[0] = 0.001;

    //Pick all proteins one by one and update values
    for (let i = 0; i < n; i++) {
      for (let j = foodsProvided[i][1]; j <= sum; j++) {
        table[j] += table[j - foodsProvided[i][1]];
      }
    }
    
    console.log(table);

    return table[sum];
  }


  //Gets the foods to the front-end
  function getFoods() {
    fetch('http://localhost:3001').then(response => {
      return response.json();
    }).then(data => {
      setFoods(data);
    });
  }

  //Prints weight when input type range adjusts
  const handleWeightChange = () => {
    document.getElementById('WeightLabel').innerHTML = document.getElementById('Weight').value + " Ib(s)";
    if (document.getElementById('Weight').value != 0) {
      document.getElementById('rangevalue').value = document.getElementById('Weight').value;
    }
  }

  //Adds event where once number is inputted, the range input and weight label is also changed
  const changeRange = () => {
    document.getElementById('Weight').value = document.getElementById('rangevalue').value;

    handleWeightChange();
  }

  //Prints lifting goal when input type radio changes
  const handleGoalSelection = () => {
    document.getElementById('liftingGoalLabel').innerHTML = document.querySelector('input[name="liftGoalButton"]:checked').value;
    //console.log(document.querySelector('input[name="liftGoalButton"]:checked').value);
  }


  return (
    <div className="app__calculator">
      {/* Calculator Page Title */}
      <div className="head-text">
        Input your Information to <br /><span>Calculate</span> Your <span>Optimal Protein Foods</span>
      </div>

      {/* Primary Form to define variables when calculating */}
      <div className="app__calculator-section" id="mainform" >

        {/* Body Weight Form Section */}
        <label className="app__calculator-form-text">Body Weight (in Ib)?</label>
        <div className="small-text">*Use Slider or Number Input to set Weight, round to nearest pound</div>

        <div className="app__calculator-weight-form">
          <input type="range" id="Weight" name="Weight" defaultValue={150} min="0" max="300" onInput={handleWeightChange} className="app__calculator-form-range" />
          <input type="number" placeholder="Input Weight #" id="rangevalue" onInput={changeRange} className="app__calculator-form-field" />
          <div className="p-text" style={{ textDecoration: "underline" }}>Weight: <label id="WeightLabel" className="p-text">150 Ib(s)</label></div>

        </div>

        <br />

        {/* Diet Goals Form Section */}
        <label className="app__calculator-form-text">Diet Goals?</label>
        <div className="small-text">*Select Desired Lifting Goals</div>
        <div style={{ margin: "0.8rem 0 1rem" }}>

          <div>
            <input type="radio" id="cut" value="Cut" name="liftGoalButton" onClick={handleGoalSelection} />
            <label className="p-text" for="cut">Cut</label>
          </div>

          <div>
            <input type="radio" id="bulk" value="Bulk" name="liftGoalButton" onClick={handleGoalSelection} />
            <label className="p-text" for="bulk">Bulk</label>
          </div>

          <div>
            <input type="radio" id="maintain" value="Neither" name="liftGoalButton" onClick={handleGoalSelection} />
            <label className="p-text" for="maintain">Neither</label>
          </div>

        </div>

        <div className="p-text" style={{ textDecoration: "underline" }}>Lifting Goal: <label id="liftingGoalLabel" className="p-text">N/A</label></div>

        {/* Calculation Button */}
        <button className="app__calculator-button" id="calculate" type="button" form="mainform" value="Submit" onClick={CalculateFoods}>Calculate</button>
      </div>

      {/* Returned Results */}
      {resultFoods ? resultFoods : null}

    </div>
  )
}

export default AppWrap(Calculator, 'calculator')