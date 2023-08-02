const Pool = require('pg').Pool
const pool = new Pool({
  user: 'my_user',
  host: 'localhost',
  database: 'macro_foods',
  password: 'root',
  port: 5432,
});

const getFoods = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM foods ORDER BY proteins_100g ASC', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  const createFoods = (body) => {
    return new Promise(function(resolve, reject) {
      const { food_name, proteins_100g, carbohydrates_100g, fat_100g, energy_100g, category_name, origin, diet_type } = body
      pool.query('INSERT INTO foods (food_name, proteins_100g, carbohydrates_100g, fat_100g, energy_100g, category_name, origin, diet_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [food_name, proteins_100g, carbohydrates_100g, fat_100g, energy_100g, category_name, origin, diet_type], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`New food now added: ${results.rows[0]}`)
      })
    })
  }
  const deleteFoods = () => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(request.params.food_name)
      pool.query('DELETE FROM foods WHERE food_name = $1', [food_name], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`Deleted food(s) with name ${food_name}`)
      })
    })
  }
  
  module.exports = {
    getFoods,
    createFoods,
    deleteFoods,
  }