import Hero from '../sections/Hero';
import FeaturedStories from '../sections/FeaturedStories';
import FilmsSection from '../sections/FilmsSection';
import AboutPreview from '../sections/AboutPreview';
import TestimonialsSection from '../sections/TestimonialsSection';
import InstagramFeed from '../sections/InstagramFeed';
import ContactCTA from '../sections/ContactCTA';

const Home = () => {
  return (
    <div className="w-full">
      <Hero />
      <FeaturedStories />
      <FilmsSection />
      <AboutPreview />
      <TestimonialsSection />
      <InstagramFeed />
      <ContactCTA />
    </div>
  );
};

export default Home;
