import me from "@/src/assets/me.jpeg";
import sr_p3 from "@/src/assets/sr_p3_logo.svg";
import sydsvenskan from "@/src/assets/sydsvenskan_logo.svg";
import kolifink from "@/src/assets/kolifink_logo.svg";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";

export default function About() {
  const testimonials = [
    {
      logo: (
        <Image
          src={sr_p3}
          alt="Sveriges Radio P3s logotyp"
          className="w-16 h-16"
        />
      ),
      name: "P3 Nyheter",
      description:
        "Studenten Karl Sellergren har skapat en hemsida som hjälper folk att hålla koll på när det kan bli skadligt att vara i solen.",
    },
    {
      logo: (
        <Image src={kolifink} alt="Kolifinks logotyp" className="w-26 h-16" />
      ),
      name: "Kolifink Webbyrå",
      description:
        "UV-Kollen dyker upp högst i alla sökningar på Google relaterade till UV-prognoser. Undersökningar på användarna visar att 93% kommer att fortsätta använda UV-Kollen, och att medelbetyget av 10 är 8.9.",
    },
    {
      logo: (
        <Image
          src={sydsvenskan}
          alt="Sydsvenskans logotyp"
          className="w-28 h-16"
        />
      ),
      name: "Sydsvenskan",
      description:
        "Idag får Karl Sellergrens hemsida tusentals unika besökare varje dag. På grund av trycket slutar sajten fungera runt lunchtid under sommaren.",
    },
  ];
  return (
    <main>
      <div className="relative flex items-center justify-center h-80 md:h-100 overflow-hidden -top-18">
        {/* Animated background */}
        <div className="absolute inset-0 sunrise-gradient"></div>
        <div className="noise-texture"></div>
        {/* Content overlay */}
        <div className="relative z-10 text-center px-4 pt-14 md:pt-18">
          <div className="max-w-78 md:max-w-none mx-auto">
            <h1 className="font-header text-4xl md:text-6xl text-neutral-dark mb-4">
              Om UV-Kollen
            </h1>
            <p className="text-lg font-serif tracking-tight">
              Hur historian bakom Sveriges största tjänst för UV-index började.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-start -mt-34 md:-mt-8 pb-12 text-neutral-dark relative z-10">
        <div className="max-w-[1000px] w-full p-5">
          <div className="mx-auto">
            <div className="flex flex-col justify-center md:flex-row md:justify-between items-center gap-8 md:gap-16">
              <div className="grow shrink-0">
                <Image
                  src={me}
                  alt="Karl"
                  className="rounded-full"
                  height={220}
                />
              </div>
              <div className="shrink grow-0">
                <p className="font-semibold text-lg lg:text-xl text-neutral-dark leading-7 lg:leading-8 max-w-4xl">
                  UV-Kollen skapades av mig, Karl Sellergren, som ett
                  hobbyprojekt våren 2023. Idén kom efter att SMHI en dag i
                  April i år bestämde sig för att stänga ner tjänsten "UV-index
                  idag". Jag och mina kompisar ville åka ner till stranden och
                  jag behövde bestämma mig för att ta med solkrämen eller inte.
                  Visst, i iPhones finns ju väderappen som visar indexet just
                  nu, men jag saknade en exakt prognos för varje stad som
                  dessutom bygger på pålitlig data. Vipps! UV-Kollen var fött.
                </p>
              </div>
            </div>
            <div className="text-lg lg:text-xl text-neutral-dark mt-6 leading-7 lg:leading-8 flex flex-col gap-4">
              <p>
                En kul anekdot är att det i början var <i>vääldigt</i> viktigt
                att UV-Kollen skulle ha decimaler i UV-indexet. En vän till mig
                berättade nämligen att vår gemensamma kompis några år tidigare
                hade spenderat <span className="text-orange">$</span>
                <span className="text-love">$</span>
                <span className="text-minecraft">$</span> på väderappar som hade
                decimaler med i UV-indexet för att optimera sitt solande.
              </p>
              <p>
                Idag drivs UV-Kollen helt av mig, fortfarande som ett
                hobbyprojekt. Jag tjänar inga pengar på det utan gör det för att
                jag själv tycker att det behövs. "Hur kan jag hjälpa till?",
                undrar du. Jo, jag hade uppskattat om du fyller i formuläret som
                finns om du klickar på hjärtbubblan längst ner till höger på
                förstasidan. Sen tycker jag att du ska följa UV-Kollen på
                sociala medier och om du är riktigt snäll donera en liten slant
                :)
              </p>
              <p className="flex items-center">
                <span className="mr-2">Kärlek!</span>{" "}
                <FaHeart className="text-love" />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1300px] mx-auto mb-24 px-4">
        <div className="flex flex-wrap gap-4 items-center justify-center">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="px-8 sm:max-w-sm md:h-75 pt-6 pb-9 bg-linear-to-br from-neutral-200 to-neutral-400 rounded-md border-2 border-neutral-400 flex flex-col justify-start"
            >
              <div className="flex gap-4 items-center justify-between">
                {testimonial.logo}
                <span className="text-lg font-semibold text-neutral-dark block">
                  {testimonial.name}
                </span>
              </div>
              <p className="text-lg text-neutral-dark mt-2">
                <i className="font-serif font-black text-xl mr-2 text-neutral-800">
                  "
                </i>
                {testimonial.description}
                <i className="font-serif font-black text-xl mr-2 text-neutral-800">
                  "
                </i>
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
