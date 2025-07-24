import { HeroSectionGallery } from "@/components/herogallery";
import { ShuffleHeroDemo } from "@/components/shufflegrid";
import {DragOne} from "@/components/dragone"

export default function GalleryPage(){
    return(
        <div>
            <HeroSectionGallery />
            <ShuffleHeroDemo />
            <DragOne />
        </div>
    )
}