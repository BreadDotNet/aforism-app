import { Console } from 'console'
import { useState, useEffect } from 'react'
import type { NextPage, GetServerSideProps, GetStaticProps} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'


export default function Home({quotesServer}:{quotesServer:Array<JSON>}){

  const getFromStorage = (key:string) => {
    if (typeof window !== 'undefined'){
      console.log('get')
      window.localStorage.getItem(key)
    }
  }

  const setToStorage = (key:string, value:string) => {
    if (typeof window !== 'undefined'){
      console.log('set')
      return window.localStorage.setItem(key, value)
    }
  }

  // let quotesStorage = getFromStorage('quotes')
  // if (quotesStorage === null) {
  //   setToStorage('quotes', JSON.stringify(quotesServer))
  //   quotesStorage = getFromStorage('quotes')
  //   console.log('get')
  // }

  const [query, setQuery] = useState("")

  const onLike = (quote:JSON) => {
    setToStorage('quote', JSON.stringify(quote))
    console.log('quote set')
  }

  

  return(
    <div className={styles.container}>
      <Head>
        <title>{'Aforism Search'}</title>
      </Head>
      <main>
        <h1>{'Aforism Search'}</h1>
        <input
          onChange={event => setQuery(event.target.value)}
        />
        <div>
          {
            quotesServer.filter(quotes => {
              if (query == '') {
                return quotes
              } else if ((quotes.q.toLowerCase().includes(query.toLowerCase())) || (quotes.a.toLowerCase().includes(query.toLowerCase())) ){
                return quotes
              }
            }).map((quotes, index) => {
              return(
                <div>
                <p>{quotes.q}</p>
                <p>{quotes.a}</p>
                <button
                  
                  onClick={onLike(quotes.q)}
                >Like</button>
                <br/>
                </div>
              )
            })
          }
        </div>
      </main>
    </div>
  )
}



export const getStaticProps: GetStaticProps = async() => {
  const response = await fetch('https://zenquotes.io/api/quotes')
  const data = await response.json()

  if (!data) {
    return{
      notFound: true
    }
  }

  return{
    props:{quotesServer: data}
  }
}