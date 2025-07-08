import { HeroSectionTeam} from "@/components/heroteam";
import { TeamDetails } from "@/components/TeamDetails";
import { SectionIntro } from "@/components/Sectionintro";
import { TeamPostDoctoralFellows } from "@/components/postdoctoral";
import { TeamInternationalDoctoralScholars } from "@/components/TeamInternational";
import { TeamDoctoralScholars } from "@/components/TeamDoctoral";
import { TeamAspireScholars } from "@/components/TeamAspireScholars";
import { AlumniTestimonials } from "@/components/stagger-testimonials";
import AboutPage from "@/components/aboutme";


const WordsOne=[{text:"Project"},
  {text:"Associates"},
]
const DescriptionOne="Driving research and outreach on the ground through collaboration, data, and field engagement."
const WordsTwo=[{text:"Postdoctoral "},
  {text:"Fellows"},

]
const DescriptionTwo="Our postdoctoral researchers lead advanced inquiries into inclusive education, sustainability, and learning technologies—contributing critical insights that shape the lab’s interdisciplinary academic and community-focused initiatives."

const WordsThree=[{text:"International"},
  {text:"Doctoral"},
  {text:"Scholars"},
]
const DescriptionThree="Bringing global perspectives to local challenges, our international doctoral scholars collaborate across borders to advance research in education, sustainability, and innovation through culturally responsive, interdisciplinary inquiry."
const WordsFour=[{text:"Doctoral"},{text:"Scholars"}]
const DescriptionFour="Our doctoral scholars drive research across education, technology, inclusion, and sustainability—contributing fresh insights and innovations that align with the lab’s mission of transformative learning and global collaboration."

const WordsFive = [{ text: "Aspire" }, { text: "Scholars" }];
const DescriptionFive ="Empowering early-career researchers with mentorship and opportunities, Aspire Scholars are future academic leaders exploring inclusive, equitable educational practices.";

const WordsSix=[{text:"Alumni"}]
const DescriptionSix="Our Alumni have made significant contributions to the field, and their stories continue to inspire and inform the future of education research.";



const TeamPage = () => {
    return (
      <div className="overflow-x-hidden">
        <HeroSectionTeam />
        <AboutPage />
        <SectionIntro words={WordsOne} description={DescriptionOne} />
        <TeamDetails />
        <SectionIntro words={WordsTwo} description={DescriptionTwo} />
        <TeamPostDoctoralFellows />
        <SectionIntro words={WordsThree} description={DescriptionThree} />
        <TeamInternationalDoctoralScholars />
        <SectionIntro words={WordsFour} description={DescriptionFour} />
        <TeamDoctoralScholars />
        <SectionIntro words={WordsFive} description={DescriptionFive} />
        <TeamAspireScholars />
        <SectionIntro words={WordsSix} description={DescriptionSix} />
        <AlumniTestimonials />


        
      </div>
    );
  };
  
  export default TeamPage;
  