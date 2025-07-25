import { HeroSectionGallery } from "@/components/herogallery";
import { ShuffleHeroDemo } from "@/components/shufflegrid";
import { GalleryOne } from "@/components/gallerycircle";

export default function GalleryPage(){
    return(
        <div>
            <HeroSectionGallery />
            <ShuffleHeroDemo />
            <GalleryOne />
        </div>
    )
}