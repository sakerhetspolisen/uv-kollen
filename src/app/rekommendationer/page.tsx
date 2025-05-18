import { Chip } from "@heroui/react";

export default function Recommendations() {
  const recommendations = [
    [
      "Använd solkräm med SPF 15 eller högre där kläder inte skyddar. Se anvisningarna på förpackningen.",
      "sunscreen-spf",
      "pre",
    ],
    [
      "Undvik att använda solkräm som enda solskydd.",
      "use-more-than-sunscreen",
      "pre",
    ],
    [
      "Kläder, hatt och solglasögon ger ett mycket bra skydd.",
      "use-clothing",
      "pre",
    ],
    [
      "Det är bra att gradvis vänja huden vid solen, sola dock inte solarium av den anledningen.",
      "get-used-to-the-sun",
      "pre",
    ],
    [
      "Olika plagg skyddar olika bra mot solen. En t-shirt i 100% bomull har en solfaktor på SPF 10 ungefär.",
      "clothing-and-its-spf",
      "pre",
    ],
    [
      "Ta pauser från solen när den är som starkast under dagen.",
      "breaks",
      "during",
    ],
    [
      "Solen är oftast starkare vid en strand med fri horisont, försök därför att vara i skuggan.",
      "shade-at-beaches",
      "during",
    ],
    [
      "Skydda dig mot stark sol även när du till exempel är på sjön, i skidbacken, i trädgården eller på balkongen.",
      "protect-from-strong-sun",
      "during",
    ],

    [
      "Om du bränner dig, låt huden vila helt från solen. Skydda dig med kläder och/eller skugga.",
      "if-burnt",
      "post",
    ],
  ];
  const labels = {
    pre: {
      label: "Innan du solar",
      color: "minecraft",
    },
    during: {
      label: "Under tiden du solar",
      color: "love",
    },
    post: {
      label: "Efter att ha solat",
      color: "orange",
    },
  };
  return (
    <main>
      <div className="flex justify-center items-start pt-18 pb-12 text-neutral-dark">
        <div className="max-w-1000px w-full p-5">
          <div className="flex flex-col items-center max-w-6xl mx-auto">
            <h1 className="font-header text-4xl md:text-5xl lg:text-6xl text-neutral-dark mb-4 text-center">
              Råd och rekommendationer
            </h1>
            <p className="text-lg text-center mt-5 max-w-[550px]">
              Denna sida ger tips på hur du bäst skyddar dig när solens strålar
              har ett UV-index typiskt för en svensk sommar.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12">
              {recommendations.map((el) => (
                <div
                  key={el[1]}
                  className="bg-neutral-200 rounded-lg border-2 border-neutral-300 p-6"
                >
                  <Chip size="sm" className={`bg-${labels[el[2]].color} text-neutral-light`}>
                    {labels[el[2]].label}
                  </Chip>
                  <p className="font-serif text-lg mt-2">{el[0]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
