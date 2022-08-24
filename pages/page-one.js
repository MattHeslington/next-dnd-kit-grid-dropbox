import Head from 'next/head'
import Layout from 'layouts/default-layout'

const PageOne = () => {
    return (
        <>
            <Head>
                <title>Boilerplate | Page One</title>
                <meta name='description' content='description here' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <h1 className='text-lg font-semibold'>Page one</h1>
        </>
    )
}

PageOne.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>
}

export default PageOne
