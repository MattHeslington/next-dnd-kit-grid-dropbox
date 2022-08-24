import Link from 'next/link'

const Nav = () => {
    return (
        <>
            <div className={`w-full border-b border-zinc-200 duration-200 bg-white h-[82px]`}>
                <div className={`container flex items-center justify-between w-full h-[82px] mx-auto`}>
                    <div className='w-64'>
                        <Link href='/'>
                            <a>
                                <span className='text-lg font-semibold text-zinc-800'>logo</span>
                            </a>
                        </Link>
                    </div>

                    <div className='flex items-center justify-end w-64 space-x-6'>
                        <div>
                            <Link href='/page-one'>
                                <a>
                                    <span className='text-lg font-semibold text-zinc-800'>page one</span>
                                </a>
                            </Link>
                        </div>
                        <div>
                            <Link href='/page-two'>
                                <a>
                                    <span className='text-lg font-semibold text-zinc-800'>page two</span>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nav
