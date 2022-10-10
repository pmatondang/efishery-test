import Logo from '../../assets/logo.png'


const Navbar = () => {
    return (
        <div className="header">
            <header className="header">
                <div className="w-full container mx-auto">
                    <a href="http://localhost:3000/"><img src={Logo} className="logo" alt="logo" /></a>
                    <ul className='menu'>
                        <li><a href="https://github.com/pmatondang/test-efishery">Github</a></li>
                        <li><a href="#poibe">Poibe Leny Naomi</a></li>
                    </ul>
                </div>
            </header>
        </div>

    );
};

export default Navbar;