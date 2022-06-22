import Head from 'next/head'
import HomeHead from '@/p_home/HomeHeader'
import Talk from '@/p_home/talk'
import Recommend from '@/p_home/Recommend'

export default function Home() {
  return (
    <div>
      <Head>
        <title>精品课首页</title>
      </Head>
      <main>
        <h3>精品课首页</h3>
        <HomeHead />
        <Talk />
        <Recommend />
      </main>
    </div>
  )
}
