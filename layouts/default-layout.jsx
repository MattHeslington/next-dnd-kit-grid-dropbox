import Nav from 'components/nav'

const DefaultLayout = ({ children }) => {
    return (
        <div className='relative flex flex-col items-start justify-start w-screen min-h-screen'>
            <Nav />
            <main className={`w-screen fixed mt-[82px]`}>
                <div className='container pt-6 mx-auto'>{children}</div>
            </main>
        </div>
    )
}

export default DefaultLayout
