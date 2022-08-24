import Head from 'next/head'
import Layout from 'layouts/default-layout'

const PageTwo = () => {
    return (
        <>
            <Head>
                <title>Boilerplate | Page Two</title>
                <meta name='description' content='description here' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <h1 className='text-lg font-semibold'>Page two</h1>
        </>
    )
}

PageTwo.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export default PageTwo
