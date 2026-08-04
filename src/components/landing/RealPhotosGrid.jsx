import { realPhotos } from '../../data/content.js'
import { images } from '../../assets/index.js'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import LazyImage from '../ui/LazyImage.jsx'

export default function RealPhotosGrid() {
  return (
    <section className="bg-cream-100 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Prova social"
          title="Famílias reais brincando de verdade"
          subtitle="Fotos enviadas por mães que já receberam o kit."
        />

        <div className="grid grid-cols-2 gap-3 sm:gap-5">
          {realPhotos.map((photo, i) => (
            <Reveal
              key={photo.image}
              delay={i * 90}
              className="group relative overflow-hidden rounded-3xl shadow-softer"
            >
              <LazyImage
                src={images[photo.image]}
                alt={photo.caption}
                className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-3 pt-8">
                <p className="text-xs font-semibold leading-snug text-white sm:text-sm">{photo.caption}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
