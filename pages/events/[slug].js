import Layout from "@/components/Layout"
import { API_URL } from "@/config/index"

// loads when URL ends with event-1, event-2 or similar, e.g.
export default function EventPage({ evt }) {
  return (
    <Layout>
      <h1>{ evt.name }</h1>
      {/* <div className=""></div> */}
    </Layout>
  )
}

// dynamic
//
// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`)
//   const events = await res.json()
//   console.log('events:', events);

//   return {
//     props: {
//       evt: events[0]
//     }
//   }
// }

// generates the paths
export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  const paths = events.map(evt => ({
    params: { slug: evt.slug }
  }))

  return {
    paths,
    fallback: true
  }
}

// gets the data for those paths
export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events/${slug}`)
  const events = await res.json()
  console.log('events:', events);

  return {
    props: {
      evt: events[0]
    },
    revalidate: 1
  }
}