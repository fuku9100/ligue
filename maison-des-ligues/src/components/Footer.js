import '../styles/footer.css'

function Footer() {
    const adresse = " 5 Rue Albéric 57000 Metz"
    const numero = "0772818948"
    const email = "Lsportmetz@gmail.com"

    return (
        <footer>
            <div className='sitefooter'>
                <h4>
                    Plus d'informations :
                </h4>
                <li> Numéro de téléphone :{numero}</li>
                <li> Adresse :{adresse} </li>
                <li> E-mail :{email} </li>
            </div>
        </footer>
    );
}

export default Footer;