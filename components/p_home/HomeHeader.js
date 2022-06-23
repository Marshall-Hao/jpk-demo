import SearchBar from './SearchBar'
import Banner from './Banner'
import Nav from './Nav'

export default function HomeHead({ banner }) {
  return (
    <section>
      <SearchBar />
      <Banner data={banner} />
      <Nav />
    </section>
  )
}
