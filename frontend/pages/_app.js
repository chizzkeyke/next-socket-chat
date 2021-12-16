import '../styles/globals.css'
import { ProviderCurrentUserContext } from '../contexts/CurrentUserContext'

function MyApp({ Component, pageProps }){
   return (
      <ProviderCurrentUserContext>
         <Component {...pageProps} />
      </ProviderCurrentUserContext>
   )
}

export default MyApp
