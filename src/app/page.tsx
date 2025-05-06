import React from "react";
import SearchWithSuggestions from "@/src/components/SearchWithSuggestions";
import H2 from "../components/H2";

const Hero: React.FC = () => {
  return (
    <section className="relative flex items-center justify-center h-screen overflow-hidden -top-18">
      {/* Animated background */}
      <div className="absolute inset-0 sunrise-gradient"></div>
      <div className="noise-texture"></div>
      {/* Content overlay */}
      <div className="relative z-10 text-center px-4">
        <div className="max-w-78 md:max-w-none mx-auto">
          <h1 className="font-header text-4xl md:text-7xl text-neutral-dark mb-4">
            Vad är UV-index just nu?
          </h1>
          <p className="font-body text-lg md:text-2xl text-neutral-dark font-serif tracking-tight">
            Skriv in en plats så tar UV-Kollen reda på UV-indexet på den platsen
            just nu.
          </p>
        </div>
        <div className="mt-14">
          <SearchWithSuggestions />
        </div>
      </div>
    </section>
  );
};

const InfoSection: React.FC = () => {
  return (
    <>
      <section>
        <div className="py-20 px-8 max-w-7xl mx-auto text-lg lg:text-xl text-neutral-dark">
          <H2>Hur beräknas UV-index?</H2>
          <p className="text-neutral-800 mb-12 tracking-tight">
            Ultraviolett index, eller <i>UV-index</i> som vi känner till det,
            beräknas utifrån flera faktorer.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 leading-7 lg:leading-8">
            <p>
              De viktigaste faktorerna är solens höjdvinkel, ozonskiktets
              tjocklek och mängden molntäcke. Ju högre solens elevationsvinkel
              är, desto mer direkta är solens strålar. Detta innebär att mer
              UV-strålning når jordytan. Ozonskiktets tjocklek spelar också en
              roll för hur mycket UV-strålning som når jordytan. Ju tunnare
              ozonskiktet är, desto mer UV-strålning når jordytan. Slutligen
              påverkar också mängden molntäcke mängden UV-strålning som når
              jordytan.
            </p>
            <p>
              Moln kan blockera eller reflektera UV-strålning, vilket kan minska
              den mängd som når jordytan. <b>För att beräkna UV-indexet</b>{" "}
              kombineras dessa faktorer och mäts på en skala från 0 till 11+. Ju
              högre index, desto större är risken för hudskador från
              UV-strålning. Det är viktigt att skydda sig mot solens skadliga
              strålar genom att bära skyddande kläder, använda solkräm och söka
              skugga under de timmar då UV-strålningen är som högst.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="py-20 px-8 max-w-7xl mx-auto text-lg lg:text-xl text-neutral-dark">
          <H2>Hur fungerar skalan?</H2>
          <p className="text-neutral-800 mb-12 tracking-tight max-w-4xl">
            UV-skalan är utvecklad av Världshälsoorganisationen (WHO) och har
            blivit erkänd av hälsoorganisationer världen över. Den är uppdelad i
            5 riskkategorier, där varje kategori har en motsvarande färg:
          </p>
          <div className="flex space-between mb-8 flex-wrap gap-3">
            <div className="flex items-center px-6 py-2 bg-green-100 rounded-lg">
              <div className="w-4 h-4 bg-minecraft rounded-full mr-2"></div>
              <span className="text-neutral-dark whitespace-nowrap">
                0-2 (Låg)
              </span>
            </div>
            <div className="flex items-center px-6 py-2 bg-yellow-100 rounded-lg">
              <div className="w-4 h-4 bg-primary rounded-full mr-2"></div>
              <span className="text-neutral-dark whitespace-nowrap">
                3-5 (Måttlig)
              </span>
            </div>
            <div className="flex items-center px-6 py-2 bg-orange-100 rounded-lg">
              <div className="w-4 h-4 bg-orange rounded-full mr-2"></div>
              <span className="text-neutral-dark whitespace-nowrap">
                6-7 (Hög)
              </span>
            </div>
            <div className="flex items-center px-6 py-2 bg-red-100 rounded-lg">
              <div className="w-4 h-4 bg-love rounded-full mr-2"></div>
              <span className="text-neutral-dark whitespace-nowrap">
                8-10 (Mycket hög)
              </span>
            </div>
            <div className="flex items-center px-6 py-2 bg-purple-100 rounded-lg">
              <div className="w-4 h-4 bg-purple-600 rounded-full mr-2"></div>
              <span className="text-neutral-dark whitespace-nowrap">
                11+ (Extrem)
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 leading-7 lg:leading-8">
            <p>
              UV-index skalan är linjär, vilket innebär att varje ökning av
              indexvärdet motsvarar en ökning av UV-strålningen med cirka 25 %.
              Exempelvis motsvarar ett indexvärde på 6 en UV-strålningsnivå som
              är 25 % högre än en nivå på 5. Ett indexvärde på 8 motsvarar en
              UV-strålningsnivå som är 50 % högre än en nivå på 5.
            </p>
            <p>
              Det högsta möjliga indexvärdet är 11+, vilket motsvarar en
              UV-strålningsnivå som är 100 % högre än en nivå på 5. Det är
              viktigt att notera att UV-indexskalan inte är ett direkt mått på
              UV-strålning, utan snarare ett relativt mått på risken för
              hudskador från UV-strålning.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="py-20 px-8 max-w-7xl mx-auto text-lg lg:text-xl text-neutral-dark">
          <H2>UV-index i Sverige</H2>
          <p className="text-neutral-dark mb-12 tracking-tight">
            I Sverige har vi normalt sett ett UV-index mellan 4-8 på sommaren,
            och upp till 2 under vintern.
          </p>
        </div>
      </section>
    </>
  );
};

export default function Page() {
  return (
    <>
      <Hero />
      <InfoSection />
    </>
  );
}
