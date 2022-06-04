import { Console } from 'console'
import type { NextPage, GetServerSideProps, GetStaticProps} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home({quotesServer}:{quotesServer:JSON[]}){
  console.log(quotesServer)
  
  const onChange = (input:string | null) => {
    
  }
  return(
    <div className={styles.container}>
      <Head>
        <title>{'Aforism Search'}</title>
      </Head>
      <main>
        <h1>{'Aforism Search'}</h1>
        <input></input>
        <button>Search</button>
        <div>

        </div>
      </main>
    </div>
  )
}



export const getServerSideProps: GetServerSideProps = async() => {
  const response = await fetch('https://zenquotes.io/api/quotes')
  const data = await response.json()

  return{
    props:{quotesServer: data}
  }
}