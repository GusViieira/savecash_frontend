import type { CountriesListModel } from '@/models/response/ExternalApisModel'

class CountriesList {
  async getCountries(): Promise<CountriesListModel[]> {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags')
    const data: Array<{ name: { common: string }; flags: { svg: string } }> = await response.json()

    const countries = data.map((country) => ({
      name: country.name.common,
      flags: country.flags.svg,
    }))
    return countries
  }
}

export default new CountriesList()
