import Link from 'next/link';

const Navbar = ()=>{
    return (<>
        <nav className='mainNav'>
            <ul className='maindiv'>
                <li className='list-data'><Link href={"/"}><a id='anker'>Home</a></Link></li>
                <li className='list-data'><Link href={"/list"}><a id='anker'>List</a></Link></li>
                <li className='list-data'><Link href={"/insert"}><a id='anker'>Insert</a></Link></li>
                <li className='list-data'><Link href={"/details"}><a id='anker'>Details</a></Link></li>
            </ul>
        </nav>
    </>)

}



export default Navbar