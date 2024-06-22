const axios = require('axios');
const { getCountriesByContinent, getCountryPopulation } = require('../index');

jest.mock('axios');

describe('getCountriesByContinent', () => {
  it('fetches countries from the specified continent', async () => {
    const mockData = [
      { name: { common: 'Nigeria' }, region: 'Africa' },
      { name: { common: 'Kenya' }, region: 'Africa' }
    ];
    axios.get.mockResolvedValue({ data: mockData });

    const countries = await getCountriesByContinent('Africa');
    expect(countries).toEqual(mockData);
  });

  it('returns an empty array on API error', async () => {
    axios.get.mockRejectedValue(new Error('API error'));

    const countries = await getCountriesByContinent('Africa');
    expect(countries).toEqual([]);
  });
});

describe('getCountryPopulation', () => {
  it('fetches the population of the specified country', async () => {
    const mockData = [{ population: 200000000 }];
    axios.get.mockResolvedValue({ data: mockData });

    const population = await getCountryPopulation('Nigeria');
    expect(population).toBe(200000000);
  });

  it('returns null on API error', async () => {
    axios.get.mockRejectedValue(new Error('API error'));

    const population = await getCountryPopulation('Nigeria');
    expect(population).toBeNull();
  });
});
