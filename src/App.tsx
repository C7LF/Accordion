import React, { useState, useEffect } from 'react'
import Accordion from './components/accordion/accordion';

const App = () => {

  interface faqData {
    question: string,
    answer: string
  }

  // faqData state, useState hook used to set and retrieve data
  const [faqData, setFaqData] = useState<faqData[]>()
  const [error, setError] = useState<String>()

  // initalising request parameters for fetching the data.
  const myInit: Object = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: 'cors',
    cache: 'default'
  }

  // define new request to faqs.json plased in public folder
  let faqRequest = new Request('./faqs.json', myInit)
  
  // Fetch data function, promises used to handle the data
  const fetchData = () => {
     fetch(faqRequest)
    .then(res => res.json())
    
    // When data is recieved and parsed, it is stored in state.
    .then(data => setFaqData(data))

    // Catch to prevent any exceptions - error is also stored in state.
    .catch(error => setError(error))
  }

  // Each time the app is rendered, useEffect fires, which also fires the fetchData function
  // useEffect takes an input as a parameter, in this case it is an empty array which only runs on Mount and UnMount.
  useEffect( () => {
    fetchData()
  }, [])

  return (
    // Tenary operator to check if faqData has any state. This prevents the component from rendering if the data couldn't be fetched.
    faqData ? (
      <div className="accordion">
      <h1 className="accordion-title">Have a Question? We can help</h1>
      {faqData.map((item,index) => {
        const questionMumber: number = index + 1;
        return (
          <Accordion key={index} number={questionMumber} question={item.question} answer={item.answer} />
        )
      })}
    </div>
    ) : (
      <>
        {error ? (
          <p>There has been an error loading the pages data</p>
        ) : (
          <p>Loading</p>
        )}
      </>
    )
  )
}

export default App;
