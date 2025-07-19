import Banner from "./Banner";
import Feature from "./Feature";
import Testimonial from "./Testimonial";
import Works from "./Works";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <section id="works">
                <Works></Works>
            </section>
            <section id="features">
                <Feature></Feature>
            </section>
            <section id="testimonials">
               <Testimonial></Testimonial>
            </section>
             




        </div>
    );
};

export default Home;