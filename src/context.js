import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'
import SingleCocktail from './pages/SingleCocktail';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('a')
  const [cocktails, setCocktails] = useState([])

  const fetchDrinks = async() => {
    setLoading(true)
    try {
      const response = await fetch(`${url}${searchTerm}`)
      const data = await response.json()
      const {drinks} = data;
      //console.log(drinks)
      if(drinks){
        const newDrinks = drinks.map((item) => {
          const {idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass} = item
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass
          }
        })
        setLoading(false)
        setCocktails(newDrinks)
      }else{
        setLoading(false)
        setCocktails([])
      }
     
      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchDrinks();
  }, [searchTerm])
  

  return <AppContext.Provider value={{
    loading,
    cocktails,
    setSearchTerm,
  }}>{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
