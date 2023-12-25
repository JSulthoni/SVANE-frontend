import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import InterestsIcon from '@mui/icons-material/Interests';
import './Contacts.scss';


// This component is to simulate newsletter feature. Otherwise for UI
const Contacts = () => {
    return (
        <section className='contacts flexr-center' id='contacts'>
            <div className='wrapper flexr-c-between'>
                <span>FALL IN LOVE WITH <b>SVANE</b></span>
                <form className='mail'>
                    <input type='email' placeholder='example@email.com' />
                    <button>SUBSCRIBE</button>
                </form>
                <div className='icons flexr-c-start'>
                    <InstagramIcon />
                    <TwitterIcon />
                    <GoogleIcon />
                    <InterestsIcon />
                </div>
            </div>
        </section>
    )
};

export default Contacts;
