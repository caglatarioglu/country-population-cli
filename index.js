const axios = require('axios');
const readlineSync = require('readline-sync');

// Function to fetch all countries and filter by continent
async function getCountriesByContinent(continent) {
  try {
    // Fetch all countries
    const response = await axios.get('https://restcountries.com/v3.1/all');
    // Filter countries by the specified continent
    const countries = response.data.filter(country =>
      country.region.toLowerCase() === continent.toLowerCase()
    );
    return countries;
  } catch (error) {
    // Handle errors
    console.error(`Error fetching countries: ${error.message}`);
    return [];
  }
}

// Function to fetch population of a specific country
async function getCountryPopulation(country) {
  try {
    // Fetch country data by name
    const response = await axios.get(`https://restcountries.com/v3.1/name/${encodeURIComponent(country)}`);
    // Get the population from the response
    const population = response.data[0]?.population;
    return population;
  } catch (error) {
    // Handle errors
    console.error(`Error fetching population: ${error.message}`);
    return null;
  }
}

// Main function to run the CLI
async function main() {
  console.log('Welcome to the Country Population CLI!');

  // Get user input for continent
  const continent = readlineSync.question('Enter a continent (e.g., Africa, Europe): ');

  // Fetch countries from the specified continent
  const countries = await getCountriesByContinent(continent);

  if (countries.length === 0) {
    console.log(`No countries found in ${continent}.`);
    return;
  }

  // Display list of countries
  console.log(`\nCountries in ${continent}:`);
  countries.forEach(country => console.log(country.name.common));

  // Get user input for country selection
  const selectedCountry = readlineSync.question('Enter a country name from the list: ');

  // Fetch and display population of the selected country
  const population = await getCountryPopulation(selectedCountry);
  if (population !== null) {
    console.log(`Population of ${selectedCountry}: ${population}`);
  } else {
    console.log(`Population data not available for ${selectedCountry}`);
  }
}

// Export functions for testing
module.exports = {
  getCountriesByContinent,
  getCountryPopulation
};

// Run the main function if this script is run directly
if (require.main === module) {
  main();
}
