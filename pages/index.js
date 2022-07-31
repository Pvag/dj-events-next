import Link from "next/link"
import Layout from "@/components/Layout"
import EventItem from "@/components/EventItem"
import { API_URL } from "@/config/index"

export default function HomePage({ events }) {
  // console.log(events) // logs on the client!
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      { events.length === 0 && <h3>No Events to show</h3> }

      { events.map((evt) => (
        <EventItem key={ evt.id } evt={ evt } />
      )) }

      { events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View All Events</a>
        </Link>
      ) }
    </Layout>
  )
}

// fetch every time
// export async function getServerSideProps() {
//   const res = await fetch(`${API_URL}/api/events`)
//   const events = await res.json()
//   console.log(events); // logs on the server, i.e. this terminal, not on the client!

//   return {
//     props: { events }
//   }
// }

// ALT. - gets props at build time, but thanks to `revalidate`
//        it does fetch new data (every 1 second)
//
export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  return {
    props: { events: events.slice(0, 3) },
    revalidate: 1
  }
}