import '../styles/globals.css'
import Link from 'next/link'
function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className = "border-b p-6">
        <p className='text-4xl font-bold'>E-voting</p>
        <div className='flex mt-4'>
          <Link href="/">
            <a className='mr-6 text-pink-500'>
              Home
            </a>
          </Link>
          <Link href="/create-campaign">
            <a className='mr-6 text-pink-500'>
              Create Campaign
            </a>
          </Link>
          <Link href="/view-campaign">
            <a className='mr-6 text-pink-500'>
              View Campaign
            </a>
          </Link>
          <Link href="/register-voter">
            <a className='mr-6 text-pink-500'>
              Register Voter
            </a>
          </Link>
          <Link href="/register-candidate">
            <a className='mr-6 text-pink-500'>
              Register Candidate
            </a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />)
    </div>
  
  
  
  

  )}

export default MyApp
