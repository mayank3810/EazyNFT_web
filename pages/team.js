import NavbarTwo from '../components/Layout/NavbarTwo';
import PageBanner from '../components/Common/PageBanner';
import TeamArea from '../components/Common/TeamArea';
import Testimonial from '../components/Common/Testimonial';
import InvolvedArea from '../components/Common/InvolvedArea';
import Footer from '../components/Layout/Footer';
import Copyright from '../components/Common/Copyright';

const Team = () => {
  return (
    <>
      <NavbarTwo />
   
      <TeamArea/>
      <Testimonial/>
      
      <Footer />
      <Copyright />
    </>
  );
};

export default Team;
